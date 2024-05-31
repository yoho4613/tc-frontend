import { useAuth0 } from "@auth0/auth0-react";
import JoditEditor from "jodit-react";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_MANU } from "../../constant/config";
import Navbar from "../../Components/Navbar/Navbar";

const CreatePage = () => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [title, setTitle] = useState("");
  const [kycName, setKycName] = useState("");
  const [selectedFile, setSelectedFile] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [tags, setTags] = useState("");
  const router = useNavigate();
  const [form, setForm] = useState({
    title: "",
    tags: "",
    content: "",
  });

  const categories = NAV_MANU;
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

  useEffect(() => {
    console.log(content);
  }, [content]);

  const submitForm = async () => {
    const images = selectedFile.filter((file) => file !== null);
  };

  return (
    <div>
      <Navbar />
      <div>
        <form className=" p-4" action="">
          <div className="flex justify-between mb-4">
            <div className="mb-4 flex items-center gap-4">
              <label>Category</label>
              <select
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, categoryId: e.target.value }))
                }
                defaultValue={"All"}
                className="h-10 bg-gray-200 rounded-md p-1"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories?.map((category) => (
                  <option key={category.value} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="px-2 h-10 rounded-md bg-blue-400 text-white hover:bg-blue-500 transition-all"
              onClick={() => history.back()}
            >
              Go Back
            </button>
          </div>

          <div className="mb-4 flex gap-4">
            <label htmlFor="title">Title</label>
            <input
              className="border grow"
              id="title"
              name="title"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4 flex gap-4">
            <label htmlFor="tags">Tags</label>
            <input
              className="border grow"
              id="tags"
              name="tags"
              type="text"
              value={tags}
              placeholder="tags..."
              onChange={(e) => setTags(e.target.value)}
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
          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, i) => (
              <div key={i} className="mb-4">
                <label htmlFor={`file-${i}`}>File {i + 1}</label>
                <input
                  id={`file-${i}`}
                  name={`file-${i}`}
                  type="file"
                  accept="image/jpeg image/png image/jpg"
                  onChange={(e) =>
                    e.target.files
                      ? setSelectedFile((prev) =>
                          prev?.map((file, index, arr) => {
                            if (index === i && e.target.files) {
                              return e.target.files[0];
                            }
                            return file;
                          })
                        )
                      : null
                  }
                />
              </div>
            ))}
          </div>

          <button
            className="cursor-pointer bg-blue-200 p-2"
            disabled={!title.length || !content.length}
            onClick={(e) => {
              e.preventDefault();
              submitForm();
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
