import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const base_url_server =
  process.env.NODE_ENV === "production"
    ? "https://aiassignment.onrender.com/api"
    : `http://localhost:8000/api`;
