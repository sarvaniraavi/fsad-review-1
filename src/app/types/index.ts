export interface User {
  id: string;
  name: string;
  email: string;
  role: 'educator' | 'student';
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  thumbnail: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  enrolledStudents: number;
  createdAt: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  order: number;
  videoUrl?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalPoints: number;
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late';
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  enrolledAt: string;
  progress: number;
  completedLessons: string[];
  grade?: number;
}
