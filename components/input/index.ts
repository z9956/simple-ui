import Input from './Input';
import Search from './Search';

export type InputComponentType = typeof Input & {
	Search: typeof Search;
};

export type { InputProps } from './Input';
export type { SearchProps } from './Search';

(Input as InputComponentType).Search = Search;

export default Input as InputComponentType;
