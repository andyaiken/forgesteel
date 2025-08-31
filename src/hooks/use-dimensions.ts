import { useCallback, useLayoutEffect, useState } from 'react';

interface ElementDimensions {
	width: number;
	height: number;
}

export const useDimensions = <T extends HTMLElement>(): [ (node: T | null) => void, ElementDimensions ] => {
	const [ ref, setRef ] = useState<T | null>(null);
	const [ size, setSize ] = useState<ElementDimensions>({ width: 0, height: 0 });

	const handleSize = useCallback(() => {
		if (ref) {
			setSize({
				width: ref.offsetWidth,
				height: ref.offsetHeight
			});
		}
	}, [ ref ]);

	useLayoutEffect(() => {
		if (!ref) return;

		handleSize();

		const resizeObserver = new ResizeObserver(handleSize);
		resizeObserver.observe(ref);

		return () => resizeObserver.disconnect();
	}, [ ref, handleSize ]);

	return [ setRef, size ];
};
