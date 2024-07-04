import '../css/silhouette.css'

// first update

document.addEventListener('mousemove', update)

function update(e) {
    let $icon = document.getElementsByClassName('silhouette')[0]

    let x = (e.clientX / window.innerWidth) * 10 + 100
    let y = (e.clientY / window.innerHeight) * 10 + 100

    $icon.style.backgroundPosition = `${x}% ${y}%`
}

export default (args) => {
    update(args)
}
