import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance";

const Users = () => {

  const[users,setUsers]=useState([])
  const[searchItem,setSearchItem]=useState("")
  const[loading,setLoading]=useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
    try{
      setLoading(true);
      const res = await api.get("/users");
      const filteredUsers = res.data.filter((user) => user.role.toLowerCase() !== "admin");
      setUsers(filteredUsers)
    } catch (err){
      console.log( " the error is ", err)
      toast.error("failed to fetch the users")
    } finally {
      setLoading(false)
    }
  };
  fetchUsers();
},[])

  const handleBlockUser = async  (userId ,isBlock) => {
    try{
      await api.patch(`/users/${userId}`, {isBlock: !isBlock})
      setUsers((prev)=> 
      prev.map((u)=> 
        u.id === userId ? {...u, isBlock: !isBlock} : u 
    ));
    toast.success(`User ${!isBlock ? " Blocked" : "Unblocked"} succesfully`)
    }catch (err) {
      console.log("error updating user", err)
      toast.error("Failed to update user status")
    }
  };

  const filteredUsers = users.filter (user =>
    user.name.toLowerCase().includes(searchItem.toLowerCase()) || 
    user.email.toLowerCase().includes(searchItem.toLowerCase())
   );

 
  return (
    <div>
      <SideBar />

      <div className="flex ml-60 px-8 py-8 justify-between items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          {" "}
          👥 All Registerd Users
        </h1>
        <input
          type="text"
          placeholder="Search users by user name or email..."
          value={searchItem}
          onChange={(e)=> setSearchItem (e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus-ring-2 focus-ring-blue-500"
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-600 mt-10">
          {searchItem ? "No users found matching" : "No users found."}
        </p>
      ):(
        <div className=" ml-60 px-5 overflow-x-auto shadow-md rounded-lg">
          <table className="  min-w-full bg-white border border-gray-200">
            <thead className="bg-gary-100">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Email</th>
                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Role</th>
                <th className="py-3 px-4 text-center text-gray-700 font-semibold">Status</th>
                <th className="py-3 px-4 text-center text-gray-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user)=> (
                <tr key={user.id}
                className={`border-b ${user.isBlock ? "bg-red-50" : "hover-bg-gray"}`}
                >
                  <td className="py-3 px-4 font-medium ">{user.name}</td>
                  <td className="py-3 px-4 text-gray-600 ">{user.email}</td>
                  <td className="py-3 px-4 capitalize text-gray-600 ">{user.role}</td>
                  <td
                  className={`py-3 px-4 text-center font-semibold ${user.isBlock ? "text-red-600" : "text-green-600"}`}
                  > {user.isBlock ? "Blocked" : "Active"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button onClick={()=> handleBlockUser(user.id, user.isBlock)} 
                    className={`px-4 py-1 rounded-md text-white transition ${
                      user.isBlock
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-red-500 hover-bg-red-600"
                    }`} 
                    >
                      {user.isBlock ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}
    </div>
  );
};

export default Users;
