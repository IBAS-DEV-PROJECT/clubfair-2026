export interface FormatPostgresDateTimeOptions {
  locale?: string;
  timeZone?: string;
  includeSeconds?: boolean;
}

const POSTGRES_TZ_SUFFIX = /(Z|[+-]\d{2}(?::?\d{2})?)$/;
const POSTGRES_SHORT_OFFSET_SUFFIX = /([+-]\d{2})$/;
const POSTGRES_COMPACT_OFFSET_SUFFIX = /([+-]\d{2})(\d{2})$/;

function normalizePostgresDateTime(input: string): string {
  // Postgres 응답은 "2026-02-13 13:15:00+00"처럼 공백이 들어올 수 있음
  // JS Date 파싱 안정성을 위해 ISO 형태로 정규화함
  let normalized = input.trim().replace(' ', 'T');

  // "+0900" -> "+09:00"
  if (POSTGRES_COMPACT_OFFSET_SUFFIX.test(normalized)) {
    normalized = normalized.replace(POSTGRES_COMPACT_OFFSET_SUFFIX, '$1:$2');
  }

  // "+00" -> "+00:00"
  if (POSTGRES_SHORT_OFFSET_SUFFIX.test(normalized)) {
    normalized = normalized.replace(POSTGRES_SHORT_OFFSET_SUFFIX, '$1:00');
  }

  // timestamptz는 보통 Z / +09:00 같은 오프셋이 포함됨
  // timestamp(타임존 없음)는 오프셋이 없으므로 UTC 기준으로 해석하도록 Z를 붙임
  if (POSTGRES_TZ_SUFFIX.test(normalized)) {
    return normalized;
  }

  return `${normalized}Z`;
}

export function formatPostgresDateTime(
  value: string | Date | number,
  options: FormatPostgresDateTimeOptions = {},
): string {
  const { locale = 'ko-KR', timeZone = 'Asia/Seoul', includeSeconds = false } = options;

  const date =
    typeof value === 'string' ? new Date(normalizePostgresDateTime(value)) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const formatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: includeSeconds ? '2-digit' : undefined,
    hour12: false,
    hourCycle: 'h23',
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? '';

  const yy = getPart('year');
  const mm = getPart('month');
  const dd = getPart('day');
  const hh = getPart('hour');
  const min = getPart('minute');
  const sec = getPart('second');

  if (includeSeconds) {
    return `${yy}/${mm}/${dd} ${hh}:${min}:${sec}`;
  }

  return `${yy}/${mm}/${dd} ${hh}:${min}`;
}

export function toDateTimeLocalValue(isoString: string): string {
  return isoString.slice(0, 16);
}
