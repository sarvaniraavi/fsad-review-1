import { useState } from 'react';
import { User, Course, Enrollment, Lesson } from '../../types';
import { mockAssignments, mockSubmissions } from '../../lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { ArrowLeft, PlayCircle, FileText, CheckCircle2, Clock, Award, BookOpen, ChevronRight, Lock, Unlock } from 'lucide-react';
import { AssignmentSubmission } from './AssignmentSubmission';
import { motion, AnimatePresence } from "motion/react";
import { cn } from '../ui/utils';

interface CourseViewProps {
  user: User;
  course: Course;
  enrollment?: Enrollment;
  onBack: () => void;
}

export function CourseView({ user, course, enrollment, onBack }: CourseViewProps) {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(
    course.lessons.length > 0 ? course.lessons[0] : null
  );
  const [showAssignments, setShowAssignments] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>(
    enrollment?.completedLessons || []
  );

  const assignments = mockAssignments.filter(a => a.courseId === course.id);
  const mySubmissions = mockSubmissions.filter(s =>
    assignments.some(a => a.id === s.assignmentId) && s.studentId === enrollment?.studentId
  );

  const handleCompleteLesson = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      console.log('Lesson completed:', lessonId);
    }
  };

  const handleEnroll = () => {
    console.log('Enrolling in course:', course.id);
    // In a real app, this would create an enrollment record
  };

  const isLessonComplete = (lessonId: string) => completedLessons.includes(lessonId);

  if (showAssignments) {
    return (
      <AssignmentSubmission
        user={user}
        course={course}
        assignments={assignments}
        submissions={mySubmissions}
        onBack={() => setShowAssignments(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="group hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900 truncate max-w-md">{course.title}</h1>
                <p className="text-xs font-medium text-gray-500">By {course.instructor}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {enrollment ? (
                <>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 border-indigo-100">{enrollment.progress}% Complete</Badge>
                  <Button onClick={() => setShowAssignments(true)} variant="outline" className="border-indigo-200 hover:bg-indigo-50 text-indigo-700 hover:text-indigo-800">
                    Assignments
                  </Button>
                </>
              ) : (
                <Button onClick={handleEnroll} className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-lg shadow-indigo-200">
                  Enroll Now
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Hero */}
      {!enrollment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-gray-900 text-white overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.img
              src={course.thumbnail}
              alt=""
              className="w-full h-full object-cover opacity-20 blur-sm"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent" />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20 backdrop-blur-md">
                    {course.category}
                  </Badge>
                  <Badge variant="secondary" className="bg-white/10 text-white border border-white/20 backdrop-blur-md">
                    {course.level}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-200">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-300 leading-relaxed max-w-xl">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 pt-2">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-blue-400" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="size-4 text-blue-400" />
                    <span>{course.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-blue-400" />
                    <span>{course.enrolledStudents} students enrolled</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[200px] h-12 text-base shadow-lg shadow-indigo-900/30 transition-all hover:scale-105" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 hidden md:block group cursor-pointer"
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, type: "spring", damping: 20 }}
                whileHover={{ scale: 1.02 }}
              >
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                  <div className="size-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayCircle className="size-10 fill-white text-white drop-shadow-lg" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {enrollment ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Lesson Sidebar */}
            <Card className="lg:col-span-1 h-fit sticky top-24 border-0 shadow-lg shadow-gray-200/50 overflow-hidden ring-1 ring-gray-200">
              <CardHeader className="bg-gray-50 border-b pb-4">
                <CardTitle className="text-base font-semibold flex items-center justify-between">
                  <span>Course Content</span>
                  <span className="text-xs font-normal text-gray-500 bg-white px-2 py-1 rounded-full border">
                    {Math.round((completedLessons.length / course.lessons.length) * 100)}%
                  </span>
                </CardTitle>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div
                    className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%` }}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 bg-white">
                <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px]">
                  <div className="space-y-1 p-3">
                    {course.lessons.map((lesson, index) => {
                      const isComplete = isLessonComplete(lesson.id);
                      const isActive = selectedLesson?.id === lesson.id;

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setSelectedLesson(lesson)}
                          className={cn(
                            "w-full text-left p-3 rounded-lg transition-all duration-200 group relative overflow-hidden",
                            isActive
                              ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                              : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                          )}
                        >
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg" />
                          )}
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {isComplete ? (
                                <CheckCircle2 className="size-5 text-green-500 fill-green-50" />
                              ) : lesson.type === 'video' ? (
                                <PlayCircle className={cn("size-5", isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500")} />
                              ) : (
                                <FileText className={cn("size-5", isActive ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500")} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 z-10">
                              <p className={cn("text-sm font-medium truncate leading-tight", isActive ? "font-semibold" : "")}>
                                {index + 1}. {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1.5 opacity-80">
                                <span className="text-xs uppercase tracking-wider scale-90 origin-left">{lesson.type}</span>
                                <span className="text-xs opacity-50">•</span>
                                <span className="text-xs">{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Lesson Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {selectedLesson ? (
                  <motion.div
                    key={selectedLesson.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="overflow-hidden border-none shadow-sm ring-1 ring-gray-200">
                      <CardHeader className="bg-gray-50/50 border-b pb-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-1">
                            <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
                            <CardDescription className="text-base">{selectedLesson.description}</CardDescription>
                          </div>
                          <Badge variant="secondary" className="capitalize px-3 py-1 text-sm shrink-0">
                            {selectedLesson.type}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-8 pt-8">
                        {/* Video Player Placeholder */}
                        {selectedLesson.type === 'video' && (
                          <div className="aspect-video bg-black rounded-xl overflow-hidden relative group shadow-lg">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button size="icon" className="size-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0">
                                <PlayCircle className="size-8 fill-current" />
                              </Button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm">
                              <p>Video Player Placeholder</p>
                            </div>
                          </div>
                        )}

                        {/* Lesson Content */}
                        <div className="prose prose-gray max-w-none">
                          <div className="p-8 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 leading-7">
                            {selectedLesson.content.split('\n').map((paragraph, i) => (
                              <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                            ))}
                          </div>
                        </div>

                        {/* Lesson Actions */}
                        <div className="flex items-center justify-between pt-6 border-t mt-8">
                          <div className="flex items-center gap-2">
                            {isLessonComplete(selectedLesson.id) ? (
                              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-sm font-medium">
                                <CheckCircle2 className="size-4 fill-green-600 text-white" />
                                Completed
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <div className="size-4 rounded-full border-2 border-gray-300" />
                                Not completed
                              </div>
                            )}
                          </div>
                          <div className="flex gap-3">
                            {!isLessonComplete(selectedLesson.id) && (
                              <Button onClick={() => handleCompleteLesson(selectedLesson.id)} className="bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle2 className="size-4 mr-2" />
                                Mark as Complete
                              </Button>
                            )}
                            {course.lessons.indexOf(selectedLesson) < course.lessons.length - 1 && (
                              <Button
                                variant="outline"
                                onClick={() => {
                                  const nextIndex = course.lessons.indexOf(selectedLesson) + 1;
                                  setSelectedLesson(course.lessons[nextIndex]);
                                }}
                                className="group"
                              >
                                Next Lesson
                                <ChevronRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[400px] flex items-center justify-center"
                  >
                    <Card className="w-full max-w-md border-dashed bg-gray-50/50">
                      <CardContent className="p-12 text-center text-gray-500">
                        <BookOpen className="size-16 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium text-gray-900">Select a lesson to begin</p>
                        <p className="text-sm mt-1">Choose an item from the curriculum to start learning.</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Course Overview for Non-Enrolled */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.lessons.slice(0, 4).map((lesson, index) => (
                    <div key={lesson.id} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
                <CardDescription>{course.lessons.length} lessons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {lesson.type === 'video' ? (
                          <PlayCircle className="size-5 text-gray-400" />
                        ) : (
                          <FileText className="size-5 text-gray-400" />
                        )}
                        <div>
                          <p className="font-medium">
                            {index + 1}. {lesson.title}
                          </p>
                          <p className="text-sm text-gray-500 capitalize">{lesson.type}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

