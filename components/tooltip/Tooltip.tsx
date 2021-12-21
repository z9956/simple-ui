import {
	FC,
	ReactNode,
	PropsWithChildren,
	CSSProperties,
	HTMLAttributes,
	useState,
	useRef,
	useEffect,
} from 'react';

import TooltipContent from './TooltipContent';
import { css } from '@emotion/css';

type TooltipTriggers = 'hover' | 'click' | 'contextMenu';

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
	title: string;
	color?: string;
	visible?: boolean;
	placement?: TooltipPlacement;
	overlayStyle?: CSSProperties;
	overlayClassName?: string;
	defaultVisible?: boolean;
	onVisibleChange?: (visible: boolean) => void;
	children?: ReactNode;
}

const defaultProps = {
	trigger: 'hover' as TooltipTriggers,
	placement: 'top' as TooltipPlacement,
	defaultVisible: false,
	overlayClassName: '',
	onVisibleChange: (() => {}) as (visible: boolean) => void,
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseTooltipProps>;

export type TooltipProps = BaseTooltipProps & NativeAttrs;

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
	placement = 'top',
	children,
	color,
	trigger,
	title,
	visible: propVisible,
	defaultVisible = false,
	onVisibleChange,
	overlayClassName,
	overlayStyle,
	...otherProps
}: PropsWithChildren<TooltipProps>) => {
	const [visible, setVisible] = useState<boolean>(defaultVisible);

	const ref = useRef<HTMLDivElement>(null);

	const handleVisibleChange = (nextVisible: boolean) => {
		setVisible(nextVisible);
		onVisibleChange?.(nextVisible);
	};

	const handleMouseEvent = (next: boolean) => {
		return trigger === 'hover' && handleVisibleChange(next);
	};
	const handleClick = () => {
		return trigger === 'click' && handleVisibleChange(!visible);
	};

	const handleContextMenu = () => {
		return trigger === 'contextMenu' && handleVisibleChange(!visible);
	};

	useEffect(() => {
		if (propVisible !== undefined) {
			setVisible(propVisible);
		}
	}, [propVisible]);

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
			{visible && <TooltipContent {...contentProps}>{title}</TooltipContent>}
		</div>
	);
};

Tooltip.defaultProps = defaultProps;

export default Tooltip;
