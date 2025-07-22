'use client';

import type { Option } from '@/types/data-table';
import { ChevronDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import * as React from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

interface MultiSelectProps {
  title?: string;
  options: Option[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

export function MultiSelect({
  title,
  options,
  selectedValues: sv,
  setSelectedValues
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedValues = React.useMemo(
    () => new Set(Array.isArray(sv) ? sv : []),
    [sv]
  );

  const isAllSelected = React.useMemo(
    () => selectedValues.size === options.length,
    [selectedValues, options]
  );

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      const newSelectedValues = new Set(selectedValues);
      if (isSelected) {
        newSelectedValues.delete(option.value);
      } else {
        newSelectedValues.add(option.value);
      }
      const filterValues = Array.from(newSelectedValues);
      setSelectedValues(filterValues.length ? filterValues : []);
    },
    [selectedValues, setSelectedValues]
  );

  const onSelectAll = React.useCallback(() => {
    setSelectedValues(!isAllSelected ? options.map((o) => o.value) : []);
  }, [isAllSelected, options, setSelectedValues]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='default'
          className={`border-input text-muted-foreground justify-${selectedValues.size ? 'start' : 'between'}`}
        >
          {selectedValues.size ? title : `Choose ${title?.toLocaleLowerCase()}`}
          <ChevronDown />
          {selectedValues.size > 0 && (
            <>
              <Separator
                orientation='vertical'
                className='mx-0.5 data-[orientation=vertical]:h-4'
              />
              <div className='items-center gap-1'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {isAllSelected ? 'All' : selectedValues.size}{' '}
                    {title?.toLocaleLowerCase()} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[12.5rem] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className='max-h-full'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-h-[18.75rem] overflow-x-hidden overflow-y-auto'>
              <CommandItem key={'all-items'} onSelect={() => onSelectAll()}>
                <div
                  className={cn(
                    'border-primary flex size-4 items-center justify-center rounded-sm border',
                    isAllSelected
                      ? 'bg-primary'
                      : 'opacity-50 [&_svg]:invisible'
                  )}
                >
                  <CheckIcon color='white' />
                </div>
                <span className='truncate'>{`All ${title?.toLowerCase()}`}</span>
              </CommandItem>
              <CommandSeparator />
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}
                  >
                    <div
                      className={cn(
                        'border-primary flex size-4 items-center justify-center rounded-sm border',
                        isSelected
                          ? 'bg-primary'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon color='white' />
                    </div>
                    {option.icon && <option.icon />}
                    <span className='truncate'>{option.label}</span>
                    {option.count && (
                      <span className='ml-auto font-mono text-xs'>
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
