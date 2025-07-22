import { format } from 'date-fns';

export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts
    }).format(new Date(date));
  } catch (_err) {
    return '';
  }
}

/**
 * Converts a timestamp (from Date.getTime()) into a formatted date string.
 *
 * @param timestamp - The timestamp in milliseconds (e.g. from Date.now() or date.getTime()).
 * @param outputFormat - Optional. The desired output format (default is 'yyyyMMdd').
 *                       Uses `date-fns` formatting tokens.
 * @returns A string representing the formatted date.
 *
 * @example
 * formatTimestampToDateString(1721481600000);
 * // => '2025-07-20'
 *
 * @example
 * formatTimestampToDateString(1721481600000, 'dd/MM/yyyy');
 * // => '20/07/2025'
 */
export function formatTimestampToDateString(
  timestamp: number,
  outputFormat: string = 'yyyyMMdd'
): string {
  return format(new Date(timestamp), outputFormat);
}
