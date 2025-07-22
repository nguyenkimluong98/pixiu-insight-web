'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CardLoader from '@/components/ui/card-loader';
import { useFailToPassStats } from '@/features/analystics/level/api';
import FailStatLineChart from '@/features/analystics/level/components/fail-stats-line-chart';
import { FailStatsTable } from '@/features/analystics/level/components/fail-stats-tables';
import { columns } from '@/features/analystics/level/components/fail-stats-tables/columns';
import SliderInputRange from '@/features/analystics/level/components/slider-input-range';
import {
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

const sortSchema = z.array(
  z.object({
    id: z.string(),
    desc: z.boolean()
  })
);

export default function FailToPassChart() {
  const { filterVersion, activeTab, isFilterReady, ...filters } =
    useLevelFilterStore();
  const [selectedLevel, setSelectedLevel] = useState<number[]>(filters.level);
  const { data, loading, error, execute } = useFailToPassStats();

  useEffect(() => {
    if (!isFilterReady || activeTab !== Tabs.FAIL_TO_PASS) return;

    execute(filters, filters.level);
  }, [filterVersion, isFilterReady, activeTab]);

  useEffect(() => {
    setSelectedLevel(filters.level);
  }, [filters.level]);

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

  const filteredData = useFilteredStats(data?.data || [], query);

  if (error && !axios.isCancel(error)) {
    throw error;
  }

  if (!isFilterReady) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5'>
          <div className='col-span-3'>AVG Fail to Pass current level</div>
          <div className='col-span-2 flex flex-col space-y-2'>
            <div className='flex items-center justify-center space-x-2'>
              <label className='text-sm font-medium'>Level</label>
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
        {loading ? (
          <CardLoader />
        ) : (
          <div>
            <FailStatLineChart data={data?.data} />
            <FailStatsTable
              data={filteredData || []}
              columns={columns}
              totalItems={filteredData.length || 0}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
