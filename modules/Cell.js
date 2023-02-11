export default class Cell {

    constructor(canvas, x, y) {
        this.x = x
        this.y = y
        this.size = 20
        this.is_active = false
        this.border_color = 'black'
        this.cell_color = 'transparent'

        this.adjacent_cells = [
            {x: this.x - this.size, y: this.y - this.size},
            {x: this.x, y: this.y - this.size},
            {x: this.x + this.size, y: this.y - this.size},
            {x: this.x - this.size, y: this.y},
            {x: this.x + this.size, y: this.y},
            {x: this.x - this.size, y: this.y + this.size},
            {x: this.x, y: this.y + this.size},
            {x: this.x + this.size, y: this.y + this.size}
        ]

        this.adjacent_cells = this.adjacent_cells.filter(cell => cell.x >= 0 && cell.x < canvas.width && cell.y >= 0 && cell.y < canvas.height)
    }
    
    
    draw(context) {
        context.beginPath()
        
        this.is_active ? this.cell_color = 'white' : this.cell_color = 'transparent'
        
        // Cell border
        context.strokeStyle = this.border_color
        context.strokeRect(this.x, this.y, this.size, this.size)
        
        // Cell color
        context.fillStyle = this.cell_color
        context.fillRect(this.x, this.y, this.size, this.size)
        
        
        context.closePath()
    }

    is_clicked(mx, my) {
        return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size
    }

    toggle() {
        this.is_active = !this.is_active
    }
}