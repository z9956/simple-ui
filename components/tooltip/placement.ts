import { TooltipPlacement } from './Tooltip';

interface ParentDomRect {
	top: number;
	left: number;
	right: number;
	bottom: number;
	width: number;
	height: number;
}

export interface TooltipPosition {
	top: string;
	left: string;
	transform: string;
}

export const defaultTooltipPosition = {
	top: '-1000px',
	left: '-1000px',
	transform: 'none',
};

export const getPosition = (
	placement: TooltipPlacement,
	rect: ParentDomRect,
): TooltipPosition => {
	const positions: { [key in TooltipPlacement]: TooltipPosition } = {
		top: {
			top: `${rect.top}px`,
			left: `${rect.left + rect.width / 2}px`,
			transform: 'translate(-50%, -100%)',
		},
		topLeft: {
			top: `${rect.top}px`,
			left: `${rect.left}px`,
			transform: 'translate(0, -100%)',
		},
		topRight: {
			top: `${rect.top}px`,
			left: `${rect.left + rect.width}px`,
			transform: 'translate(-100%, -100%)',
		},
		bottom: {
			top: `${rect.bottom}px`,
			left: `${rect.left + rect.width / 2}px`,
			transform: 'translate(-50%, 0)',
		},
		bottomLeft: {
			top: `${rect.bottom}px`,
			left: `${rect.left}px`,
			transform: 'translate(0, 0)',
		},
		bottomRight: {
			top: `${rect.bottom}px`,
			left: `${rect.left + rect.width}px`,
			transform: 'translate(-100%, 0)',
		},
		left: {
			top: `${rect.top + rect.height / 2}px`,
			left: `${rect.left}px`,
			transform: 'translate(-100%, -50%)',
		},
		leftTop: {
			top: `${rect.top}px`,
			left: `${rect.left}px`,
			transform: 'translate(-100%, 0)',
		},
		leftBottom: {
			top: `${rect.top + rect.height}px`,
			left: `${rect.left}px`,
			transform: 'translate(-100%, -100%)',
		},
		right: {
			top: `${rect.top + rect.height / 2}px`,
			left: `${rect.right}px`,
			transform: 'translate(0, -50%)',
		},
		rightTop: {
			top: `${rect.top}px`,
			left: `${rect.right}px`,
			transform: 'translate(0, 0)',
		},
		rightBottom: {
			top: `${rect.top + rect.height}px`,
			left: `${rect.right}px`,
			transform: 'translate(0, -100%)',
		},
	};
	return positions[placement] || (positions.top as TooltipPosition);
};
