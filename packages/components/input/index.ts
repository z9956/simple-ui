import Input from './Input';
import Search from './Search';
import Password from './Password';

export type InputComponentType = typeof Input & {
	Search: typeof Search;
	Password: typeof Password;
};

export type { InputProps } from './Input';
export type { SearchProps } from './Search';
export type { PasswordProps } from './Password';

(Input as InputComponentType).Search = Search;
(Input as InputComponentType).Password = Password;

export default Input as InputComponentType;
