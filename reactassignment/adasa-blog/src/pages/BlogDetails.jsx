import { useParams, Link, Navigate } from "react-router-dom";
import data from "../data/posts.json";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogDetails() {
  const { id } = useParams();
  const post = data.posts.find((p) => p.id === Number(id));
  if (!post) return <Navigate to="/404" replace />;

  let n = 0;
  const blocks = post.content.split("\n\n").map((text) =>
    text.startsWith("## ")
      ? { type: "h", text: text.slice(3), id: `section-${n++}` }
      : { type: "p", text }
  );
  const headings = blocks.filter((b) => b.type === "h");

  return (
    <article>
      <header className="hero" style={{ backgroundImage: `url(${post.image})` }}>
        <div className="hero-overlay" />
        <div className="container hero-inner">
          <nav className="breadcrumb">
            <Link to="/">🏠</Link>
            <span>›</span>
            <Link to="/blog">المدونة</Link>
            <span>›</span>
            <span className="current">{post.category}</span>
          </nav>

          <div className="hero-meta">
            <span className="badge-orange">{post.category}</span>
            <span>📅 {formatDate(post.date)}</span>
            <span>🕒 {post.readTime}</span>
          </div>

          <h1>{post.title}</h1>

          <div className="author-card">
            <img src={post.author.avatar} alt={post.author.name} />
            <div>
              <strong>{post.author.name}</strong>
              <small>{post.author.role}</small>
            </div>
          </div>
        </div>
      </header>

      <div className="container details-layout">
        <div className="details-main">
          <blockquote className="excerpt">{post.excerpt}</blockquote>

          {blocks.map((b, i) =>
            b.type === "h" ? (
              <h2 key={i} id={b.id}>{b.text}</h2>
            ) : (
              <p key={i}>{b.text}</p>
            )
          )}

          <div className="tags">
            {post.tags.map((t) => (
              <span key={t} className="tag">#{t}</span>
            ))}
          </div>
        </div>

        <aside className="toc">
          <h3>📋 محتويات المقال</h3>
          <ul>
            {headings.map((h) => (
              <li key={h.id}>
                <a href={`#${h.id}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}