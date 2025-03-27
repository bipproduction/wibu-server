import { parse } from 'yaml'
import fs from 'fs/promises'

const text = await fs.readFile('hipmi-staging.wibu.yml', 'utf-8')
const data  = parse(text)
console.log(data)


// tgl 14 / 18 meeting di vietnam
// uie taxi listrik jakarta
// dashboard komuditas nasional
// 