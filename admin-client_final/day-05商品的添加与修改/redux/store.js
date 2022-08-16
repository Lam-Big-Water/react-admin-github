/*
redux最核心的管理对象store
 */
import {legacy_createStore as createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

// 向外默认暴露store
export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))