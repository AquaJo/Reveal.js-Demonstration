// urlChangeHandler.js

export default class URLChangeHandler {
    constructor(callback) {
        this.callback = callback
        this.handleUrlChange = this.handleUrlChange.bind(this)

        // Listen for popstate event (for back/forward navigation)
        window.addEventListener('popstate', this.handleUrlChange)

        // Save the original pushState and replaceState methods
        this.originalPushState = history.pushState
        this.originalReplaceState = history.replaceState

        // Override pushState
        history.pushState = (...args) => {
            this.originalPushState.apply(history, args)
            this.handleUrlChange()
        }

        // Override replaceState
        history.replaceState = (...args) => {
            this.originalReplaceState.apply(history, args)
            this.handleUrlChange()
        }

        // Detect URL changes through MutationObserver
        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'href'
                ) {
                    this.handleUrlChange()
                }
            })
        })

        // Observe changes to the href attribute of the base element
        const baseElement = document.querySelector('base')
        if (baseElement) {
            this.observer.observe(baseElement, { attributes: true })
        }

        // Initial URL handling
        this.handleUrlChange()
    }

    handleUrlChange() {
        const currentUrl = window.location.href
        // Call the callback function with the current URL
        this.callback(currentUrl)
    }

    disconnect() {
        // Remove event listeners and observers
        window.removeEventListener('popstate', this.handleUrlChange)
        this.observer.disconnect()
    }
}
