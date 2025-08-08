/*
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import CommentSection from "@/app/components/commentsection/CommentSection";
import LikeButton from "@/app/components/likebutton/LikeButton";
import EditButton from "@/app/components/blog/EditButton";

// This component runs on the server by default in Next.js App Router
export default async function SingleBlogPage(props) {
  // In Next.js 15+, params is async:
  const { params } = await props;

  // Fetch the blog post by slug from your API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();
  const blog = await res.json();

  return (
    <div className="wrapper py-12 px-4">
      {/* Edit button for blog 
<EditButton blog={blog} />;
{
  /* Blog title 
}
<h1 className="text-3xl md:text-4xl text-center font-bold mb-4">
  {blog.title}
</h1>;

{
  /* Meta info 
}
<div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
  <span>
    {blog.date
      ? new Date(blog.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : ""}
  </span>
  <span className="flex items-center gap-1">
    <Eye className="w-4 h-4" /> {blog.views || 0}
  </span>
  <span className="flex items-center gap-1">
    <Heart className="w-4 h-4" /> {blog.likesCount || 0}
  </span>
  <span className="flex items-center gap-1">
    <MessageCircle className="w-4 h-4" /> {blog.commentsCount || 0}
  </span>
</div>;

/* Blog main image 
{
  blog.image && (
    <img
      src={blog.image}
      alt={blog.title}
      className="w-full h-[400px] object-cover mb-8 border"
    />
  );
}

/* Category and author 
      <div className="flex items-center gap-2 mb-4">
        <span className="px-2 py-0.5 text-xs font-semibold rounded bg-primary text-white">
          {blog.category}
        </span>
        <span className="text-xs text-gray-400 ml-2">
          by
          <span className="ml-1 font-medium text-black dark:text-white">
            {blog.author}
          </span>
        </span>
        {blog.authorImage && (
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-7 h-7 rounded-full object-cover ml-2 border"
          />
        )}
      </div>
      <LikeButton initialLikes={blog.likesCount} blogSlug={blog.slug} />

      {/* Blog content (rich text) 
      <div
        className="tiptap max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
      <CommentSection blogSlug={blog.slug} />

      {/* Back to home link 
      <div className="mt-8">
        <Link href="/" className="text-indigo-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    </div>
  );
}


import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import CommentSection from "@/app/components/commentsection/CommentSection";
import LikeButton from "@/app/components/likebutton/LikeButton";
import EditButton from "@/app/components/blog/EditButton";
import { getRelatedBlogs } from "@/app/api/getRelatedBlogs/route";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
// import this at top

// 👇 1. Generate SEO metadata
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return {};

  const blog = await res.json();

  // ✅ Use metaDescription if provided, otherwise fallback to blog description
  const seoDescription =
    blog.metaDescription && blog.metaDescription.trim().length > 0
      ? blog.metaDescription
      : blog.description.replace(/<[^>]+>/g, "").slice(0, 150);

  return {
    title: blog.title,
    description: seoDescription,
    openGraph: {
      title: blog.title,
      description: seoDescription,
      images: [{ url: blog.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: seoDescription,
      images: [blog.image],
    },
  };
}

// 👇 2. Page Component
export default async function SingleBlogPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();
  const blog = await res.json();
  const related = await getRelatedBlogs(blog.category, blog.slug);

  const readTime = Math.ceil(
    blog.description.replace(/<[^>]+>/g, "").split(" ").length / 200
  );

  return (
    <article className="px-4 sm:px-6 max-w-screen-md mx-auto py-12">
      <EditButton blog={blog} />

      {/* Title 
      <h1 className="text-2xl md:text-4xl sm:text-3xl text-center font-bold mb-4 break-words">
        {blog.title}
      </h1>

      {/* Meta info *
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
        <span>
          {new Date(blog.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="w-4 h-4" /> {blog.views || 0}
        </span>
        <span className="flex items-center gap-1">
          <Heart className="w-4 h-4" /> {blog.likesCount || 0}
        </span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" /> {blog.commentsCount || 0}
        </span>
        <span className="italic ml-auto">{readTime} min read</span>
      </div>

      {/* Cover image */ /*
      {blog.image && (
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={500}
          priority // Important: Tells browser this image is part of the LCP
          className="w-full h-60 sm:h-72 md:h-96 object-cover rounded"
        />
      )}

      {/* Category and author 
      <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
        <span className="px-2 py-0.5 font-semibold rounded bg-blue-600 text-white">
          {blog.category}
        </span>
        <span className="ml-2">
          by <span className="font-medium">{blog.author}</span>
        </span>
        {blog.authorImage && (
          <Image
            src={blog.authorImage}
            alt={blog.author}
            width={30}
            height={30}
            className="w-10 h-10 rounded-full border object-cover"
          />
        )}
      </div>

      <LikeButton initialLikes={blog.likesCount} blogSlug={blog.slug} />

      {/* Blog content *
      <div
        className="tiptap max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />

      {/* Comment section 
      <CommentSection blogSlug={blog.slug} />

      {/* Author Bio 
      <div className=" flex-wrap mt-12 border-t pt-6">
        <div className="flex items-center gap-4">
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-14 h-14 rounded-full border object-cover"
          />
          <div>
            <p className="text-sm font-semibold">{blog.author}</p>
            <p className="text-xs text-gray-500">Author of this blog</p>
          </div>
        </div>
      </div>

      {/* Social Sharing Buttons 
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <p className="text-sm text-gray-500">Share this blog:</p>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`
          )}&text=${encodeURIComponent(blog.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <BsTwitterX className="text-2xl" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaLinkedin className="text-2xl text-blue-500 " />
        </a>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            blog.title +
              " " +
              `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className=""
        >
          <FaWhatsapp className="text-2xl text-green-600" />
        </a>
      </div>

      {/* Schema.org JSON-LD 
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            description: blog.description.replace(/<[^>]+>/g, "").slice(0, 150),
            image: blog.image,
            author: {
              "@type": "Person",
              name: blog.author,
            },
            datePublished: blog.date,
            dateModified: blog.updatedAt || blog.date,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_BASE_URL || ""}/blogs/${
                blog.slug
              }`,
            },
          }),
        }}
      />

      {/* Back link 
      <div className="mt-8">
        <Link href="/blogs" className="text-indigo-600 hover:underline">
          ← Back to all blogs
        </Link>
      </div>
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <Link
                href={`/blogs/${item.slug}`}
                key={item._id}
                className="border p-4 rounded hover:shadow transition"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={250}
                  className="w-full h-40 object-fit mb-3 rounded"
                />

                <h3 className="font-semibold text-lg line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
*/
// app/blogs/[slug]/page.jsx
// app/blogs/[slug]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Eye, Heart } from "lucide-react";
import CommentSection from "@/app/components/commentsection/CommentSection";
import LikeButton from "@/app/components/likebutton/LikeButton";
import EditButton from "@/app/components/blog/EditButton";
import { getRelatedBlogs } from "@/app/api/getRelatedBlogs/route";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import BlogTOCContent from "@/app/components/blog/BlogTOCContent";

// ---------- SEO ----------
export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return {};

  const blog = await res.json();

  const seoDescription =
    blog.metaDescription && blog.metaDescription.trim().length > 0
      ? blog.metaDescription
      : blog.description.replace(/<[^>]+>/g, "").slice(0, 150);

  return {
    title: blog.title,
    description: seoDescription,
    openGraph: {
      title: blog.title,
      description: seoDescription,
      images: [{ url: blog.image }],
    },
  };
}

// ---------- Page ----------
export default async function SingleBlogPage({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs/${params.slug}`,
    { cache: "no-store" }
  );
  if (!res.ok) return notFound();

  const blog = await res.json();
  const related = await getRelatedBlogs(blog.category, blog.slug);

  const readTime = Math.ceil(
    blog.description.replace(/<[^>]+>/g, "").split(" ").length / 200
  );

  const pageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`;

  return (
    // Use one consistent max width to align image + TOC/content grid
    <article className="px-4 sm:px-6 max-w-5xl mx-auto py-12">
      {/* Header + meta + image section */}
      <div className="w-full">
        <EditButton blog={blog} />

        {/* Title */}
        <h1 className="text-2xl md:text-4xl sm:text-3xl text-center font-bold mb-4 break-words">
          {blog.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 mb-6">
          <span>
            {new Date(blog.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" /> {blog.views || 0}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4" /> {blog.likesCount || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> {blog.commentsCount || 0}
          </span>
          <span className="italic ml-auto">{readTime} min read</span>
        </div>

        {/* Cover image (full width of content area) */}
        {blog.image && (
          <Image
            src={blog.image}
            alt={blog.title}
            width={1200}
            height={500}
            priority
            className="w-full h-60 sm:h-72 md:h-96 object-contain rounded"
          />
        )}

        {/* Category and author */}
        <div className="flex items-center gap-2 mb-4 mt-4 text-sm text-gray-500">
          <span className="px-2 py-0.5 font-semibold rounded bg-blue-600 text-white">
            {blog.category}
          </span>
          <span className="ml-2">
            by <span className="font-medium">{blog.author}</span>
          </span>
          {blog.authorImage && (
            <Image
              src={blog.authorImage}
              alt={blog.author}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full border object-cover"
            />
          )}
        </div>

        <LikeButton initialLikes={blog.likesCount} blogSlug={blog.slug} />
      </div>

      {/* ----- TOC (left, desktop) + Blog content (right) ----- */}
      {/* BlogTOCContent already renders a 2-col grid with TOC hidden on mobile */}
      <div className="mt-8">
        <BlogTOCContent html={blog.description} />
      </div>

      {/* ---------- Bottom section (unchanged) ---------- */}
      <div className="max-w-3xl mx-auto">
        {/* Comment section */}
        <CommentSection blogSlug={blog.slug} />

        {/* Author Bio */}
        <div className="flex-wrap mt-12 border-t pt-6">
          <div className="flex items-center gap-4">
            {blog.authorImage && (
              <Image
                src={blog.authorImage}
                alt={blog.author}
                width={50}
                height={50}
                className="w-14 h-14 rounded-full border object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold">{blog.author}</p>
              <p className="text-xs text-gray-500">Author of this blog</p>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <p className="text-sm text-gray-500">Share this blog:</p>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              pageUrl
            )}&text=${encodeURIComponent(blog.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsTwitterX className="text-2xl" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              pageUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-2xl text-blue-500 " />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `${blog.title} ${pageUrl}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="text-2xl text-green-600" />
          </a>
        </div>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: blog.title,
              description: blog.description
                .replace(/<[^>]+>/g, "")
                .slice(0, 150),
              image: blog.image,
              author: { "@type": "Person", name: blog.author },
              datePublished: blog.date,
              dateModified: blog.updatedAt || blog.date,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": pageUrl,
              },
            }),
          }}
        />

        {/* Back link */}
        <div className="mt-8">
          <Link href="/blogs" className="text-indigo-600 hover:underline">
            ← Back to all blogs
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold mb-4">Related Blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  href={`/blogs/${item.slug}`}
                  key={item._id}
                  className="border p-4 rounded hover:shadow transition"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover mb-3 rounded"
                  />
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
