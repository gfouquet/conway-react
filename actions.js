export const DEFINE_GRID = 'DEFINE_GRID'
export const INIT_GRID = 'INIT_GRID'
export const START_EXPERIMENT = 'START_EXPERIMENT'
export const STOP_EXPERIMENT = 'STOP_EXPERIMENT'
export const COMPUTE_NEXT_BATCH = 'COMPUTE_NEXT_BATCH'
export const CHANGE_CELL_INIT_STATE = 'CHANGE_CELL_INIT_STATE'

export const defineGrid = (width) => ({
    type: DEFINE_GRID,
    width
})

export const initGrid = () => ({
    type: INIT_GRID
})

export const changeCellInitState = ({rdx, cdx, alive}) => ({
    type: CHANGE_CELL_INIT_STATE,
    rdx,
    cdx,
    alive
})

export const startExperiment = () => (dispatch) => {
    const experimentId = setInterval(() => dispatch(computeNextBatch()), 200)
    dispatch({
        type: START_EXPERIMENT,
            experimentId
    })
}

export const computeNextBatch = () => ({
    type: COMPUTE_NEXT_BATCH
})

export const stopExperiment = () => ({
    type: STOP_EXPERIMENT
})

