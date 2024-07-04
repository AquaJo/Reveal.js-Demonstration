import URLChangeHandler from './classes/urlChangeHandler.js'

// Function to handle URL changes to dynamically load stuff
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
}

const urlChangeHandler = new URLChangeHandler(activeUrl)
