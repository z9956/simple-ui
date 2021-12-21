import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { Tooltip, Button, TooltipProps } from '../index';

export default {
	title: 'Tooltip',
	component: Tooltip,
} as Meta;

const title = '文字提示气泡框';

const buttonWidth = 70;

export const Base: Story<TooltipProps> = () => {
	const handleVisibleChange = (e: boolean) => {
		console.log(e);
		action('onVisibleChange')(e);
	};

	return (
		<div
			className={css`
				width: 500px;
				height: 500px;
				margin: 50px auto;
				> div > div {
					width: 70px;
					button {
						width: 70px;
					}
				}
			`}
		>
			<div style={{ marginLeft: buttonWidth }}>
				<Tooltip
					placement="topLeft"
					title={title}
					color={'orange'}
					onVisibleChange={handleVisibleChange}
				>
					<Button>TL</Button>
				</Tooltip>
				<Tooltip placement="top" title={title} color={'red'}>
					<Button>Top</Button>
				</Tooltip>
				<Tooltip placement="topRight" title={title}>
					<Button>TR</Button>
				</Tooltip>
			</div>
			<div style={{ width: buttonWidth, float: 'left' }}>
				<Tooltip placement="leftTop" title={title}>
					<Button>LT</Button>
				</Tooltip>
				<Tooltip placement="left" title={title}>
					<Button>Left</Button>
				</Tooltip>
				<Tooltip placement="leftBottom" title={title}>
					<Button>LB</Button>
				</Tooltip>
			</div>
			<div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 + 24 }}>
				<Tooltip placement="rightTop" title={title}>
					<Button>RT</Button>
				</Tooltip>
				<Tooltip placement="right" title={title}>
					<Button>Right</Button>
				</Tooltip>
				<Tooltip placement="rightBottom" title={title}>
					<Button>RB</Button>
				</Tooltip>
			</div>
			<div
				style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}
			>
				<Tooltip placement="bottomLeft" title={title}>
					<Button>BL</Button>
				</Tooltip>
				<Tooltip placement="bottom" title={title}>
					<Button>Bottom</Button>
				</Tooltip>
				<Tooltip placement="bottomRight" title={title}>
					<Button>BR</Button>
				</Tooltip>
			</div>
		</div>
	);
};
