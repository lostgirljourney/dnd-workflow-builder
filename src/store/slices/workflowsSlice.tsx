import { Edge, Node, OnSelectionChangeParams } from 'reactflow';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WorkflowsStateProps {
	workflowId: string;
	workflowName: string;
	workflowData: {
		nodes: Node[];
		edges: Edge[];
	};
	isSelected: boolean;
}

export type WorkflowsState = {
	workflows: WorkflowsStateProps[];
	selectedWorkflows: string[];
	searchTerm: string;
};

const initialState: WorkflowsState = {
	workflows: [],
	selectedWorkflows: [],
	searchTerm: ''
};

export const workflowsSlice = createSlice({
	name: 'workflows',
	initialState,
	reducers: {
		create: (state, action: PayloadAction<WorkflowsStateProps>) => {
			state.workflows.push(action.payload);
		},
		deleted: (state, action: PayloadAction<string[]>) => {
			const idsToDelete = action.payload;
			state.workflows = state.workflows.filter(
				(workflow) => !idsToDelete.includes(workflow.workflowId)
			);
			state.selectedWorkflows = state.selectedWorkflows.filter(
				(id) => !idsToDelete.includes(id)
			);
			return state;
		},
		toggleSelection: (state, action: PayloadAction<string>) => {
			const workflowId = action.payload;
			if (state.selectedWorkflows.includes(workflowId)) {
				state.selectedWorkflows = state.selectedWorkflows.filter(
					(id) => id !== workflowId
				);
			} else {
				state.selectedWorkflows.push(workflowId);
			}
		},
		selectAll: (state) => {
			state.selectedWorkflows = state.workflows.map(
				({ workflowId }) => workflowId
			);
		},
		deselectAll: (state) => {
			state.selectedWorkflows = [];
		},
		setSearchTerm: (state, action: PayloadAction<string>) => {
			state.searchTerm = action.payload;
		},
		save: (state, action: PayloadAction<[OnSelectionChangeParams, string]>) => {
			const [wfData, wfId] = action.payload;
			let currentWorkflow = state.workflows.find(
				({ workflowId }) => workflowId === wfId
			);
			currentWorkflow!.workflowData = wfData;
		}
	}
});

export const {
	create,
	deleted,
	deselectAll,
	selectAll,
	toggleSelection,
	setSearchTerm,
	save
} = workflowsSlice.actions;

export default workflowsSlice.reducer;
