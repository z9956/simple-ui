import { ChangeEvent, KeyboardEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { TooltipProps } from '../index';
import Textarea from './Textarea';

export default {
	title: 'Textarea',
	component: Textarea,
} as Meta;

export const Base: Story<TooltipProps> = () => {
	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		console.log(e.target.value);
		action('onChange')(e.target.value);
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		console.log(e);
		action('onPressEnter')(e);
	};

	return (
		<div
			className={css`
				width: 400px;
			`}
		>
			<Textarea onChange={handleChange} onPressEnter={handlePressEnter} />
			<Textarea onChange={handleChange} disabled />
		</div>
	);
};
