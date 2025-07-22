import { useEffect, useMemo, useState } from 'react';
import { useMetadata } from '../api';
import { Option } from '@/types/data-table';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { toast } from 'sonner';
import { parse } from 'date-fns';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { IconFilter } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SelectDate } from '@/components/ui/select-date';
import Image from 'next/image';
import FullScreenLoader from '@/components/ui/fullscreen-loader';
import { useLevelFilterStore } from '../store/level-filter-store';
import { Game } from '@/types';
import SliderInputRange from './slider-input-range';

const dummyGames: Game[] = [
  {
    id: 1,
    name: 'Bolt Escape 3D: Screw Puzzle',
    bundleId: 'com.apollo.screw.it.out',
    avatarUrl:
      'https://play-lh.googleusercontent.com/J1qxxDLPTYTM-VfkPW-6ltQk37Yj4f_w1irfV4_SCQ0koDS3zxedb3p-uV00q0ebtRo=w240-h480-rw'
  }
];

export default function LevelFilterCard() {
  // use state to save filter that haven't applied yet
  const [selectedGame, setSelectedGame] = useState(dummyGames[0]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedVersions, setSelectedVersions] = useState<string[]>([]);
  const [verionType, setVerionType] = useState<string>('0');
  const [selectedEventDay, setSelectedEventDay] = useState<
    (number | undefined)[] | undefined
  >([]);
  const [eventDayType, setEventDayType] = useState<string>('0');
  const [isRetetionSelect, setRetentionSelect] = useState<boolean>(false);
  const [selectedRetentionDay, setSelectedRetentionDay] = useState<number[]>([
    0, 100
  ]);

  // TODO: add verionType, eventDayType
  // use store to apply filter to other component
  const { setFilters, setFilterReady, triggerFilter } = useLevelFilterStore();

  const {
    data: metadata,
    loading: metadataLoading,
    error: metadataError,
    execute: metadataExecute
  } = useMetadata(selectedGame.bundleId);

  const isLoading = useMemo(() => metadataLoading, [metadataLoading]);

  // TODO: convert to use only store (remove state) for performance
  const metadataParsed = useMemo(() => {
    const result: {
      modes: Option[];
      versions: Option[];
      platforms: string[];
      countries: Option[];
      retentionDay: number[];
      level: number[];
    } = {
      modes: [],
      versions: [],
      platforms: [],
      countries: [],
      retentionDay: [0, 0],
      level: [0, 0]
    };

    if (metadata && metadata.data) {
      result.modes = metadata.data.modes.map((m: string) => ({
        label: m,
        value: m
      }));

      result.versions = metadata.data.versions.map((m: string) => ({
        label: m,
        value: m
      }));

      result.platforms = metadata.data.platforms;

      result.countries = metadata.data.countries.map((m: string) => ({
        label: m || 'UNKNOWN',
        value: m
      }));

      if (
        metadata.data.retentionDay?.min !== undefined &&
        metadata.data.retentionDay?.max !== undefined
      ) {
        result.retentionDay = [
          metadata.data.retentionDay.min,
          metadata.data.retentionDay.max
        ];
      }

      if (
        metadata.data.level?.min !== undefined &&
        metadata.data.level?.max !== undefined
      ) {
        result.level = [metadata.data.level.min, metadata.data.level.max];
      }
    }

    return result;
  }, [metadata]);

  useEffect(() => {
    if (selectedGame) {
      metadataExecute();
    }
  }, [selectedGame]);

  useEffect(() => {
    if (metadata && metadata.data) {
      const data = metadata.data;

      setSelectedPlatform(data.platforms?.[0] ?? '');
      setSelectedVersions(data.versions ?? []);
      setSelectedCountries(data.countries ?? []);
      setSelectedModes(data.modes ?? []);

      setFilters({
        game: selectedGame,
        platform: data.platforms?.[0] ?? '',
        versions: data.versions ?? [],
        countries: data.countries ?? [],
        modes: data.modes ?? []
      });

      if (data.eventDate?.min && data.eventDate?.max) {
        const from = parse(
          data.eventDate.min,
          'yyyyMMdd',
          new Date()
        ).getTime();
        const to = parse(data.eventDate.max, 'yyyyMMdd', new Date()).getTime();

        setSelectedEventDay([from, to]);
        setFilters({
          eventDay: [from, to]
        });
      }

      if (
        data.retentionDay?.min !== undefined &&
        data.retentionDay?.max !== undefined
      ) {
        setSelectedRetentionDay([data.retentionDay.min, data.retentionDay.max]);
        setFilters({
          retentionDay: [data.retentionDay.min, data.retentionDay.max]
        });
      }

      if (data.level?.min !== undefined && data.level?.max !== undefined) {
        setFilters({
          level: [data.level.min, data.level.max] // only set once time because it is master range data
        });
      }

      setFilterReady(true);
    }
  }, [metadata]);

  const applyFilter = () => {
    if (selectedVersions.length == 0) {
      toast.error('You must select at least 1 version');
      return;
    }

    if (selectedCountries.length == 0) {
      toast.error('You must select at least 1 country');
      return;
    }

    if (selectedModes.length == 0) {
      toast.error('You must select at least 1 modes');
      return;
    }

    if (selectedRetentionDay[0] > selectedRetentionDay[1]) {
      toast.error('Retention day is invalid');
      return;
    }

    setFilters({
      game: selectedGame,
      platform: selectedPlatform,
      versions: selectedVersions,
      countries: selectedCountries,
      modes: selectedModes,
      retentionDay: selectedRetentionDay,
      eventDay: selectedEventDay
    });

    triggerFilter();
  };

  if (metadataError) {
    throw metadataError;
  }

  return (
    <Card>
      {isLoading && <FullScreenLoader />}
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <IconFilter />
          <h3 className='text-xl font-bold'>Filters</h3>
        </CardTitle>
        <CardAction>
          <Button onClick={() => applyFilter()}>Apply Filters</Button>
        </CardAction>
      </CardHeader>
      <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-9'>
        <div className='col-span-2 flex flex-col space-y-2'>
          <label className='text-sm font-medium'>Select Game</label>
          <Select
            onValueChange={(val) => {
              const game = dummyGames.find((g) => g.id.toString() === val);

              if (game) {
                setSelectedGame(game);
              }
            }}
            value={selectedGame.id.toString()}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Choose a game' />
            </SelectTrigger>
            <SelectContent>
              {dummyGames.map((game) => (
                <SelectItem key={game.id} value={game.id.toString()}>
                  <div className='flex items-center gap-2'>
                    <Image
                      src={game.avatarUrl}
                      alt={game.name}
                      width={20}
                      height={20}
                    />
                    <span>{game.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-1 flex flex-col space-y-2'>
          <label className='text-sm font-medium'>Platform</label>
          <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='All Platforms' />
            </SelectTrigger>
            <SelectContent>
              {metadataParsed.platforms.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='col-span-2 flex flex-col space-y-2'>
          <label className='text-sm font-medium'>Difficultly</label>
          <MultiSelect
            title='Difficultly'
            options={metadataParsed.modes}
            selectedValues={selectedModes}
            setSelectedValues={setSelectedModes}
          />
        </div>
        <div className='col-span-2 flex flex-col space-y-2'>
          <label className='text-sm font-medium'>Country</label>
          <MultiSelect
            title='Countries'
            options={metadataParsed.countries}
            selectedValues={selectedCountries}
            setSelectedValues={setSelectedCountries}
          />
        </div>

        <div className='col-span-2 flex flex-col space-y-2'>
          <div className='flex justify-between'>
            <label className='text-sm font-medium'>Version</label>
            <RadioGroup
              className='flex gap-4'
              value={verionType}
              onValueChange={setVerionType}
            >
              <div className='flex items-center justify-center gap-2'>
                <RadioGroupItem value='0' />
                <label className='text-sm font-medium'>Current</label>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <RadioGroupItem value='1' />
                <label className='text-sm font-medium'>Install</label>
              </div>
            </RadioGroup>
          </div>
          <MultiSelect
            title='Versions'
            options={metadataParsed.versions}
            selectedValues={selectedVersions}
            setSelectedValues={setSelectedVersions}
          />
        </div>
        <div className='col-span-2'></div>
        <div className='col-span-5 flex flex-col space-y-2'>
          <div className='flex items-center justify-center space-x-2'>
            <label className='text-sm font-medium'>Retention day</label>
            <Switch
              checked={isRetetionSelect}
              onCheckedChange={setRetentionSelect}
            />
          </div>
          <SliderInputRange
            value={selectedRetentionDay}
            onValueChange={setSelectedRetentionDay}
            range={metadataParsed.retentionDay}
          />
        </div>
        <div className='col-span-2 flex flex-col space-y-2'>
          <div className='flex justify-between'>
            <label className='text-sm font-medium'>Event Day</label>
            <RadioGroup
              className='flex gap-4'
              value={eventDayType}
              onValueChange={setEventDayType}
            >
              <div className='flex items-center justify-center gap-2'>
                <RadioGroupItem value='0' />
                <label className='text-sm font-medium'>Current</label>
              </div>
              <div className='flex items-center justify-center gap-2'>
                <RadioGroupItem value='1' />
                <label className='text-sm font-medium'>Install</label>
              </div>
            </RadioGroup>
          </div>
          <SelectDate
            title='Event Day'
            data={selectedEventDay}
            setData={setSelectedEventDay}
            multiple
          />
        </div>
      </CardContent>
    </Card>
  );
}
