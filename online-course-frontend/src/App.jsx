import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import CoursesList from './components/CoursesList';
import StudentsList from './components/StudentsList';
import InstructorsList from './components/InstructorsList';
import EnrollmentManager from './components/EnrollmentManager';
import AnalyticsView from './components/AnalyticsView';
import Modal from './components/Modal';

import { courseApi, studentApi, instructorApi, enrollmentApi } from './services/api';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Data states
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [modalType, setModalType] = useState(null); // 'course' | 'student' | 'instructor'
  const [editingItem, setEditingItem] = useState(null);
  
  // Form states
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [cRes, sRes, iRes, eRes] = await Promise.all([
        courseApi.getAll(),
        studentApi.getAll(),
        instructorApi.getAll(),
        enrollmentApi.getAll()
      ]);
      setCourses(cRes || []);
      setStudents(sRes || []);
      setInstructors(iRes || []);
      setEnrollments(eRes || []);
    } catch (err) {
      console.error('Failed to fetch platform data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData({});
  };

  const handleOpenEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData({ ...item });
  };

  const handleCloseModal = () => {
    setModalType(null);
    setEditingItem(null);
    setFormData({});
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'course') {
        const payload = {
          courseName: formData.courseName,
          totalSeats: Number(formData.totalSeats) || 30,
          availableSeats: formData.availableSeats !== undefined ? Number(formData.availableSeats) : (Number(formData.totalSeats) || 30),
          instructor: formData.instructorId ? { instructorId: Number(formData.instructorId) } : null
        };
        if (editingItem) {
          await courseApi.update(editingItem.courseId, payload);
        } else {
          await courseApi.create(payload);
        }
      } else if (modalType === 'student') {
        const payload = {
          studentName: formData.studentName,
          email: formData.email
        };
        if (editingItem) {
          await studentApi.update(editingItem.studentId, payload);
        } else {
          await studentApi.create(payload);
        }
      } else if (modalType === 'instructor') {
        const payload = {
          instructorName: formData.instructorName,
          email: formData.email
        };
        if (editingItem) {
          await instructorApi.update(editingItem.instructorId, payload);
        } else {
          await instructorApi.create(payload);
        }
      }
      handleCloseModal();
      fetchAllData();
    } catch (err) {
      alert('Error saving record: ' + err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    await courseApi.delete(id);
    fetchAllData();
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student record?')) return;
    await studentApi.delete(id);
    fetchAllData();
  };

  const handleDeleteInstructor = async (id) => {
    if (!window.confirm('Are you sure you want to delete this instructor?')) return;
    await instructorApi.delete(id);
    fetchAllData();
  };

  const handleEnrollStudent = async (studentId, courseId) => {
    await enrollmentApi.enroll(studentId, courseId);
    fetchAllData();
  };

  const triggerHeaderAction = () => {
    if (activeTab === 'courses') handleOpenAddModal('course');
    if (activeTab === 'students') handleOpenAddModal('student');
    if (activeTab === 'instructors') handleOpenAddModal('instructor');
    if (activeTab === 'enrollments') setActiveTab('enrollments');
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="main-layout">
        <Header
          activeTab={activeTab}
          onRefresh={fetchAllData}
          onActionClick={triggerHeaderAction}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="content-area">
          {loading ? (
            <div className="loading-spinner-container">
              <div className="spinner"></div>
              <p>Connecting to backend and loading resources...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardOverview
                  courses={courses}
                  students={students}
                  instructors={instructors}
                  enrollments={enrollments}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'courses' && (
                <CoursesList
                  courses={courses}
                  instructors={instructors}
                  searchTerm={searchTerm}
                  onAdd={() => handleOpenAddModal('course')}
                  onEdit={(c) => handleOpenEditModal('course', c)}
                  onDelete={handleDeleteCourse}
                />
              )}

              {activeTab === 'students' && (
                <StudentsList
                  students={students}
                  searchTerm={searchTerm}
                  onAdd={() => handleOpenAddModal('student')}
                  onEdit={(s) => handleOpenEditModal('student', s)}
                  onDelete={handleDeleteStudent}
                />
              )}

              {activeTab === 'instructors' && (
                <InstructorsList
                  instructors={instructors}
                  courses={courses}
                  searchTerm={searchTerm}
                  onAdd={() => handleOpenAddModal('instructor')}
                  onEdit={(i) => handleOpenEditModal('instructor', i)}
                  onDelete={handleDeleteInstructor}
                />
              )}

              {activeTab === 'enrollments' && (
                <EnrollmentManager
                  students={students}
                  courses={courses}
                  enrollments={enrollments}
                  onEnroll={handleEnrollStudent}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView courses={courses} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Dynamic Modal Dialog */}
      <Modal
        isOpen={!!modalType}
        onClose={handleCloseModal}
        title={
          modalType === 'course' ? (editingItem ? 'Edit Course' : 'Create New Course') :
          modalType === 'student' ? (editingItem ? 'Edit Student' : 'Add New Student') :
          modalType === 'instructor' ? (editingItem ? 'Edit Instructor' : 'Add New Instructor') : ''
        }
      >
        <form onSubmit={handleSaveItem} className="modal-form">
          {modalType === 'course' && (
            <>
              <div className="form-group">
                <label>Course Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Systems 101"
                  value={formData.courseName || ''}
                  onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Total Seats</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="30"
                    value={formData.totalSeats || ''}
                    onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Available Seats</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="30"
                    value={formData.availableSeats !== undefined ? formData.availableSeats : ''}
                    onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Assigned Instructor</label>
                <select
                  value={formData.instructorId || (formData.instructor?.instructorId || '')}
                  onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
                >
                  <option value="">-- Unassigned --</option>
                  {instructors.map(inst => (
                    <option key={inst.instructorId} value={inst.instructorId}>
                      {inst.instructorName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {(modalType === 'student' || modalType === 'instructor') && (
            <>
              <div className="form-group">
                <label>{modalType === 'student' ? 'Student Full Name' : 'Instructor Full Name'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={modalType === 'student' ? (formData.studentName || '') : (formData.instructorName || '')}
                  onChange={(e) => setFormData({
                    ...formData,
                    [modalType === 'student' ? 'studentName' : 'instructorName']: e.target.value
                  })}
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </>
          )}

          <div className="modal-footer-actions">
            <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
