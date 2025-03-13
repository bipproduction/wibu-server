import {$} from 'bun'

const a = await $`echo "apa kabar"`
console.log(a.text())