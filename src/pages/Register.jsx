// // Register.jsx
// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import Swal from "sweetalert2";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (name && email && password) {
//       Swal.fire({
//         icon: "success",
//         title: "Account Created 🎉",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       setTimeout(() => navigate("/login"), 1500);
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Please fill in all fields ❌",
//       });
//     }
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
//           Create an Account
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Create a password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields ❌",
      });
      return;
    }

    try {
      // Check if user already exists
      const existingUsers = await axios.get(`http://localhost:5001/users?email=${email}`);
      if (existingUsers.data.length > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exists! Please login.",
        });
        return;
      }

      // Save new user to JSON Server
      await axios.post("http://localhost:5001/users", {
        name,
        email,
        password,
      });

      Swal.fire({
        icon: "success",
        title: "Account Created 🎉",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("Error registering user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong! Try again.",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
