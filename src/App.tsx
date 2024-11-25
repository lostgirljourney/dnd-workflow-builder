import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WorkflowCanvas from './pages/WorkflowCanvas';
import Dashboard from './pages/Dashboard';

const App = () => {
	return (
		<Router future={{ v7_startTransition: true }}>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route
					path="workflow-buildr/:workflowId"
					element={<WorkflowCanvas />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
