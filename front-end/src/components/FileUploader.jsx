import React, { useState } from "react";
import { UploadInfo } from "./UploadInfo";

export const FileUploader = ({files,setFiles}) => {
  const handleFileChange = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles(uploadedFiles);
  };

  return (
    <div className="file-uploader text-white items-start">
      Upload cvs
      <div className="flex gap-[30px] bg-white items-center w-[500px] p-2 pl-[30px]  rounded-2xl mt-4">
          <UploadInfo files={files} limit={10} />
          <label className="btn btn-neutral text-white">
            Escoger Archivos
            <input type="file" multiple onChange={handleFileChange} hidden />
          </label>
          <div>
            <p className="text-black text-[15px]">{files.length} Archivos</p>
          </div>
      </div>
    </div>
  );
};
