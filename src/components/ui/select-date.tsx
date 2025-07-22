'use client';

import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/format';

type DateSelection = Date[] | DateRange;

function getIsDateRange(value: DateSelection): value is DateRange {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function parseAsDate(timestamp: number | string | undefined): Date | undefined {
  if (!timestamp) return undefined;
  const numericTimestamp =
    typeof timestamp === 'string' ? Number(timestamp) : timestamp;
  const date = new Date(numericTimestamp);
  return !Number.isNaN(date.getTime()) ? date : undefined;
}

function parseDataValue(value: unknown) {
  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'number' || typeof item === 'string') {
        return item;
      }
      return undefined;
    });
  }

  if (typeof value === 'string' || typeof value === 'number') {
    return [value];
  }

  return [];
}

interface SelectDate {
  title?: string;
  multiple?: boolean;
  data: (number | undefined)[] | undefined;
  setData: (data: (number | undefined)[] | undefined) => void;
}

export function SelectDate({ title, multiple, data, setData }: SelectDate) {
  const selectedDates = React.useMemo<DateSelection>(() => {
    if (!data) {
      return multiple ? { from: undefined, to: undefined } : [];
    }

    if (multiple) {
      const timestamps = parseDataValue(data);
      return {
        from: parseAsDate(timestamps[0]),
        to: parseAsDate(timestamps[1])
      };
    }

    const timestamps = parseDataValue(data);
    const date = parseAsDate(timestamps[0]);
    return date ? [date] : [];
  }, [data, multiple]);

  const onSelect = React.useCallback(
    (date: Date | DateRange | undefined) => {
      if (!date) {
        setData(undefined);
        return;
      }

      if (multiple && !('getTime' in date)) {
        const from = date.from?.getTime();
        const to = date.to?.getTime();
        setData(from || to ? [from, to] : undefined);
      } else if (!multiple && 'getTime' in date) {
        setData([date.getTime()]);
      }
    },
    [setData, multiple]
  );

  const hasValue = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false;
      return selectedDates.from || selectedDates.to;
    }
    if (!Array.isArray(selectedDates)) return false;
    return selectedDates.length > 0;
  }, [multiple, selectedDates]);

  const formatDateRange = React.useCallback((range: DateRange) => {
    if (!range.from && !range.to) return '';
    if (range.from && range.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return formatDate(range.from ?? range.to);
  }, []);

  const label = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return null;

      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText = hasSelectedDates
        ? formatDateRange(selectedDates)
        : 'Select date range';

      return (
        <span className='flex items-center gap-2'>
          <span>{title}</span>
          {hasSelectedDates && (
            <>
              <Separator
                orientation='vertical'
                className='mx-0.5 data-[orientation=vertical]:h-4'
              />
              <span>{dateText}</span>
            </>
          )}
        </span>
      );
    }

    if (getIsDateRange(selectedDates)) return null;

    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate
      ? formatDate(selectedDates[0])
      : 'Select date';

    return (
      <span className='flex items-center gap-2'>
        <span>{title}</span>
        {hasSelectedDate && (
          <>
            <Separator
              orientation='vertical'
              className='mx-0.5 data-[orientation=vertical]:h-4'
            />
            <span>{dateText}</span>
          </>
        )}
      </span>
    );
  }, [selectedDates, multiple, formatDateRange, title]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='default'
          className={`border-input text-muted-foreground justify-${hasValue ? 'start' : 'between'}`}
        >
          {label}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        {multiple ? (
          <Calendar
            initialFocus
            mode='range'
            selected={
              getIsDateRange(selectedDates)
                ? selectedDates
                : { from: undefined, to: undefined }
            }
            onSelect={onSelect}
          />
        ) : (
          <Calendar
            initialFocus
            mode='single'
            selected={
              !getIsDateRange(selectedDates) ? selectedDates[0] : undefined
            }
            onSelect={onSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
