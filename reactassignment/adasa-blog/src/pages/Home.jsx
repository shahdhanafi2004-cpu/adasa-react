import { useState } from "react";
import { Link } from "react-router-dom";
import data from "../data/posts.json";

const { posts, siteInfo } = data;

const featured = posts.filter((p) => p.featured);
const latest = posts.filter((p) => !p.featured).slice(0, 3);

const categories = [...new Set(posts.map((p) => p.category))].map((name) => ({
  name,
  count: posts.filter((p) => p.category === name).length,
}));

const categoryIcons = {
  إضاءة: "💡",
  بورتريه: "👤",
  "مناظر طبيعية": "🏔️",
  تقنيات: "🎛️",
  معدات: "📷",
};

const authorsCount = new Set(posts.map((p) => p.author.name)).size;

const formatDate = (d) =>
  new Date(d).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  const stats = [
    { icon: "📰", value: "50+", label: "مقالة" },
    { icon: "👥", value: "+10 ألف", label: "قارئ" },
    { icon: "📁", value: categories.length, label: "تصنيفات" },
    { icon: "✒️", value: authorsCount, label: "كاتب" },
  ];

  return (
    <>
      {/* ===== 1) Hero ===== */}
      <section className="home-hero">
        <div className="container">
          <h1>
            اكتشف <span className="accent">فن</span>
            <br />
            التصوير الفوتوغرافي
          </h1>
          <p>{siteInfo.description}</p>

          <div className="hero-actions">
            <Link to="/blog" className="btn-orange">← استكشف المقالات</Link>
            <Link to="/about" className="btn-outline">ⓘ اعرف المزيد</Link>
          </div>

          <div className="stats">
            {stats.map((s) => (
              <div key={s.label} className="stat">
                <span className="stat-icon">{s.icon}</span>
                <strong>{s.value}</strong>
                <small>{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 2) مقالات مختارة ===== */}
      <section className="container section">
        <div className="section-head">
          <div>
            <h2>مقالات مختارة</h2>
            <p>محتوى منتقى لبدء رحلة تعلمك</p>
          </div>
          <Link to="/blog" className="btn-orange small">عرض الكل ‹</Link>
        </div>

        <div className="featured-list">
          {featured.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="featured-card">
              <div className="featured-info">
                <div className="featured-meta">
                  <span className="badge-outline">{post.category}</span>
                  <span>🕒 {post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="featured-footer">
                  <div className="mini-author">
                    <img src={post.author.avatar} alt={post.author.name} />
                    <div>
                      <strong>{post.author.name}</strong>
                      <small>{formatDate(post.date)}</small>
                    </div>
                  </div>
                  <span className="read-more">← اقرأ المقال</span>
                </div>
              </div>

              <div className="featured-img">
                <img src={post.image} alt={post.title} />
                <span className="badge-orange">⭐ مميز</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 3) التصنيفات ===== */}
      <section className="categories-section">
        <div className="container section">
          <div className="center-head">
            <span className="pill">● التصنيفات</span>
            <h2>استكشف حسب الموضوع</h2>
            <p>اعثر على محتوى مصمم حسب اهتماماتك</p>
          </div>

          <div className="categories-grid">
            {categories.map((c) => (
              <Link to="/blog" key={c.name} className="category-card">
                <span className="category-icon">{categoryIcons[c.name] ?? "📂"}</span>
                <strong>{c.name}</strong>
                <small>{c.count} مقالة</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4) أحدث المقالات ===== */}
      <section className="container section">
        <div className="section-head">
          <div>
            <h2>أحدث المقالات</h2>
            <p>محتوى جديد طازج من المطبعة</p>
          </div>
          <Link to="/blog" className="link-orange">← عرض جميع المقالات</Link>
        </div>

        <div className="posts grid">
          {latest.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="card">
              <div className="card-img">
                <img src={post.image} alt={post.title} />
                <span className="badge-dark">{post.category}</span>
              </div>
              <div className="card-body">
                <small className="card-date">
                  🕒 {post.readTime} · {formatDate(post.date)}
                </small>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="card-meta">
                  <img src={post.author.avatar} alt="" />
                  <div className="meta-text">
                    <strong>{post.author.name}</strong>
                    <small>{post.author.role}</small>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== 5) النشرة الإخبارية ===== */}
      <section className="container section">
        <div className="newsletter">
          <span className="news-icon">✉️</span>
          <h2>
            اشترك في <span className="accent">نشرتنا الإخبارية</span>
          </h2>
          <p>احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني</p>

          {subscribed ? (
            <p className="success">✅ تم الاشتراك بنجاح، شكرًا لك!</p>
          ) : (
            <form className="news-form" onSubmit={onSubscribe}>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn-orange">اشترك الآن</button>
            </form>
          )}

          <small className="news-note">
            انضم لـ +10,000 مصور · بدون إزعاج · إلغاء الاشتراك في أي وقت
          </small>
        </div>
      </section>
    </>
  );
}
