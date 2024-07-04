import '../css/silhouette.css'

document.addEventListener('mousemove', (e) => {
    let $icon = document.getElementsByClassName('silhouette')[0]

    let x = (e.clientX / window.innerWidth) * 10 + 100
    let y = (e.clientY / window.innerHeight) * 10 + 100

    $icon.style.backgroundPosition = `${x}% ${y}%`
})
