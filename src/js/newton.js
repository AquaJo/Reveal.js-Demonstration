import '../css/newton.css'
import Q5 from 'vendor/q5/q5.wrapper.js'
import p5jsSvg from '../imgs/p5.svg'
import VisibilityWatcher from './classes/visibilityWatcher.js'
let section = document.getElementById('introNewton')
let p = new Q5() //initialize q5

let present = false
new VisibilityWatcher().observe(section, (visibility) => {
    if (visibility === 'visible') {
        present = true
    } else {
        present = false
    }
})

let tangentElm = document.getElementById('tangent-element')

let edgeDivs = [
    document.getElementById('introTop'),
    document.getElementById('introBottom'),
    document.getElementById('introLeft'),
    document.getElementById('introRight'),
]
let zoom

let polynomial
let polynomialPoints = []
let tangentLines = []
let Axes
let tangentFrom
let tangentTo
let tangentStep
let tangentStepMultiplier = 1
let p5Svg
let speakerView = checkIfParamExists('speakerView')
p.preload = function () {
    // Passe den Pfad zur SVG-Datei entsprechend an
    //p5Svg = p.loadImage('../src/imgs/p5.svg')
}
let canvas
p.setup = function () {
    p.createCanvas(2400, 1400)
    // grad the canvas by tag name wich has no id --> find right
    let indexNeeded = 0
    let canvases = document.getElementsByTagName('canvas')
    console.log(canvases)
    Array.from(canvases).forEach((elm, index) => {
        if (elm.id == '') {
            indexNeeded = index
        }
    })

    canvas = document.getElementsByTagName('canvas')[indexNeeded]
    //canvas = document.getElementsByTagName('canvas')[0]
    canvas.id = 'q5jsCanvas' + canvases.length
    canvas.style.position = 'absolute'
    canvas.style.left = 0
    canvas.style.top = 0
    section.insertBefore(canvas, section.firstChild)

    if (checkIfParamExists('speakerView')) {
        console.log('IK BIN EEN SPEAKERVIEW - notes dingens')
        // get image from relative: ../imgs/p5.svg and place it on the bottom left corner of the canvas element WITHOUT p5.js image() call
        const ctx = canvas.getContext('2d')

        const img = new Image()
        img.src = p5jsSvg // dynamically load the image

        img.onload = function () {
            // Position the image at the bottom-left corner of the canvas
            const x = 0
            const y = canvas.height - img.height
            ctx.drawImage(img, x, y)
        }
    }

    zoom = p.width / 1200

    Axes = [zoom * 30, zoom * 50]
    polynomial = function (x) {
        function mainFunction(x) {
            return Math.pow(x, 5) + 2 * Math.pow(x, 4) + x
        }
        function newMainFunction(x) {
            return 90 * zoom * mainFunction(x / (90 * zoom) - 1.98)
        }
        return newMainFunction(x)
    }

    polynomialPoints = captureFunction(polynomial, [0, zoom * 250], Axes)

    tangentFrom = 0
    tangentTo = 250 * zoom
    tangentStep = 1
    tangentStepMultiplier = 1 / tangentStep // SHITTY FOR MOST DECIMAL NUMS!
    let tangent = function (u, x) {
        let m = slope(polynomial, u, 3)
        return { y: m * (x - u) + polynomial(u), m: m }
    }
    tangentLines = captureFunctionLines(
        tangent,
        [tangentFrom, tangentTo, tangentStep],
        [-Axes[0], 1200 * zoom],
        Axes
    )
}
function slope(f, x, dx) {
    dx = dx || 0.0000001
    return (f(x + dx) - f(x)) / dx
}

let tangentX = 0
let TangentDirectionRight = 1
let directionCount = 0
let clearMode
p.draw = function () {
    if (!speakerView && present) {
        // IF SPEAKER VIEW OPENED, BODY GETS A NEW CLASS! :) Stuff else gets too slow!

        // TANGENT MOVEMENT / MODE STUFF
        if (directionCount % 3 !== 0) {
            p.clear()
            clearMode = 1
            edgeDivs.forEach((div) => {
                div.style.display = 'block'
            })
        } else {
            if (clearMode === 1) p.clear()
            clearMode = 0
            edgeDivs.forEach((div) => {
                div.style.display = 'none'
            })
        }
        if (TangentDirectionRight) {
            tangentX += tangentStep
            if (tangentX >= tangentTo) {
                TangentDirectionRight = 0
                directionCount++
            }
        } else {
            tangentX -= tangentStep
            if (tangentX <= tangentFrom) {
                TangentDirectionRight = 1
                directionCount++
            }
        }

        // MAIN FUNCTION DRAWING (after capture in setup)
        p.stroke('white')
        p.strokeWeight(3)

        drawAxes(Axes, zoom * 263, zoom * 200)
        if (!clearMode) {
            p.strokeWeight(1)
            p.stroke('#BFBFBF')
        }
        let index = tangentStepMultiplier * tangentX
        let tangentObj = tangentLines[index]
        p.line(
            tangentObj.p1[0],
            tangentObj.p1[1],
            tangentObj.p2[0],
            tangentObj.p2[1]
        )

        let tangetCutX = Axes[0] + tangentX
        tangentElm.style.left = tangetCutX + 'px'
        tangentElm.style.bottom = Axes[1] + tangentObj.fu + 'px'
        tangentElm.style.transform =
            'rotate(' + -Math.atan(tangentObj.m) + 'rad) translateX(-50%)'

        p.stroke('white')
        p.strokeWeight(3)
        drawFunction(polynomialPoints, [0, zoom * 250], Axes)

        /*


  let tangetCutX = Axes[0] + tangentX;
  tangentElm.style.left = tangetCutX + "px";
  tangentElm.style.bottom = Axes[1] + tangent(u) + "px";

  //alert(tangentElmHeight);
  tangentElm.style.transform =
    "rotate(" + -Math.atan(tangentSlope) + "rad) translateX(-50%)";

  /*let tangentCutY = Axes[1] + tangent(0);
  tangentElm.style.bottom = tangentCutY + "px";*/
    }
}

function drawAxes(Axes, widthAxe, heightAxe) {
    let yStart = p.height - Axes[1]
    let xStart = Axes[0]
    p.line(xStart, yStart - heightAxe, xStart, yStart + heightAxe) // y-axis
    p.line(xStart - widthAxe, yStart, xStart + widthAxe, yStart) // x-axis
}
function drawFunctionLine(funcTerm, interval, Axes) {
    yStart = p.height - Axes[1]
    xStart = Axes[0]
    p.line(
        xStart + interval[0],
        yStart - funcTerm(interval[0]),
        xStart + interval[1],
        yStart - funcTerm(interval[1])
    )
}

function captureFunctionLines(funcTerm, uInterval, tangentInterval, Axes) {
    let yStart = p.height - Axes[1]
    let xStart = Axes[0]
    let points = []
    for (let i = uInterval[0]; i < uInterval[1] + 1; i += uInterval[2]) {
        let u = i
        let x1 = xStart + tangentInterval[0]
        let y1 = yStart - funcTerm(u, tangentInterval[0]).y
        let x2 = xStart + tangentInterval[1]
        let y2 = yStart - funcTerm(u, tangentInterval[1]).y
        let fuObj = funcTerm(u, u)
        points.push({ m: fuObj.m, fu: fuObj.y, p1: [x1, y1], p2: [x2, y2] })
    }
    return points
}

function drawFunction(funcTerm, interval, Axes) {
    if (typeof funcTerm === 'function') {
        let yStart = p.height - Axes[1]
        let xStart = Axes[0]

        for (let i = interval[0]; i < interval[1]; i += 0.25) {
            let x = i
            let y = funcTerm(x)
            p.point(xStart + x, yStart - y)
        }
    } else {
        for (let i = 0; i < funcTerm.length; i++) {
            let x = funcTerm[i][0]
            let y = funcTerm[i][1]
            p.point(x, y)
        }
    }
}

function captureFunction(funcTerm, interval, Axes) {
    let yStart = p.height - Axes[1]
    let xStart = Axes[0]
    let points = []
    for (let i = interval[0]; i < interval[1]; i += 0.25) {
        let x = i
        let y = funcTerm(x)
        points.push([xStart + x, yStart - y])
    }
    return points
}

function checkIfParamExists(paramName) {
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.has(paramName)
}
