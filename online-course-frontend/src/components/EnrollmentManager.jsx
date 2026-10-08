import React, { useState } from 'react';
import {
  GraduationCap,
  UserPlus,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function EnrollmentManager({
                                            students,
                                            courses,
                                            enrollments,
                                            onEnroll
                                          }) {
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleEnroll = async (e) => {
    e.preventDefault();

    if (!selectedStudentId || !selectedCourseId) {
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      await onEnroll(
          Number(selectedStudentId),
          Number(selectedCourseId)
      );

      setMessage({
        type: 'success',
        text: 'Student enrolled successfully!'
      });

      setSelectedStudentId('');
      setSelectedCourseId('');

    } catch (err) {
      setMessage({
        type: 'error',
        text: err.message || 'Enrollment failed.'
      });

    } finally {
      setSubmitting(false);
    }
  };

  return (
      <div className="enrollments-view">

        <div className="grid-split">

          {/* =========================
            ENROLL STUDENT FORM
        ========================== */}
          <div className="content-card form-card">

            <div className="card-header">

              <div className="header-icon-box bg-primary-soft">
                <UserPlus
                    size={20}
                    className="text-primary"
                />
              </div>

              <div>
                <h3>Enroll Student in Course</h3>

                <p className="card-subtitle">
                  Register a student for an available course.
                </p>
              </div>

            </div>


            {/* Success / Error Message */}
            {message && (
                <div
                    className={`alert-box ${
                        message.type === 'success'
                            ? 'alert-success'
                            : 'alert-error'
                    }`}
                >

                  {message.type === 'success' ? (
                      <CheckCircle size={18} />
                  ) : (
                      <AlertCircle size={18} />
                  )}

                  <span>{message.text}</span>

                </div>
            )}


            {/* Enrollment Form */}
            <form
                onSubmit={handleEnroll}
                className="enrollment-form"
            >

              {/* Student Selection */}
              <div className="form-group">

                <label>Select Student</label>

                <select
                    value={selectedStudentId}
                    onChange={(e) =>
                        setSelectedStudentId(e.target.value)
                    }
                    required
                >

                  <option value="">
                    -- Choose a registered student --
                  </option>

                  {students.map((student) => (
                      <option
                          key={student.studentId}
                          value={student.studentId}
                      >
                        {student.studentName} ({student.email})
                      </option>
                  ))}

                </select>

              </div>


              {/* Course Selection */}
              <div className="form-group">

                <label>Select Course</label>

                <select
                    value={selectedCourseId}
                    onChange={(e) =>
                        setSelectedCourseId(e.target.value)
                    }
                    required
                >

                  <option value="">
                    -- Choose an available course --
                  </option>

                  {courses.map((course) => (
                      <option
                          key={course.courseId}
                          value={course.courseId}
                          disabled={course.availableSeats === 0}
                      >
                        {course.courseName} (
                        {course.availableSeats} seats left of{' '}
                        {course.totalSeats}
                        )
                      </option>
                  ))}

                </select>

              </div>


              {/* Submit Button */}
              <button
                  type="submit"
                  className="btn-primary btn-full"
                  disabled={submitting}
              >

                <GraduationCap size={18} />

                <span>
                {submitting
                    ? 'Registering...'
                    : 'Register Enrollment'}
              </span>

              </button>

            </form>

          </div>


          {/* =========================
            ENROLLMENT RECORDS
        ========================== */}
          <div className="content-card table-card-flex">

            <div className="card-header">

              <div>

                <h3>Enrollment Records</h3>

                <p className="card-subtitle">
                  View students enrolled in each course.
                </p>

              </div>

              <span className="pill-badge">
              {enrollments.length} Records
            </span>

            </div>


            {/* Enrollment Table */}
            <table className="data-table">

              <thead>

              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Instructor</th>
                <th>Date</th>
              </tr>

              </thead>


              <tbody>

              {enrollments.length === 0 ? (

                  <tr>

                    <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500"
                    >
                      No active enrollments recorded.
                    </td>

                  </tr>

              ) : (

                  enrollments.map((item, idx) => (

                      <tr key={idx}>

                        {/* Student */}
                        <td>

                          <div className="font-medium">
                            {item.studentName}
                          </div>

                          <div className="text-xs text-muted">
                            {item.email}
                          </div>

                        </td>


                        {/* Course */}
                        <td>

                      <span className="course-tag-sm">
                        {item.courseName}
                      </span>

                        </td>


                        {/* Instructor */}
                        <td>
                          {item.instructorName || 'Unassigned'}
                        </td>


                        {/* Enrollment Date */}
                        <td className="font-mono text-sm">
                          {item.enrollmentDate}
                        </td>

                      </tr>

                  ))

              )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
  );
}