import React, { useEffect, useState } from 'react';
import { getAllUsers, updateUser } from '../apiManager/setting';
import Loader from '../common/Loader';
import MainLayout from '../Layout/MainLayout';

const AdminSettingsPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusLoading, setStatusLoading] = useState({}); // Tracks status button loading
    const [deleteLoading, setDeleteLoading] = useState({}); // Tracks delete button loading

    useEffect(() => {
        // Fetch users only if they haven't been fetched yet
        if (users.length === 0) {
            const fetchUsers = async () => {
                try {
                    const data = await getAllUsers();
                    const formattedUsers = data?.data.map((user) => ({
                        id: user._id,
                        email: user.email,
                        status: user.userStatus === 'active' ? 'Active' : 'inactive',
                        softDelete: user.softDelete,
                    }));
                    setUsers(formattedUsers);
                } catch (error) {
                    console.error('Error fetching users:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUsers();
        } else {
            setLoading(false); // No need to fetch data again if it's already in state
        }
    }, []);

    const handleSoftDelete = async (id, currentSoftDelete) => {
        setDeleteLoading((prev) => ({ ...prev, [id]: true })); // Start loading for the specific soft delete button
        try {
            const updatedUser = await updateUser(id, { softDelete: !currentSoftDelete });

            if (updatedUser && updatedUser.data) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === id
                            ? { ...user, softDelete: updatedUser.data.softDelete } // Update softDelete status
                            : user
                    )
                );
                console.log(`SoftDelete toggled for user with ID: ${id}`);
            } else {
                console.error("API did not return the updated user data.");
            }
        } catch (error) {
            console.error('Error toggling softDelete:', error);
        } finally {
            setDeleteLoading((prev) => ({ ...prev, [id]: false })); // End loading for the specific soft delete button
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        setStatusLoading((prev) => ({ ...prev, [id]: true })); // Start loading for the specific status button

        try {
            const updatedStatus = currentStatus === 'Active' ? 'inactive' : 'active';
            const updatedUser = await updateUser(id, { userStatus: updatedStatus });

            if (updatedUser && updatedUser.data) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === id
                            ? { ...user, status: updatedUser.data.userStatus === 'active' ? 'Active' : 'inactive' } // Update status
                            : user
                    )
                );
                console.log(`Status toggled for user with ID: ${id}`);
            } else {
                console.error("API did not return the updated user data.");
            }
        } catch (error) {
            console.error('Error toggling user status:', error);
        } finally {
            setStatusLoading((prev) => ({ ...prev, [id]: false })); // End loading for the specific status button
        }
    };

    return (
        <MainLayout>
            <div className=" font-sans">
                <div className="flex justify-center items-center">
                    <h1 className="text-3xl text-gray-700 mt-4 font-extrabold my-3">Admin Dashboard</h1>
                </div>

                <div className="mt-4 md:rounded-xl">
                    {loading ? (
                        <div className="p-6 h-40 flex justify-center items-center text-center">
                            <svg
                                className="animate-spin h-5 w-5 text-current"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                ></path>
                            </svg>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    className="border p-4  border border-black rounded-xl "
                                >
                                    <div className="flex flex-col lg:flex-row justify-between items-center">
                                        <h3 className="font-semibold text-lg">{user.email}</h3>
                                        <p
                                            className={`px-5 py-1 order-first lg:order-none mb-2 
 text-sm font-medium rounded-full ${user.status === 'Active'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {user.status}
                                        </p>
                                    </div>
                                    <div className="mt-2 space-y-2">
                                        <button
                                            className={`w-full px-3 py-2 flex justify-center items-center text-sm font-medium rounded-lg ${user.softDelete
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            onClick={() => handleSoftDelete(user.id, user.softDelete)}
                                            disabled={deleteLoading[user.id]} // Disable button while loading
                                        >
                                            {deleteLoading[user.id] ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 text-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                                    ></path>
                                                </svg>
                                            ) : user.softDelete ? (
                                                'Undo Delete'
                                            ) : (
                                                'Delete'
                                            )}
                                        </button>

                                        <button
                                            className={`w-full flex justify-center items-center px-3 py-2 text-sm font-medium rounded-lg ${user.status === 'Active'
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                            onClick={() => handleStatusToggle(user.id, user.status)}
                                            disabled={statusLoading[user.id]} // Disable button while loading
                                        >
                                            {statusLoading[user.id] ? (
                                                <svg
                                                    className="animate-spin h-5 w-5 text-current"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    ></circle>
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
                                                    ></path>
                                                </svg>
                                            ) : user.status === 'Active' ? (
                                                'Deactivate'
                                            ) : (
                                                'Activate'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </MainLayout>
    );
};

export default AdminSettingsPage;
