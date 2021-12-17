import { Fragment } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { AiOutlineUpload, AiOutlineFileSearch } from 'react-icons/ai';
import { css } from '@emotion/css';

import Button, { ButtonProps } from '../button';
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

export default {
	title: 'Button',
	component: Button,
} as Meta;

export const Basic: Story<ButtonProps> = () => {
	const sizes: SizeType[] = ['sm', 'md', 'lg'];
	const buttonTypes: ButtonTypes[] = ['secondary', 'primary', 'error'];

	return (
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
					<Button variant="primary" onClick={action('button action click')}>
						click
					</Button>
				</div>
			</div>
		</div>
	);
};
