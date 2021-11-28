import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Input, Button } from './index';

const App = () => {
	return (
		<div>
			<Button variant={'primary'}>primary</Button>
			<Button variant={'secondary'}>secondary</Button>
			<Button variant={'error'}>error</Button>
			<Button disabled>error</Button>

			<Input />
			<Input.Search />
		</div>
	);
};

const container = document.createElement('div');
document.body.appendChild(container);

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	container,
);
