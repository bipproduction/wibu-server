import { AppServer } from "@/app/api/[[...routes]]/route";
import { treaty } from "@elysiajs/eden";

const url = process.env.NEXT_PUBLIC_WIBU_URL

if (!url) {
  throw new Error("NEXT_PUBLIC_WIBU_URL is not defined");
}
const ApiFetch = treaty<AppServer>(url);

export default ApiFetch;
