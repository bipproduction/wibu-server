"use client";
import { Apiv2 } from "@/app/apiv2/[[...slug]]/route";
import { treaty } from "@elysiajs/eden";

const url = process.env.NEXT_PUBLIC_WIBU_URL;
if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}
const ApiV2Fetch = treaty<Apiv2>(url);

export default ApiV2Fetch;
