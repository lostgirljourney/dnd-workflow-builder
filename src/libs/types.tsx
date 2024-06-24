export type Operation = 'Filter 🧹' | 'Sort 🔀' | 'Slice ✂️';

export const filterConditions = {
	stringType: [
		'text is exactly',
		'text is not exactly',
		'text includes',
		'text does not includes'
	],
	numType: [
		'number is greater than',
		'number is greater than or equals',
		'number is less than',
		'number is less than or equals',
		'number is exactly equals'
	]
};
