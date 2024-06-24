import React from 'react';

interface ModalProps
	extends React.DetailedHTMLProps<
		React.DialogHTMLAttributes<HTMLDialogElement>,
		HTMLDialogElement
	> {}

const Modal: React.FC<ModalProps> = ({ id, children }) => {
	return (
		<dialog id={id} className="modal">
			<div className="modal-box">
				<form method="dialog">{children}</form>
			</div>
		</dialog>
	);
};

export default Modal;
