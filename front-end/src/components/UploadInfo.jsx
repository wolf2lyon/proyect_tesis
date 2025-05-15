import React from "react";
import file from "../assets/file.svg";

export const UploadInfo = () => {
  return (
    <div className="file-uploader__info flex flex-row items-center gap-2">
      <img src={file} width={40} height={40}></img>
      <p className="file-uploader__text text-[15px] text-black">
        Limite 2MB por <br></br>
        archivo
      </p>
    </div>
  );
};
