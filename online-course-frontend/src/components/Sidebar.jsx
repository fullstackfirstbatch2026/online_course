import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCheck, 
  GraduationCap, 
  BarChart3 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'instructors', label: 'Instructors', icon: UserCheck },
    { id: 'enrollments', label: 'Enrollments', icon: GraduationCap },
    { id: 'analytics', label: 'Analytics & Insights', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <GraduationCap className="brand-icon" size={28} />
        </div>
        <div className="brand-text">
          <h2>EduPortal</h2>
          <span>Course Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {isActive && <div className="active-indicator" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="backend-status">
          <span className="status-dot"></span>
          <span className="status-text">Spring Boot Backend connected</span>
        </div>
      </div>
    </aside>
  );
}
