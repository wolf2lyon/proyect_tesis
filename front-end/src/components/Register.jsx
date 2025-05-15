import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./FireBase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export const Register = ()  => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo:""
        });
      }
      console.log("User Registered Successfully!!");
      toast.success("User Registered Successfully!!", {
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
            <form onSubmit={handleRegister}>
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label  className="floating-label">
                <input
                  type="text"
                  className="form-control input input-md"
                  placeholder="First name"
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
                <span>First name</span>
                </label>
              </div>
              <div className="mb-3">
                <label className="floating-label">
                <input
                  type="text"
                  className="form-control input input-md"
                  placeholder="Last name"
                  onChange={(e) => setLname(e.target.value)}
                />
                <span>Last name</span>
                </label>
              </div>
              <div className="mb-3">
                <label className="floating-label">
                <input
                  type="email"
                  className="form-control input input-md"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <span>Email address</span>
                </label>
        
              </div>
              <div className="mb-3">
                <label className="floating-label">
                <input
                  type="password"
                  className="form-control input input-md"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span>Password</span>
                </label>
              </div>
              <div className="grid">
                <button type="submit" className="btn btn-neutral">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right mt-3 flex justify-center">
                Already registered <a href="/login" className="ml-3">Login</a>
              </p>
            </form>
        </div>
    </div>
  );
}
