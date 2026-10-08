import React from 'react';
import { UserCheck, Mail, Plus, Edit3, Trash2, BookOpen } from 'lucide-react';

export default function InstructorsList({ instructors, courses, searchTerm, onAdd, onEdit, onDelete }) {
  const filtered = instructors.filter(i =>
    (i.instructorName && i.instructorName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (i.email && i.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="instructors-view">
      <div className="view-toolbar">
        <div className="toolbar-stats">
          <span className="pill-badge">{filtered.length} Instructors Listed</span>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <Plus size={18} />
          <span>Add New Instructor</span>
        </button>
      </div>

      <div className="instructors-grid">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
            <UserCheck size={48} className="empty-icon" />
            <h3>No Instructors Found</h3>
            <p>Add faculty members to assign them to courses.</p>
            <button className="btn-primary" onClick={onAdd}>Add Instructor</button>
          </div>
        ) : (
          filtered.map((inst) => {
            const assignedCourses = courses.filter(
              c => c.instructor?.instructorId === inst.instructorId || c.instructor?.instructorName === inst.instructorName
            );

            return (
              <div key={inst.instructorId} className="instructor-card">
                <div className="inst-avatar-large">
                  {inst.instructorName ? inst.instructorName.charAt(0) : 'I'}
                </div>
                <h3 className="inst-name">{inst.instructorName}</h3>
                <div className="inst-email">
                  <Mail size={14} />
                  <span>{inst.email}</span>
                </div>

                <div className="inst-teaching-box">
                  <div className="box-header">
                    <BookOpen size={15} />
                    <span>Assigned Courses ({assignedCourses.length})</span>
                  </div>
                  {assignedCourses.length === 0 ? (
                    <p className="no-assigned">No courses currently assigned</p>
                  ) : (
                    <ul className="assigned-list">
                      {assignedCourses.map(c => (
                        <li key={c.courseId}>{c.courseName}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="card-footer-actions">
                  <button className="btn-secondary btn-sm" onClick={() => onEdit(inst)}>
                    <Edit3 size={15} />
                    <span>Edit Profile</span>
                  </button>
                  <button className="btn-danger-outline btn-sm" onClick={() => onDelete(inst.instructorId)}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
