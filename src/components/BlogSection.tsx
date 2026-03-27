import spaImage from "@/assets/spa-interior.jpg";

const posts = [
  { title: "What to Expect During Your First Treatment", category: "Skincare Tips" },
  { title: "5 Skincare Habits Our Estheticians Swear By", category: "Expert Advice" },
  { title: "Upgrade Your Skincare Routine This Season", category: "Seasonal Care" },
];

const BlogSection = () => {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="section-subtitle text-center mb-3">The Glow Blog</p>
        <h2 className="section-title text-center mb-12">Let's Talk Skincare</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.title} className="group cursor-pointer space-y-4">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={spaImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={1200}
                  height={800}
                />
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{post.category}</p>
              <h3 className="font-display text-lg group-hover:text-muted-foreground transition-colors">
                {post.title}
              </h3>
              <a href="#" className="text-xs tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors">
                Read more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
