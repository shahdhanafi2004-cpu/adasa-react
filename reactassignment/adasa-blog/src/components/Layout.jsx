import { NavLink, Link, Outlet } from "react-router-dom";
import data from "../data/posts.json";

export default function Layout() {
  const { siteInfo } = data;

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          {/* اللوجو (يمين) */}
          <Link to="/" className="logo">
            <span className="logo-icon">📷</span>
            <span className="logo-text">
              <strong>{siteInfo.name}</strong>
              <small>{siteInfo.tagline}</small>
            </span>
          </Link>

          {/* الروابط (النص) */}
          <nav className="nav-pill">
            <NavLink to="/" end>الرئيسية</NavLink>
            <NavLink to="/blog">المدونة</NavLink>
            <NavLink to="/about">من نحن</NavLink>
          </nav>

          {/* الأكشن (شمال) */}
          <div className="nav-actions">
            <Link to="/blog" className="icon-btn" aria-label="بحث">🔍</Link>
            <Link to="/blog" className="btn-orange">ابدأ القراءة</Link>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>© {new Date().getFullYear()} {siteInfo.name} - {siteInfo.tagline}</p>
          <p className="muted">{siteInfo.description}</p>
        </div>
      </footer>
    </>
  );
}