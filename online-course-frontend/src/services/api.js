const API_BASE_URL = 'http://localhost:8081/api';
// Initial fallback mock data in case backend is offline
const MOCK_INSTRUCTORS = [
  { instructorId: 1, instructorName: 'Dr. Sarah Connor', email: 'sarah.connor@university.edu' },
  { instructorId: 2, instructorName: 'Prof. Alan Turing', email: 'alan.turing@university.edu' },
  { instructorId: 3, instructorName: 'Dr. Grace Hopper', email: 'grace.hopper@university.edu' }
];

const MOCK_COURSES = [
  { courseId: 1, courseName: 'Introduction to Computer Science', totalSeats: 50, availableSeats: 12, instructor: MOCK_INSTRUCTORS[1] },
  { courseId: 2, courseName: 'Data Structures & Algorithms', totalSeats: 40, availableSeats: 5, instructor: MOCK_INSTRUCTORS[1] },
  { courseId: 3, courseName: 'Web Development with React & Spring', totalSeats: 35, availableSeats: 8, instructor: MOCK_INSTRUCTORS[0] },
  { courseId: 4, courseName: 'Database Management Systems', totalSeats: 45, availableSeats: 15, instructor: MOCK_INSTRUCTORS[2] }
];

const MOCK_STUDENTS = [
  { studentId: 1, studentName: 'Alice Johnson', email: 'alice.j@example.com' },
  { studentId: 2, studentName: 'Bob Smith', email: 'bob.smith@example.com' },
  { studentId: 3, studentName: 'Charlie Davis', email: 'charlie.d@example.com' },
  { studentId: 4, studentName: 'Diana Prince', email: 'diana.p@example.com' },
  { studentId: 5, studentName: 'Ethan Hunt', email: 'ethan.h@example.com' }
];

const MOCK_ENROLLMENTS = [
  { studentName: 'Alice Johnson', email: 'alice.j@example.com', courseName: 'Web Development with React & Spring', instructorName: 'Dr. Sarah Connor', enrollmentDate: '2026-09-15' },
  { studentName: 'Bob Smith', email: 'bob.smith@example.com', courseName: 'Data Structures & Algorithms', instructorName: 'Prof. Alan Turing', enrollmentDate: '2026-09-18' },
  { studentName: 'Charlie Davis', email: 'charlie.d@example.com', courseName: 'Introduction to Computer Science', instructorName: 'Prof. Alan Turing', enrollmentDate: '2026-09-20' },
  { studentName: 'Diana Prince', email: 'diana.p@example.com', courseName: 'Database Management Systems', instructorName: 'Dr. Grace Hopper', enrollmentDate: '2026-09-22' },
  { studentName: 'Ethan Hunt', email: 'ethan.h@example.com', courseName: 'Web Development with React & Spring', instructorName: 'Dr. Sarah Connor', enrollmentDate: '2026-09-25' }
];

// Helper to fetch with API or return fallback mock
async function fetchApi(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `HTTP Error ${response.status}`);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    return await response.text();
  } catch (err) {
    console.warn(`API call failed for ${endpoint}, using fallback or throwing:`, err.message);
    throw err;
  }
}

export const courseApi = {
  getAll: async () => {
    try {
      return await fetchApi('/courses');
    } catch {
      return MOCK_COURSES;
    }
  },
  getById: async (id) => {
    try {
      return await fetchApi(`/courses/${id}`);
    } catch {
      return MOCK_COURSES.find(c => c.courseId === Number(id));
    }
  },
  create: async (data) => {666666666
    try {
      return await fetchApi('/courses', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      const newCourse = { ...data, courseId: Date.now(), availableSeats: data.totalSeats };
      MOCK_COURSES.push(newCourse);
      return newCourse;
    }
  },
  update: async (id, data) => {
    try {
      return await fetchApi(`/courses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch {
      const index = MOCK_COURSES.findIndex(c => c.courseId === Number(id));
      if (index !== -1) {
        MOCK_COURSES[index] = { ...MOCK_COURSES[index], ...data };
        return MOCK_COURSES[index];
      }
    }
  },
  delete: async (id) => {
    try {
      return await fetchApi(`/courses/${id}`, { method: 'DELETE' });
    } catch {
      const idx = MOCK_COURSES.findIndex(c => c.courseId === Number(id));
      if (idx !== -1) MOCK_COURSES.splice(idx, 1);
    }
  },
  getAboveAverage: async () => {
    try {
      return await fetchApi('/courses/above-average');
    } catch {
      return [
        { courseId: 1, courseName: 'Introduction to Computer Science', enrollmentCount: 28 },
        { courseId: 3, courseName: 'Web Development with React & Spring', enrollmentCount: 27 }
      ];
    }
  }
};

export const studentApi = {
  getAll: async () => {
    try {
      return await fetchApi('/students');
    } catch {
      return MOCK_STUDENTS;
    }
  },
  create: async (data) => {
    try {
      return await fetchApi('/students', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      const newStudent = { ...data, studentId: Date.now() };
      MOCK_STUDENTS.push(newStudent);
      return newStudent;
    }
  },
  update: async (id, data) => {
    try {
      return await fetchApi(`/students/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch {
      const idx = MOCK_STUDENTS.findIndex(s => s.studentId === Number(id));
      if (idx !== -1) MOCK_STUDENTS[idx] = { ...MOCK_STUDENTS[idx], ...data };
      return MOCK_STUDENTS[idx];
    }
  },
  delete: async (id) => {
    try {
      return await fetchApi(`/students/${id}`, { method: 'DELETE' });
    } catch {
      const idx = MOCK_STUDENTS.findIndex(s => s.studentId === Number(id));
      if (idx !== -1) MOCK_STUDENTS.splice(idx, 1);
    }
  }
};

export const instructorApi = {
  getAll: async () => {
    try {
      return await fetchApi('/instructors');
    } catch {
      return MOCK_INSTRUCTORS;
    }
  },
  create: async (data) => {
    try {
      return await fetchApi('/instructors', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    } catch {
      const newInst = { ...data, instructorId: Date.now() };
      MOCK_INSTRUCTORS.push(newInst);
      return newInst;
    }
  },
  update: async (id, data) => {
    try {
      return await fetchApi(`/instructors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    } catch {
      const idx = MOCK_INSTRUCTORS.findIndex(i => i.instructorId === Number(id));
      if (idx !== -1) MOCK_INSTRUCTORS[idx] = { ...MOCK_INSTRUCTORS[idx], ...data };
      return MOCK_INSTRUCTORS[idx];
    }
  },
  delete: async (id) => {
    try {
      return await fetchApi(`/instructors/${id}`, { method: 'DELETE' });
    } catch {
      const idx = MOCK_INSTRUCTORS.findIndex(i => i.instructorId === Number(id));
      if (idx !== -1) MOCK_INSTRUCTORS.splice(idx, 1);
    }
  }
};

export const enrollmentApi = {
  getAll: async () => {
    try {
      return await fetchApi('/enrollments');
    } catch {
      return MOCK_ENROLLMENTS;
    }
  },
  enroll: async (studentId, courseId) => {
    try {
      return await fetchApi('/enrollments', {
        method: 'POST',
        body: JSON.stringify({ studentId, courseId })
      });
    } catch {
      const student = MOCK_STUDENTS.find(s => s.studentId === Number(studentId));
      const course = MOCK_COURSES.find(c => c.courseId === Number(courseId));
      if (student && course) {
        if (course.availableSeats > 0) course.availableSeats -= 1;
        const newRecord = {
          studentName: student.studentName,
          email: student.email,
          courseName: course.courseName,
          instructorName: course.instructor?.instructorName || 'Unassigned',
          enrollmentDate: new Date().toISOString().split('T')[0]
        };
        MOCK_ENROLLMENTS.unshift(newRecord);
        return 'Student enrolled successfully';
      }
      throw new Error('Student or Course not found');
    }
  },
  getCount: async (courseId) => {
    try {
      return await fetchApi(`/enrollments/count/${courseId}`);
    } catch {
      const course = MOCK_COURSES.find(c => c.courseId === Number(courseId));
      if (!course) return 0;
      return MOCK_ENROLLMENTS.filter(e => e.courseName === course.courseName).length;
    }
  }
};
