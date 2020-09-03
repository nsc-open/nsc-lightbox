export const getWindowSize = () => {
  const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth

  const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight

  return { width, height }
}


export const colorArrayToObject = (arr) => {
  return { r: arr[0], g: arr[1], b: arr[2], a: arr[3] / 255 }
}

export const colorObjectToArray = (obj) => {
  return [obj.r, obj.g, obj.b, obj.a * 255]
}

export const geoTypes = [
  { id: 'point', name: '点' },
  { id: 'line', name: '线' },
  { id: 'area', name: '面' },
]