import React from 'react'
import {connect}  from 'react-redux'
import {initGrid, defineGrid, startExperiment} from './actions'

const mapStateToProps = (state) => {
    const width = state.width ? state.width : ""
    return {width}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onInitClick: () => {
            dispatch(initGrid())
        },
        onChangeWidth: (width) => {
            dispatch(defineGrid(width))
        },
        onStartClick: () => {
            dispatch(startExperiment())
        }
    }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(
    ({width, onInitClick, onChangeWidth}) => (
        <form>
            <label htmlFor="width">Largeur</label>
            <input type="number" name="width" id="width" placeholder="largeur" min="0" max="100" value={ width }
                   onChange={ (event) => onChangeWidth(event.target.value) }/>
            <input type="button" value="Init" onClick={ onInitClick }/>
            <input type="button" value="Depart"/>
        </form>
    )
)

export default Form
