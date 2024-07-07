const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')

const htmlFilePath = './src/index.html'

async function downloadImage(url, imagePath) {
    try {
        const response = await axios({
            method: 'get',
            url: url,
            responseType: 'stream',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            },
        })
        const contentType = response.headers['content-type']
        if (contentType.startsWith('image/')) {
            let ext = '.' + contentType.split('/')[1]
            if (ext === '.svg+xml') {
                // ...
                ext = '.svg'
            }
            const writer = fs.createWriteStream(imagePath + ext)
            response.data.pipe(writer)

            let basename = path.basename(imagePath)
            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(basename + ext))
                writer.on('error', reject)
            })
        } else {
            //throw new Error('URL does not point to an image')
            console.error('URL does not point to an image')
        }
    } catch (error) {
        console.error("image won't download, using hotlink")
    }
}

async function processHTML(
    htmlFilePath,
    downloadFolder,
    relativeDownloadFolderToHtml
) {
    try {
        const html = fs.readFileSync(htmlFilePath, 'utf-8')

        const $ = cheerio.load(html)

        const promises = []
        $('img').each(function (index) {
            let imageUrl = $(this).attr('src')
            if (
                imageUrl.startsWith('http://') ||
                imageUrl.startsWith('https://')
            ) {
                let altText = $(this).attr('alt')
                const imagePath = path.join(
                    downloadFolder,
                    `download_${altText}`
                )
                const promise = downloadImage(imageUrl, imagePath)
                    .then((fn) => {
                        if (!fn) return

                        $(this).attr(
                            'src',
                            `${relativeDownloadFolderToHtml}${fn}`
                        )
                        console.log(
                            'downloaded & referenced image:',
                            imageUrl,
                            'as',
                            fn
                        )
                    })
                    .catch((error) => {
                        console.error(
                            `Fehler beim Herunterladen oder Verarbeiten von Bild ${imageUrl}:`,
                            error
                        )
                    })
                promises.push(promise)
            }
        })

        await Promise.all(promises)

        const modifiedHtml = $.html()
        const outputFilePath = './src/index_.html'
        fs.writeFileSync(outputFilePath, modifiedHtml, 'utf-8')
    } catch (error) {
        console.error('Fehler beim Verarbeiten des HTMLs:', error)
    }
}

const downloadFolder = './src/imgs/downloads/'
const relativeDownloadFolderToHtml = './imgs/downloads/'
if (!fs.existsSync(downloadFolder)) {
    fs.mkdirSync(downloadFolder)
}

// Funktion aufrufen, um das HTML zu verarbeiten
processHTML(htmlFilePath, downloadFolder, relativeDownloadFolderToHtml)
