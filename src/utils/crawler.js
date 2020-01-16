// https://wallpaperaccess.com/rilakkuma
// https://wallpaperaccess.com/rilakkuma-cafe
// https://wallpaperaccess.com/kawaii-rilakkuma
// https://wallpaperaccess.com/korilakkuma

function crawler () {
  let temp = Array.from(document.querySelectorAll('.thumb'))
  let length = temp.length
  let res = []
  for (let i = 0; i < length; i++) {
    res.push({
      url: temp[i].currentSrc,
      'width': temp[i].naturalWidth,
      'height': temp[i].naturalHeight
    })
  }
  return res
}

crawler()
