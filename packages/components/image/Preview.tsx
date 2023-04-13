import { FC, MouseEvent, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import {
	AiOutlineClose,
	AiOutlineRotateRight,
	AiOutlineRotateLeft,
	AiOutlineZoomIn,
	AiOutlineZoomOut,
	AiOutlineLeft,
	AiOutlineRight,
} from 'react-icons/ai';
import { createPortal } from 'react-dom';
import { css, cx } from '@emotion/css';

import { TIMEOUT } from '../utils/constant';
import usePortal from '../utils/usePortal';
import { useGroupContext } from './context';
import { getPreviewStyles } from './style';
import '../styles/transition';

export type PreviewProps = {
	src: string;
	alt?: string;
	visible: boolean;
	handleCancel: () => void;
};

const Preview: FC<PreviewProps> = ({
	visible,
	src,
	alt,

	handleCancel,
}) => {
	const el = usePortal('image');
	const [rotate, setRotate] = useState<number>(0);
	const [zoom, setZoom] = useState<number>(1);

	const { current, inGroup, setCurrent, previewUrls } = useGroupContext();
	const previewUrlsKeys = Array.from(previewUrls.keys());
	const previewGroupCount = previewUrls.size;
	const currentIndex = previewUrlsKeys.indexOf(current);

	if (!el) return null;

	const handleClose = () => {
		handleCancel();
		setRotate(0);
		setZoom(1);
	};

	const handleAddRotate = () => {
		setRotate((state) => {
			state++;
			return state;
		});
	};

	const handleMinusRotate = () => {
		setRotate((state) => {
			state--;
			return state;
		});
	};

	const handleAddZoom = () => {
		setZoom((state) => {
			state++;
			return state;
		});
	};

	const handleMinusZoom = () => {
		if (zoom === 1) return;
		setZoom((state) => {
			state--;
			return state;
		});
	};

	const handleLeft = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();

		if (currentIndex > 0) {
			setCurrent?.(previewUrlsKeys[currentIndex - 1]);
		}
	};

	const handleRight = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();

		if (currentIndex < previewGroupCount - 1) {
			setCurrent?.(previewUrlsKeys[currentIndex + 1]);
		}
	};

	const parentHandle = (e: MouseEvent<HTMLUListElement>) => {
		e.stopPropagation();
		e.preventDefault();
	};
	const styles = getPreviewStyles();

	return createPortal(
		<CSSTransition in={visible} timeout={TIMEOUT} classNames="my-node">
			<div
				className={cx(
					css`
						display: ${visible ? 'block' : 'none'};
						opacity: ${visible ? 1 : 0};
					`,
					styles.modal,
					'image-modal',
				)}
				onClick={handleClose}
			>
				<div className={'image-mask'} />
				<div className={'image-content'}>
					{inGroup && (
						<>
							<div
								className={`left-icon ${currentIndex === 0 && 'disabled'}`}
								onClick={handleLeft}
							>
								<AiOutlineLeft />
							</div>

							<div
								className={`left-icon right-icon ${
									currentIndex === previewGroupCount - 1 && 'disabled'
								}`}
								onClick={handleRight}
							>
								<AiOutlineRight />
							</div>
						</>
					)}

					<ul className={'operations'} onClick={parentHandle}>
						<li onClick={handleMinusRotate}>
							<AiOutlineRotateLeft />
						</li>
						<li onClick={handleAddRotate}>
							<AiOutlineRotateRight />
						</li>
						<li
							style={{
								opacity: `${zoom === 1 ? 0.5 : 1}`,
								cursor: `${zoom === 1 ? 'not-allowed' : 'pointer'}`,
							}}
							onClick={handleMinusZoom}
						>
							<AiOutlineZoomOut />
						</li>
						<li onClick={handleAddZoom}>
							<AiOutlineZoomIn />
						</li>
						<li onClick={handleClose}>
							<AiOutlineClose />
						</li>
					</ul>

					<img
						className={cx(
							css`
								transform: scale3d(${zoom}, ${zoom}, ${zoom})
									rotate(${rotate * 90}deg) translate(-50%, -50%);
							`,
						)}
						src={src}
						alt={alt}
					/>
				</div>
			</div>
		</CSSTransition>,
		el,
	);
};

export default Preview;
