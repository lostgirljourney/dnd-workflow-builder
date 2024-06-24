import CreateWfModal from '../components/pages/dashboard/CreateWfModal';
import DeleteWfModal from '../components/pages/dashboard/DeleteWfModal';
import WorkflowListview from '../components/pages/dashboard/WorkflowListview';
import DBNavbar from '../components/pages/dashboard/DBNavbar';
import { NavbarProps } from '../components/ui/navbar';

const breadcrumbs: NavbarProps['menus'] = [
	{
		title: 'Dashboard',
		path: '/'
	}
];

const Dashboard = () => {
	return (
		<>
			<DBNavbar
				menus={breadcrumbs}
				active={breadcrumbs[breadcrumbs.length - 1].title}
			/>
			<WorkflowListview />
			<CreateWfModal />
			<DeleteWfModal />
		</>
	);
};

export default Dashboard;
