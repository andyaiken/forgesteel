import { useEffect, useRef, useState } from 'react';
import type { DiceScene } from '@/components/panels/dice-tray/dice-scene';
import { DieResult } from '@/models/die-result';

import './dice-tray.scss';

interface Props {
	// Each new array is a new throw; the values have already been rolled
	dice: DieResult[];
	height?: number;
	// Called with the values the dice show once they have come to rest (or straight away, if they can't be shown);
	// and again after each reroll
	onSettled: (values: number[]) => void;
	// If given, the user can click a die to reroll it; called when they do, just before the die is thrown
	onReroll?: () => void;
}

export const DiceTray = (props: Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const diceRef = useRef(props.dice);
	const onSettledRef = useRef(props.onSettled);
	const onRerollRef = useRef(props.onReroll);
	const [ scene, setScene ] = useState<DiceScene | null>(null);
	const [ failed, setFailed ] = useState<boolean>(false);

	useEffect(() => {
		diceRef.current = props.dice;
		onSettledRef.current = props.onSettled;
		onRerollRef.current = props.onReroll;
	});

	useEffect(() => {
		let cancelled = false;
		let created: DiceScene | null = null;

		// Loaded on demand, so three.js stays out of the main bundle
		import('@/components/panels/dice-tray/dice-scene')
			.then(module => {
				if (!cancelled && containerRef.current) {
					created = new module.DiceScene(containerRef.current);
					created.onSettled = values => onSettledRef.current(values);
					setScene(created);
				}
			})
			.catch(err => {
				console.error(err);
				if (!cancelled) {
					setFailed(true);
					onSettledRef.current(diceRef.current.map(d => d.value));
				}
			});

		return () => {
			cancelled = true;
			created?.dispose();
		};
	}, []);

	const canReroll = props.onReroll !== undefined;
	useEffect(() => {
		if (scene) {
			scene.onReroll = canReroll ? () => onRerollRef.current?.() : null;
		}
	}, [ scene, canReroll ]);

	useEffect(() => {
		if (scene) {
			try {
				const animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
				scene.roll(props.dice, animate);
			} catch (err) {
				console.error(err);
				setFailed(true);
				onSettledRef.current(props.dice.map(d => d.value));
			}
		}
	}, [ scene, props.dice ]);

	if (failed) {
		return null;
	}

	return (
		<div ref={containerRef} className='dice-tray' style={{ height: props.height || 200 }} />
	);
};
