import { Story } from '@storybook/react';

import { Radio, RadioProps, RadioGroupProps } from '../index';
import { RadioEvent } from './Radio';
import { RadioValueType } from './Group';

export default {
	title: 'Radio',
	component: Radio,
};

export const Base: Story<RadioProps> = () => {
	const handleChange = (e: RadioEvent) => {
		console.log(e);
	};

	return (
		<div>
			<Radio disabled value={'北京'}>
				北京
			</Radio>
			<Radio value={'上海'} onChange={handleChange}>
				上海
			</Radio>
			<Radio value={'广东'} defaultChecked onChange={handleChange}>
				广东
			</Radio>
		</div>
	);
};

export const Group: Story<RadioGroupProps> = () => {
	const handleGroupChange = (e: RadioValueType) => {
		console.log(e);
	};

	return (
		<div>
			<Radio.Group value={'a'} disabled>
				<Radio value={'a'}>a</Radio>
				<Radio value={'b'}>b</Radio>
				<Radio value={'c'}>c</Radio>
				<Radio value={1}>1</Radio>
				<Radio value={2}>2</Radio>
			</Radio.Group>

			<Radio.Group value={'a'} onChange={handleGroupChange}>
				<Radio value={'a'}>a</Radio>
				<Radio value={'b'}>b</Radio>
				<Radio value={'c'}>c</Radio>
				<Radio value={1}>1</Radio>
				<Radio value={2}>2</Radio>
			</Radio.Group>
		</div>
	);
};
