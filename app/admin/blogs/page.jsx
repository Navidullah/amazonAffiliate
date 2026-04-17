// app/admin/blogs/page.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  RefreshCw,
} from "lucide-react";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/blog/admin");
      const data = await response.json();

      console.log("API Response:", data); // Check what the API returns

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch blogs");
      }

      // Handle different response structures
      if (data.blogs) {
        setBlogs(data.blogs);
      } else if (Array.isArray(data)) {
        setBlogs(data);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list
      } else {
        const error = await response.json();
        alert(error.error || "Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const handleTogglePublish = async (id, isPublished) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });

      if (response.ok) {
        fetchBlogs(); // Refresh the list
      } else {
        const error = await response.json();
        alert(error.error || "Failed to update blog");
      }
    } catch (error) {
      console.error("Error toggling publish:", error);
      alert("Failed to update blog");
    }
  };

  const formatDate = (date) => {
    if (!date) return "No date";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Blogs</h1>
            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-muted animate-pulse rounded-lg h-20"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Blogs</h1>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Blog
            </Link>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-2 inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Blogs</h1>
          <Link
            href="/admin/blogs/new"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground mb-4">No blogs found.</p>
            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <Plus className="h-4 w-4" />
              Create your first blog
            </Link>
          </div>
        ) : (
          <div className="bg-card border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Views</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="border-t hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium line-clamp-1">{blog.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {blog.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {blog.category || "General"}
                      </span>
                    </td>
                    <td className="p-4">
                      {blog.isPublished ? (
                        <span className="inline-flex items-center gap-1 text-green-600 text-sm">
                          <Eye className="h-3 w-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600 text-sm">
                          <EyeOff className="h-3 w-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {blog.views || 0}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blogs/${blog._id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() =>
                            handleTogglePublish(blog._id, blog.isPublished)
                          }
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                        >
                          {blog.isPublished ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id, blog.title)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Link
                          href={`/blog/${blog.slug}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
