import { useEffect, useState } from 'react';
import { IPatient } from '../../../../server/src/models/user.model';
import { IAccount } from '../../../../server/src/models/account.model';
import axios, { AxiosResponse } from 'axios';
import { UserInfo, useUser } from '../../hooks/useUser';

interface UserListProps {
	users: IAccount[];
	onDeleteUser: (name: String) => void;
}

interface AdminListProps {
	patients: IPatient[];
	onDeletePatient: (name: String) => void;
}

function UserList(props: UserListProps) {
	const { users, onDeleteUser } = props;

	return (
		<div className="border rounded-lg p-4">
			<h2 className="text-lg font-semibold mb-4">Users</h2>
			{users.length > 0 ? (
				<ul className="list-disc pl-4">
					{users.map((account: IAccount, index: number) => (
						<li className="text-gray-700" key={index}>
							{account.firstName}
							<button
								className="text-red-500 ml-2"
								onClick={() => onDeleteUser(account.firstName)}
							>
								x
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500">No users found</p>
			)}
		</div>
	);
}

function AdminList(props: AdminListProps) {
	const { patients, onDeletePatient } = props;

	return (
		<div className="border rounded-lg p-4">
			<h2 className="text-lg font-semibold mb-4">Patients</h2>
			{patients.length > 0 ? (
				<ul className="list-disc pl-4">
					{patients.map((patient: IPatient, index: number) => (
						<li className="text-gray-700" key={index}>
							{patient.firstName}
							<button
								className="text-red-500 ml-2"
								onClick={() => onDeletePatient(patient.firstName)}
							>
								x
							</button>
						</li>
					))}
				</ul>
			) : (
				<p className="text-gray-500">No patients found</p>
			)}
		</div>
	);
}

const AdminDashboard = () => {
	// true means users, false means patients
	const [showingUsersOrPatients, setShowingUsers] = useState(false);
	const [users, setUsers] = useState<IAccount[]>([]);
	const [patients, setPatients] = useState<IPatient[]>([]);
	const { userData, error, isLoading } = useUser();

	useEffect(() => {
		axios
			.get('http://localhost:8080/users/accounts', { withCredentials: true })
			.then((res: AxiosResponse) => {
				setUsers(res.data);

				axios
					.get('http://localhost:8080/users/patients', { withCredentials: true })
					.then((res: AxiosResponse) => {
						setPatients(res.data);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleDeleteUser = (name: String) => {
		console.log(`Patient ${name} has been deleted.`);
	};

	const handleDeleteAdmin = (name: String) => {
		console.log(`Admin ${name} has been deleted.`);
	};

	return (



		<div className="container mx-auto px-4">
			<div className="grid grid-cols-3 gap-8 mt-8">
				<div className="bg-white shadow rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4">Admin Info</h2>
					<p>Name: {userData?.username}</p>
					<p>Role: {userData?.role === 1 ? 'Doctor' : 'Admin'}</p>
				</div>
				<div className="col-span-2">
					<div className="bg-white shadow rounded-lg p-6">
						<div className="flex justify-between items-center">
							<h2 className="text-lg font-semibold mb-4">User Management</h2>
							<div className="flex items-center space-x-4">
								<label className="text-gray-500 font-medium">Show:</label>
								<button
									className={`rounded-full py-1 px-4 font-medium focus:outline-none ${
										showingUsersOrPatients ? 'bg-gray-200' : 'bg-white'
									}`}
									onClick={() => setShowingUsers(true)}
								>
									Users
								</button>
								<button
									className={`rounded-full py-1 px-4 font-medium focus:outline-none ${
										showingUsersOrPatients ? 'bg-white' : 'bg-gray-200'
									}`}
									onClick={() => setShowingUsers(false)}
								>
									Patients
								</button>
							</div>
						</div>
						{showingUsersOrPatients ? (
							<UserList users={users} onDeleteUser={handleDeleteUser} />
						) : (
							<AdminList patients={patients} onDeletePatient={handleDeleteAdmin} />
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
