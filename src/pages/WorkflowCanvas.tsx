import { useParams } from 'react-router';
import Flow from '../components/pages/workflowCanvas/Flow';
import WFBuilderNavbar from '../components/pages/workflowCanvas/WFBuilderNavbar';
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Edge, Node, ReactFlowProvider } from 'reactflow';
import { useState } from 'react';
import { NavbarProps } from '../components/ui/navbar';
import DisplayOP from '../components/pages/workflowCanvas/DisplayOP';
import WorkflowBuilderContext from './contexts/WorkflowBuilderContext';

const WorkflowCanvas = () => {
	let { workflowId: wfId } = useParams();

	let currentWorkflow = useSelector(
		(state: RootState) => state.workflows.workflows
	).find(({ workflowId }) => workflowId === wfId);

	const workflowName = currentWorkflow!.workflowName;

	const initialNodes: Node[] = currentWorkflow!.workflowData.nodes || [];
	const initialEdges: Edge[] = currentWorkflow!.workflowData.edges || [];

	const breadcrumbs: NavbarProps['menus'] = [
		{
			title: 'Dashboard',
			path: '/'
		},
		{
			title: workflowName,
			path: `/workflow-buildr/${wfId}`
		}
	];

	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>(initialEdges);
	const [saving, setSaving] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [op, setOp] = useState<{ [key: string]: string }[]>();

	return (
		<WorkflowBuilderContext.Provider
			value={{
				node: [nodes, setNodes],
				edge: [edges, setEdges],
				workflowId: wfId!,
				saveBtn: {
					loading: [saving, setSaving],
					toast: [setShowToast]
				},
				output: [op, setOp]
			}}
		>
			<ReactFlowProvider>
				<WFBuilderNavbar
					menus={breadcrumbs}
					active={breadcrumbs[breadcrumbs.length - 1].title}
				/>
				<div className="w-full h-5/6">
					<Flow />
				</div>
				{showToast && (
					<div className="toast toast-start z-50">
						<div className="alert alert-success">
							<span>Workflow Data saved successfully!</span>
						</div>
					</div>
				)}
			</ReactFlowProvider>
			<DisplayOP />
		</WorkflowBuilderContext.Provider>
	);
};

export default WorkflowCanvas;
