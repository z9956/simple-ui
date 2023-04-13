import { useState, useEffect } from 'react';

import { SIMPLE_UI } from './constant';
import { getId } from './collections';

const createElement = (id: string): HTMLElement => {
	const el = document.createElement('div');
	el.setAttribute('id', id);
	return el;
};

const usePortal = (
	id: string = getId(),
	getContainer?: () => HTMLElement | null,
) => {
	const currentId = `${SIMPLE_UI}-${id}`;

	const [el, setEl] = useState<HTMLElement | null>(createElement(currentId));

	useEffect(() => {
		const container = getContainer ? getContainer() : null;
		const parent = container ? container : document.body;
		const hasEle = parent.querySelector<HTMLElement>(`#${currentId}`);
		const el = hasEle ? hasEle : createElement(currentId);

		if (!hasEle) {
			parent.appendChild(el);
		}

		setEl(el);
	}, []);

	return el;
};

export default usePortal;
