import {INIT_GRID, DEFINE_GRID, START_EXPERIMENT, COMPUTE_NEXT_BATCH, STOP_EXPERIMENT} from './actions'

const initialState = {
    width: undefined,
    experimentId: undefined,
    cells: []
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
                width: action.width
            }
        case INIT_GRID:
            return {
                ...state,
                cells: randomCells(state.width)
            }
        case START_EXPERIMENT:
            return {
                ...state,
                experimentId: action.experimentId
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

export default conway
