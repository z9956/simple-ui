import {
	FC,
	ReactNode,
	PropsWithChildren,
	CSSProperties,
	HTMLAttributes,
	MouseEvent,
	useState,
	useRef,
	useEffect,
} from 'react';

import TooltipContent from './TooltipContent';
import { css } from '@emotion/css';
import useClickAway from '../utils/useClickAway';

export type TooltipTriggers = 'hover' | 'click' | 'contextMenu';

export type TooltipPlacement =
	| 'top'
	| 'left'
	| 'right'
	| 'bottom'
	| 'topLeft'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomRight'
	| 'leftTop'
	| 'leftBottom'
	| 'rightTop'
	| 'rightBottom';

export interface BaseTooltipProps {
	trigger?: TooltipTriggers;
	title: string | ReactNode;
	color?: string;
	visible?: boolean;
	placement?: TooltipPlacement;
	overlayStyle?: CSSProperties;
	overlayClassName?: string;
	defaultVisible?: boolean;
	onVisibleChange?: (visible: boolean) => void;
	mouseLeaveDelay?: number;
	mouseEnterDelay?: number;
	children?: ReactNode;
}

const defaultProps = {
	trigger: 'hover' as TooltipTriggers,
	placement: 'top' as TooltipPlacement,
	defaultVisible: false,
	mouseLeaveDelay: 0,
	mouseEnterDelay: 0,
	overlayClassName: '',
	onVisibleChange: (() => {}) as (visible: boolean) => void,
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseTooltipProps>;

export type TooltipProps = BaseTooltipProps & NativeAttrs;

const otherTriggers = ['click', 'contextMenu'];

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
	placement = 'top',
	children,
	color,
	trigger,
	title,
	mouseLeaveDelay,
	mouseEnterDelay,
	visible: propVisible,
	defaultVisible = false,
	onVisibleChange,
	overlayClassName,
	overlayStyle,
	...otherProps
}: PropsWithChildren<TooltipProps>) => {
	const [visible, setVisible] = useState<boolean>(defaultVisible);

	const ref = useRef<HTMLDivElement>(null);
	const timer = useRef<number>();

	const handleVisibleChange = (nextVisible: boolean) => {
		const clear = () => {
			clearTimeout(timer.current);
			timer.current = undefined;
		};

		const handler = (nextState: boolean) => {
			setVisible(nextState);
			onVisibleChange?.(nextState);
			clear();
		};
		if (nextVisible)
			return (timer.current = window.setTimeout(
				() => handler(true),
				mouseEnterDelay,
			));

		const leaveDelayHandler = otherTriggers.includes(trigger as TooltipTriggers)
			? 0
			: mouseLeaveDelay;
		timer.current = window.setTimeout(() => handler(false), leaveDelayHandler);
	};

	const handleMouseEvent = (next: boolean) => {
		return trigger === 'hover' && handleVisibleChange(next);
	};
	const handleClick = () => {
		return trigger === 'click' && handleVisibleChange(!visible);
	};

	const handleContextMenu = (e: MouseEvent<HTMLDivElement>) => {
		e.stopPropagation();
		e.preventDefault();

		return trigger === 'contextMenu' && handleVisibleChange(!visible);
	};

	useEffect(() => {
		if (propVisible !== undefined) {
			setVisible(propVisible);
		}
	}, [propVisible]);

	useClickAway(
		ref,
		() =>
			otherTriggers.includes(trigger as TooltipTriggers) &&
			handleVisibleChange(false),
	);

	const contentProps = {
		visible,
		placement,
		color,
		title,
		overlayClassName,
		overlayStyle,
		parent: ref,
	};

	return (
		<div
			className={css`
				display: inline-block;
			`}
			ref={ref}
			{...otherProps}
			onClick={handleClick}
			onContextMenu={handleContextMenu}
			onMouseEnter={() => handleMouseEvent(true)}
			onMouseLeave={() => handleMouseEvent(false)}
		>
			{children}
			<TooltipContent {...contentProps}>{title}</TooltipContent>
		</div>
	);
};

Tooltip.defaultProps = defaultProps;

Tooltip.displayName = 'Tooltip';

export default Tooltip;
