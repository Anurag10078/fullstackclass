import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { courses } from "../data/courses.js";

/**
 * Course details page: shows course info and allows demo enrollment.
 */
export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const course = useMemo(() => courses.find((item) => item.id === id), [id]);
  const [confirmed, setConfirmed] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("purchasedCourses") || "[]");
    return saved.includes(id);
  });
  const [message, setMessage] = useState("");

  if (!course) return <p className="error">Course not found.</p>;

  function handleBuy() {
    if (!user) {
      navigate("/login", { state: { from: `/courses/${id}` } });
      return;
    }

    const saved = JSON.parse(localStorage.getItem("purchasedCourses") || "[]");
    if (!saved.includes(id)) {
      const next = [...saved, id];
      localStorage.setItem("purchasedCourses", JSON.stringify(next));
      setConfirmed(true);
      setMessage("Added to My Courses. Start learning anytime.");
    }
  }

  return (
    <article className="course-details">
      <div className="details-hero">
        <div className="poster lg">
          <img src={course.imageUrl} alt={course.title} />
        </div>
        <div>
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p className="muted">by {course.instructor} · {course.level}</p>
          <div className="course-meta">
            <span>{course.lessons} lessons</span>
            <span>{course.duration}</span>
            <span>{course.rating} ★ ({course.reviews} reviews)</span>
          </div>
          <p>{course.description}</p>
          <div className="course-actions">
            <button className="btn btn-primary" onClick={handleBuy} disabled={confirmed}>
              {confirmed ? "Enrolled" : `Buy now ₹${course.price}`}
            </button>
            <p className="muted">
              {confirmed
                ? "You can access this course from My Courses."
                : user
                ? "Click buy to enroll instantly."
                : <><Link to="/login">Login</Link> to enroll.</>}
            </p>
          </div>
          {message && <p className="success">{message}</p>}
        </div>
      </div>

      <section>
        <h2>What you'll learn</h2>
        <div className="course-feature-grid">
          <div>
            <strong>Summary</strong>
            <p>{course.summary}</p>
          </div>
          <div>
            <strong>Course tags</strong>
            <p className="tags">{course.tags.join(" · ")}</p>
          </div>
          <div>
            <strong>Highlights</strong>
            <ul>
              <li>Expert instruction for real-world skills</li>
              <li>Project-based learning and portfolio-ready outcomes</li>
              <li>Lifetime access with instant enrollment</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2>More courses</h2>
        <div className="course-grid">
          {courses.filter((item) => item.id !== id).map((item) => (
            <Link key={item.id} to={`/courses/${item.id}`} className="course-card small">
              <div className="poster">
                <img src={item.imageUrl} alt={item.title} loading="lazy" />
              </div>
              <div className="course-card-body">
                <h3>{item.title}</h3>
                <p className="muted">{item.category} · {item.instructor}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
