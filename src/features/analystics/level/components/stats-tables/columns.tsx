'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import {
  DropRate,
  LevelFailStat,
  PlayerCount,
  PlaytimeAvg,
  PlayTimesCount
} from '@/types/level';

export const failStatsColumns: ColumnDef<LevelFailStat>[] = [
  {
    id: 'level',
    accessorKey: 'level',
    header: ({ column }: { column: Column<LevelFailStat, unknown> }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<LevelFailStat['level']>()}</div>,
    meta: {
      label: 'Level',
      placeholder: 'Search level...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'totalFail',
    header: 'Total Fail',
    meta: {
      label: 'Total Fail'
    }
  },
  {
    accessorKey: 'totalPlayer',
    header: 'Total Player',
    meta: {
      label: 'Total Player'
    }
  },
  {
    accessorKey: 'average',
    header: 'Average',
    meta: {
      label: 'Average'
    }
  },
  {
    accessorKey: 'q1',
    header: 'First Quartile (Q1)',
    meta: {
      label: 'First Quartile (Q1)'
    }
  },
  {
    accessorKey: 'q2',
    header: 'Median (Q2)',
    meta: {
      label: 'Median (Q2)'
    }
  },
  {
    accessorKey: 'q3',
    header: 'Third Quartile (Q3)',
    meta: {
      label: 'Third Quartile (Q3'
    }
  }
];

export const dropRateColumns: ColumnDef<DropRate>[] = [
  {
    id: 'level',
    accessorKey: 'level',
    header: ({ column }: { column: Column<DropRate, unknown> }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<DropRate['level']>()}</div>,
    meta: {
      label: 'Level',
      placeholder: 'Search level...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'totalDrop',
    header: 'Total Drop',
    meta: {
      label: 'Total Drop'
    }
  },
  {
    accessorKey: 'totalPass',
    header: 'Total Pass',
    meta: {
      label: 'Total Pass'
    }
  },
  {
    accessorKey: 'totalPassPrevious',
    header: 'Total Pass Previous',
    meta: {
      label: 'Total Pass Previous'
    }
  },
  {
    accessorKey: 'ratio',
    header: 'Ratio (%)',
    meta: {
      label: 'Ratio (%)'
    }
  }
];

export const playerCountColumns: ColumnDef<PlayerCount>[] = [
  {
    id: 'level',
    accessorKey: 'level',
    header: ({ column }: { column: Column<PlayerCount, unknown> }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<PlayerCount['level']>()}</div>,
    meta: {
      label: 'Level',
      placeholder: 'Search level...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'totalPlayer',
    header: 'Total Player',
    meta: {
      label: 'Total Player'
    }
  }
];

export const playtimeAvgColumns: ColumnDef<PlaytimeAvg>[] = [
  {
    id: 'level',
    accessorKey: 'level',
    header: ({ column }: { column: Column<PlaytimeAvg, unknown> }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<PlaytimeAvg['level']>()}</div>,
    meta: {
      label: 'Level',
      placeholder: 'Search level...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'avgPassTime',
    header: 'AVG Pass Time(s)',
    meta: {
      label: 'AVG Pass Time(s)'
    }
  },
  {
    accessorKey: 'avgFailTime',
    header: 'AVG Fail Time(s)',
    meta: {
      label: 'AVG Fail Time(s)'
    }
  }
];

export const playTimesCountColumns: ColumnDef<PlayTimesCount>[] = [
  {
    id: 'level',
    accessorKey: 'level',
    header: ({ column }: { column: Column<PlayTimesCount, unknown> }) => (
      <DataTableColumnHeader column={column} title='Level' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<PlayTimesCount['level']>()}</div>,
    meta: {
      label: 'Level',
      placeholder: 'Search level...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'totalPass',
    header: 'Total Pass',
    meta: {
      label: 'Total Pass'
    }
  },
  {
    accessorKey: 'totalFail',
    header: 'Total Fail',
    meta: {
      label: 'Total Fail'
    }
  }
];
