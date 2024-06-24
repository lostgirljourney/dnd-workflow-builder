import clsx from 'clsx';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../store/slices/workflowsSlice';
import Navbar, { NavbarProps } from '../../ui/navbar';
import { openModal } from '../../../libs/functions';

const DBNavbar: React.FC<NavbarProps> = ({ menus, active }) => {
	const dispatch = useDispatch();
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		debouncedSearch(event.target.value);
	};

	const debouncedSearch = useCallback(
		debounce((searchTerm: string) => {
			dispatch(setSearchTerm(searchTerm));
		}, 300),
		[]
	);

	return (
		<Navbar>
			<div className="navbar-start">
				<div className="breadcrumbs">
					<ul>
						{menus?.map(({ title, path }, index) => (
							<li
								key={title + index}
								className={clsx(title === active && 'font-medium')}
							>
								<Link to={path} className="truncate block w-full h-full">
									{title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<div className="join min-w-96">
					<button
						className="btn join-item w-1/2 rm-outline"
						onClick={() => openModal('create-wf-modal')}
					>
						create new workflow
					</button>
					<button
						className="btn-bg-neutral join-item w-1/2"
						onClick={() => openModal('delete-wf-modal')}
					>
						delete selected
					</button>
				</div>
			</div>
			<div className="navbar-end">
				<input
					type="text"
					placeholder="Search Workflow"
					className="input input-bordered w-24 h-10 md:w-auto rm-outline"
					onChange={handleSearchChange}
				/>
			</div>
		</Navbar>
	);
};

export default DBNavbar;
