import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import App from './App'
import conway from './reducers'


const logger = (store) => (next) => (action) => {
    console.group(`Dispatching action ${action.type}`)
    console.log("Action: ", action)
    console.log("Prev state: ", store.getState())
    next(action)
    console.log("Next state: ", store.getState())
    console.groupEnd()
}

const store = createStore(conway, applyMiddleware(logger))

render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
)
