import {DEFINE_GRID} from '../actions'

export default function width(state = 30, action) {
    switch (action.type) {
        case DEFINE_GRID:
            return action.width
        default:
            return state
    }
}