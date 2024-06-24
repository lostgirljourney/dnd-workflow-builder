import { useContext, useState } from 'react';
import WorkflowBuilderContext from '../../../pages/contexts/WorkflowBuilderContext';
import Papa from 'papaparse';
import { fileName } from '../../../libs/functions';

const DisplayOP = () => {
	const { output } = useContext(WorkflowBuilderContext);
	const [op] = output;
	const [displayOutput, setDisplayOutput] = useState(true);
	const header = op && op.length > 0 ? Object.keys(op[0]) : [];

	const saveCSVFile = async () => {
		const csv = Papa.unparse(op!, { newline: '\n' });
		const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const csvURL = window.URL.createObjectURL(csvData);

		const tempLink = document.createElement('a');
		tempLink.href = csvURL;
		tempLink.setAttribute('download', fileName('csv'));
		tempLink.click();
	};

	const saveJSONFile = () => {
		var dataStr =
			'data:text/json;charset=utf-8,' +
			encodeURIComponent(JSON.stringify(op, null, 2));
		var downloadAnchorNode = document.createElement('a');
		downloadAnchorNode.setAttribute('href', dataStr);
		downloadAnchorNode.setAttribute('download', fileName('json'));
		downloadAnchorNode.click();
		downloadAnchorNode.remove();
	};

	return (
		<div className="collapse collapse-arrow rounded-none fixed bottom-0 bg-white">
			<input
				type="checkbox"
				checked={displayOutput}
				onChange={() => setDisplayOutput(!displayOutput)}
			/>
			<div className="collapse-title font-medium bg-white">Output</div>
			<div className="max-h-96 collapse-content overflow-auto">
				{op && op?.length > 0 ? (
					<>
						<details className="dropdown mb-4">
							<summary className="m-1 btn btn-sm">Downlaod</summary>
							<ul className="p-2 shadow menu dropdown-content z-10 bg-base-100 rounded-box w-52">
								<li onClick={saveJSONFile}>
									<a>as JSON</a>
								</li>
								<li onClick={saveCSVFile}>
									<a>as CSV</a>
								</li>
							</ul>
						</details>
						<table className="table table-xs table-pin-rows">
							<thead>
								<tr>
									{header.map((k) => (
										<th key={k}>{k}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{op.map((output, i) => (
									<tr key={`o/p-${i}`}>
										{header.map((k) => (
											<td key={k}>{output[k]}</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<div role="alert" className="alert mt-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							className="stroke-current shrink-0 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path>
						</svg>
						<span>No output available.</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default DisplayOP;
