import { FormEvent } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { Button, Upload, UploadProps } from '../index';
import { UploadFile } from './Upload';

const styles = {
	wrap: css`
		> div {
			width: 650px;
			margin-bottom: 15px;
		}
	`,
};

export default {
	title: 'Upload',
	component: Upload,
} as Meta;

export const Base: Story<UploadProps> = () => {
	const handleRemoveFile = (e: UploadFile) => {
		action(`onRemove`)(e);
	};

	const handleUpload = (e: FormEvent<HTMLInputElement>) => {
		console.log(e);
		action(`onChange`)(e);
	};

	return (
		<div className={styles.wrap}>
			<div>
				<Upload onChange={handleUpload} onRemove={handleRemoveFile}>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						上传
					</Button>
				</Upload>
			</div>
			<div>
				<Upload onChange={handleUpload} maxCount={2}>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						上传文件数量限制为2
					</Button>
				</Upload>
			</div>
			<div>
				<Upload onChange={handleUpload} disabled>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						disabled upload
					</Button>
				</Upload>
			</div>
			<div>
				<Upload onChange={handleUpload} multiple maxCount={3}>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						multiple maxCount: 3
					</Button>
				</Upload>
			</div>
		</div>
	);
};
