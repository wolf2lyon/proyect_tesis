import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./FireBase";
import { toast } from "react-toastify";
import { SignInWithGoogle } from "./SignInWithGoogle";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="auth-wrapper w-full">
        <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h3>Login</h3>
              <div className="mb-3">
                <label className="floating-label">
                  <input
                    type="email"
                    className="form-control input input-md"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span>Email address</span>
                </label>
              </div>
              <div className="mb-3">
                <label className="floating-label">
                <input
                  type="password"
                  className="form-control input input-md"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>Enter Password</span>
                </label>
              </div>
              <div className="grid">
                <button type="submit" className="btn btn-neutral">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right flex justify-center items-center mt-3">
                New user <a href="/register" className="ml-1.5 p-0">Register Here</a>
              </p>
              <SignInWithGoogle />
            </form>
        </div>
    </div>
  );
};
