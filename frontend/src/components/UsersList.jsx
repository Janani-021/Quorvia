import React, { useEffect, useState } from "react";
import { useChatContext } from "stream-chat-react";

const UsersList = ({ activeChannel }) => {
    const { client } = useChatContext();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;
            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );

                if (response.users.length) {
                    setUsers(response.users);
                }
            } catch (error) {
                console.log("Error querying users:", error);
            }

            setLoading(false);
        };

        if (client) getUsers();
    }, [client]);

    if (loading) return <div>Loading users...</div>;

    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User List</p>
            </div>
            {users?.map((user) => (
                <div key={user.id} className="user-item">
                    {user.name || user.id}
                </div>
            ))}
        </div>
    );
};

export default UsersList;
