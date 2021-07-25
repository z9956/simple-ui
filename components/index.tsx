import React from 'react';
import ReactDOM from 'react-dom';

import './style.scss';

function App() {
	return (
		<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
			<button className="btn">button</button>
			<div>
				<div className="text-xl font-medium text-black">ChitChat</div>
				<p className="text-gray-500">You have a new message!</p>
			</div>
		</div>
	);
}

ReactDOM.render(<App />, document.querySelector('#root'));
