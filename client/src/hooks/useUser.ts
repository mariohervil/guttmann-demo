import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

export interface UserInfo {
	username: string;
	role: number;
}

export const useUser = () => {
	const [userData, setUserData] = useState<UserInfo>();
	const [error, setError] = useState<AxiosError | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		axios
			.get('//localhost:8080/auth/session', { withCredentials: true })
			.then((res: AxiosResponse) => {
				setUserData(res.data);
				setIsLoading(false);
			})
			.catch((err: AxiosError) => {
				console.log(err);
				setError(err);
				setIsLoading(false);
			});
	}, []);

	return {
		userData,
		error,
		isLoading,
	};
};
