'use client'

/**
 * BlogSection Component
 * 
 * Displays a preview grid of the newest blog posts
 * Features:
 * - Responsive 3-column grid layout
 * - Preview images for each blog post
 * - Link to view all blogs
 * 
 * TODO: Replace with actual blog data from API
 */
export default function BlogSection() {
  // Placeholder blog data - will be replaced with API call
  const blogs = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400',
      alt: 'Blog 1',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=400',
      alt: 'Blog 2',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400',
      alt: 'Blog 3',
    },
  ]

  return (
    <div className="my-9 w-full">
      <div className="flex h-6 w-full items-center justify-between">
        <h3 className="text-xl font-semibold leading-normal tracking-wide">
          Newest blogs
        </h3>
        <div className="flex cursor-pointer items-center justify-start gap-2 hover:text-blue-600 hover:underline">
          <h4 className="text-base font-normal leading-none">View more</h4>
          <span>→</span>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-5 h-100">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-200 rounded-lg overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={blog.image}
              alt={blog.alt}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
