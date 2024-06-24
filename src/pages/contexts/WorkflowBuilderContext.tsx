import { Edge, Node } from 'reactflow';
import { createContext } from 'react';

interface WorkflowBuilderContextProp {
	node: [Node[], React.Dispatch<React.SetStateAction<Node[]>>] | [];
	edge: [Edge[], React.Dispatch<React.SetStateAction<Edge[]>>] | [];
	workflowId: string;
	saveBtn: {
		loading: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
		toast: [React.Dispatch<React.SetStateAction<boolean>>];
	};
	output:
		| [
				{ [key: string]: string }[] | undefined,
				React.Dispatch<
					React.SetStateAction<{ [key: string]: string }[] | undefined>
				>
		  ]
		| [];
	children?: React.ReactNode;
}

const WorkflowBuilderContext = createContext<WorkflowBuilderContextProp>({
	node: [],
	edge: [],
	workflowId: '',
	saveBtn: {
		loading: [false, () => {}],
		toast: [() => {}]
	},
	output: []
});

export default WorkflowBuilderContext;
