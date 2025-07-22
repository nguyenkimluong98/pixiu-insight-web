// app/level-analytics/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@radix-ui/react-dropdown-menu';
import LevelFilterCard from '@/features/analystics/level/components/level-filter-card';

export default function LevelAnalyticsLayout({
  fail_to_pass,
  fail_to_drop
}: {
  fail_to_pass: React.ReactNode;
  fail_to_drop: React.ReactNode;
}) {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <Heading
          title='Level Analystics'
          description='Analyst game play data of user, including game stats chart by level.'
        />
        <Separator />
        <LevelFilterCard key='LevelFilterCard' />
        <Tabs defaultValue='fail-to-pass' className='w-full'>
          <TabsList>
            <TabsTrigger value='fail-to-pass'>Fail to Pass</TabsTrigger>
            <TabsTrigger value='fail-to-drop'>Fail Users</TabsTrigger>
            <TabsTrigger value='play-counts'>Play Counts</TabsTrigger>
          </TabsList>

          <TabsContent value='fail-to-pass'>{fail_to_pass}</TabsContent>

          <TabsContent value='fail-to-drop'>{fail_to_drop}</TabsContent>

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
