import clsx from 'clsx';
import { Handle, NodeProps, Position } from 'reactflow';
import { useValidatorFn } from '../../../hooks';

const InputDatasetNode: React.FC<NodeProps> = ({
	data,
	isConnectable,
	selected
}) => {
	return (
		<div
			className={clsx(
				'stats shadow bg-white overflow-clip border',
				selected ? 'border-black' : 'border-white'
			)}
		>
			<div className="stat">
				<div className="stat-title">Dataset 🗃️</div>
				<div className="stat-value">{data.file}</div>
			</div>
			<Handle
				type="source"
				position={Position.Right}
				id="ip-source-0"
				isConnectable={isConnectable}
				isValidConnection={useValidatorFn()}
				className="rounded-none border-none right-0 h-1/2 bg-black"
			/>
		</div>
	);
};

export default InputDatasetNode;
