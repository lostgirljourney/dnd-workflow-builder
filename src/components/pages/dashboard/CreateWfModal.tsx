import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Modal from '../../ui/modal';
import { create } from '../../../store/slices/workflowsSlice';
import { closeModal } from '../../../libs/functions';

const id = 'create-wf-modal';

const CreateWfModal = () => {
	const dispatch = useDispatch();
	const [wfName, setWfName] = useState<string>('');
	const navigate = useNavigate();

	const onSave = (e: any) => {
		if (wfName.trim().length > 0) {
			const workflowId = uuidv4();
			dispatch(
				create({
					workflowId,
					workflowName: wfName.trim(),
					workflowData: {
						nodes: [],
						edges: []
					},
					isSelected: false
				})
			);
			setWfName('');
			closeModal(e, id);
			navigate(`workflow-buildr/${workflowId}`);
		} else {
			e.preventDefault();
		}
	};

	const onCancel = (e: any) => {
		setWfName('');
		closeModal(e, id);
	};

	return (
		<Modal id="create-wf-modal">
			<h3 className="font-bold text-lg mb-4">Create a new Workflow</h3>
			<label className="form-control w-full label-text mb-2" htmlFor="wf-name">
				Workflow Name
			</label>
			<input
				id="wf-name"
				value={wfName}
				type="text"
				placeholder="Type here"
				className="input input-bordered w-full max-w-x focus:outline-transparent"
				onChange={(e) => setWfName(e.target.value)}
				required
			/>
			<div className="flex w-full justify-end gap-2 mt-4">
				<button
					className="btn btn-active btn-error text-white"
					onClick={(e) => onCancel(e)}
				>
					Cancel
				</button>
				<button
					className="btn btn-active btn-info text-white"
					onClick={(e) => onSave(e)}
				>
					Save
				</button>
			</div>
		</Modal>
	);
};

export default CreateWfModal;
