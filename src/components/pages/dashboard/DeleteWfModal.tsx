import { useDispatch, useSelector } from 'react-redux';
import { deleted } from '../../../store/slices/workflowsSlice';
import Modal from '../../ui/modal';
import { RootState } from '../../../store';
import { closeModal } from '../../../libs/functions';

const DeleteWfModal = () => {
	const dispatch = useDispatch();
	const selectedWorkflows = useSelector(
		(state: RootState) => state.workflows
	).selectedWorkflows;

	return (
		<Modal id="delete-wf-modal">
			<h3 className="font-bold text-lg mb-4">Delete Workflow(s)</h3>
			<p className="w-full mb-2">
				Once deleted, it is irreversible. Are you sure?
			</p>
			<div className="flex w-full justify-end gap-2 mt-4">
				<button
					disabled={selectedWorkflows.length <= 0}
					className="btn btn-active btn-error text-white disabled:btn-ghost"
					onClick={(e) => {
						dispatch(deleted(selectedWorkflows));
						closeModal(e, 'delete-wf-modal');
					}}
				>
					Delete
				</button>
				<button
					className="btn btn-active btn-info text-white"
					onClick={(e) => closeModal(e, 'delete-wf-modal')}
				>
					Cancel
				</button>
			</div>
		</Modal>
	);
};

export default DeleteWfModal;
