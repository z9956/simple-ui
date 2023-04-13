import { useState } from 'react';
import { Story } from '@storybook/react';
import { css } from '@emotion/css';

import { Modal, Button, ModalProps } from '../index';

export default {
	title: 'Modal',
	component: Modal,
};

export const Base: Story<ModalProps> = () => {
	const [visible, setVisible] = useState(false);

	const handleOk = () => {
		console.log('onOk');
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
