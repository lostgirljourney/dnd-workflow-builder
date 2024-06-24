import {
	getIncomers,
	getOutgoers,
	Handle,
	Node,
	NodeProps,
	Position
} from 'reactflow';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { useValidatorFn } from '../../../hooks';
import { filterConditions, Operation } from '../../../libs/types';
import WorkflowBuilderContext from '../../../pages/contexts/WorkflowBuilderContext';
import Functions from './Functions';
import { orderBy } from 'lodash';

const OperationsNode: React.FC<NodeProps> = ({
	data,
	isConnectable,
	selected,
	id
}) => {
	const { node, edge, output } = useContext(WorkflowBuilderContext);
	const [nodes, setNodes] = node;
	const [edges, setEdges] = edge;
	const [, setOp] = output;

	const operation: Operation = data.operation;

	const incomers = getIncomers({ id } as Node, nodes!, edges!);
	let outgoers = getOutgoers({ id } as Node, nodes!, edges!);

	const columns: string[] =
		incomers !== undefined &&
		incomers.length > 0 &&
		((incomers[0].data?.input && incomers[0].data?.input.length > 0) ||
			incomers[0].data?.dataset)
			? incomers[0].data?.input
				? Object.keys(incomers[0].data.input[0])
				: Object.keys(incomers[0].data.dataset[0])
			: ['select dataset'];

	const [sort, setSort] = useState<{
		columns: string[];
		selectedCol: string;
		order: 'asc' | 'desc';
	}>({ columns, selectedCol: columns[0], order: 'asc' });

	const [slice, setSlice] = useState<{ start?: number; end?: number }>({
		start: 0,
		end: 0
	});

	const [filtr, setFiltr] = useState<{
		columns: string[];
		selectedCol: string;
		condition: [string, string];
	}>({
		columns,
		selectedCol: columns[0],
		condition: [columns[0], '']
	});

	const [selectedColType, setSelectedColType] = useState<
		'stringType' | 'numType'
	>('stringType');

	useEffect(
		() => setSort({ columns, selectedCol: columns[0], order: 'asc' }),
		[setNodes, setEdges, edges]
	);

	useEffect(
		() =>
			setFiltr({
				columns,
				selectedCol: columns[0],
				condition: [columns[0], '']
			}),
		[setNodes, setEdges, edges]
	);

	const setOutput = () => {
		const inputForTarget =
			outgoers &&
			outgoers.every(({ data }) => {
				data.input !== undefined && data.input.length > 0;
			});
		if (!inputForTarget) {
			if (data['output'] && data['output'].length > 0)
				outgoers.map((outgoer) => (outgoer.data.input = data['output']));
			else {
				const obj = Object.fromEntries(columns.map((column) => [column, '']));
				outgoers.map((outgoer) => (outgoer.data.input = [obj]));
			}
		}
	};

	const run = () => {
		if (
			incomers !== undefined &&
			incomers.length > 0 &&
			((incomers[0].data?.input && incomers[0].data?.input.length > 0) ||
				incomers[0].data?.dataset)
		) {
			switch (operation) {
				case 'Filter 🧹':
					{
						let opData;
						const ipData = data.input;
						let conditionVal: string = filtr.condition[1].trim();

						if (isFinite(ipData[0][filtr.selectedCol])) {
							switch (filtr.condition[0]) {
								case filterConditions.numType[0]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? parseFloat(ip[filtr.selectedCol]) >
												parseFloat(conditionVal as string)
											: []
									);
									setOp!(opData);
									break;
								case filterConditions.numType[1]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? parseFloat(ip[filtr.selectedCol]) >=
												parseFloat(conditionVal as string)
											: []
									);
									break;
								case filterConditions.numType[2]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? parseFloat(ip[filtr.selectedCol]) <
												parseFloat(conditionVal as string)
											: []
									);
									break;
								case filterConditions.numType[3]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? parseFloat(ip[filtr.selectedCol]) <=
												parseFloat(conditionVal as string)
											: []
									);
									break;
								case filterConditions.numType[4]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? parseFloat(ip[filtr.selectedCol]) ===
												parseFloat(conditionVal as string)
											: []
									);
									break;
								default:
									window.alert('select condition!');
									break;
							}
						} else {
							switch (filtr.condition[0]) {
								case filterConditions.stringType[0]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? ip[filtr.selectedCol].toLowerCase() ===
												conditionVal.toLowerCase()
											: []
									);
									break;
								case filterConditions.stringType[1]:
									opData = ipData.filter((ip: any) =>
										filtr.condition[1]
											? ip[filtr.selectedCol].toLowerCase() !==
												conditionVal.toLowerCase()
											: []
									);
									break;
								case filterConditions.stringType[2]:
									opData = ipData.filter((ip: any) =>
										ip[filtr.selectedCol]
											.toLowerCase()
											.includes(conditionVal.toLowerCase())
									);
									break;
								case filterConditions.stringType[3]:
									opData = ipData.filter(
										(ip: any) =>
											!ip[filtr.selectedCol]
												.toLowerCase()
												.includes(conditionVal.toLowerCase())
									);
									break;
								default:
									window.alert('select condition!');
									break;
							}
						}
						setOp!(opData);
						data['output'] = opData;
					}
					break;
				case 'Sort 🔀':
					let opData;
					const ipData = data.input;
					if (isFinite(ipData[0][sort.selectedCol])) {
						opData = ipData.toSorted((a: any, b: any) =>
							sort.order === 'asc'
								? Number(a[sort.selectedCol]) - Number(b[sort.selectedCol])
								: Number(b[sort.selectedCol]) - Number(a[sort.selectedCol])
						);
					} else {
						opData = orderBy(ipData, [sort.selectedCol], [sort.order]);
					}
					data['output'] = opData;
					setOp!(opData);
					break;
				case 'Slice ✂️':
					data['output'] = data.input?.slice(slice.start, slice.end);
					setOp!(data['output']);
					break;
			}
		} else {
			window.alert(
				'No input found. Please connect dataset to run the functions.'
			);
			setOp!([]);
		}
		setOutput();
	};

	return (
		<div>
			<Handle
				type="target"
				position={Position.Left}
				isConnectable={isConnectable}
				id="left"
				isValidConnection={useValidatorFn()}
				className="border-none"
			/>
			<div
				className={clsx(
					'stats shadow bg-white border w-80',
					selected ? 'border-black' : 'border-white'
				)}
			>
				<div className="stat">
					<div className="stat-value">{data.operation}</div>
					<Functions
						state={{
							sortState: [sort, setSort],
							sliceState: [slice, setSlice],
							filtrState: {
								filtrKey: [filtr, setFiltr],
								selectedColTypeKey: [selectedColType, setSelectedColType],
								id
							}
						}}
						operation={operation}
					/>
					<div className="stat-actions mt-8">
						<button className="stat-desc btn btn-sm" onClick={run}>
							Run 🚀
						</button>
					</div>
				</div>
				<Handle
					type="source"
					position={Position.Right}
					id="right"
					isConnectable={isConnectable}
					isValidConnection={useValidatorFn()}
					className="rounded-none border-none right-0 h-1/2 bg-black"
				/>
			</div>
		</div>
	);
};

export default OperationsNode;
