import Reveal from 'vendor/reveal.js/dist/reveal.js'
//import RevealMarkdown from "vendor/reveal.js/plugin/markdown/markdown.js";
//import RevealHighlight from "vendor/reveal.js/plugin/highlight/highlight.js";
import RevealNotes from 'vendor/reveal.js/plugin/notes/notes.js'
import './js/dynamicLoader.js'
import html from './index.html' //
//import "./js/bee.js";
//import "./js/silhouette.js";

import './styles.css'
import './css/leaves.css'
import 'vendor/reveal.js/dist/reset.css' //
import 'vendor/reveal.js/dist/reveal.css'
import 'vendor/reveal.js/dist/theme/black.css'
import 'vendor/reveal.js/plugin/highlight/monokai.css'
import './css/font-ini.css'

// src/index.js

Reveal.initialize({
    hash: true,
    plugins: [/* RevealMarkdown, RevealHighlight, */ RevealNotes],
    width: 2400,
    height: 1400,
})

// Funktion zur Bestimmung des Browser-Prefix
var prefix = (function () {
    var a = window.getComputedStyle(document.documentElement, ''),
        b = (Array.prototype.slice
            .call(a)
            .join('')
            .match(/-(moz|webkit|ms)-/) ||
            ('' === a.OLink && ['', 'o']))[1]
    return (
        'WebKit|Moz|MS|O'.match(new RegExp('(' + b + ')', 'i'))[1],
        '-' + b + '-'
    )
})()

// Event-Listener für Mausbewegung
document.addEventListener('mousemove', function (e) {
    let mouseX = e.pageX + 10
    let mouseY = e.pageY - window.scrollY + 10

    // Transformationsstil für das Ball-Element setzen
    var ballOuter = document.querySelector('.theBall-outer')
    if (ballOuter) {
        ballOuter.style[prefix + 'transform'] =
            'translate(' + mouseX + 'px,' + mouseY + 'px)'
    }

    // Überprüfen, ob der Mauszeiger innerhalb des sichtbaren Bereichs liegt
    var htmlContentWidth = document.documentElement.clientWidth
    var htmlContentHeight = document.documentElement.clientHeight
    var ball = document.getElementById('cursor-ball')

    if (ball) {
        if (
            mouseX < 0 ||
            mouseX > htmlContentWidth ||
            mouseY < 0 ||
            mouseY > htmlContentHeight
        ) {
            // Wenn der Mauszeiger außerhalb des Bereichs liegt, das Ball-Element ausblenden
            ball.style.display = 'none'
        } else {
            // Ansonsten das Ball-Element anzeigen
            ball.style.display = 'block'
        }
    }
})

// Event-Listener für Mausüberfahren
document.addEventListener('mouseover', function (event) {
    var target = event.target
    if (target.matches('p, h1, h2, h3, li, text, .controls-arrow')) {
        var ball = document.querySelector('.theBall')
        if (ball) {
            ball.classList.add('zooming')
        }
    }
})

// Event-Listener für Mausverlassen
document.addEventListener('mouseout', function (event) {
    var target = event.target
    if (target.matches('p, h1, h2, h3, li, text, .controls-arrow')) {
        var ball = document.querySelector('.theBall')
        if (ball) {
            ball.classList.remove('zooming')
        }
    }
})

// Event-Listener für Tastatureingaben
document.addEventListener('keydown', function (event) {
    if (event.key === 's') {
        var cursorBall = document.getElementById('cursor-ball')
        if (cursorBall) {
            cursorBall.style.display = 'none'
        }
        document.body.style.cursor = 'auto'
    }
    if (event.key === 'r') {
        // Ein "resize" Ereignis erstellen und auslösen
        var resizeEvent = new Event('resize')
        window.dispatchEvent(resizeEvent)
        window.resizeBy(1, 1) // Um 1 Pixel vergrößern
        window.resizeBy(-1, -1) // Um 1 Pixel verkleinern
    }
})
