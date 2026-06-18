import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard.jsx";
import { courses } from "../data/courses.js";

/**
 * Landing page for demo courses with search and featured listings.
 */
export default function Home() {
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    const term = search.toLowerCase().trim();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.category.toLowerCase().includes(term) ||
        course.instructor.toLowerCase().includes(term)
    );
  }, [search]);

  return (
    <section>
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Launch your skills</p>
          <h1>Buy courses, learn fast, and grow your career.</h1>
          <p className="hero-text">
            Explore demo courses built for web development, data science, design, and backend engineering.
          </p>
          <div className="search-card">
            <input
              className="search"
              placeholder="Search courses, instructors, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="course-count">{filteredCourses.length} courses found</span>
          </div>
        </div>
      </div>

      <div className="course-grid">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
