import { ChangeEvent, KeyboardEvent } from 'react';
import { AiOutlineUser, AiOutlineBulb } from 'react-icons/ai';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import Input, { InputProps, SearchProps, PasswordProps } from './index';

const styles = {
	wrap: css`
		caret-color: transparent;
	`,
	group: css({
		marginTop: 20,
	}),
};

export default {
	title: 'Input',
	component: Input,
} as Meta;

export const Text: Story<InputProps> = () => {
	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		console.log(action(`onPressEnter ${e.currentTarget.value}`));
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		console.log(action(`onChange ${e.currentTarget.value}`));
	};

	return (
		<div className={styles.wrap}>
			<Input
				className={styles.group}
				disabled
				defaultValue={'disabled'}
				style={{ width: 300 }}
			/>
			<Input
				className={styles.group}
				suffix={<AiOutlineBulb />}
				defaultValue={'defaultValue'}
				style={{ width: 300 }}
			/>
			<Input
				className={styles.group}
				prefix={<AiOutlineUser />}
				allowClear
				style={{ width: 300 }}
				onChange={handleChange}
				onPressEnter={handlePressEnter}
			/>
		</div>
	);
};

export const Password: Story<PasswordProps> = () => {
	return (
		<div className={styles.wrap}>
			<Input.Password
				className={styles.group}
				style={{ width: 300 }}
				disabled
				defaultValue={'defaultValue'}
			/>
			<Input.Password
				defaultValue={'defaultValue'}
				className={styles.group}
				style={{ width: 300 }}
			/>
		</div>
	);
};

export const Search: Story<SearchProps> = () => {
	const handleSearch = (value: string) => {
		console.log(`handleSearch ${value}`);
	};

	return (
		<div className={styles.wrap}>
			<Input.Search
				className={styles.group}
				style={{ width: 300 }}
				disabled
				defaultValue={'defaultValue'}
			/>
			<Input.Search
				className={styles.group}
				style={{ width: 300 }}
				onSearch={handleSearch}
			/>
		</div>
	);
};
