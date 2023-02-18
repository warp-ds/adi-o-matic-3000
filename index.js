import fs from 'node:fs'
import yaml from 'yaml'

const csv = fs.readFileSync('./in.csv', 'utf-8')
const lines = csv.split('\n')
const collected = {}

for (const line of lines) {
  const [name, value] = line.split(',')
  const segments = name.split('-')

  segments.reduce((acc, currentValue, index) => {
    const lastItem = index + 1 === segments.length;

    // set value as string or object containg the value and previous values depending on last item type
    if(lastItem) {
      if(typeof acc[currentValue] === 'object') {
        return acc[currentValue] = { ...acc[currentValue], "_": value }
      }

      return acc[currentValue] = value
    }

    // rewrite currentValue as an object if its a string
    if(typeof acc[currentValue] === 'string') {
      return acc[currentValue] = { "_": acc[currentValue] }
    }

    return acc[currentValue] = acc[currentValue] || {};
  }, collected);
}

const out = yaml.stringify(collected)
console.log(out)
