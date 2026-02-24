import { Course, Assignment, Submission, Enrollment, User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'edu-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@edu.com',
    role: 'educator',
    avatar: 'https://images.unsplash.com/photo-1758685848177-93817e9ad5a2?w=400'
  },
  {
    id: 'stu-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@student.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: 'stu-2',
    name: 'Emma Wilson',
    email: 'emma.wilson@student.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: 'stu-3',
    name: 'James Chen',
    email: 'james.chen@student.com',
    role: 'student',
    avatar: 'https://i.pravatar.cc/150?img=12'
  }
];

export const mockCourses: Course[] = [
  {
    id: 'course-1',
    title: 'Web Development Fundamentals',
    description: 'Learn the basics of HTML, CSS, and JavaScript to build modern websites. This comprehensive course covers everything from basic syntax to advanced concepts.',
    instructor: 'Dr. Sarah Johnson',
    instructorId: 'edu-1',
    thumbnail: 'https://images.unsplash.com/photo-1675495277087-10598bf7bcd1?w=800',
    category: 'Programming',
    duration: '8 weeks',
    level: 'Beginner',
    enrolledStudents: 245,
    createdAt: '2026-01-15',
    lessons: [
      {
        id: 'lesson-1-1',
        courseId: 'course-1',
        title: 'Introduction to HTML',
        description: 'Learn the structure of web pages using HTML',
        content: `# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically.

## Basic HTML Structure

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to Web Development</h1>
    <p>This is a paragraph.</p>
  </body>
</html>
\`\`\`

## Common HTML Elements

- **Headings**: h1 through h6
- **Paragraphs**: p
- **Links**: a
- **Images**: img
- **Lists**: ul, ol, li
- **Divisions**: div, span`,
        type: 'reading',
        duration: '45 min',
        order: 1
      },
      {
        id: 'lesson-1-2',
        courseId: 'course-1',
        title: 'CSS Basics',
        description: 'Style your web pages with CSS',
        content: `# CSS Basics

CSS (Cascading Style Sheets) is used to style and layout web pages.

## CSS Syntax

\`\`\`css
selector {
  property: value;
}
\`\`\`

## Common CSS Properties

- **Color**: color, background-color
- **Typography**: font-family, font-size, font-weight
- **Layout**: display, position, margin, padding
- **Box Model**: width, height, border

## Example

\`\`\`css
h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}
\`\`\``,
        type: 'reading',
        duration: '50 min',
        order: 2
      },
      {
        id: 'lesson-1-3',
        courseId: 'course-1',
        title: 'JavaScript Fundamentals',
        description: 'Add interactivity to your websites',
        content: `# JavaScript Fundamentals

JavaScript is a programming language that enables interactive web pages.

## Variables

\`\`\`javascript
let name = "John";
const age = 25;
var city = "New York";
\`\`\`

## Functions

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));
\`\`\`

## DOM Manipulation

\`\`\`javascript
document.getElementById("myButton").addEventListener("click", function() {
  alert("Button clicked!");
});
\`\`\``,
        type: 'reading',
        duration: '60 min',
        order: 3
      }
    ]
  },
  {
    id: 'course-2',
    title: 'Digital Marketing Strategy',
    description: 'Master the art of digital marketing with proven strategies for social media, SEO, content marketing, and analytics.',
    instructor: 'Dr. Sarah Johnson',
    instructorId: 'edu-1',
    thumbnail: 'https://images.unsplash.com/photo-1758691736545-5c33b6255dca?w=800',
    category: 'Marketing',
    duration: '6 weeks',
    level: 'Intermediate',
    enrolledStudents: 189,
    createdAt: '2026-01-20',
    lessons: [
      {
        id: 'lesson-2-1',
        courseId: 'course-2',
        title: 'Introduction to Digital Marketing',
        description: 'Overview of digital marketing channels and strategies',
        content: 'Digital marketing encompasses all marketing efforts that use electronic devices or the internet...',
        type: 'video',
        duration: '35 min',
        order: 1,
        videoUrl: 'https://example.com/video1'
      },
      {
        id: 'lesson-2-2',
        courseId: 'course-2',
        title: 'SEO Fundamentals',
        description: 'Learn how to optimize your content for search engines',
        content: 'SEO (Search Engine Optimization) is the practice of increasing both the quality and quantity of website traffic...',
        type: 'reading',
        duration: '40 min',
        order: 2
      }
    ]
  },
  {
    id: 'course-3',
    title: 'Data Science with Python',
    description: 'Learn data analysis, visualization, and machine learning using Python, Pandas, and Scikit-learn.',
    instructor: 'Dr. Sarah Johnson',
    instructorId: 'edu-1',
    thumbnail: 'https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=800',
    category: 'Data Science',
    duration: '10 weeks',
    level: 'Advanced',
    enrolledStudents: 156,
    createdAt: '2026-02-01',
    lessons: [
      {
        id: 'lesson-3-1',
        courseId: 'course-3',
        title: 'Python for Data Science',
        description: 'Introduction to Python libraries for data science',
        content: 'Python has become the lingua franca of data science...',
        type: 'video',
        duration: '55 min',
        order: 1,
        videoUrl: 'https://example.com/video2'
      }
    ]
  },
  {
    id: 'course-4',
    title: 'Graphic Design Principles',
    description: 'Explore the fundamentals of graphic design including color theory, typography, and composition.',
    instructor: 'Dr. Sarah Johnson',
    instructorId: 'edu-1',
    thumbnail: 'https://images.unsplash.com/photo-1689267166689-795f4f536819?w=800',
    category: 'Design',
    duration: '5 weeks',
    level: 'Beginner',
    enrolledStudents: 312,
    createdAt: '2026-02-05',
    lessons: [
      {
        id: 'lesson-4-1',
        courseId: 'course-4',
        title: 'Color Theory Basics',
        description: 'Understanding color relationships and psychology',
        content: 'Color theory is a practical combination of art and science...',
        type: 'reading',
        duration: '30 min',
        order: 1
      }
    ]
  }
];

export const mockAssignments: Assignment[] = [
  {
    id: 'assign-1',
    courseId: 'course-1',
    title: 'Build a Personal Portfolio Page',
    description: 'Create a simple portfolio page using HTML and CSS. Include a header, about section, projects section, and contact information.',
    dueDate: '2026-03-01',
    totalPoints: 100,
    createdAt: '2026-02-10'
  },
  {
    id: 'assign-2',
    courseId: 'course-1',
    title: 'Interactive Calculator',
    description: 'Build a calculator using JavaScript that can perform basic operations (add, subtract, multiply, divide).',
    dueDate: '2026-03-15',
    totalPoints: 100,
    createdAt: '2026-02-15'
  },
  {
    id: 'assign-3',
    courseId: 'course-2',
    title: 'SEO Audit Report',
    description: 'Perform an SEO audit on a website of your choice and create a comprehensive report with recommendations.',
    dueDate: '2026-02-28',
    totalPoints: 100,
    createdAt: '2026-02-12'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-1',
    assignmentId: 'assign-1',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    content: 'I have created a portfolio website with all the required sections. The design is responsive and follows modern web standards.',
    fileUrl: 'portfolio.zip',
    submittedAt: '2026-02-25T14:30:00',
    grade: 95,
    feedback: 'Excellent work! Your design is clean and professional. The responsive layout works perfectly.',
    status: 'graded'
  },
  {
    id: 'sub-2',
    assignmentId: 'assign-1',
    studentId: 'stu-2',
    studentName: 'Emma Wilson',
    content: 'Please find attached my portfolio page. I included animations and a contact form.',
    fileUrl: 'emma-portfolio.zip',
    submittedAt: '2026-02-26T10:15:00',
    status: 'submitted'
  },
  {
    id: 'sub-3',
    assignmentId: 'assign-1',
    studentId: 'stu-3',
    studentName: 'James Chen',
    content: 'My portfolio includes projects from previous courses and links to my GitHub.',
    fileUrl: 'james-portfolio.zip',
    submittedAt: '2026-03-01T23:45:00',
    grade: 85,
    feedback: 'Good effort, but submitted after the deadline. Make sure to plan your time better.',
    status: 'graded'
  },
  {
    id: 'sub-4',
    assignmentId: 'assign-3',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    content: 'Completed SEO audit for www.example.com with detailed recommendations.',
    submittedAt: '2026-02-27T16:20:00',
    status: 'submitted'
  }
];

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enroll-1',
    studentId: 'stu-1',
    courseId: 'course-1',
    enrolledAt: '2026-01-20',
    progress: 67,
    completedLessons: ['lesson-1-1', 'lesson-1-2'],
    grade: 95
  },
  {
    id: 'enroll-2',
    studentId: 'stu-1',
    courseId: 'course-2',
    enrolledAt: '2026-01-25',
    progress: 50,
    completedLessons: ['lesson-2-1'],
    grade: 88
  },
  {
    id: 'enroll-3',
    studentId: 'stu-2',
    courseId: 'course-1',
    enrolledAt: '2026-01-22',
    progress: 33,
    completedLessons: ['lesson-1-1'],
  },
  {
    id: 'enroll-4',
    studentId: 'stu-3',
    courseId: 'course-1',
    enrolledAt: '2026-01-23',
    progress: 100,
    completedLessons: ['lesson-1-1', 'lesson-1-2', 'lesson-1-3'],
    grade: 85
  }
];
