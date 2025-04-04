"use client";
import { AppServer } from "@/app/api/[[...routes]]/route";
import { treaty } from "@elysiajs/eden";

const url = process.env.NEXT_PUBLIC_WIBU_URL;

// class HostState {
//   private static _host: string | undefined;

//   public static set host(value: string | undefined) {
//     HostState._host = value;
//   }

//   public static get host(): string | undefined {
//     return HostState._host;
//   }
// }

if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}

const ApiFetch = treaty<AppServer>(url);

export default ApiFetch;


