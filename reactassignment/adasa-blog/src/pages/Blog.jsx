import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/posts.json";

const PAGE_SIZE = 6;
const allPosts = data.posts;
const categories = ["الكل", ...new Set(allPosts.map((p) => p.category))];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [page, setPage] = useState(1);

  // 1) فلترة: search + category مع بعض
  const q = search.trim().toLowerCase();
  const filtered = allPosts.filter((p) => {
    const matchSearch =
      p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    const matchCategory = category === "الكل" || p.category === category;
    return matchSearch && matchCategory;
  });

  // 2) Pagination على النتيجة المفلترة
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // أي تغيير في الفلتر يرجّعنا لصفحة 1
  const onSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };
  const onCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>المدونة</h1>
          <p>اكتشف أحدث المقالات والنصائح في عالم التصوير الفوتوغرافي</p>
        </div>
      </section>

      <section className="container blog-page">
        {/* ===== Toolbar ===== */}
        <div className="toolbar">
          <input
            type="search"
            className="search-input"
            placeholder="ابحث عن تدوينة..."
            value={search}
            onChange={onSearch}
          />

          <select className="select" value={category} onChange={onCategory}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              className={view === "grid" ? "active" : ""}
              onClick={() => setView("grid")}
            >
              ▦ شبكة
            </button>
            <button
              className={view === "list" ? "active" : ""}
              onClick={() => setView("list")}
            >
              ☰ قائمة
            </button>
          </div>
        </div>

        <p className="results-count">{filtered.length} تدوينة</p>

        {/* ===== Posts ===== */}
        {visible.length === 0 ? (
          <p className="empty">مفيش تدوينات مطابقة للبحث 🔍</p>
        ) : (
          <div className={`posts ${view}`}>
            {visible.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="card">
                <div className="card-img">
                  <img src={post.image} alt={post.title} />
                  <span className="badge-orange">{post.category}</span>
                </div>
                <div className="card-body">
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className="card-meta">
                    <img src={post.author.avatar} alt="" />
                    <span>{post.author.name}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* ===== Pagination ===== */}
        {totalPages > 1 && (
          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
              ›
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                className={n === page ? "active" : ""}
                onClick={() => setPage(n)}
              >
                {n}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              ‹
            </button>
          </div>
        )}
      </section>
    </>
  );
}