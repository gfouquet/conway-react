import {combineReducers} from 'redux'
import {INIT_GRID, DEFINE_GRID, START_EXPERIMENT, COMPUTE_NEXT_BATCH, STOP_EXPERIMENT} from './actions'

const initialState = {
    width: undefined,
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
        case COMPUTE_NEXT_BATCH:
            console.log("compute next batch")
            return state
        case STOP_EXPERIMENT:
            clearInterval(state.experimentId) // not too sure if this should be here or in computeNextBatch action trigger
            return {
                ...state,
                experimentId: undefined
            }
        default:
            return state
    }
}

// const conway = combineReducers({})

export default conway
