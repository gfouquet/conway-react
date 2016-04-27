import React from 'react'
import {connect}  from 'react-redux'
import {initGrid, defineGrid, startExperiment} from './actions'

const mapStateToProps = (state) => {
    return {cells: state.cells}
}

const Experiment = connect(mapStateToProps)(
    ({cells}) => {
        const rowKey = (idx) => `r${idx}`
        const trs = cells.map((row, idx) => {
            const key = rowKey(idx)
            return <Row key={ key } rowKey={ key } row={ row }/>
        })

        return (
            <table>
                <tbody>
                    { trs }
                </tbody>
            </table>
        )
    }
)

const Row = ({row, rowKey}) => {
    const cellKey = (idx) => `${rowKey}c${idx}`
    const tds = row.map((cell, idx) => <Cell key={cellKey(idx)} cell={cell}/>)

    return (
        <tr>
            {tds}
        </tr>
    )
}

const Cell = ({cell}) => (
    <td>
        <input type="radio" checked={ cell } />
    </td>
)

export default Experiment
