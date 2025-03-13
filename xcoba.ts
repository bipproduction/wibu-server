import fs from 'fs/promises'

const data = await fs.readFile("xx.txt")
const match = data.toString().match("\[[^{]*({.*})\]")
const newData = match ? match[1] : "[]"

await fs.writeFile("new_xx.txt", newData)
