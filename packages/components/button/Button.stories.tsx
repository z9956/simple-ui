import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AiOutlineUpload, AiOutlineFileSearch } from 'react-icons/ai';
import { css } from '@emotion/css';

import Button, { ButtonProps } from './index';
import { ButtonTypes } from './Button';
import { SizeType } from '../config/size';

const styles = {
	group: css({
		marginTop: 20,
	}),
	button: css`
		margin-right: 10px;
	`,
};

const meta: Meta<ButtonProps> = {
	tags: ['autodocs'],
	title: 'Button',
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	render: () => <Button variant="primary">Button</Button>,
};

export const Secondary: Story = {
	render: () => <Button variant={'secondary'}>Button</Button>,
};

export const Error: Story = {
	render: () => <Button variant="error">Button</Button>,
};

const sizes: SizeType[] = ['sm', 'md', 'lg'];
const buttonTypes: ButtonTypes[] = ['secondary', 'primary', 'error'];

export const Basic: Story = {
	render: (args) => (
		<div>
			<div>
				{buttonTypes.map((type) => {
					return (
						<div className={styles.group} key={type}>
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
					<Button className={styles.button} icon={<AiOutlineUpload />} disabled>
						上传
					</Button>
					<Button className={styles.button} icon={<AiOutlineUpload />}>
						上传
					</Button>
					<Button
						className={styles.button}
						icon={<AiOutlineFileSearch />}
						variant={'secondary'}
					>
						搜索
					</Button>
				</div>
				<div className={styles.group}>
					<Button variant="primary" disabled>
						disabled
					</Button>
				</div>
				<div className={styles.group}>
					<Button variant="primary">click</Button>
				</div>
			</div>
		</div>
	),
};
