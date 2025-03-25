import { AppServer } from "@/app/api/[[...routes]]/route";
import { treaty } from "@elysiajs/eden";

const ApiFetch = treaty<AppServer>(process.env.NEXT_PUBLIC_WIBU_URL || "http://localhost:3009");

export default ApiFetch;
