import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
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

const thunk = (store) => (next) => (action) => {
    typeof action === 'function' ? action(store.dispatch) : next(action)
}

const store = createStore(conway, compose(applyMiddleware(thunk, logger), window.devToolsExtension ? window.devToolsExtension() : f => f
))

render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
)
