'use client';

import { LevelFailStat } from '@/types/level';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

type Props = {
  data: LevelFailStat[];
};

export default function FailToPassChart({ data }: Props) {
  return (
    <div className='w-full'>
      <div className='mb-4 flex flex-wrap items-center gap-4 text-sm'>
        <LegendItem color='var(--primary)' label='Average' />
        <LegendItem color='#8884d8' label='First Quartile (Q1)' />
        <LegendItem color='#82ca9d' label='Median (Q2)' />
        <LegendItem color='#FF3300' label='Third Quartile (Q3)' />
      </div>

      <div className=''>
        <ResponsiveContainer width='100%' height='100%' aspect={3.5}>
          <LineChart
            data={data}
            margin={{ top: 8, bottom: 24, left: 12, right: 12 }}
          >
            <CartesianGrid stroke='var(--border)' strokeOpacity={1} />
            <XAxis
              dataKey='level'
              label={{
                value: 'Level',
                position: 'insideBottom',
                offset: -10
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              label={{
                value: 'Play turns',
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
              content={({ payload, label }) => {
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
                    <div className='text-muted-foreground mb-1 space-y-1 text-xs'>
                      <div>
                        Total Fail:{' '}
                        <span className='font-bold text-[var(--primary)]'>
                          {item.totalFail}
                        </span>
                      </div>
                      <div>
                        Total Player:{' '}
                        <span className='font-bold text-[var(--primary)]'>
                          {item.totalPlayer}
                        </span>
                      </div>
                    </div>
                    <div className='mt-2 space-y-1 text-xs'>
                      <div className='flex items-center gap-2'>
                        {dot('var(--primary)')}{' '}
                        <span>
                          Average:{' '}
                          <span className='font-bold text-[var(--primary)]'>
                            {item.average}
                          </span>
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        {dot('#8884d8')}{' '}
                        <span>
                          First Quartile:{' '}
                          <span className='font-bold text-[#8884d8]'>
                            {item.q1}
                          </span>
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        {dot('#82ca9d')}{' '}
                        <span>
                          Median:{' '}
                          <span className='font-bold text-[#82ca9d]'>
                            {item.q2}
                          </span>
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        {dot('#FF3300')}{' '}
                        <span>
                          Third Quartile:{' '}
                          <span className='font-bold text-[#FF3300]'>
                            {item.q3}
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
            <Line
              type='monotone'
              dataKey='average'
              stroke='var(--primary)'
              strokeWidth={2}
              dot
              name='Average'
            />
            <Line
              type='monotone'
              dataKey='q1'
              stroke='#8884d8'
              strokeWidth={2}
              dot
              name='Q1'
            />
            <Line
              type='monotone'
              dataKey='q2'
              stroke='#82ca9d'
              strokeWidth={2}
              dot
              name='Median'
            />
            <Line
              type='monotone'
              dataKey='q3'
              stroke='#FF3300'
              strokeWidth={2}
              dot
              name='Q3'
            />
          </LineChart>
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
