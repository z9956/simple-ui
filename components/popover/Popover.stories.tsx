import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { css } from '@emotion/css';

import { Popover, Button, PopoverProps } from '../index';

export default {
	title: 'Popover',
	component: Popover,
} as Meta;

export const Base: Story<PopoverProps> = () => {
	const handleVisibleChange = (e: boolean) => {
		console.log(e);
		action('onVisibleChange')(e);
	};

	const title = <span>Title</span>;
	const content = (
		<div>
			<p>Content</p>
			<p>Content</p>
		</div>
	);

	return (
		<div
			className={css`
				width: 500px;
				height: 500px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			`}
		>
			<div className={css``}>
				<Popover
					placement={'bottom'}
					title={title}
					content={content}
					trigger={'click'}
					onVisibleChange={handleVisibleChange}
				>
					<Button>Popover click</Button>
				</Popover>
				<Popover
					placement={'bottomRight'}
					title={title}
					content={content}
					trigger={'contextMenu'}
					onVisibleChange={handleVisibleChange}
				>
					<Button>Popover contextMenu</Button>
				</Popover>
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
					<Popover placement="topLeft" title={title} content={content}>
						<Button>TL</Button>
					</Popover>
					<Popover placement="top" title={title} content={content}>
						<Button>Top</Button>
					</Popover>
					<Popover placement="topRight" title={title} content={content}>
						<Button>TR</Button>
					</Popover>
				</div>
				<div>
					<Popover placement="leftTop" title={title} content={content}>
						<Button>LT</Button>
					</Popover>
					<div />
					<div />
					<div />
					<Popover placement="rightTop" title={title} content={content}>
						<Button>RT</Button>
					</Popover>
				</div>
				<div>
					<Popover placement="left" title={title} content={content}>
						<Button>Left</Button>
					</Popover>
					<div />
					<div />
					<div />
					<Popover placement="right" title={title} content={content}>
						<Button>Right</Button>
					</Popover>
				</div>
				<div>
					<Popover placement="leftBottom" title={title} content={content}>
						<Button>LB</Button>
					</Popover>
					<div />
					<div />
					<div />
					<Popover placement="rightBottom" title={title} content={content}>
						<Button>RB</Button>
					</Popover>
				</div>
				<div>
					<div />
					<Popover placement="bottomLeft" title={title} content={content}>
						<Button>BL</Button>
					</Popover>
					<Popover placement="bottom" title={title} content={content}>
						<Button>Bottom</Button>
					</Popover>
					<Popover placement="bottomRight" title={title} content={content}>
						<Button>BR</Button>
					</Popover>
				</div>
			</div>
		</div>
	);
};
