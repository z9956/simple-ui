// Button.stories.ts|tsx

import type { Meta, StoryObj } from '@storybook/react';

import Button, { ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
	/* 👇 The title prop is optional.
	 * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
	 * to learn how to generate automatic titles
	 */
	title: 'Button',
	component: Button,
};

export default meta;
type Story = StoryObj<ButtonProps>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
	render: () => <Button variant={'Primary'} label="Button" />,
};

// import { Fragment } from 'react';
// import { Story } from '@storybook/react';
// import { AiOutlineUpload, AiOutlineFileSearch } from 'react-icons/ai';
// import { css } from '@emotion/css';
//
// import Button, { ButtonProps } from './index';
// import { ButtonTypes } from './Button';
// import { SizeType } from '../config/size';
//
// const styles = {
// 	group: css({
// 		marginTop: 20,
// 	}),
// 	button: css`
// 		margin-right: 10px;
// 	`,
// };
//
// export default {
// 	title: 'Button',
// 	component: Button,
// };
//
// export const Basic: Story<ButtonProps> = () => {
// 	const sizes: SizeType[] = ['sm', 'md', 'lg'];
// 	const buttonTypes: ButtonTypes[] = ['secondary', 'primary', 'error'];
//
// 	return (
// 		<div>
// 			<div>
// 				{buttonTypes.map((type) => {
// 					return (
// 						<div className={styles.group} key={type}>
// 							{sizes.map((size) => {
// 								const text = `${type} ${size}`;
// 								return (
// 									<Fragment key={text}>
// 										<Button
// 											className={styles.button}
// 											variant={type}
// 											size={size}
// 										>
// 											{text}
// 										</Button>
// 									</Fragment>
// 								);
// 							})}
// 						</div>
// 					);
// 				})}
// 				<div className={styles.group}>
// 					<Button className={styles.button} icon={<AiOutlineUpload />} disabled>
// 						上传
// 					</Button>
// 					<Button className={styles.button} icon={<AiOutlineUpload />}>
// 						上传
// 					</Button>
// 					<Button
// 						className={styles.button}
// 						icon={<AiOutlineFileSearch />}
// 						variant={'secondary'}
// 					>
// 						搜索
// 					</Button>
// 				</div>
// 				<div className={styles.group}>
// 					<Button variant="primary" disabled>
// 						disabled
// 					</Button>
// 				</div>
// 				<div className={styles.group}>
// 					<Button variant="primary">click</Button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
