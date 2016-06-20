import {START_EXPERIMENT, STOP_EXPERIMENT} from '../actions'

export default function experimentId(state = 0, action) {
    switch (action.type) {
        case START_EXPERIMENT:
            return action.experimentId
        case STOP_EXPERIMENT:
            clearInterval(state) // not too sure if this should be here or in computeNextBatch action trigger
            return 0
        default:
            return state
    }
}

export const isRunning = (state) => state !== 0