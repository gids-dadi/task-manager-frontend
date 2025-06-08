export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions,
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions,
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions,
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const Capitalize = (text: string) => {
  const trimmed = text.trim();

  // Capitalize the first letter of the string
  let result = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();

  result = result.replace(
    /\((\w)\)/g,
    (_, letter) => `(${letter.toUpperCase()})`,
  );

  return result;
};

export const formatMoney = (amount?: number): string => {
  const value = amount ?? 0; // Ensure amount is never undefined or null

  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `₦${(value / 1000).toFixed(2)}K`;
  } else {
    return `₦${value.toLocaleString()}`;
  }
};
