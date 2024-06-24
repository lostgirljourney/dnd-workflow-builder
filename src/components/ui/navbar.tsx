import clsx from 'clsx';

export interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
	menus?: { title: string; path: string }[];
	active?: string;
}

const Navbar: React.FC<NavbarProps> = ({ children, className }) => {
	return (
		<div
			className={clsx(
				className,
				'navbar bg-base-100 border-b-2 sticky top-0 px-8 h-8 z-50'
			)}
		>
			{children}
		</div>
	);
};

export default Navbar;
