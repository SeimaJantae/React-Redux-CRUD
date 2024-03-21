import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog, fetchBlogs } from "../slices/blogSlice";

function BlogList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blog.blogs);

  return (
    <div>
      <div className="container mx-auto p-20">
        <div className="flex">
          <h3 className="mb-4 text-lg font-semibold mr-4">Blog List</h3>
          <Link to={`/create`}>
            <button className="rounded bg-green-500 px-3 py-1 text-white">Create</button>
          </Link>
        </div>

        {blogs.map((blog) => (
          <div key={blog.id} className="flex justify-between border-b py-2">
            <div>
              <p>Title: {blog.title}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  if (confirm("Delete blog?")) {
                    dispatch(deleteBlog(blog.id));
                  }
                }}
                className="mr-2 rounded bg-red-500 px-3 py-1 text-white"
              >
                Delete
              </button>
              <Link to={`/edit/${blog.id}`}>
                <button className="rounded bg-blue-500 px-3 py-1 text-white">Edit</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
