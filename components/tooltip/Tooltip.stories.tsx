import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { Tooltip, Button, TooltipProps } from '../index';

export default {
	title: 'Tooltip',
	component: Tooltip,
} as Meta;

const title = '文字提示气泡框';

export const Base: Story<TooltipProps> = () => {
	const handleVisibleChange = (e: boolean) => {
		console.log(e);
		action('onVisibleChange')(e);
	};

	return (
		<div
			className={css`
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			`}
		>
			<div>
				<Tooltip
					placement={'bottom'}
					title={title}
					color={'blue'}
					trigger={'click'}
					onVisibleChange={handleVisibleChange}
				>
					<Button>Tooltip click</Button>
				</Tooltip>
				<Tooltip
					placement={'bottomRight'}
					title={title}
					color={'orange'}
					trigger={'contextMenu'}
					onVisibleChange={handleVisibleChange}
				>
					<Button>Tooltip contextMenu</Button>
				</Tooltip>
			</div>

			<div
				className={css`
					> div > div {
						width: 70px;
						height: 32px;
						display: inline-block;

						button {
							width: 70px;
						}
					}
				`}
			>
				<div>
					<div />
					<Tooltip placement="topLeft" title={title} color={'blue'}>
						<Button>TL</Button>
					</Tooltip>
					<Tooltip placement="top" title={title} color={'orange'}>
						<Button>Top</Button>
					</Tooltip>
					<Tooltip placement="topRight" title={title} color={'gray'}>
						<Button>TR</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip placement="leftTop" title={title}>
						<Button>LT</Button>
					</Tooltip>
					<div />
					<div />
					<div />
					<Tooltip placement="rightTop" title={title}>
						<Button>RT</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip placement="left" title={title}>
						<Button>Left</Button>
					</Tooltip>
					<div />
					<div />
					<div />
					<Tooltip placement="right" title={title}>
						<Button>Right</Button>
					</Tooltip>
				</div>
				<div>
					<Tooltip placement="leftBottom" title={title}>
						<Button>LB</Button>
					</Tooltip>
					<div />
					<div />
					<div />
					<Tooltip placement="rightBottom" title={title}>
						<Button>RB</Button>
					</Tooltip>
				</div>
				<div>
					<div />
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
		</div>
	);
};
