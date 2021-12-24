import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import Tooltip, {
	TooltipPlacement,
	TooltipTriggers,
	BaseTooltipProps,
} from '../tooltip/Tooltip';
import { css, cx } from '@emotion/css';
import { defaultStyles } from '../styles/default';

export interface BasePopoverProps extends BaseTooltipProps {
	content?: ReactNode;
}

export type PopoverProps = Omit<BasePopoverProps, 'color'>;

const defaultProps = {
	trigger: 'click' as TooltipTriggers,
	placement: 'bottom' as TooltipPlacement,
	defaultVisible: false,
	mouseLeaveDelay: 0,
	mouseEnterDelay: 0,
	overlayClassName: '',
	onVisibleChange: (() => {}) as (visible: boolean) => void,
};

const Popover: FC<PopoverProps> = ({
	trigger,
	title,
	children,
	content,
	visible: propVisible,
	onVisibleChange,
	overlayClassName,
	defaultVisible = false,
	...otherProps
}: PopoverProps) => {
	const [visible, setVisible] = useState<boolean>(defaultVisible);

	const handleVisibleChange = (next: boolean) => {
		setVisible(next);
		onVisibleChange?.(next);
	};

	useEffect(() => {
		if (propVisible !== undefined) {
			setVisible(propVisible);
		}
	}, [propVisible]);

	const renderContent = useMemo(() => {
		return (
			<div
				className={cx(
					css`
						min-width: 150px;
						p {
							margin: 0;
						}
					`,
					'popover-content',
				)}
			>
				<div
					className={cx(
						css`
							padding-bottom: 5px;
							border-bottom: 1px solid ${defaultStyles.defaultBorder};
						`,
						'popover-inner-title',
					)}
				>
					{title}
				</div>
				<div className="popover-inner-content">{content}</div>
			</div>
		);
	}, [content]);

	return (
		<Tooltip
			overlayClassName={cx(
				css`
					color: ${defaultStyles.defaultColor};
					background-color: #fff;
					box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
						0 9px 28px 8px #0000000d;

					.tooltip-arrow {
						border-color: #fff;
						box-shadow: 3px 3px 7px #00000012;
					}
				`,
				overlayClassName,
			)}
			visible={visible}
			title={renderContent}
			onVisibleChange={handleVisibleChange}
			trigger={trigger}
			{...otherProps}
		>
			{children}
		</Tooltip>
	);
};

Popover.defaultProps = defaultProps;

Popover.displayName = 'Popover';

export default Popover;
