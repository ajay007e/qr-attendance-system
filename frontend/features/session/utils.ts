export function createDateTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toISOString();
}

export function formatTimeInput(date: Date) {
  return date.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function roundToPrevious30Minutes(date: Date) {
  const rounded = new Date(date);

  rounded.setSeconds(0);
  rounded.setMilliseconds(0);

  const minutes = rounded.getMinutes();

  rounded.setMinutes(minutes < 30 ? 0 : 30);

  return rounded;
}
