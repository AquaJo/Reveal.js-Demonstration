export default class VisibilityWatcher {
    constructor() {
        this.observer = null
    }
    observe(element, callback) {
        let counter = 0
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.05, // Trigger when 5% of the target is visible
        }

        const observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    if (counter === 0) {
                        callback('visible', true)
                    } else {
                        callback('visible', false)
                    }
                } else {
                    if (counter === 0) {
                        callback('hidden', true)
                    } else {
                        callback('hidden', false)
                    }
                }
                counter++
            })
        }
        // Initialize IntersectionObserver with the callback and options
        this.observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        )

        this.observer.observe(element)

        /* // Check if element is initially visible
        if (element && this.observer) {
            const initialVisibility = this.observer
                .takeRecords()
                .some((entry) => entry.isIntersecting)
            if (initialVisibility) {
                callback('visible', true)
            } else {
                callback('hidden', true)
            }
        } */
    }
    disconnect() {
        this.observer.disconnect()
    }
}
