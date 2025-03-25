import createClient from "openapi-fetch";
import type { paths } from "./src/lib/ApiSchema"; // generated by openapi-typescript

const client = createClient<paths>({ baseUrl: "https://myapi.dev/v1/" });

const {
  data, // only present if 2XX response
  error, // only present if 4XX or 5XX response
} = await client.GET("/api/server/table-wibudev");


