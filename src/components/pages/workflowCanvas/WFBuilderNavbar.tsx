import clsx from 'clsx';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import Navbar, { NavbarProps } from '../../ui/navbar';
import { save } from '../../../store/slices/workflowsSlice';
import WorkflowBuilderContext from '../../../pages/contexts/WorkflowBuilderContext';
import { Link } from 'react-router-dom';
import Papa from 'papaparse';

const modules = import.meta.glob('/public/csv/*.csv', {
	eager: true,
	import: 'default',
	query: '?raw'
});

const fileNames = Object.keys(modules).map((path) =>
	path.replace('/public/csv/', '')
);

const WFBuilderNavbar: React.FC<NavbarProps> = ({ menus, active }) => {
	const dispatch = useDispatch();
	const { node, edge, workflowId, saveBtn } = useContext(
		WorkflowBuilderContext
	);
	const [nodes, setNodes] = node;
	const [edges] = edge;
	const [saving, setSaving] = saveBtn.loading;
	const [setShowToast] = saveBtn.toast;

	const onClick = (file: string) => {
		Papa.parse(`/csv/${file}?url&raw`, {
			download: true,
			header: true,
			complete: (results) => {
				const node = {
					id: uuidv4(),
					data: {
						file: file.replace('-', ' ').replace('.csv', ''),
						dataset: results.data
					},
					position: {
						x: Math.ceil(Math.random() * 250),
						y: Math.ceil(Math.random() * 250)
					},
					type: 'inputNode'
				};
				setNodes!((prevNodes) => [...prevNodes, node]);
			}
		});
	};

	const OnSave = () => {
		setSaving!(true);
		const nodesData = JSON.parse(JSON.stringify(nodes));
		const edgesData = JSON.parse(JSON.stringify(edges));
		dispatch(
			save([
				{
					nodes: nodesData,
					edges: edgesData
				},
				workflowId
			])
		);
		setTimeout(() => {
			setSaving!(false);
			setShowToast!(true);
		}, 1500);
		setTimeout(() => {
			setShowToast!(false);
		}, 3000);
	};

	return (
		<Navbar>
			<div className="navbar-start">
				<div className="drawer">
					<input id="my-drawer" type="checkbox" className="drawer-toggle" />
					<div className="drawer-content">
						<label
							htmlFor="my-drawer"
							tabIndex={0}
							role="button"
							className="btn btn-ghost rm-outline"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
							<span>Select CSV Input</span>
						</label>
					</div>
					<div className="drawer-side">
						<label
							htmlFor="my-drawer"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
							<p className="font-semibold text-center text-3xl py-8">
								Click on the Dataset to start with!
							</p>
							{fileNames.map((file) => {
								const fileName = file.replace('-', ' ').replace('.csv', '');
								return (
									<li
										key={file}
										onClick={() => onClick(file)}
										className="my-0.5"
									>
										<span>{`• ${fileName}`}</span>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
			<div className="navbar-center">
				<div className="breadcrumbs">
					<ul>
						{menus?.map(({ title, path }, index) => (
							<li
								key={title + index}
								className={clsx(title === active && 'font-medium')}
							>
								<Link
									to={path}
									className="truncate block w-full h-full rm-outline"
									style={{
										textDecoration: title !== active ? 'none' : ''
									}}
								>
									{title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className="navbar-end">
				<button className="btn-bg-neutral" onClick={OnSave}>
					{saving && <span className="loading loading-spinner"></span>}
					save workflow
				</button>
			</div>
		</Navbar>
	);
};

export default WFBuilderNavbar;
