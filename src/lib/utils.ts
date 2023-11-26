import { type ClassValue, clsx } from "clsx";
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
