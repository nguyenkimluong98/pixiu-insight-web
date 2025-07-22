'use client';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { CheckCircle2, Text, XCircle } from 'lucide-react';
import Image from 'next/image';
import { CellAction } from './cell-action';
import { CATEGORY_OPTIONS } from './options';
import { LevelFailStat } from '@/types/level';

// private int level;
//     private int totalFail;
//     private int totalPlayer;
//     private double average;
//     private int q1;
//     private int q2;
//     private int q3;

export const columns: ColumnDef<LevelFailStat>[] = [
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

// export const columns: ColumnDef<LevelFailStat>[] = [
//   {
//     accessorKey: 'level',
//     header: 'IMAGE',
//     cell: ({ row }) => {
//       return (
//         <div className='relative aspect-square'>
//           <Image
//             src={row.getValue('photo_url')}
//             alt={row.getValue('name')}
//             fill
//             className='rounded-lg'
//           />
//         </div>
//       );
//     }
//   },
//   {
//     id: 'name',
//     accessorKey: 'name',
//     header: ({ column }: { column: Column<Product, unknown> }) => (
//       <DataTableColumnHeader column={column} title='Name' />
//     ),
//     cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
//     meta: {
//       label: 'Name',
//       placeholder: 'Search products...',
//       variant: 'text',
//       icon: Text
//     },
//     enableColumnFilter: true
//   },
//   {
//     id: 'category',
//     accessorKey: 'category',
//     header: ({ column }: { column: Column<Product, unknown> }) => (
//       <DataTableColumnHeader column={column} title='Category' />
//     ),
//     cell: ({ cell }) => {
//       const status = cell.getValue<Product['category']>();
//       const Icon = status === 'active' ? CheckCircle2 : XCircle;

//       return (
//         <Badge variant='outline' className='capitalize'>
//           <Icon />
//           {status}
//         </Badge>
//       );
//     },
//     enableColumnFilter: true,
//     meta: {
//       label: 'categories',
//       variant: 'multiSelect',
//       options: CATEGORY_OPTIONS
//     }
//   },
//   {
//     accessorKey: 'price',
//     header: 'PRICE'
//   },
//   {
//     accessorKey: 'description',
//     header: 'DESCRIPTION'
//   },

//   {
//     id: 'actions',
//     cell: ({ row }) => <CellAction data={row.original} />
//   }
// ];
