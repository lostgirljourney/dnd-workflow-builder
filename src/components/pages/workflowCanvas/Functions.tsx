import { Dispatch, SetStateAction } from 'react';
import { Operation } from '../../../libs/types';
import FiltrNode from './functions/FiltrNode';
import SliceNode from './functions/SliceNode';
import SortNode from './functions/SortNode';

const Functions: React.FC<{
	state: {
		sortState: [
			{ columns: string[]; selectedCol: string; order: 'asc' | 'desc' },
			Dispatch<
				SetStateAction<{
					columns: string[];
					selectedCol: string;
					order: 'asc' | 'desc';
				}>
			>
		];
		sliceState: [
			{ start?: number | undefined; end?: number | undefined },
			Dispatch<
				SetStateAction<{ start?: number | undefined; end?: number | undefined }>
			>
		];
		filtrState: {
			filtrKey: [
				{
					columns: string[];
					selectedCol: string;
					condition: [string, string];
				},
				Dispatch<
					SetStateAction<{
						columns: string[];
						selectedCol: string;
						condition: [string, string];
					}>
				>
			];
			selectedColTypeKey: [
				'stringType' | 'numType',
				Dispatch<SetStateAction<'stringType' | 'numType'>>
			];
			id: string;
		};
	};
	operation: Operation;
}> = ({ state, operation }) => {
	if (operation === 'Sort 🔀') return <SortNode sort={state.sortState} />;
	if (operation === 'Slice ✂️') return <SliceNode slice={state.sliceState} />;
	if (operation === 'Filter 🧹')
		return (
			<FiltrNode
				filtrKey={state.filtrState.filtrKey}
				selectedColTypeKey={state.filtrState.selectedColTypeKey}
				id={state.filtrState.id}
			/>
		);
};

export default Functions;
