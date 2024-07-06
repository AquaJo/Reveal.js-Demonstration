const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const { exec } = require('child_process')

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'dist', 'index.html')

    if (req.url !== '/') {
        const urlParts = req.url.split('?')
        filePath = path.join(__dirname, 'dist', urlParts[0])
    }

    // Check if the path is a directory
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(`Error reading file at ${filePath}: ${err}`)
            res.writeHead(500, { 'Content-Type': 'text/plain' })
            res.end(`Internal Server Error: ${err.message}`)
            return
        }

        if (stats.isDirectory()) {
            // If it's a directory, look for an index.html file inside it
            filePath = path.join(filePath, 'index.html')
        }

        // Read the file and send it as response
        fs.readFile(filePath, 'binary', (err, data) => {
            if (err) {
                console.error(`Error reading file at ${filePath}: ${err}`)
                res.writeHead(500, { 'Content-Type': 'text/plain' })
                res.end(`Internal Server Error: ${err.message}`)
                return
            }

            // Successful request, send the file content
            const contentType =
                mime.lookup(filePath) || 'application/octet-stream'
            console.log(
                `Serving file ${filePath} with content type ${contentType}`
            )
            res.writeHead(200, {
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*', // Specify specific origins if needed
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                Expires: 0,
            })
            res.end(data, 'binary')
        })
    })
})

const port = 8723

server.listen(port, () => {
    let url = `http://localhost:${port}/`
    console.log(`Server running at ${url}`)
    openInBrowser(url)
})

server.on('error', (error) => {
    let url = `http://localhost:${port}/`
    if (error.code === 'EADDRINUSE') {
        openInBrowser(url)
    }
})

function openInBrowser(url) {
    exec(`start ${url}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error opening browser: ${error}`)
        }
    })
}
