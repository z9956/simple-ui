import type { Story } from '@storybook/react';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { css } from '@emotion/css';

import Avatar, { AvatarProps, GroupProps } from './index';

const styles = {
	wrap: css`
		caret-color: transparent;
	`,
	group: css({
		marginTop: 20,
	}),
};

export default {
	title: 'Avatar',
	component: Avatar,
};

const src = 'https://avatars.githubusercontent.com/u/46106134?v=4';

export const Base: Story<AvatarProps> = () => {
	return (
		<div className={styles.wrap}>
			<div>
				<Avatar src={src} />
				<Avatar src={src} size={40} />
				<Avatar src={src} size={50} />
			</div>

			<div>
				<Avatar shape={'square'} src={src} />
				<Avatar shape={'square'} src={src} size={40} />
				<Avatar shape={'square'} src={src} size={50} />
			</div>

			<div>
				<Avatar icon={<AiOutlineUser />} style={{ background: '#ccc' }} />
				<Avatar
					shape={'square'}
					icon={<AiOutlineUser />}
					style={{ background: '#87D068' }}
					size={40}
				/>
				<Avatar
					icon={<AiOutlineSearch />}
					style={{ background: 'green' }}
					size={50}
				/>
			</div>

			<div>
				<Avatar style={{ background: '#ccc' }}>user</Avatar>
				<Avatar style={{ background: '#ccc' }}>u</Avatar>
				<Avatar style={{ background: '#ccc' }}>user</Avatar>
			</div>
		</div>
	);
};

export const Group: Story<GroupProps> = () => {
	return (
		<div className={styles.wrap}>
			<Avatar.Group maxCount={2}>
				<Avatar src={src} />
				<Avatar src={src} />
				<Avatar src={src} />
			</Avatar.Group>
		</div>
	);
};
