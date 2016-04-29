import React from 'react'
import {connect}  from 'react-redux'
import {changeCellInitState} from './actions'

const mapStateToProps = (state) => ({running: state.running, cells: state.initialCells})

const mapDispatchToProps = (dispatch) => ({
    onChangeCell: ({row, col, alive}) => dispatch(changeCellInitState({row, col, alive}))
})

const InitialState = connect(mapStateToProps, mapDispatchToProps)(({running, cells}, {onChangeCell}) => {
    if (!running) {
        return <div></div>
    }

    const rowKey = (idx) => `r${idx}`
    const trs = cells.map((row, idx) => {
        const key = rowKey(idx)
        return <Row key={ key } rowKey={ key } row={ row }/>
    })

    return (
        <table onchange={  }>
            <tbody>
            { trs }
            </tbody>
        </table>
    )
})

const Row = ({row, rowKey}) => {
    const cellKey = (idx) => `${rowKey}c${idx}`
    const tds = row.map((cell, idx) => {
        const key = cellKey(idx)
        return <Cell key={key} cellKey={key} cell={cell}/>
    })

    return (
        <tr>
            {tds}
        </tr>
    )
}

const Cell = ({cell}) => (
    <td>
        <input type="checkbox" value="" checked={ cell }/>
    </td>
)

export default InitialState