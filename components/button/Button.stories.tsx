import React, { Fragment } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import Button, { ButtonProps } from '../button';
import { ButtonTypes } from 'components/button/Button';
import { SizeType } from '../config/size';

const styles = {
	group: css({
		marginTop: 20,
	}),
	button: css`
		margin-right: 10px;
	`,
};

export default {
	title: 'Example/Button',
	component: Button,
	// argTypes: {
	// 	variant: {
	// 		Description: '',
	// 		Default: '',
	// 	},
	// },
} as Meta;

export const Basic: Story<ButtonProps> = () => {
	const sizes: SizeType[] = ['sm', 'md', 'lg'];
	const buttonTypes: ButtonTypes[] = ['secondary', 'primary', 'error'];

	return (
		<div>
			<div>
				{buttonTypes.map((type) => {
					return (
						<div className={styles.group}>
							{sizes.map((size) => {
								const text = `${type} ${size}`;
								return (
									<Fragment key={text}>
										<Button
											className={styles.button}
											variant={type}
											size={size}
										>
											{text}
										</Button>
									</Fragment>
								);
							})}
						</div>
					);
				})}
				<div className={styles.group}>
					<Button variant="primary" onClick={action('button action click')}>
						click
					</Button>
				</div>
			</div>
		</div>
	);
};
