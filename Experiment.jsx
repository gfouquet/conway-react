import React from 'react'
import {PropTypes} from 'react'
import {connect}  from 'react-redux'

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
            <table id="exp">
                <tbody>
                { trs }
                </tbody>
            </table>
        )
    }
)

Experiment.propTypes = {
    cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool.isRequired)).isRequired
}

const Row = ({row, rowKey}) => {
    const cellKey = (idx) => `${rowKey}c${idx}`
    const tds = row.map((cell, idx) => <Cell key={cellKey(idx)} cell={cell}/>)

    return (
        <tr>
            {tds}
        </tr>
    )
}

Row.propTypes = {
    row: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
    rowKey: PropTypes.string.isRequired
}

const Cell = ({cell}) => (
    <td className={cell}>
    </td>
)

Cell.propTypes = {
    cell: PropTypes.bool.isRequired
}

export default Experiment
