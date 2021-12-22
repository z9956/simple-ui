import { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { Modal, Button, ModalProps } from '../index';

export default {
	title: 'Modal',
	component: Modal,
} as Meta;

export const Base: Story<ModalProps> = () => {
	const [visible, setVisible] = useState(false);

	const handleOk = () => {
		console.log('onOk');
		action('onOk');
	};

	return (
		<div
			className={css`
				width: 400px;
			`}
		>
			<Button onClick={() => setVisible((e) => !e)}>open modal</Button>
			<Modal
				onCancel={() => setVisible(false)}
				onOk={handleOk}
				title={'title'}
				visible={visible}
			>
				<p>modal content</p>
				<p>按Esc键退出 或 点击遮罩层退出</p>
			</Modal>
		</div>
	);
};
