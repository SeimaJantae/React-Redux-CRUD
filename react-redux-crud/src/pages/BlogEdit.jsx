import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
function BlogEdit() {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (id) {
      // update
    } else {
      // create
    }
  };
  return (
    <div>
      <div className="container mx-auto p-20">
        <h3 className="mb-4 text-lg font-semibold">{id ? "Edit blog" : "Create blog"}</h3>
        <div className="mb-4">
          <label>Blog title:</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            placeholder="Title"
            className="mb-2 w-full rounded border p-2"
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label>Blog content:</label>
          <textarea
            type="text"
            name="content"
            value={blog.content}
            placeholder="Content"
            className=" rounded border p-2 h-72"
            onChange={handleChange}
          />
        </div>

        {message && <div className={isError ? "text-red-500" : "text-green-500"}>{message}</div>}

        <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default BlogEdit;
