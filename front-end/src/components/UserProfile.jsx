import React, { useEffect, useState } from "react";
import { auth, db } from "./FireBase";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
const UserProfile = () => {
  const user = auth.currentUser;
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modify,setModify] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const userRef = doc(db, "Users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.error("No se encontró el documento del usuario.");
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar los cambios en Firestore
  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const userRef = doc(db, "Users", user.uid);
      await updateDoc(userRef, {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        photo: userData.photo,
      });
      toast.success("Datos actualizados correctamente.", {
        position: "top-center",
      });
      setEditing(false);
      setModify(false);
    } catch (error) {
      toast.error("Error al guardar los cambios." + error.message, {
        position: "bottom-center",
      });
      console.error("Error al actualizar Firestore:", error);
    }
    setLoading(false);
  };

  if (!userData)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BiLoaderAlt className="animate-spin text-6xl text-white" />
      </div>
    );

  console.log(userData);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if(modify && editing) handleSave();
      }}
      className="w-[60%]"
    >
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3 className="text-center">Perfil del Usuario</h3>

          <div className="mb-3">
            <label className="floating-label">
              <input
                type="text"
                name="firstName"
                className="form-control input input-md"
                placeholder="Primer Nombre"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!editing}
                required
              />
              <span>Primer Nombre</span>
            </label>
          </div>

          <div className="mb-3">
            <label className="floating-label">
              <input
                type="text"
                name="lastName"
                className="form-control input input-md"
                placeholder="Apellido"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!editing}
                required
              />
              <span>Apellido</span>
            </label>
          </div>

          <div className="grid">
            {!editing ? (
              <button
                type="button"
                className="btn btn-neutral"
                onClick={() => setEditing(true)}
              >
                Editar
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-neutral"
                disabled={loading}
                onClick={() => setModify(true)}
              >
                {loading ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <BiLoaderAlt className="animate-spin text-2xl text-white" />
                  </div>
                ) : (
                  "Modificar"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserProfile;
