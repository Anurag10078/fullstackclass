import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../data/courses.js";

export default function MyCourses() {
  const [purchased, setPurchased] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("purchasedCourses") || "[]");
    setPurchased(saved);
  }, []);

  const enrolled = useMemo(
    () => courses.filter((course) => purchased.includes(course.id)),
    [purchased]
  );

  function handleRemove(id) {
    const next = purchased.filter((courseId) => courseId !== id);
    localStorage.setItem("purchasedCourses", JSON.stringify(next));
    setPurchased(next);
  }

  if (enrolled.length === 0) {
    return (
      <section>
        <h1>My Courses</h1>
        <p className="muted">
          You haven't purchased any courses yet. <Link to="/">Browse courses</Link> to get started.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h1>My Courses</h1>
      <div className="booking-list">
        {enrolled.map((course) => (
          <div key={course.id} className="booking-item">
            <div className="poster sm">
              <img src={course.imageUrl} alt={course.title} />
            </div>
            <div className="booking-info">
              <h3>{course.title}</h3>
              <p className="muted">{course.category} · {course.instructor}</p>
              <p>{course.lessons} lessons · {course.duration}</p>
              <p>₹{course.price}</p>
            </div>
            <div className="booking-actions">
              <Link to={`/courses/${course.id}`} className="btn btn-ghost">
                Continue
              </Link>
              <button className="btn btn-danger" onClick={() => handleRemove(course.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
