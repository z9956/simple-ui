import { CSSProperties, FC, SyntheticEvent, useEffect, useState } from 'react';
import { AiFillPicture } from 'react-icons/all';

import Preview from './Preview';
import { useGroupContext } from './context';
import { getImageStyles } from './style';

export interface BaseImageProps {
	src: string;
	alt: string;
	width?: string | number;
	className?: string;
	style?: CSSProperties;
}

type NativeAttrs = Omit<BaseImageProps, keyof BaseImageProps>;

export type ImageProps = BaseImageProps & NativeAttrs;

let uuid = 0;
const Image: FC<ImageProps> = (props) => {
	const { className, src, alt = '', style, width, ...otherProps } = props;

	const [currentId] = useState<number>(() => {
		uuid += 1;
		return uuid;
	});
	const [hasErr, setHasErr] = useState<boolean>(false);
	const [preview, setPreview] = useState<boolean>(false);

	const {
		setCurrent,
		setPreview: setGroupPreview,
		registerImage,
		inGroup,
	} = useGroupContext();

	const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
		setHasErr(true);
	};

	const styles = getImageStyles();

	useEffect(() => {
		if (registerImage !== undefined) {
			registerImage(currentId, src);
		}
	}, []);

	useEffect(() => {
		if (registerImage !== undefined) {
			registerImage(currentId, src);
		}
	}, [src, inGroup, !hasErr]);

	if (hasErr) {
		return (
			<div className={styles.err}>
				<span>
					<AiFillPicture />
				</span>
			</div>
		);
	}

	const handleClick = () => {
		if (inGroup) {
			setCurrent?.(currentId);
			setGroupPreview?.(true);
		}

		setPreview((v) => !v);
	};

	const previewProps = {
		visible: preview,
		src,
		alt,
		handleCancel: handleClick,
	};

	return (
		<div style={style} className={styles.image}>
			<div className="image-mask" onClick={handleClick}>
				<span>预览</span>
			</div>
			<img
				width={width}
				onError={handleError}
				{...otherProps}
				src={src}
				alt={alt}
			/>
			{!inGroup && <Preview {...previewProps} />}
		</div>
	);
};

export default Image;
