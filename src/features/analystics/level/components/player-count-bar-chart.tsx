'use client';

import { LevelFailStat } from '@/types/level';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

type Props = {
  data: LevelFailStat[];
};

export default function PlayerCountBarChart({ data }: Props) {
  return (
    <div className='w-full'>
      <div className='mb-4 flex flex-wrap items-center justify-center gap-4 text-sm'>
        <LegendItem color='var(--primary)' label='Total Player' />
      </div>

      <div className=''>
        <ResponsiveContainer width='100%' height='100%' aspect={3.5}>
          <BarChart
            data={data}
            margin={{ top: 8, bottom: 24, left: 12, right: 12 }}
          >
            <CartesianGrid stroke='var(--border)' strokeOpacity={1} />
            <XAxis
              dataKey='level'
              label={{
                value: 'Level',
                position: 'insideBottom',
                offset: -20
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{
                value: 'Total Player',
                angle: -90,
                position: 'insideLeft',
                offset: -5
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals
            />
            <Tooltip
              content={({ payload }) => {
                if (!payload || payload.length === 0) return null;
                const item = payload[0].payload;
                const dot = (color: string) => (
                  <span
                    className='inline-block h-2.5 w-2.5 rounded-full'
                    style={{ backgroundColor: color }}
                  />
                );

                return (
                  <div className='border-border bg-popover rounded-md border p-3 shadow-md'>
                    <div className='mb-2 text-sm font-semibold'>
                      Level {item.level}
                    </div>

                    <div className='mt-2 space-y-1 text-xs'>
                      <div className='flex items-center gap-2'>
                        {dot('var(--primary)')}{' '}
                        <span>
                          Total Player:{' '}
                          <span className='font-bold text-[var(--primary)]'>
                            {item.totalPlayer}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }}
              cursor={{
                stroke: 'var(--primary)',
                strokeOpacity: 0.2,
                strokeWidth: 2
              }}
            />
            <Bar
              type='monotone'
              dataKey='totalPlayer'
              fill='var(--primary)'
              name='Total Player'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// 👇 Component for custom legend item
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className='flex items-center gap-2'>
      <span
        className='inline-block h-3 w-3 rounded-full'
        style={{ backgroundColor: color }}
      />
      <span className='text-muted-foreground text-sm'>{label}</span>
    </div>
  );
}
