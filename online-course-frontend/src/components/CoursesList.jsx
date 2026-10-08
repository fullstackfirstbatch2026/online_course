import React from 'react';
import { BookOpen, User, Users, Trash2, Edit3, Plus, ShieldCheck } from 'lucide-react';

export default function CoursesList({ courses, instructors, searchTerm, onAdd, onEdit, onDelete }) {
  const filtered = courses.filter(c =>
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.instructor?.instructorName && c.instructor.instructorName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="courses-view">
      <div className="view-toolbar">
        <div className="toolbar-stats">
          <span className="pill-badge">{filtered.length} Courses Found</span>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <Plus size={18} />
          <span>Add New Course</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <h3>No Courses Found</h3>
          <p>Try searching for a different keyword or create a new course.</p>
          <button className="btn-primary" onClick={onAdd}>Add Course</button>
        </div>
      ) : (
        <div className="courses-grid">
          {filtered.map((course) => {
            const total = course.totalSeats || 0;
            const avail = course.availableSeats ?? total;
            const taken = Math.max(0, total - avail);
            const fillPct = total > 0 ? Math.round((taken / total) * 100) : 0;
            const isFull = avail === 0;

            return (
              <div key={course.courseId} className="course-card">
                <div className="course-card-header">
                  <div className="course-tag">
                    <BookOpen size={16} />
                    <span>ID: #{course.courseId}</span>
                  </div>
                  <span className={`status-badge ${isFull ? 'badge-danger' : 'badge-success'}`}>
                    {isFull ? 'Full / Closed' : `${avail} Seats Left`}
                  </span>
                </div>

                <h3 className="course-name">{course.courseName}</h3>

                <div className="course-meta">
                  <div className="meta-row">
                    <User size={16} className="meta-icon" />
                    <span>Instructor: <strong>{course.instructor?.instructorName || 'Unassigned'}</strong></span>
                  </div>
                  <div className="meta-row">
                    <Users size={16} className="meta-icon" />
                    <span>Capacity: <strong>{taken} / {total} Enrolled</strong></span>
                  </div>
                </div>

                {/* Seats progress bar */}
                <div className="seat-progress-container">
                  <div className="progress-labels">
                    <span>Occupancy</span>
                    <span>{fillPct}%</span>
                  </div>
                  <div className="mini-progress">
                    <div
                      className={`mini-fill ${fillPct > 85 ? 'fill-warning' : 'fill-primary'}`}
                      style={{ width: `${fillPct}%` }}
                    ></div>
                  </div>
                </div>

                <div className="course-card-actions">
                  <button className="btn-secondary btn-sm" onClick={() => onEdit(course)}>
                    <Edit3 size={15} />
                    <span>Edit</span>
                  </button>
                  <button className="btn-danger-outline btn-sm" onClick={() => onDelete(course.courseId)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
