import {combineReducers} from 'redux'
import {INIT_GRID, DEFINE_GRID} from './actions'

const initialState = {
    width: undefined,
    cells: []
}

function randomCells(width) {
    const randomBool = () => !!Math.round(Math.random())
    let cells = []
    for (let i = 0; i < width; i++)
        cells.push(randomBool())
}

function conway(state = initialState, action) {
    switch (action.type) {
        case DEFINE_GRID:
        {
            return {
                ...state,
                width: action.width
            }
        }
        case INIT_GRID:
            return {
                ...state,
                cells: randomCells(state.width)
            }
        default:
            return state
    }
}

// const conway = combineReducers({})

export default conway
