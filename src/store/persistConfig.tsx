import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';
import { WorkflowsState } from './slices/workflowsSlice';

const persistConfig: PersistConfig<WorkflowsState> = {
	key: 'root',
	storage,
	whitelist: ['workflows']
};

export default persistConfig;
