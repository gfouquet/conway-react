export const DEFINE_GRID = 'DEFINE_GRID'
export const INIT_GRID = 'INIT_GRID'
export const START_EXPERIMENT = 'START_EXPERIMENT'
export const STOP_EXPERIMENT = 'STOP_EXPERIMENT'

export const defineGrid = (width) => {
    return {
        type: DEFINE_GRID,
        width
    }
}

export const initGrid = () => {
    console.log('initGRid')
    return {
        type: INIT_GRID
    }
}

export const startExperiment = () => {
    return {
        type: START_EXPERIMENT
    }
}

export const stopExperiment = () => {
    return {
        type: STOP_EXPERIMENT
    }
}

