import { MutableRefObject, useEffect, useRef } from 'react';

const useClickAway = (
	ref: MutableRefObject<HTMLElement | null>,
	handler: (event: Event) => void,
) => {
	const handleRef = useRef(handler);

	useEffect(() => {
		handleRef.current = handler;
	}, [handleRef]);

	useEffect(() => {
		const handleClick = (event: Event) => {
			const el = ref.current;

			if (!event || !el || el.contains(event.target as Node)) return;

			handleRef.current(event);
		};

		document.addEventListener('click', handleClick);

		return () => document.removeEventListener('click', handleClick);
	}, [ref]);
};

export default useClickAway;
