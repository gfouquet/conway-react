import React from 'react'
import {connect}  from 'react-redux'
import {initGrid, defineGrid, startExperiment, computeNextBatch, stopExperiment} from './actions'

const mapStateToProps = (state) => {
    const width = state.width ? state.width : ""
    const running = state.experimentId !== undefined
    return {width, running}
}

const mapDispatchToProps = (dispatch) => ({
    onInitClick: () => dispatch(initGrid()),
    onChangeWidth: (width) => dispatch(defineGrid(width)),
    onStartClick: () => {
        const experimentId = setInterval(() => dispatch(computeNextBatch()), 200) // not too sure if this should be here or in startExperiment reducer
        return dispatch(startExperiment(experimentId))
    },
    onStopClick: () => {
        return dispatch(stopExperiment())
    }
})

const Form = connect(mapStateToProps, mapDispatchToProps)(
    ({width, running, onInitClick, onChangeWidth, onStartClick, onStopClick}) => (
        <form>
            <label htmlFor="width">Largeur</label>
            <input type="number" name="width" id="width" placeholder="largeur" min="0" max="100" value={ width }
                   onChange={ (event) => onChangeWidth(event.target.value) }/>
            <input type="button" value="Init" onClick={ onInitClick } disabled={ running }/>
            <input type="button" value="Depart" onClick={ onStartClick } disabled={ running }/>
            <input type="button" value="Arrêt" onClick={ onStopClick } disabled={ !running }/>
        </form>
    )
)

export default Form
