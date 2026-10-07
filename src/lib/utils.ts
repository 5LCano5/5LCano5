import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function formatToman(amount: number): string {
  const grouped = Math.round(amount).toLocaleString("en-US");
  return `${toFaDigits(grouped)} تومان`;
}

export const SERVER_IP = "play.lunar.ir";
export const DISCORD_URL = "https://discord.gg/lunar";
