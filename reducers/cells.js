import {COMPUTE_NEXT_BATCH} from '../actions'

export default function cells(state = [], action) {
    switch (action.type) {
        case COMPUTE_NEXT_BATCH:
            return nextBatch(state)
        default:
            return state
    }
}

const neighboursOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

export function nextBatch(state) {
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