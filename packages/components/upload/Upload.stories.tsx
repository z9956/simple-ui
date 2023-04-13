import { FormEvent } from 'react';
import { AiOutlineUpload } from 'react-icons/ai';
import { Story } from '@storybook/react';
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
};

export const Base: Story<UploadProps> = () => {
	const handleRemoveFile = (file: UploadFile) => {
		console.log(file);
	};

	const handleUpload = (e: FormEvent<HTMLInputElement>) => {
		console.log(e);
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
				<Upload
					onChange={handleUpload}
					maxCount={2}
					onRemove={handleRemoveFile}
				>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						上传文件数量限制为2
					</Button>
				</Upload>
			</div>
			<div>
				<Upload onChange={handleUpload} disabled>
					<Button disabled icon={<AiOutlineUpload />} variant={'secondary'}>
						disabled upload
					</Button>
				</Upload>
			</div>
			<div>
				<Upload
					onChange={handleUpload}
					multiple
					maxCount={3}
					onRemove={handleRemoveFile}
				>
					<Button icon={<AiOutlineUpload />} variant={'secondary'}>
						multiple maxCount: 3
					</Button>
				</Upload>
			</div>
		</div>
	);
};
