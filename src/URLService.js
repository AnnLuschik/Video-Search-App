export const isValidUrl = (str) => {
  try {
    return Boolean(new URL(str));
  } catch {
    return false;
  }
};

export const getVideoIdFromYoutubeUrl = (str) => {
  const regex = /(?:youtube\.com|youtu\.).*(?:v=|v\/|v%3D|vi(?:=|\/)|watch\?|embed\/|\/)([^&?%#\/\n]+)/gi;
  return regex.exec(str)[1];
};

export const getVideoStartFromYoutubeUrl = (str) => {
  const regex = /(?:\?t=|#t=|\/t=)(\d+)/gi;
  return regex.exec(str)?.[1] || false;
};
