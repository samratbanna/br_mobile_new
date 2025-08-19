import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getYouTubeThumbnail = (url: string) => {
  const videoId = extractYouTubeVideoID(url);
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  }
  return null;
};

export const extractYouTubeVideoID = (url: string) => {
  // const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|.*[?&]v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex);
  return match ? match[1] : null;
};