const Dashboard = () => {
	return (
		<div className="grid grid-cols-3 gap-8 mt-8">
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-semibold mb-4">Users</h2>
				<ul className="list-disc pl-4">
					<li className="text-gray-700">John Doe</li>
					<li className="text-gray-700">Jane Doe</li>
					<li className="text-gray-700">Bob Smith</li>
				</ul>
			</div>
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-semibold mb-4">Orders</h2>
				<ul className="list-disc pl-4">
					<li className="text-gray-700">Order #123</li>
					<li className="text-gray-700">Order #456</li>
					<li className="text-gray-700">Order #789</li>
				</ul>
			</div>
			<div className="bg-white shadow rounded-lg p-6">
				<h2 className="text-lg font-semibold mb-4">Statistics</h2>
				<div className="flex flex-col space-y-2">
					<span className="text-sm text-gray-500">Total users</span>
					<h3 className="text-2xl font-semibold">10,000</h3>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="text-sm text-gray-500">Total orders</span>
					<h3 className="text-2xl font-semibold">20,000</h3>
				</div>
				<div className="flex flex-col space-y-2">
					<span className="text-sm text-gray-500">Revenue</span>
					<h3 className="text-2xl font-semibold">$200,000</h3>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
