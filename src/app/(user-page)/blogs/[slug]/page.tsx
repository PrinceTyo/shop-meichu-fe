import { getBlog, getAllBlogs } from "@/lib/data/blogs";
import BlogDetail from "@/components/blog-page";

export default async function BlogSlugPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await params di Next.js 15+
  const { slug } = await params;
  const blog = getBlog(slug);

  if (!blog) {
    return <div className="p-20 text-center text-xl">Blog Not Found</div>;
  }

  const related = getAllBlogs().filter((b) => b.slug !== blog.slug);

  return <BlogDetail blog={blog} related={related} />;
}