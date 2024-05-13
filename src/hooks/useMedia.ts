export const useMedia = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  if (!stream) throw new Error("No stream");
  return stream;
};
