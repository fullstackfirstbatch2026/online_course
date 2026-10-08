import React from 'react';
import { BookOpen, Users, UserCheck, GraduationCap, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';

export default function DashboardOverview({ courses, students, instructors, enrollments, onNavigate }) {
  const totalSeats = courses.reduce((sum, c) => sum + (c.totalSeats || 0), 0);
  const availableSeats = courses.reduce((sum, c) => sum + (c.availableSeats || 0), 0);
  const filledSeats = Math.max(0, totalSeats - availableSeats);
  const capacityPct = totalSeats > 0 ? Math.round((filledSeats / totalSeats) * 100) : 0;

  const stats = [
    { title: 'Total Courses', value: courses.length, icon: BookOpen, color: 'blue', change: '+12% this month' },
    { title: 'Enrolled Students', value: students.length, icon: Users, color: 'emerald', change: '+18% new signups' },
    { title: 'Faculty Instructors', value: instructors.length, icon: UserCheck, color: 'purple', change: '100% active' },
    { title: 'Total Registrations', value: enrollments.length, icon: GraduationCap, color: 'amber', change: `${capacityPct}% seat capacity filled` },
  ];

  return (
    <div className="dashboard-view">
      {/* Metric Cards */}
      <div className="metrics-grid">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`metric-card card-${stat.color}`}>
              <div className="metric-header">
                <span className="metric-title">{stat.title}</span>
                <div className={`metric-icon-box box-${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>
              <div className="metric-value">{stat.value}</div>
              <div className="metric-footer">
                <TrendingUp size={14} className="trend-icon" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Banner / Seat Capacity Widget */}
      <div className="capacity-card">
        <div className="capacity-info">
          <div className="badge-sparkle">
            <Sparkles size={14} />
            <span>Seat Capacity Utilization</span>
          </div>
          <h3>Overall Campus Capacity: {capacityPct}% Filled</h3>
          <p>Currently {filledSeats} seats are occupied out of {totalSeats} available across all courses.</p>
        </div>
        <div className="capacity-visual">
          <div className="progress-bar-large">
            <div className="progress-fill" style={{ width: `${capacityPct}%` }}></div>
          </div>
          <span className="capacity-numbers">{filledSeats} / {totalSeats} Seats</span>
        </div>
      </div>

      {/* Grid: Popular Courses & Recent Activity */}
      <div className="dashboard-grid">
        {/* Course Directory Quick Access */}
        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Featured Courses</h3>
              <p className="card-subtitle">Active courses with real-time seat tracking</p>
            </div>
            <button className="btn-link" onClick={() => onNavigate('courses')}>
              View All ({courses.length}) <ChevronRight size={16} />
            </button>
          </div>
          <div className="featured-courses-list">
            {courses.slice(0, 4).map((course) => {
              const occPct = course.totalSeats ? Math.round(((course.totalSeats - course.availableSeats) / course.totalSeats) * 100) : 0;
              return (
                <div key={course.courseId} className="course-item-row">
                  <div className="course-item-info">
                    <div className="course-avatar">{course.courseName.charAt(0)}</div>
                    <div>
                      <span className="course-title">{course.courseName}</span>
                      <span className="instructor-sub">Instructor: {course.instructor?.instructorName || 'Unassigned'}</span>
                    </div>
                  </div>
                  <div className="course-seats-bar">
                    <div className="seat-badge">
                      <span className="seats-avail">{course.availableSeats}</span> / {course.totalSeats} seats left
                    </div>
                    <div className="mini-progress">
                      <div className="mini-fill" style={{ width: `${occPct}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Enrollments Table */}
        <div className="content-card">
          <div className="card-header">
            <div>
              <h3>Recent Enrollments</h3>
              <p className="card-subtitle">Live registration feed via SQL Join</p>
            </div>
            <button className="btn-link" onClick={() => onNavigate('enrollments')}>
              View Logs <ChevronRight size={16} />
            </button>
          </div>
          <div className="recent-enrollments-list">
            {enrollments.length === 0 ? (
              <p className="empty-msg">No recent enrollments recorded.</p>
            ) : (
              enrollments.slice(0, 5).map((e, idx) => (
                <div key={idx} className="enrollment-feed-item">
                  <div className="student-feed-badge">{e.studentName ? e.studentName.charAt(0) : 'S'}</div>
                  <div className="feed-details">
                    <div className="feed-main">
                      <strong>{e.studentName}</strong> enrolled in <span className="highlight-course">{e.courseName}</span>
                    </div>
                    <div className="feed-sub">
                      <span>Instructor: {e.instructorName || 'N/A'}</span>
                      <span className="dot-sep">•</span>
                      <span>{e.enrollmentDate}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
