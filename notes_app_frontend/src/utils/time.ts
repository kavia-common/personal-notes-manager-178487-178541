const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });

/**
 * PUBLIC_INTERFACE
 * relativeTimeFromEpoch - generate short relative time string (e.g., "2h ago").
 */
export function relativeTimeFromEpoch(epochMs: number): string {
  const diff = epochMs - Date.now();
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hour = Math.round(min / 60);
  const day = Math.round(hour / 24);

  if (Math.abs(day) >= 1) return rtf.format(day, 'day');
  if (Math.abs(hour) >= 1) return rtf.format(hour, 'hour');
  if (Math.abs(min) >= 1) return rtf.format(min, 'minute');
  return rtf.format(sec, 'second');
}
