function fix_dpi(canvas) {
    let dpi = window.devicePixelRatio;
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

function height(percentage, canvas = gameBoard){
    let heightOfScreen = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2)
    let output = heightOfScreen*(percentage/50)
    return output
}

function width(percentage, canvas = gameBoard){
    let widthOfScreen = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)
    let output = widthOfScreen*(percentage/50)
    return output
}

let background = document.querySelector('#background')
let ctx = background.getContext("2d")
fix_dpi(background)


ctx.beginPath()
ctx.moveTo(width(8.2, background),height(22.5, background))
ctx.lineTo(width(18.8, background),height(40.5, background))

ctx.moveTo(width(18.8, background),height(22.5, background))
ctx.lineTo(width(8.2, background),height(40.5, background))
ctx.strokeStyle = 'rgb(209,136,113)'
ctx.lineWidth = 30
ctx.stroke()

ctx.beginPath()
ctx.strokeStyle = 'rgb(163,190,140)'
ctx.lineWidth = 37
ctx.arc(width(86.5,background), height(31.5, background), 165, 165, Math.PI * 2, true)
ctx.stroke()

let gameBoard = document.querySelector('#gameBoard')
let c = gameBoard.getContext("2d")
fix_dpi(gameBoard)



function drawGrid(w,x,y,z){
    c.strokeStyle = 'rgb(76,86,106)'
    c.lineWidth = 16
    c.beginPath()
    c.moveTo(width(w),height(x))
    c.lineTo(width(y),height(z))
    c.stroke()
}

drawGrid(100/3, 0, 100/3, 100)
drawGrid(200/3, 0, 200/3, 100)
drawGrid(0, 100/3, 100, 100/3)
drawGrid(0, 200/3, 100, 200/3)