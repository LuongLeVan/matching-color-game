function shuffle(arr){
  return arr.sort(() => Math.random() - 0.5)
}

export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor

  const colorsList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome'] 

  for (let i = 0; i < count; i++) {
      const color = window.randomColor({
        luminosity: 'dark',
        hue: hueList[i % hueList.length]
     });

     colorsList.push(color)
    }
    const colorFullList = [...colorsList, ...colorsList]

    //shuffle colorList 
    shuffle(colorFullList)
    return colorFullList
}
