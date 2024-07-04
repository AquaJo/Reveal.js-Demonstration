const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const { exec } = require('child_process')

const server = http.createServer((req, res) => {
    // Extrahiere den Pfad aus der URL und erstelle den Dateipfad
    const urlParts = req.url.split('?')
    const filePath = path.join(__dirname, urlParts[0])

    // Lies die Datei und sende sie als Antwort
    fs.readFile(filePath, 'binary', (err, data) => {
        if (err) {
            console.error(`Error reading file at ${filePath}: ${err}`)
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end(`Internal Server Error: ${err.message}`)
            return
        }

        // Erfolgreiche Anfrage, sende den Dateiinhalt
        const contentType = mime.lookup(filePath) || 'application/octet-stream'
        console.log(`Serving file ${filePath} with content type ${contentType}`)
        res.writeHead(200, {
            'Content-Type': contentType,
            'Access-Control-Allow-Origin': '*', // Hier kannst du spezifische Origin(s) angeben, wenn benötigt
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
            Expires: 0,
        })
        res.end(data, 'binary')
    })
})

const port = 8723

server.listen(port, () => {
    let url = `http://localhost:${port}/`
    console.log(`Server läuft auf ${url}`)
    openInBrowser()
})
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        openInBrowser()
    }
})
function openInBrowser() {
    let indexUrl = `http://localhost:${port}/dist/index.html`
    exec(`start ${indexUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Fehler beim Öffnen des Browsers: ${error}`)
        }
    })
}
