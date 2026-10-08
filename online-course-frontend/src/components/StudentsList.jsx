import React from 'react';
import { Users, Mail, Plus, Edit3, Trash2, GraduationCap } from 'lucide-react';

export default function StudentsList({ students, searchTerm, onAdd, onEdit, onDelete }) {
  const filtered = students.filter(s =>
    (s.studentName && s.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="students-view">
      <div className="view-toolbar">
        <div className="toolbar-stats">
          <span className="pill-badge">{filtered.length} Students Registered</span>
        </div>
        <button className="btn-primary" onClick={onAdd}>
          <Plus size={18} />
          <span>Add New Student</span>
        </button>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No students found matching your criteria.
                </td>
              </tr>
            ) : (
              filtered.map((student) => (
                <tr key={student.studentId}>
                  <td className="font-mono">#{student.studentId}</td>
                  <td>
                    <div className="table-user-cell">
                      <div className="user-avatar-sm">{student.studentName ? student.studentName.charAt(0) : 'S'}</div>
                      <span className="font-medium">{student.studentName}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-email-cell">
                      <Mail size={15} className="text-muted" />
                      <span>{student.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn-icon-sm" onClick={() => onEdit(student)} title="Edit Student">
                        <Edit3 size={16} />
                      </button>
                      <button className="btn-icon-sm btn-icon-danger" onClick={() => onDelete(student.studentId)} title="Delete Student">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
