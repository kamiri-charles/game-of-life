import Cell from './Cell.js'
import { get_active_adjacent_cells } from './utils.js'

export default class Game {
    constructor(canvas) {
        this.cells = []
        this.set_for_toggle = []
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d');
        this.game_speed = 200
        this.running = false
        
        this.init()
    }
    
    init() {
        // Initialize cells
        for (let x = 0; x < this.canvas.width; x += 20) {
            for (let y = 0; y < this.canvas.height; y += 20) {
                this.cells.push(new Cell(this.canvas, x, y))
            } 
        }
        
        // Replace adjacent cells with actual cell objects
        this.cells.forEach(cell => {
            cell.adjacent_cells = cell.adjacent_cells.map(adj_cell => {
                return this.cells.find(cell => cell.x === adj_cell.x && cell.y === adj_cell.y)
            })
        })
        
        // Add event listeners
        this.canvas.addEventListener('click', e => {
            let mouse_x = e.clientX - this.canvas.offsetLeft
            let mouse_y = e.clientY - this.canvas.offsetTop
            
            this.cells.forEach(cell => {
                if (cell.is_clicked(mouse_x, mouse_y)) {
                    cell.toggle()
                }
            })
        })   
        
    }
    
    update(timestamp) {
        
        this.ctx.fillStyle = '#727070'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.cells.forEach(cell => cell.draw(this.ctx))
        
        if (this.running) this.run()
        
        
        
        
        this.prev_time_stamp = timestamp

        setTimeout(() => {
            requestAnimationFrame((timestamp) => this.update(timestamp))
        }, this.game_speed)

        //requestAnimationFrame((timestamp) => this.update(timestamp))
    }
    
    run() {
        // If all cells are inactive, alert user
        if (this.cells.every(cell => !cell.is_active)) {
            this.running = false
        }
        
        else {
            // Get all active cells
            let active_cells = this.cells.filter(cell => cell.is_active)
            let inactive_cells = this.cells.filter(cell => !cell.is_active)
            
            
            
            active_cells.forEach(cell => {
                // Rule #1 - Any live cell with fewer than two live neighbors dies, as if by underpopulation.
                if (get_active_adjacent_cells(cell) < 2) {
                    
                    inactive_cells.forEach(cell => {
                        if (get_active_adjacent_cells(cell) === 3) {
                            this.set_for_toggle.push(cell)
                        }
                    })
                    this.set_for_toggle.push(cell)
                }
                
                // Rule #2 - Any live cell with two or three live neighbors lives on to the next generation.
                else if (get_active_adjacent_cells(cell) === 2 || get_active_adjacent_cells(cell) === 3) {
                    inactive_cells.forEach(cell => {
                        if (get_active_adjacent_cells(cell) === 3) {
                            this.set_for_toggle.push(cell)
                        }
                    })
                }
                
                // Rule #3 - Any live cell with more than three live neighbors dies, as if by overpopulation.
                else if (get_active_adjacent_cells(cell) > 3) {
                    inactive_cells.forEach(cell => {
                        if (get_active_adjacent_cells(cell) === 3) {
                            this.set_for_toggle.push(cell)
                        }
                    })
                    this.set_for_toggle.push(cell)
                }
            })
            
            this.set_for_toggle = this.set_for_toggle.filter((cell, idx) => {
                return this.set_for_toggle.findIndex(c => c.x === cell.x && c.y === cell.y) === idx;
            })
            this.set_for_toggle.forEach(cell => cell.toggle())
            this.set_for_toggle = []
        }
    }
}