import React from 'react'
import {PropTypes} from 'react'
import {connect}  from 'react-redux'
import Table from './Table'

const Cell = ({alive}) => <td className={alive} />

Cell.propTypes = {
    alive: PropTypes.bool.isRequired
}

const ExpTable = Table(Cell)

const mapStateToProps = (state) => {
    return {cells: state.cells}
}

const Experiment = connect(mapStateToProps)(({cells}) => <ExpTable id="exp" cells={cells} />)

export default Experiment
