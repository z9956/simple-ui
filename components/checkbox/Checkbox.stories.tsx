import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Checkbox, CheckboxProps, CheckboxGroupProps } from '../index';
import { CheckboxEvent } from './Checkbox';
import { CheckboxValueType } from './Group';

export default {
	title: 'Checkbox',
	component: Checkbox,
} as Meta;

export const Base: Story<CheckboxProps> = () => {
	const handleChange = (e: CheckboxEvent) => {
		console.log(e);
		action('onChange')(e);
	};

	return (
		<div>
			<Checkbox disabled value={'北京'}>
				北京
			</Checkbox>
			<Checkbox value={'上海'} onChange={handleChange}>
				上海
			</Checkbox>
			<Checkbox value={'广东'} defaultChecked onChange={handleChange}>
				广东
			</Checkbox>
		</div>
	);
};

export const Group: Story<CheckboxGroupProps> = () => {
	const handleGroupChange = (e: CheckboxValueType[]) => {
		console.log(e);
		action('onChange')(e);
	};

	return (
		<div>
			<Checkbox.Group value={['a']} disabled>
				<Checkbox value={'a'}>a</Checkbox>
				<Checkbox value={'b'}>b</Checkbox>
				<Checkbox value={'c'}>c</Checkbox>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
			</Checkbox.Group>

			<Checkbox.Group value={['a']} onChange={handleGroupChange}>
				<Checkbox value={'a'}>a</Checkbox>
				<Checkbox value={'b'}>b</Checkbox>
				<Checkbox value={'c'}>c</Checkbox>
				<Checkbox value={1}>1</Checkbox>
				<Checkbox value={2}>2</Checkbox>
			</Checkbox.Group>
		</div>
	);
};
