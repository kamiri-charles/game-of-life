import Game from "./modules/Game.js"

document.addEventListener('DOMContentLoaded', () => {

    /** @type {HTMLCanvasElement} */ 
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    let run_btn = document.getElementById('run')
    canvas.width = 600
    canvas.height = 600

    let game = new Game(canvas)
    game.update(ctx)

    run_btn.addEventListener('click', () => {
        let game_interval;
        if (run_btn.innerText === 'Run') {
            run_btn.innerText = 'Stop'
            game_interval = setInterval(() => {
                game.run()
            }, 300)

        } else {
            run_btn.innerText = 'Run'
            clearInterval(game_interval)
        }
    })
})