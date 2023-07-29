export function secondsToHms(d) {
  d = Number(d);
  const hours = Math.floor(d / 3600);
  const minutes = Math.floor((d % 3600) / 60);
  const seconds = Math.floor(d % 60);

  const hDisplay =
    hours > 0 ? hours + (hours === 1 ? " hour, " : " hours, ") : "";
  const mDisplay =
    minutes > 0 ? minutes + (minutes === 1 ? " minute, " : " minutes, ") : "";
  const sDisplay =
    seconds > 0 ? seconds + (seconds === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

export function secondsToHmsShort(d) {
  d = Number(d);
  const hours = Math.floor(d / 3600);
  const minutes = Math.floor((d % 3600) / 60);
  const seconds = Math.floor(d % 60);

  const hDisplay = hours > 0 ? hours + "h " : "";
  const mDisplay = minutes > 0 ? minutes + "m " : "";
  const sDisplay = seconds > 0 ? seconds + "s" : "";
  return hDisplay + mDisplay + sDisplay;
}
