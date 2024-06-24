import { Dispatch, SetStateAction } from 'react';

const SortNode: React.FC<{
	sort: [
		{ columns: string[]; selectedCol: string; order: 'asc' | 'desc' },
		Dispatch<
			SetStateAction<{
				columns: string[];
				selectedCol: string;
				order: 'asc' | 'desc';
			}>
		>
	];
}> = ({ sort }) => {
	const [sortObj, setSort] = sort;
	const ordered = {
		asc: 'Ascending',
		desc: 'Descending'
	};

	const onSelect = (value: string, type: string) => {
		if (type === 'column') {
			setSort((prevState) => ({ ...prevState, selectedCol: value }));
		}
		if (type === 'order') {
			let key = Object.keys(ordered).find(
				(k) => ordered[k as keyof typeof ordered] === value
			);
			setSort((prevState) => ({ ...prevState, order: key as 'asc' | 'desc' }));
		}
	};

	return (
		<>
			<div className="stat-actions">
				<p className="stat-title mb-0.5">Column name:</p>
				<select
					className="select select-bordered select-sm w-full max-w-xs rm-outline"
					onChange={(e) => onSelect(e.target.value, 'column')}
				>
					{sortObj.columns.map((column) => (
						<option key={column} disabled={column === 'select dataset'}>
							{column}
						</option>
					))}
				</select>
			</div>
			<div className="stat-actions">
				<p className="stat-title mb-0.5">Order:</p>
				<select
					className="select select-bordered select-sm w-full max-w-xs rm-outline"
					onChange={(e) => onSelect(e.target.value, 'order')}
				>
					{Object.keys(ordered).map((odr) => (
						<option key={odr}>{ordered[odr as keyof typeof ordered]}</option>
					))}
				</select>
			</div>
		</>
	);
};

export default SortNode;
