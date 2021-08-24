import React, { Fragment } from 'react';
import { Meta, Story } from '@storybook/react';

import Button, { ButtonProps } from '../../components/button';
import { ButtonTypes } from '../../components/button/button';
import { SizeType } from '../../components/config/size';
import styles from './style';

export default {
	title: 'Example/Button',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' },
	},
} as Meta;

export const Basic: Story<ButtonProps> = () => {
	const sizes: SizeType[] = ['sm', 'md', 'lg'];
	const buttonTypes: ButtonTypes[] = ['secondary', 'primary', 'link'];

	return (
		<div>
			<div>
				{buttonTypes.map((type) => {
					return <div className={styles.group}>
						{
							sizes.map((size) => {
								const text = `${type} ${size}`;
								return (
									<Fragment key={text}>
										<Button className={styles.button} variant={type} size={size}>
											{text}
										</Button>
									</Fragment>
								);
							})
						}
					</div>
				})}
			</div>
		</div>
	);
};
