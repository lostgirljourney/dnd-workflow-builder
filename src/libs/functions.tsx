export const openModal = (id: string) => {
	const modal = document.getElementById(id) as HTMLDialogElement;
	if (modal) modal.showModal();
};

export const closeModal = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	id: string
) => {
	e.preventDefault();
	const dialog = document.getElementById(id) as HTMLDialogElement;
	if (dialog) dialog.close();
};

export const fileName = (fileType: string) => {
	const today = new Date();
	const dd = String(today.getDate()).padStart(2, '0');
	const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	const yyyy = today.getFullYear();
	const time = today.getTime();
	const date = `${dd}-${mm}-${yyyy}-${time}`;
	const filename = `${fileType}_${date}.${fileType}`;
	return filename;
};
