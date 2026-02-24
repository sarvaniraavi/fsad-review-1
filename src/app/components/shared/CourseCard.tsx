import { Course } from '../../types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Clock, Users, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from "motion/react";

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
  actionLabel?: string;
  showEnrollment?: boolean;
  compact?: boolean;
}

export function CourseCard({ course, onSelect, actionLabel = 'View Details', showEnrollment = true }: CourseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white cursor-pointer ring-1 ring-gray-100" onClick={() => onSelect(course)}>
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-white/95 text-gray-900 font-medium backdrop-blur-sm shadow-sm hover:bg-white">{course.level}</Badge>
          </div>
          <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20">
              {course.category}
            </span>
          </div>
        </div>

        <CardContent className="flex-1 p-5 space-y-3">
          <div className="space-y-1">
            <h3 className="line-clamp-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {course.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-500 leading-relaxed" title={course.description}>
              {course.description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 text-sm text-gray-600">
            <div className="size-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
              <GraduationCap className="size-3.5 text-gray-500" />
            </div>
            <span className="truncate font-medium">{course.instructor}</span>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0 border-t border-gray-50 bg-gray-50/30">
          <div className="w-full space-y-4 pt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border shadow-sm">
                <Clock className="size-3.5 text-indigo-500" />
                <span>{course.duration}</span>
              </div>
              {showEnrollment && (
                <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-md border shadow-sm">
                  <Users className="size-3.5 text-green-500" />
                  <span>{course.enrolledStudents} Students</span>
                </div>
              )}
            </div>

            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 group-hover:shadow-lg group-hover:shadow-indigo-300 transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(course);
              }}
            >
              {actionLabel}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

