import { storiesOf } from '@storybook/react';

import Input from './index';

storiesOf('Input', module).add('text', () => <Input />, {
	component: Input,
});

storiesOf('Input', module).add('Search', () => <Input.Search />, {
	component: Input.Search,
});

storiesOf('Input', module).add('disabled', () => <Input disabled />, {
	component: Input,
});
