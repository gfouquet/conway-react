import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App'
import conway from './reducers'

const store = createStore(conway)

render(
    <Provider store={store}><App /></Provider>,
    document.getElementById('app')
)
