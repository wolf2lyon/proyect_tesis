import { useState } from "react";
import { FileUploader } from "./FileUploader";
import { Form } from "./Form";
import { Header } from "./Header";
import { SelectCategory } from "./SelectCategory";

import React from "react";

export const Predict = () => {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState("");
  const [userResponse, setUserResponse] = useState({});

  console.log(userResponse);
  return (
    <div className="flex flex-col">
      <Header />
      <Form
        files={files}
        jobDescription={jobDescription}
        setUserResponse={setUserResponse}
        userResponse={userResponse}
      >
        <FileUploader files={files} setFiles={setFiles} />
        <SelectCategory
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
        />
      </Form>
      
    </div>
  );
};
