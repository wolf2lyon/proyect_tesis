import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
export const Resume = () => {
  const location = useLocation();
  const [userNavigate, setUserNavigate] = useState();

  useEffect(() => {
    const userRecept = location.state;
    console.log(userRecept);
    setUserNavigate(userRecept);
  }, []);

  if (!userNavigate) {
    return (
      <div className="flex flex-col text-white text-3xl mt-4">
        No hay resultados disponibles. Por favor, cargue los archivos primero.
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      <p className="text-[32px] text-white text-start">Resultados</p>
      <div className="overflow-y-auto overflow-scroll rounded-box border border-base-content bg-base-100 text-black w-[800px] h-[600px] static -z-10 mt-5">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name File</th>
              <th>Job</th>
            </tr>
          </thead>
          <tbody>
            {userNavigate.map((user, idx) => (
              <tr key={idx}>
                <th class="-z-10">{idx}</th>
                <td>{user.filename}</td>
                <td>{user.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
