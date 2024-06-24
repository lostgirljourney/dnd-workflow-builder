import { useCallback, useContext } from 'react';
import ReactFlow, {
	Controls,
	Background,
	applyNodeChanges,
	applyEdgeChanges,
	addEdge,
	BackgroundVariant,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	MiniMap,
	OnEdgeUpdateFunc,
	Connection,
	Edge,
	updateEdge,
	useReactFlow,
	OnNodesDelete
} from 'reactflow';
import 'reactflow/dist/style.css';
import Operations from './Operations';
import InputDatasetNode from './InputDatasetNode';
import WorkflowBuilderContext from '../../../pages/contexts/WorkflowBuilderContext';
import OperationsNode from './OperationsNode';

const nodeTypes = {
	inputNode: InputDatasetNode,
	operationsNode: OperationsNode
};

const Flow = () => {
	const { node, edge } = useContext(WorkflowBuilderContext);
	const [nodes, setNodes] = node;
	const [edges, setEdges] = edge;
	const { getNode } = useReactFlow();

	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes!((nds) => applyNodeChanges(changes, nds)),
		[setNodes]
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges!((eds) => applyEdgeChanges(changes, eds)),
		[setEdges]
	);
	const onEdgeUpdate: OnEdgeUpdateFunc = useCallback(
		(oldEdge: Edge, newConnection: Connection) =>
			setEdges!((els) => updateEdge(oldEdge, newConnection, els)),
		[setEdges]
	);
	const onNodesDelete: OnNodesDelete = useCallback(
		(changes) => {
			setNodes!((prevState) =>
				prevState.filter(
					(state) => !changes.find((change) => change.id === state.id)
				)
			);
		},
		[setNodes]
	);
	const onConnect: OnConnect = useCallback(
		(connection) => {
			setEdges!((eds) => addEdge(connection, eds));
			const src = getNode(connection.source!);
			setNodes!(
				nodes!.map((node) =>
					node.id === connection.target
						? {
								...node,
								data: {
									...node.data,
									input: src?.data['output']
										? src?.data['output']
										: src?.data['dataset'] || src?.data['input']
								}
							}
						: node
				)
			);
		},
		[setEdges, setNodes, nodes]
	);

	return (
		<div style={{ height: '100%' }}>
			<ReactFlow
				nodes={nodes}
				onNodesChange={onNodesChange}
				edges={edges}
				onEdgesChange={onEdgesChange}
				onEdgeUpdate={onEdgeUpdate}
				defaultEdgeOptions={{ animated: true }}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				zoomOnScroll={false}
				onNodesDelete={onNodesDelete}
				fitView
			>
				<Operations />
				<Background
					color="gray"
					variant={BackgroundVariant.Dots}
					className="bg-[#F0F0F0]"
				/>
				<Controls />
				<MiniMap />
			</ReactFlow>
		</div>
	);
};

export default Flow;
