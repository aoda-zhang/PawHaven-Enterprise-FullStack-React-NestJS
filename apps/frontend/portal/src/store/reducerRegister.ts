// All reducers should be registered here for centralized management and scalability

import { appBootstrapReducer } from './appBootstrapReducer';
import { globalReducer } from './globalReducer';
import { reducerNames } from './reducerNames';

export const combinedReducers = {
  [reducerNames.global]: globalReducer.reducer,
  [reducerNames.bootstrap]: appBootstrapReducer.reducer,
};
