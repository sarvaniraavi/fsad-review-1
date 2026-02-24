import { useState } from 'react';
import { Course, Lesson } from '../../types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ArrowLeft, Plus, Trash2, GripVertical, Eye, Settings, BookOpen, Video, FileText, HelpCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion, AnimatePresence } from "motion/react";
import { Badge } from '../ui/badge';
import { cn } from '../ui/utils';

interface CourseBuilderProps {
  course: Course | null;
  onSave: (course: Course) => void;
  onCancel: () => void;
}

export function CourseBuilder({ course, onSave, onCancel }: CourseBuilderProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: course?.title || '',
    description: course?.description || '',
    category: course?.category || 'Programming',
    duration: course?.duration || '',
    level: course?.level || 'Beginner',
    thumbnail: course?.thumbnail || '',
    lessons: course?.lessons || []
  });

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: '',
    description: '',
    content: '',
    type: 'reading',
    duration: ''
  });

  const handleAddLesson = () => {
    if (newLesson.title && newLesson.content) {
      const lesson: Lesson = {
        id: `lesson-${Date.now()}`,
        courseId: course?.id || 'new-course',
        title: newLesson.title,
        description: newLesson.description || '',
        content: newLesson.content,
        type: newLesson.type as 'video' | 'reading' | 'quiz',
        duration: newLesson.duration || '30 min',
        order: (formData.lessons?.length || 0) + 1
      };

      setFormData({
        ...formData,
        lessons: [...(formData.lessons || []), lesson]
      });

      setNewLesson({
        title: '',
        description: '',
        content: '',
        type: 'reading',
        duration: ''
      });
    }
  };

  const handleRemoveLesson = (lessonId: string) => {
    setFormData({
      ...formData,
      lessons: formData.lessons?.filter(l => l.id !== lessonId)
    });
  };

  const moveLesson = (index: number, direction: 'up' | 'down') => {
    const lessons = [...(formData.lessons || [])];
    if (direction === 'up' && index > 0) {
      [lessons[index], lessons[index - 1]] = [lessons[index - 1], lessons[index]];
    } else if (direction === 'down' && index < lessons.length - 1) {
      [lessons[index], lessons[index + 1]] = [lessons[index + 1], lessons[index]];
    }
    setFormData({ ...formData, lessons });
  };

  const handleSave = () => {
    const savedCourse: Course = {
      id: course?.id || `course-${Date.now()}`,
      title: formData.title || 'Untitled Course',
      description: formData.description || '',
      instructor: 'Dr. Sarah Johnson',
      instructorId: 'edu-1',
      thumbnail: formData.thumbnail || 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?w=800',
      category: formData.category || 'Programming',
      duration: formData.duration || '4 weeks',
      level: formData.level as 'Beginner' | 'Intermediate' | 'Advanced',
      enrolledStudents: course?.enrolledStudents || 0,
      createdAt: course?.createdAt || new Date().toISOString(),
      lessons: formData.lessons || []
    };

    onSave(savedCourse);
  };

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white border-b sticky top-0 z-10 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setIsPreviewMode(false)}>
              <ArrowLeft className="size-4 mr-2" />
              Exit Preview
            </Button>
            <span className="font-semibold text-gray-900">Course Preview</span>
          </div>
          <Button onClick={handleSave}>Publish Course</Button>
        </div>
        <div className="flex-1 max-w-5xl mx-auto w-full p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-900 shadow-lg">
                <img src={formData.thumbnail || 'https://images.unsplash.com/photo-1588912914074-b93851ff14b8?w=800'} alt="Course Thumbnail" className="w-full h-full object-cover opacity-90" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{formData.title || "Untitled Course"}</h1>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">{formData.description || "No description provided."}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Course Content</h3>
                <div className="space-y-2">
                  {formData.lessons?.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                      <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                        <p className="text-sm text-gray-500">{lesson.duration}</p>
                      </div>
                      {lesson.type === 'video' && <Video className="size-5 text-gray-400" />}
                      {lesson.type === 'reading' && <FileText className="size-5 text-gray-400" />}
                      {lesson.type === 'quiz' && <HelpCircle className="size-5 text-gray-400" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{formData.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Level</span>
                    <span className="font-medium">{formData.level}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium">{formData.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onCancel} className="hover:bg-gray-100 group text-gray-600 hover:text-gray-900">
                <ArrowLeft className="size-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight text-gray-900">{course ? 'Edit Course' : 'Create New Course'}</h1>
                <p className="text-xs font-medium text-indigo-600 flex items-center gap-1">
                  Draft <span className="text-gray-400">•</span> Unsaved changes
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" onClick={() => setIsPreviewMode(true)} className="hidden sm:flex border-gray-200 hover:bg-gray-50 hover:text-gray-900">
                <Eye className="size-3.5 mr-2" />
                Preview
              </Button>
              <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block" />
              <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-500 hover:text-gray-900">Cancel</Button>
              <Button size="sm" onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all hover:scale-105">Save Course</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
              <TabsTrigger value="details">Course Details</TabsTrigger>
              <TabsTrigger value="lessons">Curriculum ({formData.lessons?.length || 0})</TabsTrigger>
            </TabsList>

            {activeTab === 'lessons' && (
              <div className="text-sm text-gray-500 hidden sm:block">
                Drag and drop feature coming soon
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TabsContent value="details" className="mt-0 space-y-6">
                <Card className="border-none shadow-lg shadow-gray-200/50 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
                  <CardHeader>
                    <CardTitle className="text-xl">Basic Information</CardTitle>
                    <CardDescription>Details that will be displayed on the course landing page</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-sm font-medium">Course Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Advanced React Patterns"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="max-w-xl h-11 text-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="What will students learn?"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="resize-none min-h-[120px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Programming">Programming</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Design">Design</SelectItem>
                            <SelectItem value="Data Science">Data Science</SelectItem>
                            <SelectItem value="Business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="level">Difficulty Level</Label>
                        <Select
                          value={formData.level}
                          onValueChange={(value) => setFormData({ ...formData, level: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration">Estimated Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 8 weeks"
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t">
                      <Label htmlFor="thumbnail" className="text-base">Thumbnail Image</Label>
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <div className="flex-1 space-y-3 w-full">
                          <Input
                            id="thumbnail"
                            placeholder="https://..."
                            value={formData.thumbnail}
                            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                          />
                          <p className="text-xs text-muted-foreground">Enter a direct URL to an image (JPG, PNG) or use our default.</p>
                        </div>
                        <div className="h-32 w-full sm:w-56 rounded-xl overflow-hidden border bg-gray-100 flex-shrink-0 shadow-sm relative group">
                          {formData.thumbnail ? (
                            <img src={formData.thumbnail} alt="Preview" className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-500" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <span className="text-sm">No Preview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lessons" className="mt-0 space-y-6">
                <div className="flex gap-8 flex-col-reverse lg:flex-row items-start">
                  {/* Lesson List */}
                  <div className="flex-1 w-full space-y-4">
                    {formData.lessons && formData.lessons.length > 0 ? (
                      <div className="space-y-3">
                        {formData.lessons.map((lesson, index) => (
                          <motion.div
                            layoutId={lesson.id}
                            key={lesson.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="group relative flex items-start p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200"
                          >
                            <div className="hidden sm:flex flex-col gap-1 mr-4 pt-1 items-center">
                              <button
                                onClick={() => moveLesson(index, 'up')}
                                disabled={index === 0}
                                className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                              >
                                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-current"></div>
                              </button>
                              <div className="h-6 w-px bg-gray-200 my-0.5" />
                              <button
                                onClick={() => moveLesson(index, 'down')}
                                disabled={index === (formData.lessons?.length || 0) - 1}
                                className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                              >
                                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-current"></div>
                              </button>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center justify-center size-6 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold ring-1 ring-indigo-100">
                                    {index + 1}
                                  </span>
                                  <h4 className="font-semibold text-gray-900 truncate text-lg">
                                    {lesson.title}
                                  </h4>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 -mt-1 -mr-1"
                                  onClick={() => handleRemoveLesson(lesson.id)}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>

                              <p className="text-sm text-gray-500 line-clamp-2 pl-9 mb-3">
                                {lesson.description || "No description provided."}
                              </p>

                              <div className="flex items-center gap-3 pl-9">
                                <Badge variant="secondary" className={cn(
                                  "text-xs uppercase tracking-wider font-medium border-0",
                                  lesson.type === 'video' ? "bg-blue-50 text-blue-700" :
                                    lesson.type === 'quiz' ? "bg-orange-50 text-orange-700" :
                                      "bg-emerald-50 text-emerald-700"
                                )}>
                                  {lesson.type}
                                </Badge>
                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                  <Clock className="size-3" /> {lesson.duration}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="mx-auto size-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
                          <BookOpen className="size-8 text-indigo-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">Your curriculum is empty</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">Start building your course structure by adding your first lesson using the panel on the right.</p>
                      </div>
                    )}
                  </div>

                  {/* Add Lesson Form */}
                  <div className="w-full lg:w-96 flex-shrink-0">
                    <Card className="sticky top-24 border-none shadow-xl shadow-indigo-100/50 overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-indigo-500 to-emerald-500" />
                      <CardHeader className="bg-white border-b pb-4">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <div className="bg-indigo-100 p-1.5 rounded-lg">
                            <Plus className="size-4 text-indigo-600" />
                          </div>
                          Add New Lesson
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6 bg-gray-50/50">
                        <div className="space-y-2">
                          <Label htmlFor="lesson-title">Lesson Title</Label>
                          <Input
                            id="lesson-title"
                            placeholder="e.g., Introduction to Hooks"
                            value={newLesson.title}
                            onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                            className="bg-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lesson-description">Short Description</Label>
                          <Textarea
                            id="lesson-description"
                            placeholder="Briefly describe what this lesson covers..."
                            value={newLesson.description}
                            onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                            className="bg-white resize-none"
                            rows={2}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                              value={newLesson.type}
                              onValueChange={(value) => setNewLesson({ ...newLesson, type: value as any })}
                            >
                              <SelectTrigger className="bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="reading">
                                  <div className="flex items-center gap-2"><FileText className="size-3.5" /> Reading</div>
                                </SelectItem>
                                <SelectItem value="video">
                                  <div className="flex items-center gap-2"><Video className="size-3.5" /> Video</div>
                                </SelectItem>
                                <SelectItem value="quiz">
                                  <div className="flex items-center gap-2"><HelpCircle className="size-3.5" /> Quiz</div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input
                              placeholder="e.g. 15 min"
                              value={newLesson.duration}
                              onChange={(e) => setNewLesson({ ...newLesson, duration: e.target.value })}
                              className="bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lesson-content">Content (Markdown)</Label>
                          <Textarea
                            id="lesson-content"
                            placeholder="# Welcome to the lesson..."
                            value={newLesson.content}
                            onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                            className="min-h-[150px] bg-white font-mono text-sm"
                          />
                        </div>

                        <Button
                          onClick={handleAddLesson}
                          className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                          disabled={!newLesson.title || !newLesson.content}
                        >
                          <Plus className="size-4 mr-2" />
                          Add to Curriculum
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </div>    </div>
  );
}

