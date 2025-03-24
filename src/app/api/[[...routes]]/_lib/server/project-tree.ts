import {exec} from 'child_process'
import {promisify} from 'util'

const X = promisify(exec)

async function projectTree() {
  const {stdout} = await X('tree /var/www/projects -L 3 -I node_modules')
  return stdout.split('\n');
}

export default projectTree;
