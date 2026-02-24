import { useState } from 'react';
import { Course, Assignment, Submission, User } from '../../types';
import { mockCourses, mockAssignments, mockSubmissions, mockEnrollments } from '../../lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { CourseCard } from '../shared/CourseCard';
import { CourseBuilder } from './CourseBuilder';
import { AssignmentGrading } from './AssignmentGrading';
import { PlusCircle, LogOut, GraduationCap, TrendingUp, Sparkles, LayoutDashboard, BookOpen, Users, FileText, BarChart3, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { motion } from "motion/react";
import { cn } from '../ui/utils';
import { Badge } from '../ui/badge';
import { Logo } from '../shared/Logo';
import { ProfilePage } from '../shared/ProfilePage';
import { DashboardLayout } from '../shared/DashboardLayout';

interface EducatorDashboardProps {
  user: User;
  onLogout: () => void;
}

export function EducatorDashboard({ user, onLogout }: EducatorDashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showCourseBuilder, setShowCourseBuilder] = useState(false);
  const [showGrading, setShowGrading] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  const myCourses = mockCourses.filter(c => c.instructorId === user.id);
  const totalStudents = myCourses.reduce((sum, c) => sum + c.enrolledStudents, 0);
  const totalAssignments = mockAssignments.filter(a =>
    myCourses.some(c => c.id === a.courseId)
  ).length;
  const pendingSubmissions = mockSubmissions.filter(s => s.status === 'submitted').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'My Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'assignments', label: 'Assignments', icon: FileText },
    { id: 'profile', label: 'Profile', icon: GraduationCap },
  ];

  if (activeSection === 'profile') {
    return (
      <DashboardLayout
        user={user}
        navItems={navItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={onLogout}
      >
        <ProfilePage user={user} onBack={() => setActiveSection('dashboard')} />
      </DashboardLayout>
    );
  }

  if (showCourseBuilder) {
    // Determine if we want CourseBuilder inside layout or full screen. Usage often implies full screen focus.
    // Let's keep it full screen or minimal layout for focus.
    return (
      <CourseBuilder
        course={selectedCourse}
        onSave={(course) => {
          console.log('Course saved:', course);
          setShowCourseBuilder(false);
          setSelectedCourse(null);
        }}
        onCancel={() => {
          setShowCourseBuilder(false);
          setSelectedCourse(null);
        }}
      />
    );
  }

  if (showGrading) {
    return (
      <AssignmentGrading
        courses={myCourses}
        onBack={() => setShowGrading(false)}
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    }
  };



  return (
    <DashboardLayout
      user={user}
      navItems={navItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onLogout={onLogout}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeSection}
      >
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-8 sm:p-12 text-white shadow-2xl shadow-blue-500/20"
            >
              <div className="absolute top-0 right-0 -mt-20 -mr-20 size-96 rounded-full bg-white/10 blur-3xl opacity-30 pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-80 rounded-full bg-blue-400/20 blur-3xl opacity-30 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                    Welcome back, {user.name.split(' ')[0]}!
                    <span className="text-3xl animate-bounce inline-block delay-100">👋</span>
                  </h2>
                  <p className="text-blue-100 text-lg max-w-xl font-light leading-relaxed">
                    Ready to inspire the next generation? Here's how your courses are performing today.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md shadow-lg shadow-black/5 transition-all hover:scale-105" onClick={() => setShowCourseBuilder(true)}>
                      <PlusCircle className="size-4 mr-2" />
                      Create New Course
                    </Button>
                    <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 shadow-lg shadow-black/10 transition-all hover:scale-105" onClick={() => setShowGrading(true)}>
                      <FileText className="size-4 mr-2" />
                      Grade Submissions
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden sm:block p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
                >
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold tracking-tighter">{myCourses.length}</div>
                    <div className="text-sm font-medium text-blue-100 uppercase tracking-widest text-[10px]">Active Courses</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Total Courses', value: myCourses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Assignments', value: totalAssignments, icon: FileText, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Pending Reviews', value: pendingSubmissions, icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                >
                  <Card className="border-none shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className={cn("p-3.5 rounded-2xl transition-colors", stat.bg)}>
                        <stat.icon className={cn("size-6", stat.color)} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions / Recent Activity could go here */}
          </div>
        )}

        {activeSection === 'courses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">My Courses</h2>
                <p className="text-gray-500">Manage your course content and structure</p>
              </div>
              <Button onClick={() => {
                setSelectedCourse(null);
                setShowCourseBuilder(true);
              }} className="bg-indigo-600 hover:bg-indigo-700">
                <PlusCircle className="size-4 mr-2" />
                Create Course
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={(c) => {
                    setSelectedCourse(c);
                    setShowCourseBuilder(true);
                  }}
                  actionLabel="Edit Course"
                  showEnrollment={true}
                />
              ))}
            </div>
            {myCourses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <BookOpen className="size-12 mx-auto mb-4 text-gray-300" />
                  <p>You haven't created any courses yet.</p>
                  <Button variant="link" onClick={() => setShowCourseBuilder(true)}>Create your first course</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeSection === 'students' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Student Progress</h2>
              <p className="text-gray-500">Monitor student performance across your courses</p>
            </div>

            <div className="space-y-4">
              {myCourses.map(course => {
                const enrollments = mockEnrollments.filter(e => e.courseId === course.id);

                return (
                  <Card key={course.id}>
                    <CardHeader>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{enrollments.length} enrolled students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {enrollments.length > 0 ? (
                        <div className="space-y-4">
                          {enrollments.map(enrollment => (
                            <div key={enrollment.id} className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${enrollment.studentId}`} />
                                <AvatarFallback>
                                  {enrollment.studentId.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium">Student ID: {enrollment.studentId}</p>
                                  <span className="text-sm text-gray-500">{enrollment.progress}%</span>
                                </div>
                                <Progress value={enrollment.progress} className="h-2" />
                              </div>
                              {enrollment.grade && (
                                <div className="text-right">
                                  <p className="text-sm text-gray-500">Grade</p>
                                  <p className="text-lg font-bold text-indigo-600">{enrollment.grade}%</p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 italic">No students enrolled yet.</p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {activeSection === 'assignments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Assignments & Submissions</h2>
                <p className="text-gray-500">Review and grade student work</p>
              </div>
              <Button onClick={() => setShowGrading(true)} variant="outline">
                <FileText className="size-4 mr-2" />
                Grade Submissions
              </Button>
            </div>

            <div className="grid gap-6">
              {myCourses.map(course => {
                const courseAssignments = mockAssignments.filter(a => a.courseId === course.id);

                return courseAssignments.map(assignment => {
                  const submissions = mockSubmissions.filter(s => s.assignmentId === assignment.id);
                  const graded = submissions.filter(s => s.status === 'graded').length;

                  return (
                    <Card key={assignment.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{assignment.title}</CardTitle>
                            <CardDescription>{course.title}</CardDescription>
                          </div>
                          <Badge variant={submissions.length > graded ? 'destructive' : 'default'} className="ml-2">
                            {graded}/{submissions.length} Graded
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600">{assignment.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{assignment.totalPoints} points</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                });
              })}
              {myCourses.every(c => mockAssignments.filter(a => a.courseId === c.id).length === 0) && (
                <p className="text-gray-500 text-center py-8">No assignments created yet.</p>
              )}
            </div>
          </div>
        )}

      </motion.div>
    </DashboardLayout>
  );
}

