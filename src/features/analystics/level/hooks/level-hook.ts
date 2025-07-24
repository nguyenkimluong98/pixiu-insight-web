import { useMemo } from 'react';

export type SortParam = {
  id: string;
  desc: boolean;
};

export type Params = {
  level?: number; // filter
  page: number;
  perPage: number;
  sort: SortParam[] | null;
};

export function useFilteredStats<T extends { level: number }>(
  data: T[],
  query: Params
) {
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    let result = [...data];

    // Filter by level
    if (query.level !== undefined) {
      result = result.filter((item) => item.level == query.level);
    }

    // Sort
    if (query.sort && query.sort.length > 0) {
      result.sort((a, b) => {
        for (const sort of query.sort!) {
          const valA = a.level;
          const valB = b.level;

          if (valA < valB) return sort.desc ? 1 : -1;
          if (valA > valB) return sort.desc ? -1 : 1;
        }
        return 0;
      });
    }

    // Pagination
    const startIndex = (query.page - 1) * query.perPage;
    const endIndex = startIndex + query.perPage;

    return result.slice(startIndex, endIndex);
  }, [data, query]);

  return filteredData;
}

export function clampLevelRange(
  levelRange: number[],
  minLevel = 1,
  maxLevel = 200
): [number, number] {
  const [min, max] = levelRange;
  return [Math.max(minLevel, min), Math.min(maxLevel, max)];
}
