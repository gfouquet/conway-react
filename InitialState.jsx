import React from 'react'
import {PropTypes} from 'react'
import {connect}  from 'react-redux'
import {changeCellInitState} from './actions'

const mapStateToProps = (state) => ({running: state.experimentId !== undefined, cells: state.initialCells})

const mapDispatchToProps = (dispatch) => ({
    onChangeCell: ({rdx, cdx, alive}) => dispatch(changeCellInitState({rdx, cdx, alive}))
})

const InitialState = connect(mapStateToProps, mapDispatchToProps)(({running, cells, onChangeCell}) => {
    if (running) {
        return <div></div>
    }

    const rowKey = (idx) => `r${idx}`
    const trs = cells.map((row, idx) => {
        return <Row key={ rowKey(idx) } rdx={ idx } row={ row }/>
    })

    const onChangeTable = (event) => {
        const cbx = event.target
        const [rdx, cdx] = cbx.value.split('-').map(it => parseInt(it))
        onChangeCell({rdx, cdx, alive: cbx.checked})
        return true
    }

    return (
        <table id="init" onChange={ onChangeTable }>
            <tbody>
            { trs }
            </tbody>
        </table>
    )
})

InitialState.propTypes = {
    running: PropTypes.bool.isRequired,
    cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool.isRequired)).isRequired
}

const Row = ({row, rdx}) => {
    const cellKey = (idx) => `${rdx}-${idx}`
    const tds = row.map((cell, idx) => {
        const key = cellKey(idx)
        return <td key={'r'+key}><input type="checkbox" value={key} key={key} checked={cell} /></td>
    })

    return (
        <tr>
            {tds}
        </tr>
    )
}

Row.propTypes = {
    row: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    rdx: PropTypes.number.isRequired
}

export default InitialState