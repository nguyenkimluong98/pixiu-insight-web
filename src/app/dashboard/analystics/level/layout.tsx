// app/level-analytics/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';
import LevelFilterCard from '@/features/analystics/level/components/level-filter-card';
import {
  useLevelFilterStore,
  Tabs as TabOptions
} from '@/features/analystics/level/store/level-filter-store';

export default function LevelAnalyticsLayout({
  fail_to_pass,
  fail_to_stop,
  drop_rate,
  player_count,
  play_times_count,
  avg_playtime
}: {
  fail_to_pass: React.ReactNode;
  fail_to_stop: React.ReactNode;
  drop_rate: React.ReactNode;
  player_count: React.ReactNode;
  play_times_count: React.ReactNode;
  avg_playtime: React.ReactNode;
}) {
  const { activeTab, setFilters } = useLevelFilterStore();
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Level Analystics'
          description='Analyst game play data of user, including game stats chart by level.'
        />
        <Separator />
        <LevelFilterCard key='LevelFilterCard' />
        <Tabs
          defaultValue={TabOptions.FAIL_TO_PASS}
          value={activeTab}
          onValueChange={(value) => setFilters({ activeTab: value })}
          className='w-full'
        >
          <TabsList>
            <TabsTrigger value={TabOptions.FAIL_TO_PASS}>
              Fail to Pass
            </TabsTrigger>
            <TabsTrigger value={TabOptions.FAIL_TO_STOP}>
              Fail to Stop
            </TabsTrigger>
            <TabsTrigger value={TabOptions.DROP_RATE}>Drop Rate</TabsTrigger>
            <TabsTrigger value={TabOptions.PLAYER_COUNT}>
              Player Count
            </TabsTrigger>
            <TabsTrigger value={TabOptions.PLAYTIME_AVG}>
              Playtime Average
            </TabsTrigger>
            <TabsTrigger value={TabOptions.PLAY_TIMES_COUNT}>
              Play Times Count
            </TabsTrigger>
          </TabsList>

          <TabsContent value={TabOptions.FAIL_TO_PASS}>
            {fail_to_pass}
          </TabsContent>

          <TabsContent value={TabOptions.FAIL_TO_STOP}>
            {fail_to_stop}
          </TabsContent>

          <TabsContent value={TabOptions.DROP_RATE}>{drop_rate}</TabsContent>

          <TabsContent value={TabOptions.PLAYER_COUNT}>
            {player_count}
          </TabsContent>

          <TabsContent value={TabOptions.PLAYTIME_AVG}>
            {avg_playtime}
          </TabsContent>

          <TabsContent value={TabOptions.PLAY_TIMES_COUNT}>
            {play_times_count}
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
