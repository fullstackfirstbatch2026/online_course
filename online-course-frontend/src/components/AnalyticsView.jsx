import React, { useState, useEffect } from 'react';
import { BarChart3, Users, BookOpen, TrendingUp } from 'lucide-react';
import { courseApi, enrollmentApi } from '../services/api';

export default function AnalyticsView({ courses = [] }) {

  const [aboveAverageCourses, setAboveAverageCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [calculatedCount, setCalculatedCount] = useState(null);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingCount, setLoadingCount] = useState(false);

  useEffect(() => {
    loadAboveAverageCourses();
  }, []);

  const loadAboveAverageCourses = async () => {
    try {
      const data = await courseApi.getAboveAverage();
      setAboveAverageCourses(data);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoadingCourses(false);
    }
  };

  const handleCheckCount = async () => {

    if (!selectedCourse) return;

    setLoadingCount(true);
    setCalculatedCount(null);

    try {
      const count = await enrollmentApi.getCount(selectedCourse);
      setCalculatedCount(count);
    } catch (error) {
      console.error('Failed to get enrollment count:', error);
    } finally {
      setLoadingCount(false);
    }
  };

  return (
      <div className="analytics-page">

        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1>Course Analytics</h1>
            <p>
              View course enrollment statistics and performance.
            </p>
          </div>

          <BarChart3 size={32} />
        </div>


        {/* Summary Cards */}
        <div className="analytics-summary">

          <div className="summary-card">
            <div className="summary-icon">
              <BookOpen size={24} />
            </div>

            <div>
              <p>Total Courses</p>
              <h2>{courses.length}</h2>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              <Users size={24} />
            </div>

            <div>
              <p>Popular Courses</p>
              <h2>{aboveAverageCourses.length}</h2>
            </div>
          </div>


          <div className="summary-card">
            <div className="summary-icon">
              <TrendingUp size={24} />
            </div>

            <div>
              <p>Above Average</p>
              <h2>{aboveAverageCourses.length}</h2>
            </div>
          </div>

        </div>


        {/* Main Content */}
        <div className="analytics-content">

          {/* Above Average Courses */}
          <div className="analytics-card">

            <div className="section-title">
              <div>
                <h2>Courses Above Average Enrollment</h2>
                <p>
                  Courses with enrollment higher than the average.
                </p>
              </div>

              <TrendingUp size={24} />
            </div>


            {loadingCourses ? (

                <div className="loading">
                  Loading courses...
                </div>

            ) : aboveAverageCourses.length === 0 ? (

                <div className="empty-state">
                  No courses are currently above average.
                </div>

            ) : (

                <div className="course-list">

                  {aboveAverageCourses.map((course, index) => (

                      <div
                          className="course-row"
                          key={course.courseId || index}
                      >

                        <div className="course-rank">
                          {index + 1}
                        </div>

                        <div className="course-info">
                          <h3>{course.courseName}</h3>
                          <p>Course ID: {course.courseId}</p>
                        </div>

                        <div className="enrollment-badge">
                          {course.enrollmentCount} students
                        </div>

                      </div>

                  ))}

                </div>

            )}

          </div>


          {/* Enrollment Count */}
          <div className="analytics-card">

            <div className="section-title">

              <div>
                <h2>Check Enrollment</h2>
                <p>
                  Find the number of students enrolled in a course.
                </p>
              </div>

              <Users size={24} />

            </div>


            <div className="enrollment-form">

              <label>
                Select Course
              </label>

              <select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setCalculatedCount(null);
                  }}
              >

                <option value="">
                  Select a course
                </option>

                {courses.map((course) => (

                    <option
                        key={course.courseId}
                        value={course.courseId}
                    >
                      {course.courseName}
                    </option>

                ))}

              </select>


              <button
                  onClick={handleCheckCount}
                  disabled={!selectedCourse || loadingCount}
              >
                {loadingCount
                    ? 'Checking...'
                    : 'Check Enrollment'}
              </button>


              {calculatedCount !== null && (

                  <div className="enrollment-result">

                    <Users size={30} />

                    <div>
                      <span>Students Enrolled</span>

                      <strong>
                        {calculatedCount}
                      </strong>
                    </div>

                  </div>

              )}

            </div>

          </div>

        </div>

      </div>
  );
}