export const formatMovement = function (date) {
  const unixToMillisecond = date * 1000;
  const dateMS = new Date();
  const unixMStoMinutes = unixToMillisecond / 1000 / 60;
  const dateMStoMinutes = dateMS / 1000 / 60;

  const postDate = Math.round(dateMStoMinutes - unixMStoMinutes);
  if (postDate < 60) {
    if (postDate < 1) {
      return `1m`;
    }
    return `${postDate}m`;
  }
  if (postDate >= 60 && postDate < 1440) {
    const postDateHours = Math.round(postDate / 60);
    return `${postDateHours}h`;
  }
  if (postDate >= 1440 && postDate < 525600) {
    const postDateDays = Math.round(postDate / 60 / 24);
    return `${postDateDays}d`;
  }
  if (postDate >= 525600) {
    const postDateYears = Math.round(postDate / 60 / 24 / 365);
    return `${postDateYears}y`;
  }
};
