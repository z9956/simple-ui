import { Meta, Story } from '@storybook/react';
import { css } from '@emotion/css';

import Input, { InputProps } from './index';

const styles = {
	group: css({
		marginTop: 20,
	}),
	button: css`
		margin-right: 10px;
	`,
};

export default {
	title: 'Example/Input',
	component: Input,
} as Meta;

export const Basic: Story<InputProps> = () => {
	return (
		<div>
			<div className={styles.group}>
				<Input />
			</div>

			<div className={styles.group}>
				<Input disabled />
			</div>

			<div className={styles.group}>
				<Input.Search />
			</div>
		</div>
	);
};
