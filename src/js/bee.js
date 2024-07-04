import ClassWatcher from './classes/classWatcher.js'
import Q5 from 'vendor/q5/q5.wrapper.js' // fast, tiny p5js alternative (wrapped it, so ya can import)
import p5jsSvg from '../imgs/p5.svg'
new Q5('global') //initialize q5

// for webpack
window.setup = setup
window.draw = draw
// now some chaotic q5.js fun as of now ^^

let canvas
//q5.disableFriendlyErrors = true;
// doing stuff regarding intro and outro pages
let p5Svg
function preload() {
    p5Svg = loadImage('./imgs/p5.svg') // () --> q5 ...
}

let bee = document.getElementById('bee')
let screenHeight = window.innerHeight
let screenWidth = window.innerWidth

let movingElement = bee
const pathElement = document.getElementById('path')

function setup() {
    createCanvas(2400, 1400)
    // grad the canvas by tag name wich has no id --> find right
    let indexNeeded = 0
    let canvases = document.getElementsByTagName('canvas')

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
    generatePathStuff()

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

    //
    if (sectionOutro.classList.contains('present')) {
        // if outro is already present
        toPresentOutro()
    }
}
function generatePathStuff() {
    const lines = [
        {
            x: 70,
            y: 380,
        },
        {
            x: 0,
            y: 390,
        },
        {
            x: 220,
            y: 670,
        },
        {
            x: 10,
            y: 900,
        },
        {
            x: 700,
            y: 1200,
        },
        {
            x: 900,
            y: 1000,
        },
    ]
    let lastPoints = [
        {
            x: 2250,
            y: 1150,
        },
        {
            x: 2380,
            y: 1350,
        },
    ]

    //choose 5 random points that are minimum 50 pixels apart between eachother and inside x > 950 and x < 2200 and y > 1000 and y < 1370
    const minX = 950,
        maxX = 2200,
        minY = 1000,
        maxY = 1370,
        minDistance = 120,
        minDiffX = 50,
        minDiffY = 100
    const points = generateRandomPoints(
        5,
        minX,
        maxX,
        minY,
        maxY,
        minDistance,
        minDiffX,
        minDiffY
        /* NOT WORKING minDiffX,
    minDiffY*/
    ) // "possible" loop hole ;]
    lines.push(...points, ...lastPoints)
    console.log(points)

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    function getRandomPoint(minX, maxX, minY, maxY) {
        const x = Math.random() * (maxX - minX) + minX
        const y = Math.random() * (maxY - minY) + minY
        return { x, y }
    }

    function distance(point1, point2) {
        const dx = point1.x - point2.x
        const dy = point1.y - point2.y
        return Math.sqrt(dx * dx + dy * dy)
    }

    function isFarEnough(point, points, minDistance, minDiffX, minDiffY) {
        for (let i = 0; i < points.length; i++) {
            if (distance(point, points[i]) < minDistance) {
                return false
            }
        }
        if (points.length > 0) {
            if (
                Math.abs(point.x - points[points.length - 1].x) < minDiffX ||
                Math.abs(point.y - points[points.length - 1].y) < minDiffY
            ) {
                return false
            }
        }

        return true
    }

    function generateRandomPoints(
        numPoints,
        minX,
        maxX,
        minY,
        maxY,
        minDistance,
        minDiffX,
        minDiffY
    ) {
        const points = []
        while (points.length < numPoints) {
            const point = getRandomPoint(minX, maxX, minY, maxY)
            if (isFarEnough(point, points, minDistance, minDiffX, minDiffY)) {
                points.push(point)
                //alert("point added");
            }
        }
        return points
    }

    let pathData = `M${lines[0].x},${lines[0].y}`

    for (let i = 1; i < lines.length - 2; i++) {
        const xc = (lines[i].x + lines[i + 1].x) / 2
        const yc = (lines[i].y + lines[i + 1].y) / 2
        pathData += ` Q${lines[i].x},${lines[i].y} ${xc},${yc}`
    }

    pathData += ` Q${lines[lines.length - 2].x},${lines[lines.length - 2].y} ${
        lines[lines.length - 1].x
    },${lines[lines.length - 1].y}`

    // Set the SVG path data
    pathElement.setAttribute('d', pathData)
    length = pathElement.getTotalLength()
}
let length

let t = 0

let beeLineIterationLength = 2
let beeLineCounter = 0
let modCounter = 0
let opacity = 1
async function updateBeePosition() {
    if (movingElement.id == 'beeOutro') {
        stroke(146, 177, 189, 255 * opacity)
    } else {
        stroke(109, 78, 66, 255 * opacity)
    }

    beeLineCounter++
    if (t > 0.99) {
        opacity = 1
        t = 0
        clear()
        generatePathStuff()
    }
    const point = pathElement.getPointAtLength(t * length)
    const nextPoint = pathElement.getPointAtLength((t + 0.001) * length)

    // Set the position of the bee
    movingElement.style.left = point.x - 35 + 'px'
    movingElement.style.top = point.y - 115.641 / 2 + 'px'

    // Calculate the angle between the current point and the next point
    if (modCounter % 2) {
        line(point.x, point.y, nextPoint.x, nextPoint.y)
    }
    const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x)
    const angleDegrees = angle * (180 / Math.PI) + 180

    // Rotate the bee
    movingElement.style.transform = `rotate(${angleDegrees}deg)`

    if (t > 0.97) {
        // fade out the bee
        opacity = 1 - (t - 0.97) * 30
    }
    movingElement.style.opacity = opacity
    t += 0.0008
    if (beeLineCounter == beeLineIterationLength) {
        modCounter++
        beeLineCounter = 0
    }
}
// func to check if param is in url --> used to check wheter or not its a speaker-view iframe (also locally)
function checkIfParamExists(paramName) {
    let urlParams = new URLSearchParams(window.location.search)
    return urlParams.has(paramName)
}
// log all url params (speakerview)
function logAllParams() {
    let urlParams = new URLSearchParams(window.location.search)
    console.log('Alle URL-Parameter:')
    for (const [key, value] of urlParams.entries()) {
        console.log(`${key}: ${value}`)
    }
}

let speakerView = checkIfParamExists('speakerView')
async function draw() {
    if (!speakerView) {
        updateBeePosition()
        await wait(16)
    }
}

const wait = (msec) =>
    new Promise((resolve) => {
        setTimeout(resolve, msec)
    })

let section = document.getElementById('intro')
let leaves = document.getElementById('leaves')

let sectionStateWatcher = new ClassWatcher(
    section,
    'present',
    toPresent,
    toPast
)
let myp5
let leaveInterval
function toPresent() {
    movingElement = document.getElementById('bee')
    clearInterval(leaveInterval)
    // ease in opacity of leaves
    let opacity = 0
    leaveInterval = setInterval(() => {
        leaves.style.opacity = opacity
        opacity += 0.004
        if (opacity >= 1) {
            clearInterval(leaveInterval)
        }
    }, 10)
}
function toPast() {
    clearInterval(leaveInterval)
    // ease out opacity of leaves
    let opacity = 1
    leaveInterval = setInterval(() => {
        leaves.style.opacity = opacity
        opacity -= 0.01
        if (opacity <= 0) {
            clearInterval(leaveInterval)
        }
    }, 10)
}

let section2 = document.getElementById('plenum1')
let sectionStateWatcher2 = new ClassWatcher(
    section2,
    'present',
    toPresent,
    toPast
)

let sectionOutro = document.getElementById('outro')
// check if outro is already present

let sectionStateWatcherOutro = new ClassWatcher(
    sectionOutro,
    'present',
    toPresentOutro,
    toPastOutro
)
//let p5jsCanvas = document.getElementById("p5jsCanvas"); // needed to be change due to q5.js not creating a main element with this id --> now canvas is the used elm

function toPresentOutro() {
    toPresent()
    movingElement = document.getElementById('beeOutro')
    sectionOutro.insertBefore(canvas, sectionOutro.firstChild)
    clear()
    t = 0
}

function toPastOutro() {
    toPast()
    movingElement = document.getElementById('bee')
    section.insertBefore(canvas, section.firstChild)
}
