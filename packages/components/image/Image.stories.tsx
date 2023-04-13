import { Story } from '@storybook/react';

import { Image, ImageProps } from '../index';
import reactIcon from '../../../static/react.png';
import jsIcon from '../../../static/javascript.png';
import rssIcon from '../../../static/rss.png';

export default {
	title: 'Image',
	component: Image,
};

export const Base: Story<ImageProps> = () => {
	return (
		<div>
			<Image src={reactIcon} alt={'react'} />
		</div>
	);
};

export const Group: Story<ImageProps> = () => {
	return (
		<div>
			<Image.Group>
				<Image src={reactIcon} alt={'react'} />
				<Image src={jsIcon} alt={'javascript'} />
				<Image src={rssIcon} alt={'rss'} />
			</Image.Group>
		</div>
	);
};
