import { forwardRef, ChangeEvent, MouseEvent, KeyboardEvent } from 'react';

import Input, { InputProps } from './Input';
import { AiOutlineSearch } from 'react-icons/ai';

export type SearchProps = InputProps & {
	onSearch?: (
		value: string,
		event?:
			| ChangeEvent<HTMLInputElement>
			| MouseEvent<HTMLInputElement>
			| KeyboardEvent<HTMLInputElement>,
	) => void;
};

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
	const { className, onChange, onSearch, ...otherProps } = props;

	const handleSearch = (
		e: KeyboardEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>,
	) => {
		onSearch?.(e.currentTarget.value, e);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.type === 'click' && onSearch) {
			onSearch(e.currentTarget.value, e);
		} else {
			onChange?.(e);
		}
	};

	return (
		<Input
			className={className}
			suffix={<AiOutlineSearch />}
			ref={ref}
			onChange={handleChange}
			onPressEnter={handleSearch}
			{...otherProps}
		/>
	);
});

Search.displayName = 'Search';

export default Search;
