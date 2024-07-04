// build.js
const { execSync } = require('child_process')

const args = process.argv.slice(2)
const isLocal = args.includes('--dl')
const isProduction = args.includes('--prod')

let command = ''
if (isLocal && isProduction) {
    command =
        'node fetch-script.js && cross-env localMode=true productionMode=true webpack'
} else if (isProduction) {
    command = 'cross-env productionMode=true webpack'
} else if (isLocal) {
    command = 'node fetch-script.js && cross-env localMode=true webpack'
} else {
    command = 'webpack'
}

console.log(`Running command: ${command}`)
execSync(command, { stdio: 'inherit' })
