import { useAuth0 } from "@auth0/auth0-react";
import JoditEditor from "jodit-react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [title, setTitle] = useState("");
  const [kycName, setKycName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [tags, setTags] = useState("");
  const router = useNavigate();
  const [form, setForm] = useState({
    title: "",
    tags: "",
    content: "",
  });

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const placeholder = "Start typing...";

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || "Start typings...",
      height: 500,
    }),
    [placeholder]
  );

  useEffect(() => {
    if (!isAuthenticated || !user) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div>
      <div>
        <form className=" p-4" action="">
          <div className="mb-4">
            <label htmlFor="title">Title</label>
            <input
              className="border"
              id="title"
              name="title"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tags">Tags</label>
            <input
              className="border"
              id="tags"
              name="tags"
              type="text"
              value={tags}
              placeholder="tags..."
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="kyc">kyc</label>
            <input
              id="kyc"
              name="kyc"
              type="file"
              onChange={(e) =>
                e.target.files ? setSelectedFile(e.target.files[0]) : null
              }
            />
          </div>
          <JoditEditor
            className=""
            ref={editor}
            value={content}
            config={config}
            // tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />
          <button
            className="cursor-pointer bg-blue-200 p-2"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
