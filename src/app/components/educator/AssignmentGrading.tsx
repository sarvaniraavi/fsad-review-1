import { useState } from 'react';
import { Course, Assignment, Submission } from '../../types';
import { mockAssignments, mockSubmissions } from '../../lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { ArrowLeft, CheckCircle, Clock, FileText, User as UserIcon, Calendar, Download } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion, AnimatePresence } from "motion/react";
import { cn } from '../ui/utils';

interface AssignmentGradingProps {
  courses: Course[];
  onBack: () => void;
}

export function AssignmentGrading({ courses, onBack }: AssignmentGradingProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const courseIds = courses.map(c => c.id);
  const assignments = mockAssignments.filter(a => courseIds.includes(a.courseId));
  const submissions = mockSubmissions;

  const handleGrade = () => {
    if (selectedSubmission && grade) {
      console.log('Grading submission:', {
        submissionId: selectedSubmission.id,
        grade: parseInt(grade),
        feedback
      });

      // Update submission status (mock)
      const submissionIndex = submissions.findIndex(s => s.id === selectedSubmission.id);
      if (submissionIndex !== -1) {
        submissions[submissionIndex] = {
          ...submissions[submissionIndex],
          grade: parseInt(grade),
          feedback,
          status: 'graded'
        };
        setSelectedSubmission(submissions[submissionIndex]);
      }
    }
  };

  const pendingSubmissions = submissions.filter(s => s.status === 'submitted');
  const gradedSubmissions = submissions.filter(s => s.status === 'graded');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col h-screen overflow-hidden">
      <div className="bg-white border-b sticky top-0 z-10 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="size-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <div>
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="size-5 text-indigo-600" />
                  Assignment Grading
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {pendingSubmissions.length} Pending
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {gradedSubmissions.length} Graded
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          {/* Submissions List */}
          <div className="lg:col-span-4 h-full flex flex-col">
            <Tabs defaultValue="pending" className="w-full h-full flex flex-col">
              <Card className="flex flex-col h-full border-0 shadow-lg overflow-hidden flex-1">
                <CardHeader className="bg-gray-50/80 border-b pb-0 shrink-0 z-10">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
                    <TabsTrigger value="graded">Graded ({gradedSubmissions.length})</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent className="p-0 flex-1 overflow-hidden bg-gray-50/30 relative">
                  <TabsContent value="pending" className="h-full overflow-y-auto p-4 space-y-3 mt-0 absolute inset-0">
                    <AnimatePresence mode="popLayout">
                      {pendingSubmissions.map(submission => {
                        const assignment = assignments.find(a => a.id === submission.assignmentId);
                        const course = courses.find(c => c.id === assignment?.courseId);

                        return (
                          <motion.div
                            key={submission.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                          >
                            <Card
                              className={cn(
                                "cursor-pointer transition-all hover:shadow-md border",
                                selectedSubmission?.id === submission.id
                                  ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500'
                                  : 'hover:border-indigo-200'
                              )}
                              onClick={() => {
                                setSelectedSubmission(submission);
                                setGrade(submission.grade?.toString() || '');
                                setFeedback(submission.feedback || '');
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                    <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                      {submission.studentName.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 truncate">{submission.studentName}</p>
                                    <p className="text-sm font-medium text-indigo-600 truncate">{assignment?.title}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{course?.title}</p>
                                    <div className="flex items-center gap-3 mt-3">
                                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                        <Calendar className="size-3 mr-1.5" />
                                        {new Date(submission.submittedAt).toLocaleDateString()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>

                    {pendingSubmissions.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500 h-full">
                        <CheckCircle className="size-12 mb-3 text-green-500 opacity-80" />
                        <p className="font-medium">No pending submissions</p>
                        <p className="text-xs">You've graded everything!</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="graded" className="h-full overflow-y-auto p-4 space-y-3 mt-0 absolute inset-0">
                    {gradedSubmissions.map(submission => {
                      const assignment = assignments.find(a => a.id === submission.assignmentId);
                      const course = courses.find(c => c.id === assignment?.courseId);

                      return (
                        <Card
                          key={submission.id}
                          className={cn(
                            "cursor-pointer transition-all border",
                            selectedSubmission?.id === submission.id
                              ? 'border-indigo-500 bg-indigo-50/50 shadow-sm ring-1 ring-indigo-500'
                              : 'hover:border-gray-300'
                          )}
                          onClick={() => {
                            setSelectedSubmission(submission);
                            setGrade(submission.grade?.toString() || '');
                            setFeedback(submission.feedback || '');
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className="bg-green-100 text-green-700">
                                  {submission.studentName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <p className="font-semibold text-gray-900 truncate">{submission.studentName}</p>
                                  <Badge variant={submission.grade && submission.grade >= 60 ? "default" : "destructive"} className={submission.grade && submission.grade >= 60 ? "bg-green-600" : ""}>
                                    {submission.grade}%
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{assignment?.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{course?.title}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>

          {/* Grading Panel */}
          <Card className="lg:col-span-8 flex flex-col h-full border-0 shadow-lg overflow-hidden bg-white">
            {selectedSubmission ? (
              <div className="flex flex-col h-full">
                <CardHeader className="border-b bg-gray-50 px-8 py-6 shrink-0">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-4 border-white shadow-sm">
                        <AvatarFallback className="text-lg bg-indigo-600 text-white">
                          {selectedSubmission.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-2xl">{selectedSubmission.studentName}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Clock className="size-3.5 mr-1" />
                          Submitted on {new Date(selectedSubmission.submittedAt).toLocaleString()}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {selectedSubmission.status === 'late' && (
                        <Badge variant="destructive">Late Submission</Badge>
                      )}
                      {assignments.find(a => a.id === selectedSubmission.assignmentId) && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-500">Total Points</p>
                          <p className="text-2xl font-bold text-gray-900">{assignments.find(a => a.id === selectedSubmission.assignmentId)?.totalPoints}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <div className="flex-1 overflow-y-auto p-8">
                  <div className="grid lg:grid-cols-2 gap-8 h-full">
                    {/* Submission Content */}
                    <div className="space-y-4 flex flex-col h-full">
                      <div className="flex items-center justify-between shrink-0">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                          <FileText className="size-4" />
                          Student Submission
                        </h3>
                        {selectedSubmission.fileUrl && (
                          <Button variant="outline" size="sm" className="h-8">
                            <Download className="size-3.5 mr-2" />
                            Download Attachment
                          </Button>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-xl p-6 border text-gray-700 min-h-[300px] whitespace-pre-wrap leading-relaxed shadow-inner flex-1">
                        {selectedSubmission.content}
                      </div>

                      {/* Assignment Context */}
                      <div className="mt-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100 shrink-0">
                        <h3 className="text-sm font-semibold text-indigo-900 mb-1">
                          Assignment: {assignments.find(a => a.id === selectedSubmission.assignmentId)?.title}
                        </h3>
                        <p className="text-sm text-indigo-700 line-clamp-2">
                          {assignments.find(a => a.id === selectedSubmission.assignmentId)?.description}
                        </p>
                      </div>
                    </div>

                    {/* Grading Form */}
                    <div className="space-y-6 bg-white p-6 rounded-xl border shadow-sm h-fit sticky top-0">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2 border-b pb-4">
                        <CheckCircle className="size-4 text-green-600" />
                        Evaluation
                      </h3>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="grade" className="text-sm font-medium">Grade (0-{assignments.find(a => a.id === selectedSubmission.assignmentId)?.totalPoints})</Label>
                          <div className="relative">
                            <Input
                              id="grade"
                              type="number"
                              min="0"
                              max="100"
                              placeholder="0"
                              value={grade}
                              onChange={(e) => setGrade(e.target.value)}
                              disabled={selectedSubmission.status === 'graded'}
                              className="text-lg font-bold w-32 pl-4 pr-12 h-12"
                            />
                            <span className="absolute left-16 top-1/2 -translate-y-1/2 text-gray-400 font-medium">/ 100</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="feedback" className="text-sm font-medium">Feedback</Label>
                          <Textarea
                            id="feedback"
                            placeholder="Provide constructive feedback for the student..."
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            rows={8}
                            disabled={selectedSubmission.status === 'graded'}
                            className="resize-none"
                          />
                        </div>

                        {selectedSubmission.status !== 'graded' ? (
                          <Button onClick={handleGrade} className="w-full h-12 text-base" disabled={!grade}>
                            Submit Grade & Feedback
                          </Button>
                        ) : (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-in fade-in zoom-in duration-300">
                            <div className="flex items-center gap-2 text-green-700 mb-1">
                              <CheckCircle className="size-5" />
                              <span className="font-bold">Graded Successfully</span>
                            </div>
                            <p className="text-sm text-green-600">
                              You gave this submission a score of <span className="font-bold">{selectedSubmission.grade}</span>.
                            </p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                // Hacky way to re-enable editing for demo
                                const submissionIndex = submissions.findIndex(s => s.id === selectedSubmission.id);
                                if (submissionIndex !== -1) {
                                  submissions[submissionIndex].status = 'submitted';
                                  setSelectedSubmission({ ...submissions[submissionIndex] });
                                }
                              }}
                              className="mt-3 w-full border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800"
                            >
                              Edit Grade
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 bg-gray-50/30">
                <div className="size-24 rounded-full bg-gray-100 flex items-center justify-center mb-6 shadow-sm">
                  <UserIcon className="size-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Select a Student</h3>
                <p className="max-w-xs mx-auto mt-2">Choose a submission from the list to view details and assign a grade.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

