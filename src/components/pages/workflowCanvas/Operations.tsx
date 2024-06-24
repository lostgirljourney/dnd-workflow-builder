import { Panel } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { useContext } from 'react';
import WorkflowBuilderContext from '../../../pages/contexts/WorkflowBuilderContext';
import { Operation } from '../../../libs/types';

const operations: {
	operation: Operation;
	desc: string;
}[] = [
	{
		operation: 'Filter 🧹',
		desc: 'Filters the dataset based on a specified condition.'
	},
	{
		operation: 'Sort 🔀',
		desc: 'Sorts the dataset based on a specified property and order.'
	},
	{
		operation: 'Slice ✂️',
		desc: 'Extracts a portion of the dataset based on start and end indices.'
	}
];

const Operations = () => {
	const { node } = useContext(WorkflowBuilderContext);
	const [nodes, setNodes] = node;

	const onClick = (operation: Operation) => {
		let input;
		let output;
		const data = {
			id: uuidv4(),
			data: {
				operation,
				input,
				output
			},
			position: {
				x: Math.ceil(Math.random() * 250),
				y: Math.ceil(Math.random() * 250)
			},
			type: 'operationsNode'
		};
		setNodes!([...nodes!, data]);
	};
	return (
		<div className="dropdown w-3/5">
			<Panel
				tabIndex={1}
				position="top-left"
				className="btn-sm btn-bg-neutral gap-1 items-center"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="1rem"
					height="1rem"
					fill="currentColor"
					stroke="currentColor"
				>
					<path d="M17,11H13V7a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1v4H7a1,1,0,0,0-1,1H6a1,1,0,0,0,1,1h4v4a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V13h4a1,1,0,0,0,1-1h0A1,1,0,0,0,17,11Z" />
				</svg>
				operations
			</Panel>
			<ul
				className="dropdown-content z-50 top-14 left-8 menu p-2 shadow bg-base-100 rounded-box w-3/5 grid grid-cols-3 grid-rows-1"
				tabIndex={0}
			>
				{operations.map(({ operation, desc }) => (
					<li
						key={operation}
						className="w-full"
						onClick={() => onClick(operation)}
					>
						<span className="grid-flow-row h-full w-full">
							<span className="font-medium">{operation}</span>
							<span className="label-text-alt text-inherit">{desc}</span>
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Operations;
