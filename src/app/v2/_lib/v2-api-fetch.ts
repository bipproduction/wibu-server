"use client";
import { treaty } from "@elysiajs/eden";
import { V2Api } from "../api/[[...slug]]/route";

const url = process.env.NEXT_PUBLIC_WIBU_URL;
if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}
const V2ApiFetch = treaty<V2Api>(url);

export default V2ApiFetch;
