import { FC, ReactNode, FormEvent, useRef, useState, useCallback } from 'react';
import { cx } from '@emotion/css';
import { AiFillDelete } from 'react-icons/all';

import { getUploadStyles } from './style';

export interface UploadFile extends File {
	uid: string;
	url?: string;
}

export interface UploadProps {
	className?: string;
	onChange: (event: FormEvent<HTMLInputElement>) => void;
	multiple?: boolean;
	accept?: string;
	disabled?: boolean;
	maxCount?: number;
	fileList?: UploadFile[];
	showUploadList?: boolean;
	onRemove?: (file: UploadFile) => void;
	children?: ReactNode;
}

export const Upload: FC<UploadProps> = ({
	className,
	children,
	onChange,
	onRemove,
	maxCount,
	showUploadList = true,
	accept,
	multiple,
	disabled,
	...otherProps
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [files, setFiles] = useState<UploadFile[]>([]);

	const isDisabled = disabled || Boolean(maxCount && files.length >= maxCount);

	const handleChange = useCallback(
		(e: FormEvent<HTMLInputElement>) => {
			const fileList = e.currentTarget.files;

			if (!fileList) return;
			let fileArray: UploadFile[] = [];

			let count = files.length;
			for (let i = 0; i < fileList.length; i++) {
				if (maxCount && count >= maxCount) {
					break;
				} else {
					const file = fileList[i];

					fileArray.push(
						Object.assign(file, {
							uid: `${Date.now() + Math.random()}`,
							url: URL.createObjectURL(file),
						}),
					);
				}
				count++;
			}

			setFiles([...files.concat(fileArray)]);

			onChange(e);

			if (inputRef.current) inputRef.current.value = '';
		},
		[onChange, files],
	);

	const handleClick = () => {
		const el = inputRef.current;

		el?.click();
	};

	const handleRemoveFile = (index: number) => {
		const file = files[index];
		onRemove?.(file);

		files.splice(index, 1);
		setFiles([...files]);
	};

	const renderUploadList = () => {
		return (
			<div className={styles.files}>
				{files &&
					files.map((file, index) => {
						return (
							<div className={styles.file} key={file.uid}>
								{/*<img src={file.url} alt={file.name}/>*/}
								<span className={'name'}>{file.name}</span>
								<span className={styles.remove}>
									<AiFillDelete onClick={() => handleRemoveFile(index)} />
								</span>
							</div>
						);
					})}
			</div>
		);
	};

	const styles = getUploadStyles();

	return (
		<div className={styles.wrap}>
			<span className={cx(isDisabled && styles.disabled)} onClick={handleClick}>
				<input
					type="file"
					ref={inputRef}
					className={cx(styles.upload, className)}
					onClick={(e) => e.stopPropagation()}
					onChange={handleChange}
					accept={accept}
					multiple={multiple}
					disabled={isDisabled}
					{...otherProps}
				/>
				{children && children}
			</span>
			{showUploadList && renderUploadList()}
		</div>
	);
};

Upload.displayName = 'Upload';

export default Upload;
