import {
	CSSProperties,
	FC,
	MutableRefObject,
	useEffect,
	useState,
	useMemo,
	MouseEvent,
	ReactNode,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import { css, cx } from '@emotion/css';

import { TIMEOUT } from '../utils/constant';
import { TooltipPlacement } from './Tooltip';
import usePortal from '../utils/usePortal';
import {
	defaultTooltipPosition,
	getArrowColor,
	getArrowPosition,
	getPosition,
	TooltipPosition,
} from './placement';
import { defaultStyles } from '../styles/default';
import useResize from '../utils/useResize';
import '../styles/transition';

export type TooltipContentProps = {
	visible: boolean;
	color?: string;
	title: string | ReactNode;
	placement: TooltipPlacement;
	overlayStyle?: CSSProperties;
	overlayClassName?: string;
	children?: ReactNode;
	parent?: MutableRefObject<HTMLElement | null>;
};

export interface ReactiveDomReact {
	top: number;
	bottom: number;
	left: number;
	right: number;
	width: number;
	height: number;
}

const defaultRect: ReactiveDomReact = {
	top: -1000,
	left: -1000,
	right: -1000,
	bottom: -1000,
	width: 0,
	height: 0,
};

export const getRect = (
	ref: MutableRefObject<HTMLElement | null>,
): ReactiveDomReact => {
	if (!ref || !ref.current) return defaultRect;
	const rect = ref.current.getBoundingClientRect();
	return {
		...rect,
		width: rect.width || rect.right - rect.left,
		height: rect.height || rect.bottom - rect.top,
		top: rect.top + document.documentElement.scrollTop,
		bottom: rect.bottom + document.documentElement.scrollTop,
		left: rect.left + document.documentElement.scrollLeft,
		right: rect.right + document.documentElement.scrollLeft,
	};
};

const arrowOffset = {
	x: '0.75em',
	y: '0.75em',
};

const offset = 12;

const TooltipContent: FC<TooltipContentProps> = ({
	visible,
	color,
	title,
	children,
	placement,
	overlayStyle,
	overlayClassName,
	parent,
}) => {
	const el = usePortal('tooltip');
	const [rect, setRect] = useState<TooltipPosition>(defaultTooltipPosition);

	const arrowPosition = useMemo(
		() => getArrowPosition(placement, arrowOffset.x, arrowOffset.y),
		[placement],
	);

	const arrowBgColor = useMemo(
		() => getArrowColor(placement, color),
		[placement, color],
	);

	if (!parent) return null;

	const updateRect = () => {
		const position = getPosition(placement, getRect(parent), offset);
		setRect(position);
	};

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useResize(updateRect);

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		updateRect();
	}, [visible]);

	const preventHandler = (event: MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	};

	if (!el) return null;

	return createPortal(
		<CSSTransition in={visible} timeout={TIMEOUT} classNames="my-node">
			<div
				onClick={preventHandler}
				style={overlayStyle}
				className={cx(
					css`
						width: auto;
						height: auto;
						display: ${visible ? 'block' : 'none'};
						position: absolute;
						top: ${rect.top};
						left: ${rect.left};
						padding: 6px 8px;
						z-index: 1000;
						transform: ${rect.transform};
						border-radius: 2px;
						font-size: ${defaultStyles.fontSize};
						box-sizing: border-box;
						color: #fff;
						background-color: ${color ?? 'rgba(0, 0, 0, 0.75)'};
					`,
					overlayClassName,
				)}
			>
				{title}
				<div
					className={cx(css`
						min-width: 6px;
						min-height: 6px;
						box-sizing: border-box;
						position: absolute;
						top: ${arrowPosition.top};
						right: ${arrowPosition.right};
						left: ${arrowPosition.left};
						bottom: ${arrowPosition.bottom};
						transform: ${arrowPosition.parentTransform};
						pointer-events: none;
						z-index: 1;
						//overflow: hidden;
						background: 0 0;
					`)}
				>
					<span
						className={cx(
							css`
								width: 6px;
								height: 6px;
								box-sizing: border-box;
								position: absolute;
								transform: ${arrowPosition.transform};
								background: ${arrowBgColor?.bgColor};
								// background-color: ${color ?? 'rgba(0, 0, 0, 0.75)'};
								// background: linear-gradient(-45deg, deeppink, deeppink 50%, transparent 50%, transparent 100%);
								pointer-events: none;
							`,
							'tooltip-arrow',
						)}
					/>
				</div>
			</div>
		</CSSTransition>,
		el,
	);
};

export default TooltipContent;
