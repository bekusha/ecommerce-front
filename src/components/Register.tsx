import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Router from "next/router";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    role: "CONSUMER",
  });

  const { username, email, password, password2, role } = formData;

  const onChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== password2) {
      console.log("Passwords don't match");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify({
          username,
          email,
          password,
          password2,
          role,
        });
        console.log(body);

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}user/register/`,
          body,
          config
        );

        Router.push("/login");
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }

        // Implement proper error handling
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-100">
      <form onSubmit={onSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-indigo-500">
            <option value="CONSUMER">Consumer</option>
            <option value="VENDOR">Vendor</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
