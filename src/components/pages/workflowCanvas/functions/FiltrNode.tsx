import { useReactFlow } from 'reactflow';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { filterConditions } from '../../../../libs/types';

const FiltrNode: React.FC<{
	filtrKey: [
		{
			columns: string[];
			selectedCol: string;
			condition: [string, string];
		},
		Dispatch<
			SetStateAction<{
				columns: string[];
				selectedCol: string;
				condition: [string, string];
			}>
		>
	];
	selectedColTypeKey: [
		'stringType' | 'numType',
		Dispatch<SetStateAction<'stringType' | 'numType'>>
	];
	id: string;
}> = ({ filtrKey, selectedColTypeKey, id }) => {
	const { getNode } = useReactFlow();
	const nodeData = getNode(id);

	const [filtrObj, setFiltr] = filtrKey;
	const [selectedColType, setSelectedColType] = selectedColTypeKey;
	const [ipValue, setIPValue] = useState<string>('');

	const onSelect = (value: string, type: string) => {
		if (type === 'column') {
			setFiltr((prevState) => ({ ...prevState, selectedCol: value }));
		}
		if (type === 'condition') {
			setFiltr((prevState) => ({
				...prevState,
				condition: [value, ipValue]
			}));
		}
	};

	useEffect(() => {
		if (nodeData?.data.input !== undefined) {
			if (isFinite(nodeData.data.input[0][filtrObj.selectedCol])) {
				setSelectedColType('numType');
			} else {
				setSelectedColType('stringType');
			}
		}
	}, [filtrObj, setFiltr, selectedColType, setSelectedColType]);

	useEffect(() => {
		setFiltr((prevstate) => ({
			...prevstate,
			condition: [filtrObj.condition[0], ipValue]
		}));
	}, [setIPValue, ipValue]);

	return (
		<>
			<div className="stat-actions">
				<p className="stat-title mb-0.5">Column name:</p>
				<select
					className="select select-bordered select-sm w-full max-w-xs rm-outline"
					onChange={(e) => onSelect(e.target.value, 'column')}
				>
					{filtrObj.columns.map((column) => (
						<option key={column} disabled={column === 'select dataset'}>
							{column}
						</option>
					))}
				</select>
			</div>
			<div className="stat-actions">
				<p className="stat-title mb-0.5">Condition:</p>
				<select
					className="select select-bordered select-sm w-full max-w-xs rm-outline block mb-2"
					onChange={(e) => onSelect(e.target.value, 'condition')}
					defaultValue={0}
				>
					<option disabled value={0}>
						select condition
					</option>
					{filterConditions[
						selectedColType as keyof typeof filterConditions
					].map((type) => (
						<option key={type}>{type}</option>
					))}
				</select>
				<input
					id="start"
					type={selectedColType === 'stringType' ? 'text' : 'number'}
					min={0}
					placeholder="Type here"
					className="input input-bordered input-sm w-full max-w-xs rm-outline"
					value={ipValue}
					onChange={(e) => setIPValue(e.target.value as string)}
				/>
			</div>
		</>
	);
};

export default FiltrNode;
