import fs from 'node:fs'
import yaml from 'yaml'
import lodash from 'lodash'

const csv = fs.readFileSync('./in.csv', 'utf-8')
const lines = csv.split('\n')
const collected = {}
for (const line of lines) {
  const [name, target] = line.split(',')
  const segments = name.split('-')
  lodash.set(collected, segments.join('.'), target)
}
const out = yaml.stringify(collected)
console.log(out)
