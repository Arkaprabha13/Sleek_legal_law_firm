
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { useBlog, BlogPost as BlogPostType } from "../contexts/BlogContext";
import { Calendar, User, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { blogPosts, getBlogPost } = useBlog();
  const navigate = useNavigate();
  const post = getBlogPost(id || '');

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | SleekLegal Blog`;
    } else {
      document.title = "Blog Post Not Found | SleekLegal";
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Find previous and next posts for navigation
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  // Find related posts based on category (excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-law-charcoal text-white">
        <div className="container">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{post.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <span className="bg-law-gold/20 text-white text-sm px-3 py-1 rounded-full mb-4 inline-block">
            {post.category}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 max-w-4xl">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm opacity-90">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </div>
      
      <article className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="mb-8 rounded-lg overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-auto" 
                />
              </div>
              
              <div className="prose prose-lg max-w-none prose-headings:text-law-charcoal prose-headings:font-bold prose-p:text-law-gray prose-a:text-law-gold prose-a:no-underline hover:prose-a:text-law-charcoal mb-12" dangerouslySetInnerHTML={{ __html: post.content }}>
              </div>
              
              <div className="flex items-center justify-between pt-8 border-t">
                <div>
                  <div className="flex items-center">
                    <Tag size={16} className="mr-2 text-law-gold" />
                    <span className="text-sm font-medium text-law-charcoal">Category:</span>
                  </div>
                  <Link 
                    to={`/blog?category=${post.category}`}
                    className="text-law-gold hover:text-law-charcoal transition-colors ml-6"
                  >
                    {post.category}
                  </Link>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-law-offwhite hover:bg-law-gold/10 text-law-charcoal transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </button>
                  <button className="p-2 rounded-full bg-law-offwhite hover:bg-law-gold/10 text-law-charcoal transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  </button>
                  <button className="p-2 rounded-full bg-law-offwhite hover:bg-law-gold/10 text-law-charcoal transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg>
                  </button>
                </div>
              </div>
              
              {/* Post Navigation */}
              <nav className="flex justify-between mt-12 pt-8 border-t">
                {prevPost ? (
                  <Link 
                    to={`/blog/${prevPost.id}`}
                    className="flex items-center text-law-charcoal hover:text-law-gold transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    <span>Previous Post</span>
                  </Link>
                ) : (
                  <div></div>
                )}
                
                {nextPost && (
                  <Link 
                    to={`/blog/${nextPost.id}`}
                    className="flex items-center text-law-charcoal hover:text-law-gold transition-colors"
                  >
                    <span>Next Post</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Link>
                )}
              </nav>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-bold mb-4 text-law-charcoal">About the Author</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div>
                    <h4 className="font-bold text-law-charcoal">{post.author}</h4>
                    <p className="text-sm text-law-gray">Legal Expert</p>
                  </div>
                </div>
                <p className="text-sm text-law-gray">
                  A seasoned legal professional at SleekLegal with expertise in {post.category} and related practice areas.
                </p>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <h3 className="text-lg font-bold mb-4 text-law-charcoal">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map(relatedPost => (
                      <div key={relatedPost.id} className="flex gap-3">
                        <img 
                          src={relatedPost.imageUrl} 
                          alt={relatedPost.title}
                          className="w-16 h-16 object-cover rounded" 
                        />
                        <div>
                          <h4 className="font-medium text-sm mb-1">
                            <Link 
                              to={`/blog/${relatedPost.id}`} 
                              className="hover:text-law-gold transition-colors"
                            >
                              {relatedPost.title}
                            </Link>
                          </h4>
                          <p className="text-xs text-gray-500">{formatDate(relatedPost.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-bold mb-4 text-law-charcoal">Categories</h3>
                <div className="space-y-2">
                  {Array.from(new Set(blogPosts.map(p => p.category))).map(category => (
                    <Link 
                      key={category}
                      to={`/blog?category=${category}`}
                      className={`block py-2 px-3 rounded-md transition-colors ${
                        category === post.category 
                          ? 'bg-law-gold/10 text-law-gold' 
                          : 'hover:bg-gray-100 text-law-gray'
                      }`}
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* CTA */}
              <div className="bg-law-charcoal p-6 rounded-lg text-white">
                <h3 className="text-lg font-bold mb-4">Need Legal Help?</h3>
                <p className="text-sm mb-4 opacity-90">
                  Our attorneys are ready to assist you with legal matters related to {post.category}.
                </p>
                <Link 
                  to="/contact"
                  className="block w-full py-2 px-4 bg-law-gold text-white text-center rounded-md hover:bg-white hover:text-law-charcoal transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default BlogPost;
