import { exec } from "child_process";
import {promisify} from 'util'

const X = promisify(exec)

async function processList() {
  const {stdout} = await X("pm2 jlist");
  const data  = stdout.toString()
  return data;
}

export default processList;
