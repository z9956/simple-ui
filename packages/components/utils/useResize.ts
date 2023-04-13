import { useEffect } from 'react';

const useResize = (cb: () => unknown, immediatelyInvoke: boolean = true) => {
	useEffect(() => {
		const handleResize = () => cb();

		if (immediatelyInvoke) handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);
};

export default useResize;
