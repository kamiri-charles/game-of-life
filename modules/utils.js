export const get_active_adjacent_cells = (cell) => {
    return cell.adjacent_cells.filter(adj_cell => adj_cell.is_active).length
}