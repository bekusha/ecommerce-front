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
    <form onSubmit={(e) => onSubmit(e)}>
      <div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          minLength={6}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={(e) => onChange(e)}
          minLength={6}
        />
      </div>
      <div>
        <select name="role" value={role} onChange={(e) => onChange(e)}>
          <option value="CONSUMER">Consumer</option>
          <option value="VENDOR">Vendor</option>
          {/* <option value="ADMIN">Admin</option> */}
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
