import { useCallback } from 'react';
import { useReactFlow, getConnectedEdges, Connection } from 'reactflow';

export const useValidatorFn = () => {
	const { getNode, getEdges } = useReactFlow();

	return useCallback(
		(connection: Connection) => {
			if (connection.source === connection.target) {
				return connection.source !== connection.target;
			}

			const edges = getConnectedEdges(
				[getNode(connection.target!)!],
				getEdges()
			);

			for (let i = 0; i < edges.length; i++) {
				if (edges[i].target === connection.target) return false;
			}

			return true;
		},
		[getNode, getEdges]
	);
};
