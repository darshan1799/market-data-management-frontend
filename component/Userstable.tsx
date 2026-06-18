"use client";

import { useQuery } from "@tanstack/react-query";

interface User {
  id: number;
  broker: string;
  activePositions: number;
  availableCapital: string;
  totalDeployedStrategies: number;
  activeStrategies: number;
  status: "Active" | "Pending" | "Inactive";
  currentPnL: string;
  requiredCapital: string;
}

const staticUsers: User[] = [
  {
    id: 1,
    broker: "Zerodha (DU000004)",
    activePositions: 1,
    availableCapital: "₹ 1.54 Cr",
    totalDeployedStrategies: 3,
    activeStrategies: 1,
    status: "Active",
    currentPnL: "₹ 50.02 K",
    requiredCapital: "₹ 50.02 K",
  },
  {
    id: 2,
    broker: "Angel One (MNBN1026)",
    activePositions: 2,
    availableCapital: "₹ 2.50 K",
    totalDeployedStrategies: 2,
    activeStrategies: 2,
    status: "Active",
    currentPnL: "₹ 60.02 K",
    requiredCapital: "₹ 60.02 K",
  },
  {
    id: 3,
    broker: "Finvasia (FA189009)",
    activePositions: 0,
    availableCapital: "₹ 50.02 K",
    totalDeployedStrategies: 0,
    activeStrategies: 0,
    status: "Pending",
    currentPnL: "₹ 0.00",
    requiredCapital: "₹ 0.00",
  },
];

const fetchUsers = async (): Promise<User[]> => {
  return staticUsers;
};

function StatusBadge({ status }: { status: User["status"] }) {
  const styles = {
    Active: "text-green-500",
    Pending: "text-yellow-500",
    Inactive: "text-gray-400",
  };

  return (
    <span className={`text-sm font-medium ${styles[status]}`}>{status}</span>
  );
}

export default function UsersTable() {
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="p-3 md:p-6 container w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-3 ">Users</h2>

      <div className="bg-white rounded-xl  overflow-x-auto">
        {isLoading && (
          <div className="flex items-center justify-center h-40 text-sm text-gray-400">
            Loading...
          </div>
        )}

        {isError && (
          <div className="flex items-center justify-center h-40 text-sm text-red-400">
            Failed to load users.
          </div>
        )}

        {!isLoading && !isError && (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Broker
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  No. of active positions
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Available Capital
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Total Deployed <br /> Strategies
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Active <br /> Strategies
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Current P&L
                </th>
                <th className="text-left px-5 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  Required Capital
                </th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-gray-100 last:border-0 ${
                    index % 2 === 1 ? "bg-blue-50/40" : "bg-white"
                  }`}
                >
                  <td className="px-5 py-4 text-gray-700">{user.broker}</td>
                  <td className="px-5 py-4 text-gray-600">
                    {user.activePositions}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {user.availableCapital}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {user.totalDeployedStrategies}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {user.activeStrategies}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td
                    className={`px-5 py-4 font-medium ${user.currentPnL === "₹ 0.00" ? "text-gray-600" : "text-green-500"}`}
                  >
                    {user.currentPnL}
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    {user.requiredCapital}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
