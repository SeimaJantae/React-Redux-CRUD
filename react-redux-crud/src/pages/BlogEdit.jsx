import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBlog, editBlog, fetchBlog } from "../slices/blogSlice";
import { useDispatch, useSelector } from "react-redux";
function BlogEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({ title: "", content: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchBlog(id));
    }
  }, [id, dispatch]);

  const currentBlog = useSelector((state) => state.blog.currentBlog);

  useEffect(() => {
    if (id) {
      if (currentBlog) {
        setBlog(currentBlog);
      }
    }
  }, [currentBlog]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (id) {
      // update
      const response = await dispatch(editBlog(blog));
      if (response.meta.requestStatus === "fulfilled") {
        alert("Edit blog successfully");
        navigate("/");
      } else {
        alert("Cannot edit blog");
        navigate("/");
      }
    } else {
      // create
      const response = await dispatch(createBlog(blog));
      if (response.meta.requestStatus === "fulfilled") {
        alert("Create blog successfully");
        navigate("/");
      } else {
        alert("Cannot create blog");
        navigate("/");
      }
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

        <button onClick={handleSave} className="rounded bg-green-500 px-4 py-2 text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default BlogEdit;
