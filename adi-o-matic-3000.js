import yaml from 'yaml'
const collected = {}

function adiOMatic3000(csv) {

  const lines = csv.split('\n')
  for (const line of lines) {
    const [name, value] = line.split(',')
    const segments = name.split(/[-|.]+/)

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

  return yaml.stringify(collected)
}

export { adiOMatic3000 }
