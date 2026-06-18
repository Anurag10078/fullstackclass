import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="course-card">
      <div className="poster">
        <img src={course.imageUrl} alt={course.title} loading="lazy" />
        <span className="rating-badge">★ {course.rating}</span>
      </div>
      <div className="course-card-body">
        <h3>{course.title}</h3>
        <p className="muted">{course.instructor} · {course.category}</p>
        <div className="course-meta">
          <span>{course.lessons} lessons</span>
          <span>{course.duration}</span>
        </div>
        <p className="price">₹{course.price}</p>
      </div>
    </Link>
  );
}
