import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const SliceNode: React.FC<{
	slice: [
		{ start?: number | undefined; end?: number | undefined },
		Dispatch<
			SetStateAction<{ start?: number | undefined; end?: number | undefined }>
		>
	];
}> = ({ slice }) => {
	const [start, setStart] = useState<number>(0);
	const [end, setEnd] = useState<number>(0);
	const [idxType, setIdxType] = useState('');

	const onChange = (value: string, idx: string) => {
		let int = parseInt(value, 10);
		idx === 'start'
			? setStart(isNaN(int) ? 0 : int)
			: setEnd(isNaN(int) ? 0 : int);
		setIdxType(idx);
		slice[1]((prevState) =>
			idx === 'start'
				? {
						...prevState,
						start: int
					}
				: { ...prevState, end: int }
		);
	};

	useEffect(() => {
		slice[1]((prevState) =>
			idxType === 'start'
				? {
						...prevState,
						start
					}
				: { ...prevState, end }
		);
	}, [setStart, setEnd]);

	return (
		<>
			<div className="stat-actions">
				<label htmlFor="start" className="stat-title mb-0.5 block">
					Starting Index:
				</label>
				<input
					id="start"
					type="number"
					min={0}
					placeholder="Type here"
					className="input input-bordered input-sm w-full max-w-xs rm-outline"
					value={start}
					onChange={(e) => onChange(e.target.value, 'start')}
				/>
			</div>
			<div className="stat-actions">
				<label htmlFor="end" className="stat-title mb-0.5 block">
					Ending Index:
				</label>
				<input
					id="end"
					type="number"
					min={0}
					placeholder="Type here"
					className="input input-bordered input-sm w-full max-w-xs rm-outline"
					value={end}
					onChange={(e) => onChange(e.target.value, 'end')}
				/>
			</div>
		</>
	);
};

export default SliceNode;
