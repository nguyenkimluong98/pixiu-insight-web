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
  fail_to_stop
}: {
  fail_to_pass: React.ReactNode;
  fail_to_stop: React.ReactNode;
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
            <TabsTrigger value='play-counts'>Play Counts</TabsTrigger>
          </TabsList>

          <TabsContent value={TabOptions.FAIL_TO_PASS}>
            {fail_to_pass}
          </TabsContent>

          <TabsContent value={TabOptions.FAIL_TO_STOP}>
            {fail_to_stop}
          </TabsContent>

          <TabsContent value='play-counts'>
            <Card>
              <CardHeader>
                <CardTitle>Play Counts by State</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Chart for play counts by state here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
