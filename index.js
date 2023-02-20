import fs from 'node:fs'
import { adiOMatic3000 } from './adi-o-matic-3000.js'

const csv = fs.readFileSync('./mock-data.csv', 'utf-8')

const result = adiOMatic3000(csv);

console.log(result)
