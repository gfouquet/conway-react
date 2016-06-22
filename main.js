import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App'
import conway from './reducers'

const store = createStore(conway)

const logger = (store) => (next) => (action) => {
    console.group(`Dispatching action ${action.type}`)
    console.log("Action: ", action)
    console.log("Prev state: ", store.getState())
    next(action)
    console.log("Next state: ", store.getState())
    console.groupEnd()
}

store.dispatch = logger(store)(store.dispatch)

render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
)
