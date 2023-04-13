import { ReactNode, FC, HTMLAttributes, useState } from 'react';
import { css, cx } from '@emotion/css';

import Preview, { PreviewProps } from './Preview';
import { GroupContext } from './context';

export interface BaseGroupProps {
	className?: string;
	children?: ReactNode;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseGroupProps>;

export type PreviewUrl = {
	src: string;
};

export type ImageGroupProps = BaseGroupProps & NativeAttrs;

const Group: FC<ImageGroupProps> = (props) => {
	const { className, children } = props;

	const [preview, setPreview] = useState<boolean>(false);
	const [current, setCurrent] = useState<number>(0);
	const [previewUrls, setPreviewUrls] = useState<Map<number, PreviewUrl>>(
		new Map(),
	);

	// const count = Children.count(children);

	const registerImage = (id: number, src: string) => {
		const unRegister = () => {
			setPreviewUrls((oldPreviewUrls) => {
				const clonePreviewUrls = new Map(oldPreviewUrls);
				const deleteResult = clonePreviewUrls.delete(id);
				return deleteResult ? clonePreviewUrls : oldPreviewUrls;
			});
		};

		setPreviewUrls((oldPreviewUrls) => {
			return new Map(oldPreviewUrls).set(id, {
				src,
			});
		});

		return unRegister;
	};

	const providerValue = {
		inGroup: true,
		current,
		setCurrent,
		setPreview,
		registerImage,
		previewUrls,
	};

	const previewProps: PreviewProps = {
		src: '',
		visible: preview,
		handleCancel: () => setPreview(false),
	};

	if (current !== undefined) {
		const currentPreviewUrl = previewUrls.get(current);

		if (currentPreviewUrl) previewProps.src = currentPreviewUrl.src;
	}

	return (
		<GroupContext.Provider value={providerValue}>
			<div
				className={cx(
					css`
						width: auto;
						box-sizing: border-box;

						> label {
							margin-right: 8px;
						}
					`,
					className,
				)}
			>
				{children}

				<Preview {...previewProps} />
			</div>
		</GroupContext.Provider>
	);
};

Group.displayName = 'Group';

export default Group;
