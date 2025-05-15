import React, { useEffect, useState } from "react";
import { auth, db } from "./FireBase";
import { doc, getDoc } from "firebase/firestore";

export const Profile = ()  => {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);

      const docRef = doc(db, "Users", user.uid);
      console.log(docRef)
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function handlePrediction() {
      window.location.href = "/predict";
  }
  return (
    <div className="auth-wrapper w-full">
        <div className="auth-inner">
            <div className="flex flex-col justify-center items-center">
              {userDetails ? (
                <>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={userDetails.photo}
                      width={"40%"}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <h3>Bienvenido {userDetails.firstName} 🙏🙏</h3>
                  <div>
                    <p>Email: {userDetails.email}</p>
                    <p>Primer Nombre: {userDetails.firstName}</p>
                    {/* <p>Last Name: {userDetails.lastName}</p> */}
                  </div>
                  <button className="btn btn-neutral w-[80%] mt-3" onClick={handlePrediction}>
                    Panel
                  </button>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
        </div>
    </div>
  );
}
