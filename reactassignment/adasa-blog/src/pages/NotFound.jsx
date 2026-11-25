import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      <p>الصفحة دي مش موجودة</p>
      <Link to="/">الرجوع للرئيسية</Link>
    </div>
  );
}