
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import ScrollToTop from "../components/ScrollToTop";
import ChatWidget from "../components/ChatWidget";
import { useBlog, BlogPost } from "../contexts/BlogContext";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

const Blog = () => {
  const { blogPosts } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    document.title = "Blog | SleekLegal";
    window.scrollTo(0, 0);
  }, []);

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            </BreadcrumbList>
          </Breadcrumb>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Legal Insights</h1>
          <p className="text-lg max-w-3xl opacity-90">
            Stay informed with articles and updates from our legal experts.
          </p>
        </div>
      </div>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Featured Post (if any) */}
              {blogPosts.filter(post => post.featured).length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-law-charcoal">Featured Article</h2>
                  {blogPosts.filter(post => post.featured).map(post => (
                    <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover object-center" 
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {post.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-law-charcoal">
                          <Link to={`/blog/${post.id}`} className="hover:text-law-gold transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-law-gray mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-law-gray">By {post.author}</span>
                          <Link 
                            to={`/blog/${post.id}`}
                            className="text-law-gold font-medium hover:text-law-charcoal transition-colors"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* All Blog Posts */}
              <div>
                <h2 className="text-2xl font-bold mb-6 text-law-charcoal">All Articles</h2>
                <div className="space-y-8">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map(post => (
                      <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-48 object-cover object-center rounded" 
                          />
                        </div>
                        <div className="md:w-2/3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-law-charcoal">
                            <Link to={`/blog/${post.id}`} className="hover:text-law-gold transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          <p className="text-law-gray mb-4">{post.excerpt}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-law-gray">By {post.author}</span>
                            <Link 
                              to={`/blog/${post.id}`}
                              className="text-law-gold font-medium hover:text-law-charcoal transition-colors"
                            >
                              Read More →
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-law-gray">No articles found matching your search.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-law-charcoal">Search</h3>
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-law-gold"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-law-charcoal">Categories</h3>
                <div className="space-y-2">
                  <button 
                    className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                      selectedCategory === null 
                        ? 'bg-law-gold/10 text-law-gold' 
                        : 'hover:bg-gray-100 text-law-gray'
                    }`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </button>
                  {categories.map(category => (
                    <button 
                      key={category}
                      className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                        selectedCategory === category 
                          ? 'bg-law-gold/10 text-law-gold' 
                          : 'hover:bg-gray-100 text-law-gray'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold mb-4 text-law-charcoal">Recent Posts</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <div key={post.id} className="flex gap-3">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded" 
                      />
                      <div>
                        <h4 className="font-medium text-sm mb-1">
                          <Link to={`/blog/${post.id}`} className="hover:text-law-gold transition-colors">
                            {post.title}
                          </Link>
                        </h4>
                        <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <ScrollToTop />
      <ChatWidget />
    </div>
  );
};

export default Blog;
