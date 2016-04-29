import {
    INIT_GRID,
    DEFINE_GRID,
    START_EXPERIMENT,
    COMPUTE_NEXT_BATCH,
    STOP_EXPERIMENT,
    CHANGE_CELL_INIT_STATE
} from './actions'

const initialState = {
    width: undefined,
    experimentId: undefined,
    cells: [],
    initialCells: []
}

function randomCells(width) {
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

function conway(state = initialState, action) {
    switch (action.type) {
        case DEFINE_GRID:
            return {
                ...state,
                width: action.width,
                initialCells: resize(state.initialCells, action.width)
            }
        case INIT_GRID:
            return {
                ...state,
                initialCells: randomCells(state.width)
            }
        case START_EXPERIMENT:
            return {
                ...state,
                experimentId: action.experimentId,
                cells: initialCells
            }
        case STOP_EXPERIMENT:
            clearInterval(state.experimentId) // not too sure if this should be here or in computeNextBatch action trigger
            return {
                ...state,
                experimentId: undefined
            }
        case COMPUTE_NEXT_BATCH:
            return {
                ...state,
                cells: cells(state.cells)
            }
        case CHANGE_CELL_INIT_STATE:
            return {
                ...state,
                initialCells: initialCells(state.initialCells, action)
            }
        default:
            return state
    }
}

const neighboursOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

function cells(state) {
    const rowMapper = (row, rdx) => row.map(cellMapper(rdx))

    const cellMapper = (rdx) => (cell, cdx) => {
        const livingNeighboursCount = neighboursOffsets.reduce(livingNeighboursCounter(rdx, cdx), 0)
        return (!cell && livingNeighboursCount === 3) || (cell && (livingNeighboursCount === 2 || livingNeighboursCount === 3))
    }

    const livingNeighboursCounter = (rdx, cdx) => (acc, offset) => {
        const row = state[rdx + offset[0]]
        const cell = row === undefined ? false : row[cdx + offset[1]]
        if (cell) acc++
        return acc
    }

    return state.map(rowMapper)
}

function initialCells(initialCells, {rdx, cdx, alive}) {
    const rowMapper = (row, dx) => (dx === rdx) ? row.map(cellMapper) : row
    const cellMapper = (cell, dx) => (dx === cdx) ? alive : cell
    return initialCells.map(rowMapper)
}

function resize(cells, width) {
    const newCells = new Array(width)

    for (let i = 0; i < width; i++) {
        const newRow = new Array(width).fill(false)
        newCells.push(newRow)

        for (let j = 0; j < Math.min(cells.length, width); j++) {
            newRow[j] = cells[i][j]
        }
    }
}

export default conway
