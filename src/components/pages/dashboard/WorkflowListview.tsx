import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import {
	deleted,
	deselectAll,
	selectAll,
	toggleSelection
} from '../../../store/slices/workflowsSlice';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { openModal } from '../../../libs/functions';

const tableHeads: string[] = ['Workflow Name', 'Actions'];

const WorkflowListview = () => {
	const dispatch = useDispatch();
	const workflows = useSelector(
		(state: RootState) => state.workflows
	).workflows;
	const selectedWorkflows = useSelector(
		(state: RootState) => state.workflows
	).selectedWorkflows;
	const searchTerm = useSelector(
		(state: RootState) => state.workflows
	).searchTerm;

	const handleCheckboxChange = (id: string) => {
		dispatch(toggleSelection(id));
	};

	const handleSelectAllChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			dispatch(selectAll());
		} else {
			dispatch(deselectAll());
		}
	};

	const filteredWorkflows = workflows.filter((workflow) =>
		workflow.workflowName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="mt-8 flex justify-center">
			{workflows.length > 0 ? (
				<table className="table w-full max-w-[50%]">
					<thead>
						<tr>
							<th>
								<input
									type="checkbox"
									className="checkbox checkbox-sm"
									onChange={handleSelectAllChange}
									checked={
										selectedWorkflows.length === workflows.length &&
										selectedWorkflows.length > 0 &&
										workflows.length > 0
									}
								/>
							</th>
							{tableHeads.map((tableHead, i) => (
								<th
									key={tableHead + i}
									className={clsx(
										i === tableHeads.length - 1 ? 'flex justify-center' : ''
									)}
								>
									{tableHead}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{filteredWorkflows.map(({ workflowId, workflowName }) => {
							return (
								<tr key={workflowId}>
									<td>
										<input
											type="checkbox"
											className="checkbox checkbox-sm"
											onChange={() => handleCheckboxChange(workflowId)}
											checked={selectedWorkflows.includes(workflowId)}
										/>
									</td>
									<td className="font-bold w-fit max-w-[450px] hover:underline cursor-pointer">
										<Link
											to={`workflow-buildr/${workflowId}`}
											className="truncate block w-full h-full"
										>
											{workflowName}
										</Link>
									</td>
									<td className="flex justify-end gap-4 w-full">
										<button
											className="btn btn-small btn-outline btn-sm rm-outline"
											aria-label="edit"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
											>
												<path d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm0 23c-6.065 0-11-4.935-11-11S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11zm2.244-17.184l-6.926 6.926c-.851.85-1.318 1.98-1.318 3.183v1.575c0 .276.224.5.5.5h1.575c1.202 0 2.333-.468 3.183-1.318l6.926-6.926c.526-.526.816-1.226.816-1.97s-.29-1.443-.816-1.97c-1.053-1.053-2.887-1.053-3.939 0zm-3.693 10.158c-.661.661-1.54 1.025-2.476 1.025h-1.075v-1.075c0-.936.364-1.814 1.025-2.476l5.108-5.108 2.525 2.525-5.108 5.108zm6.926-6.926l-1.11 1.11-2.525-2.525 1.11-1.11c.676-.676 1.85-.676 2.525 0 .338.338.523.786.523 1.263s-.186.925-.523 1.263z" />
											</svg>
											edit
										</button>
										<button
											className="btn btn-small btn-sm btn-error rm-outline"
											onClick={() => dispatch(deleted([workflowId]))}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												className="h-4 w-4"
												fill="none"
												stroke="#fff"
											>
												<path d="M15.604 12.104l-2.896 2.896 2.896 2.896c.195.195.195.512 0 .707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-2.896-2.896-2.896 2.896c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512 0-.707l2.896-2.896-2.896-2.896c-.195-.195-.195-.512 0-.707s.512-.195.707 0l2.896 2.896 2.896-2.896c.195-.195.512-.195.707 0s.195.512 0 .707zm6.396-2.118v9.515c0 2.481-2.019 4.5-4.5 4.5H6.5c-2.481 0-4.5-2.019-4.5-4.5V4.5C2 2.019 4.019 0 6.5 0h5.515c1.735 0 3.368.676 4.597 1.904l3.484 3.485c1.228 1.227 1.904 2.859 1.904 4.596zm-6.096-7.375c-.551-.55-1.2-.959-1.904-1.231v5.12c0 .827.673 1.5 1.5 1.5h5.121c-.273-.704-.682-1.354-1.232-1.904l-3.484-3.485zm5.096 7.375c0-.335-.038-.663-.096-.985h-5.404c-1.379 0-2.5-1.122-2.5-2.5V1.096c-.323-.058-.651-.096-.985-.096h-5.515c-1.93 0-3.5 1.57-3.5 3.5v15c0 1.93 1.57 3.5 3.5 3.5h11c1.93 0 3.5-1.57 3.5-3.5v-9.515z" />
											</svg>
											<span className="text-white">delete</span>
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div className="max-w-md w-full h-auto container">
					<div className="card w-96 h-auto">
						<figure>
							<img src="./images/error.gif" alt="not-found" />
						</figure>
						<div className="card-body py-0 w-full flex justify-center items-center gap-5">
							<h2 className="card-title">No Workflows found!</h2>
							<button
								className="btn btn-sm btn-outline w-fit"
								onClick={() => openModal('create-wf-modal')}
							>
								Create one!
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default WorkflowListview;
