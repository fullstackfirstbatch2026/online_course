import React from 'react';
import { Search, Bell, Plus, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, onRefresh, onActionClick, searchTerm, setSearchTerm }) {
  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'courses': return 'Courses Directory';
      case 'students': return 'Student Registry';
      case 'instructors': return 'Instructor Profiles';
      case 'enrollments': return 'Course Enrollments';
      case 'analytics': return 'Analytics & Insights';
      default: return 'Online Course Platform';
    }
  };

  const getSubTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Real-time course stats, recent activity, and system metrics.';
      case 'courses': return 'Manage courses, seats capacity, and instructor assignments.';
      case 'students': return 'View and update registered student records.';
      case 'instructors': return 'Manage faculty members and assigned teaching loads.';
      case 'enrollments': return 'Register students to courses and monitor enrollment logs.';
      case 'analytics': return 'Deep insights into high-demand courses and capacity SQL queries.';
      default: return '';
    }
  };

  const showAddBtn = ['courses', 'students', 'instructors', 'enrollments'].includes(activeTab);

  const getAddLabel = () => {
    if (activeTab === 'courses') return 'Add Course';
    if (activeTab === 'students') return 'Add Student';
    if (activeTab === 'instructors') return 'Add Instructor';
    if (activeTab === 'enrollments') return 'New Enrollment';
    return 'Add New';
  };

  return (
    <header className="main-header">
      <div className="header-titles">
        <h1>{getTitle()}</h1>
        <p>{getSubTitle()}</p>
      </div>

      <div className="header-actions">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search across portal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <button className="btn-icon" onClick={onRefresh} title="Refresh Data">
          <RefreshCw size={18} />
        </button>

        <div className="notification-wrapper">
          <button className="btn-icon" title="Notifications">
            <Bell size={18} />
            <span className="badge-pulse"></span>
          </button>
        </div>

        {showAddBtn && (
          <button className="btn-primary" onClick={onActionClick}>
            <Plus size={18} />
            <span>{getAddLabel()}</span>
          </button>
        )}
      </div>
    </header>
  );
}
