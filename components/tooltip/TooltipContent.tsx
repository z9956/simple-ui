import {
	CSSProperties,
	FC,
	MutableRefObject,
	useEffect,
	useState,
	MouseEvent,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';
import { css, cx, injectGlobal } from '@emotion/css';

import { TooltipPlacement } from './Tooltip';
import usePortal from '../utils/usePortal';
import {
	defaultTooltipPosition,
	getPosition,
	TooltipPosition,
} from './placement';
import { defaultStyles } from '../styles/default';
import useResize from '../utils/useResize';

injectGlobal`
  .my-node-enter {
    opacity: 0;
  }

  .my-node-enter-active {
    opacity: 1;
    transition: opacity 200ms;
  }

  .my-node-exit {
    opacity: 1;
  }

  .my-node-exit-active {
    opacity: 0;
    transition: opacity 200ms;
  }
`;

export type TooltipContentProps = {
	visible: boolean;
	color?: string;
	title: string;
	placement: TooltipPlacement;
	overlayStyle?: CSSProperties;
	overlayClassName?: string;
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

const TooltipContent: FC<TooltipContentProps> = ({
	visible,
	color,
	title,
	placement,
	overlayStyle,
	overlayClassName,
	parent,
}) => {
	const [rect, setRect] = useState<TooltipPosition>(defaultTooltipPosition);
	const el = usePortal('tooltip');

	if (!parent) return null;

	const updateRect = () => {
		const position = getPosition(placement, getRect(parent));
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

	console.log(el);

	if (!el) return null;
	return createPortal(
		<CSSTransition in={visible} timeout={200} classNames="my-node">
			<div
				onClick={preventHandler}
				style={overlayStyle}
				className={cx(
					css`
						width: auto;
						height: auto;
						//display: ${visible ? 'block' : 'none'};
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
						pointer-events: none;
					`,
					overlayClassName,
				)}
			>
				<div
					className={css`
						box-sizing: border-box;
						position: relative;
					`}
				>
					{title}
				</div>
			</div>
		</CSSTransition>,
		el,
	);
};

export default TooltipContent;
