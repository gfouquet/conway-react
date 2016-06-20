import React from 'react'
import {PropTypes} from 'react'
import {connect}  from 'react-redux'
import {changeCellInitState} from './actions'
import Table from './Table'
import {isRunning} from 'reducers'

const Cell = ({rdx, cdx, alive}) => {
    const val = `${rdx}-${cdx}`
    return <td><input type="checkbox" value={ val } key={ val } checked={ alive } /></td>
}

Cell.propTypes = {
    alive: PropTypes.bool.isRequired,
    rdx: PropTypes.number.isRequired,
    cdx: PropTypes.number.isRequired
}

const InitTable = Table(Cell)

const mapStateToProps = (state) => ({running: isRunning(state), cells: state.initialCells})

const mapDispatchToProps = { onChangeCell: changeCellInitState } // shortcut for a mapper returning { foo(args) { return dispatch(bar(args)) }

const InitialState = connect(mapStateToProps, mapDispatchToProps)(({running, cells, onChangeCell}) => {
    if (running) {
        return <div></div>
    }

    const onChangeTable = (event) => {
        const cbx = event.target
        const [rdx, cdx] = cbx.value.split('-').map(it => parseInt(it))
        onChangeCell({rdx, cdx, alive: cbx.checked})
        return true
    }

    return <InitTable id="init" cells={cells} onChange={onChangeTable} />
})

export default InitialState