import { forwardRef } from 'react';

import Input, { InputProps } from './Input';

// type NativeAttrs = Omit<InputHTMLAttributes<any>, keyof >

export type SearchProps = InputProps & {
	// onSearch?:
};

const Search = forwardRef<HTMLInputElement, SearchProps>((props, ref) => {
	const { className, ...otherProps } = props;

	// const inputRef = useRef<HTMLInputElement>(null);

	return <Input className={className} ref={ref} {...otherProps} />;
});

Search.displayName = 'Search';

export default Search;
