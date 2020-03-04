// 生成图片
const canvas = document.createElement('canvas')
canvas.width = 250
canvas.height = 250
const ctx = canvas.getContext('2d')
ctx.rotate(-45 * Math.PI / 180)
ctx.fillStyle = 'rgba(232, 232, 232, 0.5)'
ctx.textAlign = 'center'
ctx.font = '18px sans-serif'
ctx.fillText('03/04/2020', 0, 160)
ctx.fillText('WEB前端-刘建华-1339', 0, 188)
const imageSrc = canvas.toDataURL('image/png', 1)

//插入DOM
let watermarkElement = null
const createWatermark = () => {
  const watermark = document.createElement('div')
  const watermarkStyle = watermark.style
  watermarkStyle.width = '100vw'
  watermarkStyle.height = '100vh'
  watermarkStyle.background = `url(${imageSrc}) repeat 0 0/240px`
  watermarkStyle.pointerEvents = 'none'
  watermarkStyle.zIndex = '99999'
  watermarkStyle.position = 'relative'
  document.body.appendChild(watermark)
  watermarkElement = watermark
}
createWatermark()

// 监听DOM变化
const observer = new MutationObserver(list => {
  if (document.body.contains(watermarkElement)) {
    for (const item of list) {
      if (item.target === watermarkElement) {
        watermarkElement.parentElement.removeChild(watermarkElement)
        createWatermark()
        break
      }
    }
  } else {
    createWatermark()
  }
})
const config = { attributes: true, childList: true, subtree: true }
observer.observe(document.body, config)
