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
	parentTransform: string;
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
			parentTransform: 'translate(0, 100%)',
			transform: 'translate(0, -50%) rotate(45deg)',
		},
		topLeft: {
			top: 'auto',
			right: 'auto',
			left: `${offsetX}`,
			bottom: `${offsetAbsolute}`,
			parentTransform: 'translate(0, 100%)',
			transform: 'translate(0, -50%) rotate(45deg)',
		},
		topRight: {
			top: 'auto',
			right: `${offsetX}`,
			left: 'auto',
			bottom: `${offsetAbsolute}`,
			parentTransform: 'translate(0, 100%)',
			transform: 'translate(0, -50%) rotate(45deg)',
		},
		bottom: {
			top: `${offsetAbsolute}`,
			right: 'auto',
			left: '50%',
			bottom: 'auto',
			parentTransform: 'translate(0, -100%)',
			transform: 'translate(0, 50%) rotate(45deg)',
		},
		bottomLeft: {
			top: `${offsetAbsolute}`,
			right: 'auto',
			left: `${offsetX}`,
			bottom: 'auto',
			parentTransform: 'translate(0, -100%)',
			transform: 'translate(0, 50%) rotate(45deg)',
		},
		bottomRight: {
			top: `${offsetAbsolute}`,
			right: `${offsetX}`,
			left: 'auto',
			bottom: 'auto',
			parentTransform: 'translate(0, -100%)',
			transform: 'translate(0, 50%) rotate(45deg)',
		},
		left: {
			top: '50%',
			right: '0',
			left: 'auto',
			bottom: 'auto',
			parentTransform: 'translate(100%, 0)',
			transform: 'translate(-50%, 0) rotate(45deg)',
		},
		leftTop: {
			top: `${offsetY}`,
			right: '0',
			left: 'auto',
			bottom: 'auto',
			parentTransform: 'translate(100%, 0)',
			transform: 'translate(-50%, 0) rotate(45deg)',
		},
		leftBottom: {
			top: 'auto',
			right: '0',
			left: 'auto',
			bottom: `${offsetY}`,
			parentTransform: 'translate(100%, 0)',
			transform: 'translate(-50%, 0) rotate(45deg)',
		},
		right: {
			top: '50%',
			right: 'auto',
			left: '0',
			bottom: 'auto',
			parentTransform: 'translate(-100%, 0)',
			transform: 'translate(50%, 0) rotate(45deg)',
		},
		rightTop: {
			top: `${offsetY}`,
			right: 'auto',
			left: '0',
			bottom: 'auto',
			parentTransform: 'translate(-100%, 0)',
			transform: 'translate(50%, 0) rotate(45deg)',
		},
		rightBottom: {
			top: 'auto',
			right: 'auto',
			left: '0',
			bottom: `${offsetY}`,
			parentTransform: 'translate(-100%, 0)',
			transform: 'translate(50%, 0) rotate(45deg)',
		},
	};

	return positions[placement] || (positions.top as TooltipIconPosition);
};

export const getArrowColor = (placement: TooltipPlacement, color?: string) => {
	color = color ?? 'rgba(0, 0, 0, 0.75)';

	const bgColors: { [key in TooltipPlacement]?: { bgColor: string } } = {
		top: {
			bgColor: `linear-gradient(-45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		topLeft: {
			bgColor: `linear-gradient(-45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		topRight: {
			bgColor: `linear-gradient(-45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		bottom: {
			bgColor: `linear-gradient(135deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		bottomLeft: {
			bgColor: `linear-gradient(135deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		bottomRight: {
			bgColor: `linear-gradient(135deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		left: {
			bgColor: `linear-gradient(-135deg, ${color}, ${color} 52%, transparent 50%, transparent 100%)`,
		},
		leftTop: {
			bgColor: `linear-gradient(-135deg, ${color}, ${color} 52%, transparent 50%, transparent 100%)`,
		},
		leftBottom: {
			bgColor: `linear-gradient(-135deg, ${color}, ${color} 52%, transparent 50%, transparent 100%)`,
		},
		right: {
			bgColor: `linear-gradient(45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		rightTop: {
			bgColor: `linear-gradient(45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
		rightBottom: {
			bgColor: `linear-gradient(45deg, ${color}, ${color} 50%, transparent 50%, transparent 100%)`,
		},
	};

	return bgColors[placement];
};
