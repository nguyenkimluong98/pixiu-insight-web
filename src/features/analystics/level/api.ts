import useAxios from '@/config/axios.config';
import { LevelFilterState } from './store/level-filter-store';
import { formatTimestampToDateString } from '@/lib/format';

const LEVEL_BASE_PATH = '/level';

export const useMetadata = (appBundleId: string) => {
  const [{ data, loading, error }, executeGet] = useAxios(
    {
      url: LEVEL_BASE_PATH + '/metadata',
      method: 'GET',
      params: {
        appBundleId
      }
    },
    { manual: false }
  );

  const execute = async () => {
    return executeGet();
  };

  return { data, loading, error, execute };
};

export const useFailToPassStats = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );

  const execute = async (data: Partial<LevelFilterState>, level: number[]) => {
    const eventDayFrom = formatTimestampToDateString(data?.eventDay?.[0] || 0);
    const eventDayTo = formatTimestampToDateString(data?.eventDay?.[1] || 0);

    return executeGet({
      url: LEVEL_BASE_PATH + '/failToPass',
      method: 'POST',
      data: {
        platforms: [data.platform],
        versions: data.versions,
        modes: data.modes,
        countries: data.countries,
        level: {
          min: level[0],
          max: level[1]
        },
        eventDay: {
          min: eventDayFrom,
          max: eventDayTo
        },
        retentionDay: {
          min: data.retentionDay?.[0] || 0,
          max: data.retentionDay?.[1] || 1
        }
      }
    });
  };

  return { data, loading, error, response, execute };
};

export const useFailToStopStats = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );

  const execute = async (data: Partial<LevelFilterState>, level: number[]) => {
    const eventDayFrom = formatTimestampToDateString(data?.eventDay?.[0] || 0);
    const eventDayTo = formatTimestampToDateString(data?.eventDay?.[1] || 0);

    return executeGet({
      url: LEVEL_BASE_PATH + '/failToStop',
      method: 'POST',
      data: {
        platforms: [data.platform],
        versions: data.versions,
        modes: data.modes,
        countries: data.countries,
        level: {
          min: level[0],
          max: level[1]
        },
        eventDay: {
          min: eventDayFrom,
          max: eventDayTo
        },
        retentionDay: {
          min: data.retentionDay?.[0] || 0,
          max: data.retentionDay?.[1] || 1
        }
      }
    });
  };

  return { data, loading, error, response, execute };
};

export const useDropRateStats = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );

  const execute = async (data: Partial<LevelFilterState>, level: number[]) => {
    const eventDayFrom = formatTimestampToDateString(data?.eventDay?.[0] || 0);
    const eventDayTo = formatTimestampToDateString(data?.eventDay?.[1] || 0);

    return executeGet({
      url: LEVEL_BASE_PATH + '/dropRate',
      method: 'POST',
      data: {
        platforms: [data.platform],
        versions: data.versions,
        modes: data.modes,
        countries: data.countries,
        level: {
          min: level[0],
          max: level[1]
        },
        eventDay: {
          min: eventDayFrom,
          max: eventDayTo
        },
        retentionDay: {
          min: data.retentionDay?.[0] || 0,
          max: data.retentionDay?.[1] || 1
        }
      }
    });
  };

  return { data, loading, error, response, execute };
};

export const usePlayerCount = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );

  const execute = async (data: Partial<LevelFilterState>, level: number[]) => {
    const eventDayFrom = formatTimestampToDateString(data?.eventDay?.[0] || 0);
    const eventDayTo = formatTimestampToDateString(data?.eventDay?.[1] || 0);

    return executeGet({
      url: LEVEL_BASE_PATH + '/levelTotalPlayer',
      method: 'POST',
      data: {
        platforms: [data.platform],
        versions: data.versions,
        modes: data.modes,
        countries: data.countries,
        level: {
          min: level[0],
          max: level[1]
        },
        eventDay: {
          min: eventDayFrom,
          max: eventDayTo
        },
        retentionDay: {
          min: data.retentionDay?.[0] || 0,
          max: data.retentionDay?.[1] || 1
        }
      }
    });
  };

  return { data, loading, error, response, execute };
};

export const usePlayTimesCount = () => {
  const [{ data, loading, error, response }, executeGet] = useAxios(
    {},
    {
      manual: true
    }
  );

  const execute = async (data: Partial<LevelFilterState>, level: number[]) => {
    const eventDayFrom = formatTimestampToDateString(data?.eventDay?.[0] || 0);
    const eventDayTo = formatTimestampToDateString(data?.eventDay?.[1] || 0);

    return executeGet({
      url: LEVEL_BASE_PATH + '/levelPlayTimesCount',
      method: 'POST',
      data: {
        platforms: [data.platform],
        versions: data.versions,
        modes: data.modes,
        countries: data.countries,
        level: {
          min: level[0],
          max: level[1]
        },
        eventDay: {
          min: eventDayFrom,
          max: eventDayTo
        },
        retentionDay: {
          min: data.retentionDay?.[0] || 0,
          max: data.retentionDay?.[1] || 1
        }
      }
    });
  };

  return { data, loading, error, response, execute };
};
