import { exec } from "child_process";
import {promisify} from 'util'

const X = promisify(exec)

async function processList() {
  const {stdout} = await X("pm2 jlist");
  const data  = stdout.toString()
  const match = data.match("\[[^{]*({.*})\]")
  const newData = match ? match[1] : "[]"
  return {
    data: newData
  };
}

export default processList;
