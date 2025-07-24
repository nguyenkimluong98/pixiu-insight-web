'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FullScreenLoader from '@/components/ui/fullscreen-loader';
import { useFailToStopStats } from '@/features/analystics/level/api';
import FailStatLineChart from '@/features/analystics/level/components/fail-stats-line-chart';
import { StatsTable } from '@/features/analystics/level/components/stats-tables';
import { failStatsColumns } from '@/features/analystics/level/components/stats-tables/columns';
import SliderInputRange from '@/features/analystics/level/components/slider-input-range';
import {
  clampLevelRange,
  Params,
  SortParam,
  useFilteredStats
} from '@/features/analystics/level/hooks/level-hook';
import {
  Tabs,
  useLevelFilterStore
} from '@/features/analystics/level/store/level-filter-store';
import axios from 'axios';
import { parseAsInteger, parseAsJson, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { LevelFailStat } from '@/types/level';

const sortSchema = z.array(
  z.object({
    id: z.string(),
    desc: z.boolean()
  })
);

export default function FailToStopChart() {
  const { filterVersion, activeTab, isFilterReady, ...filters } =
    useLevelFilterStore();
  const [selectedLevel, setSelectedLevel] = useState<number[]>(filters.level);
  const { data, loading, error, execute } = useFailToStopStats();

  useEffect(() => {
    if (!isFilterReady || activeTab !== Tabs.FAIL_TO_STOP) return;

    execute(filters, clampLevelRange(filters.level));
  }, [filterVersion, isFilterReady, activeTab]);

  // set level by loaded data
  useEffect(() => {
    if (loading || !data || !data.data) {
      return;
    }

    const { data: levelData } = data;

    setSelectedLevel([
      levelData[0].level,
      levelData[levelData.length - 1].level
    ]);
  }, [data]);

  const onLevelChange = (value: number[]) => {
    if (loading) return;

    setSelectedLevel(value);
    execute(filters, value);
  };

  const [page] = useQueryState('page', parseAsInteger.withDefault(1));
  const [perPage] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const [level] = useQueryState('level', parseAsInteger);
  const [sortParam] = useQueryState(
    'sort',
    parseAsJson<SortParam[]>(sortSchema.parse)
  );

  const query: Params = {
    page,
    perPage,
    level: level ?? undefined,
    sort: sortParam
  };

  const filteredData = useFilteredStats<LevelFailStat>(data?.data || [], query);

  if (error && !axios.isCancel(error)) {
    throw error;
  }

  if (!isFilterReady) return null;

  return (
    <Card>
      {loading && <FullScreenLoader />}
      <CardHeader>
        <CardTitle className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
          <div className='col-span-3'>AVG Fail to Stop current level</div>
          <div className='col-span-2 flex flex-col space-y-2'>
            <div className='flex items-center justify-center space-x-2'>
              <div className='flex items-center justify-between space-x-2'>
                <span className='flex-1' />
                <label className='flex-1 text-center text-sm font-bold'>
                  Level
                </label>
                <label className='flex-1 text-end text-sm font-medium'>
                  (Min:{' '}
                  <span className='text-primary font-bold'>
                    {filters.level[0]}
                  </span>{' '}
                  - Max:{' '}
                  <span className='text-primary font-bold'>
                    {filters.level[1]}
                  </span>
                  )
                </label>
              </div>
            </div>
            <SliderInputRange
              disabled={loading}
              value={selectedLevel}
              onValueChange={onLevelChange}
              range={filters.level}
              debounceMs={600}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!loading && (
          <div>
            <FailStatLineChart data={data?.data} />
            <StatsTable
              data={filteredData || []}
              columns={failStatsColumns}
              totalItems={data?.data.length || 0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
