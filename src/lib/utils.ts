import { type ClassValue, clsx } from "clsx";
import { format, isSameDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataURLtoFile(dataURL: string, fileName: string) {
  const cleanedDataURL = dataURL.replace(/\s/g, "");

  const arr = cleanedDataURL.split(",");
  const mime = arr?.[0].match(/:(.*?);/)?.[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}

export function normalizeNickName(nickname: string) {
  return nickname.replace(/^@?/, "@");
}

export function normalizeReserveDatesString(startDate?: Date, endDate?: Date) {
  if (startDate instanceof Date || endDate instanceof Date) {
    const dateString = `${
      startDate
        ? format(startDate, "eee d 'de' MMM", {
            locale: ptBR,
          })
        : ""
    } - ${
      endDate
        ? format(endDate, "eee d 'de' MMM", {
            locale: ptBR,
          })
        : ""
    }`;
    return dateString;
  }

  return "";
}

export function normalizeDateWithYear(date: Date) {
  if (date instanceof Date) {
    const dateString = format(date, "eee d 'de' MMM 'de' yyyy", {
      locale: ptBR,
    });
    return dateString;
  }

  return "";
}

export function calculeTotalPrice(
  price: number,
  travelers: number,
  additionalPerPerson: number,
  maxCapacity?: number
) {
  if (maxCapacity && travelers > maxCapacity) {
    const aditional = additionalPerPerson * maxCapacity;

    return price + aditional;
  }
  if (travelers === 1) return price;
  const aditional = additionalPerPerson * travelers;

  return price + aditional;
}

export function calculeTotalPriceByDay(
  price: number,
  startDate?: Date,
  endDate?: Date
) {
  const currentDate = new Date();

  if (!startDate || !endDate) return price;

  if (
    isSameDay(currentDate, endDate) ||
    !endDate ||
    isSameDay(startDate, endDate)
  )
    return price;

  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  const startDateTimestamp = startDate.getTime();
  const endDateTimestamp = endDate.getTime();

  const diff = Math.ceil((endDateTimestamp - startDateTimestamp) / MS_PER_DAY);

  const total = diff * price;

  return total;
}

export function calculateNumberOfNights(
  entryDate: Date,
  exitDate: Date
): number {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const entryDateTimestamp = entryDate.getTime();
  const exitDateTimestamp = exitDate.getTime();

  const isEntryDateToday = isSameDay(exitDate, new Date());

  if (isEntryDateToday) {
    return 1;
  }

  const differenceInMilliseconds = exitDateTimestamp - entryDateTimestamp;

  const numberOfNights = Math.ceil(differenceInMilliseconds / MS_PER_DAY);

  return numberOfNights;
}

export function formatedPrice(
  price: number,
  travelers: number,
  additionalPerPerson: number,
  maxCapacity?: number
) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(
    calculeTotalPrice(price, travelers, additionalPerPerson, maxCapacity)
  );
}

export function pluralize(
  word: string,
  count: number,
  pluralSuffix: string = "s"
): string {
  return count === 1 ? word : word + pluralSuffix;
}
