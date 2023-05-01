import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import currencyReducer from '../reducers/slice'

export const store = configureStore({
    reducer: {
      currency: currencyReducer
    },
    middleware: (defaultMiddleware) => defaultMiddleware().concat(logger),
    devTools: true
  })
