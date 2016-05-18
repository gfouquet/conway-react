import React from 'react'
import {Component, PropTypes} from 'react'

const Table = (Cell) => {
    const TableRow = Row(Cell)

    class _Table extends Component {
        render() {
            const {id, cells, onChange} = this.props
            const rowKey = (idx) => `r${idx}`

            const trs = cells.map((row, rdx) => {
                return <TableRow key={ rowKey(rdx) } rdx={ rdx } row={ row }/>
            })

            return (
                <table id={ id } onChange={ onChange }>
                    <tbody>{ trs }</tbody>
                </table>
            )
        }
    }

    _Table.propTypes = {
        id: PropTypes.string,
        cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.bool.isRequired)).isRequired,
        onChange: PropTypes.func
    }

    return _Table
}


const Row = (Cell) => {
    class _Row extends React.Component {
        render() {
            const {rdx, row} = this.props
            const cellKey = (cdx) => `r${rdx}c${cdx}`

            const tds = row.map((cell, cdx) => <Cell key={ cellKey(cdx) } rdx={ rdx } cdx={ cdx } alive={ cell }/>)

            return <tr>{tds}</tr>
        }
    }

    _Row.propTypes = {
        row: PropTypes.arrayOf(PropTypes.bool.isRequired).isRequired,
        rdx: PropTypes.number.isRequired
    }

    return _Row
}

export default Table
