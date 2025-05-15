import React, { useState } from "react";
import { toast } from "react-toastify";
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
export const Form = ({ children, files, jobDescription, setUserResponse,userResponse }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validaciones
    if (!jobDescription || jobDescription.trim() === "") {
      toast.error("Por favor, ingrese una descripción del puesto.", {
        position: "bottom-center",
      });
      return;
    }

    if (!files || files.length === 0) {
      toast.error("Por favor, suba al menos un archivo de CV.", {
        position: "bottom-center",
      });
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    for (let i = 0; i < files.length; i++) {
      formData.append("resumes", files[i]);
    }

    try {
      const response = await fetch("http://20.9.136.223:5000/matcher", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setUserResponse(data);
      setLoading(false);
      navigate("/reports", { state: data  });
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="flex flex-row gap-8">{children}</div>
      <button
        type="submit"
        className="btn btn-neutral text-white mt-6 p-5 w-[40%]"
      >
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <BiLoaderAlt className="animate-spin text-2xl text-white" />
          </div>
        ) : (
          "Analizar"
        )}
      </button>
    </form>
  );
};
