import Game from "./modules/Game.js"

document.addEventListener('DOMContentLoaded', () => {

    /** @type {HTMLCanvasElement} */ 
    const canvas = document.getElementById('canvas')
    let run_btn = document.getElementById('run')
    canvas.width = 600
    canvas.height = 600

    let game = new Game(canvas)
    game.update()

    run_btn.addEventListener('click', () => {
        if (run_btn.innerText === 'Run') {
            run_btn.innerText = 'Stop'
            game.running = !game.running


        } else {
            run_btn.innerText = 'Run'
            game.running = !game.running
        }
    })
})