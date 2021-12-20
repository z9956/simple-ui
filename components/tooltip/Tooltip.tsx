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
	defaultVisible: boolean;
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
	children,
	color,
	placement,
	trigger,
	title,
	visible: propVisible,
	defaultVisible,
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

	useEffect(() => {
		if (propVisible !== undefined) {
			setVisible(propVisible);
		}
	}, [propVisible]);

	return (
		<div ref={ref} {...otherProps}>
			{children}
		</div>
	);
};

Tooltip.defaultProps = defaultProps;

export default Tooltip;
