import {
    INIT_GRID,
    START_EXPERIMENT,
    COMPUTE_NEXT_BATCH
} from './actions'

import initialCells, {resizeCells, randomCells} from  './reducers/initial-cells'
import cells, {nextBatch} from  './reducers/cells'
import width from './reducers/width'
import experimentId, * as fromExpID from './reducers/experiment-id'

import {combineReducers} from 'redux'

const initialState = {
    width: 30,
    experimentId: 0,
    cells: [],
    initialCells: resizeCells([], 30)
}

function conway(state = initialState, action) {
    switch (action.type) {
        case INIT_GRID:
            return {
                ...state,
                initialCells: randomCells(state.width)
            }
        case START_EXPERIMENT:
            return {
                ...state,
                cells: state.initialCells
            }
        case COMPUTE_NEXT_BATCH:
            return {
                ...state,
                cells: nextBatch(state.cells)
            }
        default:
            return state
    }
}

const combined = combineReducers({
    width,
    experimentId,
    initialCells,
    cells
})


export default function (state, action) {
    // this is potentially incorrect : combined can modify a state which has been altered by conway
    return combined(conway(state, action), action)
}

export const isRunning = (state) => fromExpID.isRunning(state.experimentId)