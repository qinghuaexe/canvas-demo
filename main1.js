var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
//设置画板尺寸//
autosetCanvasSize(yyy)

//监听鼠标事件//
listenToMouse(yyy)
//控制橡皮开关//
var eraserEnable = false
eraser.onclick = function () {
    eraserEnable = true
    actions.className = 'actionsx'
}
brush.onclick = function(){
    eraserEnable = false
    actions.className = 'actions'
}
//画圆//
function drawCircle(x,y,radius){
    context.beginPath();
    context.fillStyle = 'black'
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill()
}
//划线//
function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.fillStyle = 'black'
    context.moveTo(x1,y1)
    context.lineWidth = 3
    context.lineTo(x2,y2)
    context.stroke()
}

//控制尺寸//
function autosetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}
//监听鼠标//
function listenToMouse(canvas) {
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (eraserEnable) {
            using = true
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            using = true
            lastPoint = { x: x, y: y }
        }
    }
    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX
        var y = aaa.clientY

        if (eraserEnable) {
            if (using) {
                context.clearRect(x - 5, y - 5, 10, 10)
            }
        } else {
            if (using) {
                var newPoint = { x: x, y: y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
    }
    canvas.onmouseup = function (aaa) {
        using = false
    }
}