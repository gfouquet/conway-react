import React from 'react'
import {connect}  from 'react-redux'
import {initGrid, defineGrid, startExperiment, computeNextBatch, stopExperiment} from './actions'
import {isRunning} from 'reducers'

const mapStateToProps = (state) => {
    const width = state.width ? state.width : ""
    const running = isRunning(state)
    return {width, running}
}

const mapDispatchToProps = (dispatch) => ({
    onInitClick() { return dispatch(initGrid()) },
    onChangeWidth(width) { return dispatch(defineGrid(parseInt(width))) },
    onStartClick() {
        return dispatch(startExperiment())
    },
    onStopClick() { return dispatch(stopExperiment()) }
})

const Form = connect(mapStateToProps, mapDispatchToProps)(
    ({width, running, onInitClick, onChangeWidth, onStartClick, onStopClick}) => (
        <form>
            <label htmlFor="width">Largeur</label>
            <input type="number" name="width" id="width" placeholder="largeur" min="0" max="100" value={ width }
                   onChange={ (event) => onChangeWidth(event.target.value) }/>
            <input type="button" value="Expérience aléatoire" onClick={ onInitClick } disabled={ running }/>
            <input type="button" value="Démarrer l'expérience" onClick={ onStartClick } disabled={ running }/>
            <input type="button" value="Arrêter l'expérience" onClick={ onStopClick } disabled={ !running }/>
        </form>
    )
)

export default Form
