'use client'
import { AppServer } from "@/app/api/[[...routes]]/route";
import { treaty } from "@elysiajs/eden";

const getBaseUrl = () => {
  // Jika di client-side (browser)
  if (typeof window !== "undefined") {
    return window.location.origin; // e.g., http://localhost:3000 atau https://yourdomain.com
  }
  
  // Jika di server-side, fallback ke env atau default
  const envUrl = process.env.NEXT_PUBLIC_WIBU_URL;
  if (!envUrl) {
    // Default untuk lokal jika env tidak ada
    return "http://localhost:3000"; // Sesuaikan port jika berbeda
  }
  return envUrl;
};

const ApiFetch = treaty<AppServer>(getBaseUrl());

export default ApiFetch;
