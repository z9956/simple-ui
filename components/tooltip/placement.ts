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

export interface TooltipIconPosition {
	top: string;
	left: string;
	right: string;
	bottom: string;
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
	offset: number,
): TooltipPosition => {
	const positions: { [key in TooltipPlacement]: TooltipPosition } = {
		top: {
			top: `${rect.top - offset}px`,
			left: `${rect.left + rect.width / 2}px`,
			transform: 'translate(-50%, -100%)',
		},
		topLeft: {
			top: `${rect.top - offset}px`,
			left: `${rect.left}px`,
			transform: 'translate(0, -100%)',
		},
		topRight: {
			top: `${rect.top - offset}px`,
			left: `${rect.left + rect.width}px`,
			transform: 'translate(-100%, -100%)',
		},
		bottom: {
			top: `${rect.bottom + offset}px`,
			left: `${rect.left + rect.width / 2}px`,
			transform: 'translate(-50%, 0)',
		},
		bottomLeft: {
			top: `${rect.bottom + offset}px`,
			left: `${rect.left}px`,
			transform: 'translate(0, 0)',
		},
		bottomRight: {
			top: `${rect.bottom + offset}px`,
			left: `${rect.left + rect.width}px`,
			transform: 'translate(-100%, 0)',
		},
		left: {
			top: `${rect.top + rect.height / 2}px`,
			left: `${rect.left - offset}px`,
			transform: 'translate(-100%, -50%)',
		},
		leftTop: {
			top: `${rect.top}px`,
			left: `${rect.left - offset}px`,
			transform: 'translate(-100%, 0)',
		},
		leftBottom: {
			top: `${rect.top + rect.height}px`,
			left: `${rect.left - offset}px`,
			transform: 'translate(-100%, -100%)',
		},
		right: {
			top: `${rect.top + rect.height / 2}px`,
			left: `${rect.right + offset}px`,
			transform: 'translate(0, -50%)',
		},
		rightTop: {
			top: `${rect.top}px`,
			left: `${rect.right + offset}px`,
			transform: 'translate(0, 0)',
		},
		rightBottom: {
			top: `${rect.top + rect.height}px`,
			left: `${rect.right + offset}px`,
			transform: 'translate(0, -100%)',
		},
	};
	return positions[placement] || (positions.top as TooltipPosition);
};

export const getArrowPosition = (
	placement: TooltipPlacement,
	offsetX: string,
	offsetY: string,
	offsetAbsolute: string = '0px',
): TooltipIconPosition => {
	const positions: { [key in TooltipPlacement]?: TooltipIconPosition } = {
		top: {
			top: 'auto',
			right: 'auto',
			left: '50%',
			bottom: `${offsetAbsolute}`,
			transform: 'translate(-50%, 100%) rotate(45deg)',
		},
		topLeft: {
			top: 'auto',
			right: 'auto',
			left: `${offsetX}`,
			bottom: `${offsetAbsolute}`,
			transform: 'translate(0, 100%) rotate(45deg)',
		},
		topRight: {
			top: 'auto',
			right: `${offsetX}`,
			left: 'auto',
			bottom: `${offsetAbsolute}`,
			transform: 'translate(0, 100%) rotate(45deg)',
		},
		bottom: {
			top: `${offsetAbsolute}`,
			right: 'auto',
			left: '50%',
			bottom: 'auto',
			transform: 'translate(-50%, -100%) rotate(-135deg)',
		},
		bottomLeft: {
			top: `${offsetAbsolute}`,
			right: 'auto',
			left: `${offsetX}`,
			bottom: 'auto',
			transform: 'translate(0, -100%) rotate(-135deg)',
		},
		bottomRight: {
			top: `${offsetAbsolute}`,
			right: `${offsetX}`,
			left: 'auto',
			bottom: 'auto',
			transform: 'translate(0, -100%) rotate(-135deg)',
		},
		left: {
			top: '50%',
			right: '0',
			left: 'auto',
			bottom: 'auto',
			transform: 'translate(100%, -50%) rotate(-45deg)',
		},
		leftTop: {
			top: `${offsetY}`,
			right: '0',
			left: 'auto',
			bottom: 'auto',
			transform: 'translate(100%, -100%) rotate(-45deg)',
		},
		leftBottom: {
			top: 'auto',
			right: '0',
			left: 'auto',
			bottom: `${offsetY}`,
			transform: 'translate(100%, 160%) rotate(-45deg)',
		},
		right: {
			top: '50%',
			right: 'auto',
			left: '0',
			bottom: 'auto',
			transform: 'translate(-100%, -100%) rotate(135deg)',
		},
		rightTop: {
			top: `${offsetY}`,
			right: 'auto',
			left: '0',
			bottom: 'auto',
			transform: 'translate(-100%, -160%) rotate(135deg)',
		},
		rightBottom: {
			top: 'auto',
			right: 'auto',
			left: '0',
			bottom: `${offsetY}`,
			transform: 'translate(-100%, 100%) rotate(135deg)',
		},
	};

	return positions[placement] || (positions.top as TooltipIconPosition);
};
