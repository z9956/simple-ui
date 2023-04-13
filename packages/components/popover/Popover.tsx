import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';

import Tooltip, {
	TooltipPlacement,
	TooltipTriggers,
	BaseTooltipProps,
} from '../tooltip/Tooltip';
import { defaultStyles } from '../styles/default';
import { PopoverContext } from './context';

export interface BasePopoverProps extends BaseTooltipProps {
	content?: ReactNode;
	showCloseButton?: boolean;
}

export type PopoverProps = Omit<BasePopoverProps, 'color'>;

const defaultProps = {
	trigger: 'click' as TooltipTriggers,
	placement: 'bottom' as TooltipPlacement,
	defaultVisible: false,
	mouseLeaveDelay: 0,
	mouseEnterDelay: 0,
	overlayClassName: '',
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
	showCloseButton = false,
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
				<div
					className={cx(
						css`
							padding: 10px 0;
						`,
						'popover-inner-content',
					)}
				>
					{content}
				</div>
				{showCloseButton && (
					<div
						className={cx(
							css`
								color: ${defaultStyles.primary};
								cursor: pointer;
							`,
							'popover-inner-close',
						)}
						onClick={() => handleVisibleChange(false)}
					>
						close
					</div>
				)}
			</div>
		);
	}, [content]);

	const onItemClick = () => {
		handleVisibleChange(false);
	};

	const value = {
		onItemClick,
	};

	return (
		<PopoverContext.Provider value={value}>
			<Tooltip
				color={'#fff'}
				overlayClassName={cx(
					css`
						color: ${defaultStyles.defaultColor};
						background-color: #fff;
						box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
							0 9px 28px 8px #0000000d;
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
		</PopoverContext.Provider>
	);
};

Popover.defaultProps = defaultProps;

Popover.displayName = 'Popover';

export default Popover;
