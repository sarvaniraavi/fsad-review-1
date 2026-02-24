import { useState } from 'react';
import { Course, Enrollment, User } from '../../types';
import { mockCourses, mockEnrollments } from '../../lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { CourseCard } from '../shared/CourseCard';
import { CourseView } from './CourseView';
import { BookOpen, Award, Clock, LogOut, GraduationCap, Search, TrendingUp, Sparkles, Filter, LayoutDashboard, Library, ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { motion, AnimatePresence, Variants } from "motion/react";
import { cn } from '../ui/utils';
import { Logo } from '../shared/Logo';
import { ProfilePage } from '../shared/ProfilePage';
import { DashboardLayout } from '../shared/DashboardLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortOrder, setSortOrder] = useState('popular');

  const enrollments = mockEnrollments.filter(e => e.studentId === user.id);
  const enrolledCourseIds = enrollments.map(e => e.courseId);
  const enrolledCourses = mockCourses.filter(c =>
    enrollments.some(e => e.courseId === c.id)
  );
  const availableCourses = mockCourses.filter(c => !enrolledCourseIds.includes(c.id));

  const categories = ['all', ...Array.from(new Set(mockCourses.map(c => c.category)))];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  let filteredCourses = mockCourses.filter(course =>
    (selectedCategory === 'all' || course.category === selectedCategory) &&
    (selectedLevel === 'all' || course.level === selectedLevel) &&
    (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sorting Logic
  filteredCourses.sort((a, b) => {
    if (sortOrder === 'popular') {
      return b.enrolledStudents - a.enrolledStudents;
    } else if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortOrder === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const averageProgress = enrollments.length > 0
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  const completedCourses = enrollments.filter(e => e.progress === 100).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'browse', label: 'Browse', icon: Library },
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

  if (selectedCourse) {
    // If a course is selected, we temporarily override the view, 
    // but keep the layout if we want, OR we can hide the sidebar for focus mode.
    // For now, let's keep the layout but maybe "dim" the sidebar interactions or just render it inside.
    // Actually, CourseView has its own specific layout often. Let's render it full screen for focus 
    // OR inside the dashboard layout. Let's try inside the dashboard layout first for consistency.
    return (
      <DashboardLayout
        user={user}
        navItems={[
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'my-courses', label: 'My Courses', icon: BookOpen },
          { id: 'browse', label: 'Browse', icon: Library },
          { id: 'profile', label: 'Profile', icon: GraduationCap }, // Mapping profile to a nav item for consistency
        ]}
        activeSection={activeSection}
        onSectionChange={(id) => {
          setSelectedCourse(null);
          setActiveSection(id);
        }}
        onLogout={onLogout}
      >
        <CourseView
          user={user}
          course={selectedCourse}
          enrollment={enrollments.find(e => e.courseId === selectedCourse.id)}
          onBack={() => setSelectedCourse(null)}
        />
      </DashboardLayout>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
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
        key={activeSection} // Animate when section changes
      >
        {activeSection === 'dashboard' && (
          <div className="space-y-8">
            <motion.div
              variants={itemVariants}
              className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-emerald-600 p-8 sm:p-12 text-white shadow-2xl shadow-indigo-500/20"
            >
              <div className="absolute top-0 right-0 -mt-20 -mr-20 size-96 rounded-full bg-white/10 blur-3xl opacity-30 pointer-events-none animate-pulse" />
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 size-80 rounded-full bg-indigo-400/20 blur-3xl opacity-30 pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                    Welcome back, {user.name.split(' ')[0]}!
                    <motion.span
                      className="inline-block"
                      animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
                    >
                      👋
                    </motion.span>
                  </h2>
                  <p className="text-indigo-100 text-lg max-w-xl font-light leading-relaxed">
                    You've made great progress this week. Keep up the momentum and reach your learning goals.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0 backdrop-blur-md shadow-lg shadow-black/5 transition-all hover:scale-105">
                      <Clock className="size-4 mr-2" />
                      View Schedule
                    </Button>
                    <Button variant="secondary" className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 shadow-lg shadow-black/10 transition-all hover:scale-105">
                      <Sparkles className="size-4 mr-2 text-indigo-600 fill-indigo-100" />
                      Resume Learning
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="hidden sm:block p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl"
                >
                  <div className="text-center space-y-1">
                    <div className="text-4xl font-bold tracking-tighter">{averageProgress}%</div>
                    <div className="text-sm font-medium text-indigo-100 uppercase tracking-widest text-[10px]">Overall Progress</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: 'Enrolled Courses', value: enrolledCourses.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Completed', value: completedCourses, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Average Progress', value: `${averageProgress}%`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Learning Time', value: '24h', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
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

            {/* Quick access to continue learning - Simplified grid for Dashboard view */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h3>
              {enrolledCourses.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {enrolledCourses.slice(0, 3).map(course => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onSelect={setSelectedCourse}
                      actionLabel="Continue"
                      compact
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">You are not enrolled in any courses yet.</p>
              )}
            </div>
          </div>
        )}

        {activeSection === 'my-courses' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">My Learning Journey</h2>
              <p className="text-gray-500">Continue your courses and track your progress</p>
            </div>

            {enrolledCourses.length > 0 ? (
              <div className="grid gap-6">
                {enrolledCourses.map(course => {
                  const enrollment = enrollments.find(e => e.courseId === course.id);

                  return (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="grid md:grid-cols-3 gap-0">
                        <div className="aspect-video md:aspect-auto h-full relative">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:col-span-2 p-6 space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold mb-1">{course.title}</h3>
                                <p className="text-sm text-gray-500">By {course.instructor}</p>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="secondary">{course.category}</Badge>
                                <Badge variant="outline">{course.level}</Badge>
                              </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{course.description}</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">Progress</span>
                              <span>{enrollment?.progress}% Complete</span>
                            </div>
                            <Progress value={enrollment?.progress || 0} className="h-2" />
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>{enrollment?.completedLessons.length || 0} / {course.lessons.length} lessons</span>
                              {enrollment?.grade && (
                                <span className="font-medium text-green-600">Grade: {enrollment.grade}%</span>
                              )}
                            </div>
                          </div>

                          <Button onClick={() => setSelectedCourse(course)} className="w-full md:w-auto">
                            {enrollment?.progress === 100 ? 'Review Course' : 'Continue Learning'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <BookOpen className="size-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium mb-2">No courses enrolled yet</h3>
                <Button onClick={() => setActiveSection('browse')}>
                  Browse Courses
                </Button>
              </div>
            )}
          </div>
        )}

        {activeSection === 'browse' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Discover New Courses</h2>
              <p className="text-gray-500">Expand your knowledge with our wide range of courses</p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-[140px]">
                      <Filter className="size-4 mr-2" />
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Level</SelectItem>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[160px]">
                      <ArrowUpDown className="size-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="title">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "whitespace-nowrap transition-all",
                      selectedCategory === category ? 'bg-indigo-600 hover:bg-indigo-700' : 'hover:bg-gray-100 hover:text-indigo-600'
                    )}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={setSelectedCourse}
                  actionLabel="View Course"
                />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <p>No courses found matching your criteria</p>
                  <Button variant="link" onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                  }}>Clear filters</Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}

