//import URLChangeHandler from './classes/urlChangeHandler.js'
import VisibilityWatcher from './classes/visibilityWatcher.js'

let dependencies = [
    { ids: ['intro', 'outro'], scripts: ['./bee.js'] },
    {
        ids: ['lokaleEbeneFirst'],
        scripts: ['./silhouette.js'],
        get args() {
            return { clientX, clientY }
        },
    },
]

let clientX = null
let clientY = null
document.addEventListener('mousemove', (event) => {
    clientX = event.clientX
    clientY = event.clientY
})

let watchers = []
dependencies.forEach((dependency) => {
    dependency.ids.forEach((id) => {
        watchers.push(
            new VisibilityWatcher().observe(document.getElementById(id), () => {
                dependency.scripts.forEach((script) => {
                    import(`${script}`).then((module) => {
                        if (dependency.args) {
                            module.default(dependency.args)
                        }
                    })
                })
            })
        )
    })
})

/* // Function to handle URL changes to dynamically load stuff
function activeUrl(currentUrl) {
    // NEEDS FIX BC FAST TRANSITION WONT TRIGGER SEPERATE URL CHANGE! --> USE OBSERVER --> e.g. https://stackoverflow.com/questions/123999/how-can-i-tell-if-a-dom-element-is-visible-in-the-current-viewport
    if (
        currentUrl.includes('#/1') ||
        currentUrl.includes('#/intro') ||
        currentUrl.includes('#/outro') ||
        currentUrl.includes('#/sources')
    ) {
        import('./bee.js')
    } else if (
        currentUrl.includes('#/Bodendegradation') ||
        currentUrl.includes('#/6') ||
        currentUrl.includes('#/8')
    ) {
        import('./silhouette.js')
    }
} */
