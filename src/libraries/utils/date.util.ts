import {
  convert,
  DateTimeFormatter,
  LocalDate,
  LocalDateTime,
  nativeJs,
} from "@js-joda/core";

export class DateUtil {
  private static DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
  private static DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern(
    "yyyy-MM-dd HH:mm:ss"
  );

  static toString(localDate: LocalDate | LocalDateTime): string {
    if (!localDate) return "";

    if (localDate instanceof LocalDate) {
      return localDate.format(DateUtil.DATE_FORMATTER);
    }
    return localDate.format(DateUtil.DATE_TIME_FORMATTER);
  }

  static toDate(localDate: LocalDate | LocalDateTime): Date {
    if (!localDate) return null;
    return convert(localDate).toDate();
  }

  static toLocalDate(date: Date): LocalDate {
    if (!date) return null;
    return LocalDate.from(nativeJs(date));
  }

  static toLocalDateTime(date: Date): LocalDateTime {
    if (!date) return null;
    return LocalDateTime.from(nativeJs(date));
  }

  static toLocalDateByStringDate(stringDate: string): LocalDate {
    if (!stringDate) return null;
    return LocalDate.parse(stringDate, DateUtil.DATE_FORMATTER);
  }

  static toLocalDateTimeByStringDate(stringDate: string): LocalDateTime {
    if (!stringDate) return null;
    return LocalDateTime.parse(stringDate, DateUtil.DATE_TIME_FORMATTER);
  }
}