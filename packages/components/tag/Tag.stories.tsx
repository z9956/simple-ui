import { Story } from '@storybook/react';
import { css } from '@emotion/css';

import { Tag, TagProps } from '../index';

export default {
	title: 'Tag',
	component: Tag,
};

export const Base: Story<TagProps> = () => {
	return (
		<div
			className={css`
				> span {
					margin-right: 15px;
				}
			`}
		>
			<Tag>default</Tag>
			<Tag color={'rgb(45, 183, 245)'}>tag</Tag>
			<Tag color={'rgb(135, 208, 104)'}>tag</Tag>
			<Tag color={'rgb(16, 142, 233)'}>tag</Tag>
			<Tag color={'rgb(16, 142, 233)'}>tag</Tag>
			<br />
			<Tag type={'secondary'}>secondary</Tag>
			<Tag type={'primary'}>primary</Tag>
			<Tag type={'error'}>error</Tag>
		</div>
	);
};
