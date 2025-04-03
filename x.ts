
import { exec } from "child_process";
import { promisify } from "util";
const EX = promisify(exec);

const FIREBASE_DB_URL = process.env.FIREBASE_DB_URL;

if(!FIREBASE_DB_URL) {
  throw new Error("FIREBASE_DB_URL is not defined");
}

await EX(
    `curl -X PUT -d "{/"-0A/": /"[START] ${new Date().toISOString()} : start deploy .../"}" ${FIREBASE_DB_URL}/logs/build/wibu-server-production/log.json`
  );

// console.log(FIREBASE_DB_URL)

// const apa = await fetch(`${FIREBASE_DB_URL}/logs/build/wibu-server-production/log.json`, {
//     method: "GET"
// })

// const data = await apa.json()
// for (const key in data) {
//     console.log(stripAnsi(data[key]))
// }

// console.log(stripAnsi(" \u001B[31m\u001B[1m^\u001B[22m\u001B[39m\u001B[0m\n\u001B[0m \u001B[90m 15 |\u001B[39m"))


