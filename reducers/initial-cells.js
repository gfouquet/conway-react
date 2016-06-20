import {
    DEFINE_GRID,
    CHANGE_CELL_INIT_STATE
} from '../actions'

export default function initialCells(state = [], action) {
    switch (action.type) {
        case DEFINE_GRID:
            return resizeCells(state, action.width)
        case CHANGE_CELL_INIT_STATE:
            return changeInitialState(state, action)
        default:
            return state
    }
}

function changeInitialState(cells, {rdx, cdx, alive}) {
    const rowMapper = (row, dx) => (dx === rdx) ? row.map(cellMapper) : row
    const cellMapper = (cell, dx) => (dx === cdx) ? alive : cell
    return cells.map(rowMapper)
}

export function resizeCells(cells, width) {
    const newCells = []

    for (let i = 0; i < width; i++) {
        const newRow = new Array(width).fill(false)
        newCells.push(newRow)

        if (i >= cells.length) continue

        for (let j = 0; j < Math.min(cells.length, width); j++) {
            newRow[j] = cells[i][j]
        }
    }

    return newCells
}

export function randomCells(width) {
    const randomBool = () => !!Math.round(Math.random())
    const cells = []

    for (let i = 0; i < width; i++) {
        const row = []
        cells.push(row)
        for (let j = 0; j < width; j++) row.push(randomBool())
    }
    console.log(cells)
    return cells
}