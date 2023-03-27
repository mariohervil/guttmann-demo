import { useEffect, useState } from 'react';

const INTERVAL_IN_MILISECONDS = 1000;

export const Timer = (time_in_ms: number) => {
	const [time, setTime] = useState(time_in_ms);
	const [referenceTime, setReferenceTime] = useState(Date.now());

	useEffect(() => {
		const countDownUntilZero = () => {
			setTime((prevTime) => {
				if (prevTime <= 0) return 0;
				const now = Date.now();
				const interval = now - referenceTime;
				setReferenceTime(now);
				return prevTime - interval;
			});
		};
		setTimeout(countDownUntilZero, INTERVAL_IN_MILISECONDS);
	}, [time]);
	return <> {(time / 1000).toFixed(1)}s </>;
};
