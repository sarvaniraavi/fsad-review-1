import { useState } from 'react';
import { User, Course, Assignment, Submission } from '../../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ArrowLeft, Upload, CheckCircle, Clock, AlertCircle, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion, AnimatePresence } from "motion/react";
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';

interface AssignmentSubmissionProps {
  user: User;
  course: Course;
  assignments: Assignment[];
  submissions: Submission[];
  onBack: () => void;
}

export function AssignmentSubmission({
  user,
  course,
  assignments,
  submissions,
  onBack
}: AssignmentSubmissionProps) {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionText, setSubmissionText] = useState('');

  const handleSubmit = () => {
    if (selectedAssignment && submissionText) {
      const newSubmission: Submission = {
        id: `sub-${Date.now()}`,
        assignmentId: selectedAssignment.id,
        studentId: user.id,
        studentName: user.name,
        content: submissionText,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };

      console.log('Submitting assignment:', newSubmission);
      setSubmissionText('');
      setSelectedAssignment(null);
    }
  };

  const getAssignmentStatus = (assignment: Assignment) => {
    const submission = submissions.find(s => s.assignmentId === assignment.id);
    if (!submission) return 'not-submitted';
    return submission.status;
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const pendingAssignments = assignments.filter(a => getAssignmentStatus(a) === 'not-submitted');
  const submittedAssignments = assignments.filter(a => getAssignmentStatus(a) === 'submitted');
  const gradedAssignments = assignments.filter(a => getAssignmentStatus(a) === 'graded');

  return (
    <div className="min-h-screen bg-gray-50">
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
                Back to Course
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">Assignments</h1>
                <p className="text-xs font-medium text-indigo-600 flex items-center gap-1">
                  <span className="truncate max-w-[200px]">{course.title}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="pending" className="space-y-8">
          <TabsList className="bg-gray-100/50 p-1 border">
            <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Clock className="size-4 mr-2" />
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CheckCircle className="size-4 mr-2" />
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="graded" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="size-4 mr-2" />
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-6 outline-none">
            <AnimatePresence mode="popLayout">
              {pendingAssignments.length > 0 ? (
                <div className="grid gap-6">
                  {pendingAssignments.map((assignment, index) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={cn(
                        "transition-all duration-300 hover:shadow-md border-l-4",
                        isOverdue(assignment.dueDate) ? 'border-l-red-500' : 'border-l-primary'
                      )}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{assignment.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <Clock className="size-3.5 mr-1" />
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </CardDescription>
                            </div>
                            <div className="flex gap-2">
                              {isOverdue(assignment.dueDate) && (
                                <Badge variant="destructive" className="h-6">
                                  <AlertCircle className="size-3 mr-1" />
                                  Overdue
                                </Badge>
                              )}
                              <Badge variant="secondary" className="h-6">{assignment.totalPoints} pts</Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-600 text-sm leading-relaxed">{assignment.description}</p>

                          {selectedAssignment?.id === assignment.id ? (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-4 pt-4 border-t"
                            >
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Your Submission</label>
                                <Textarea
                                  placeholder="Type your answer or paste your work here..."
                                  value={submissionText}
                                  onChange={(e) => setSubmissionText(e.target.value)}
                                  rows={8}
                                  className="resize-none focus-visible:ring-primary"
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm" className="h-8">
                                    <Upload className="size-3.5 mr-2" />
                                    Attach File
                                  </Button>
                                  <span className="text-xs text-muted-foreground">Optional (PDF, Docx)</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => setSelectedAssignment(null)}>
                                    Cancel
                                  </Button>
                                  <Button size="sm" onClick={handleSubmit} disabled={!submissionText}>
                                    Submit Assignment
                                  </Button>
                                </div>
                              </div>
                            </motion.div>
                          ) : (
                            <div className="pt-2">
                              <Button onClick={() => setSelectedAssignment(assignment)} className="w-full sm:w-auto">
                                Start Assignment
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-gray-50/50"
                >
                  <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="size-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">All Caught Up!</h3>
                  <p className="text-gray-500 mt-1">You have no pending assignments at the moment.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="submitted" className="space-y-6">
            {submittedAssignments.length > 0 ? (
              <div className="grid gap-6">
                {submittedAssignments.map(assignment => {
                  const submission = submissions.find(s => s.assignmentId === assignment.id);

                  return (
                    <Card key={assignment.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{assignment.title}</CardTitle>
                            <CardDescription>
                              Submitted on {submission && new Date(submission.submittedAt).toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge variant="secondary">
                            <Clock className="size-3 mr-1" />
                            Awaiting Grade
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Your Submission:</p>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm whitespace-pre-wrap">{submission?.content}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <Clock className="size-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No submitted assignments</p>
                  <p className="text-sm">Assignments you submit will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="graded" className="space-y-6 outline-none">
            {gradedAssignments.length > 0 ? (
              <div className="grid gap-6">
                {gradedAssignments.map((assignment, index) => {
                  const submission = submissions.find(s => s.assignmentId === assignment.id);
                  const percentage = submission?.grade ? (submission.grade / assignment.totalPoints) * 100 : 0;
                  const isPassing = percentage >= 60;

                  return (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <div className={cn("h-1.5 w-full", isPassing ? "bg-green-500" : "bg-red-500")} />
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle>{assignment.title}</CardTitle>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>Submitted on {submission && new Date(submission.submittedAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span className={isPassing ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                  {isPassing ? "Passed" : "Failed"}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold tracking-tight">{submission?.grade}</span>
                                <span className="text-gray-500 font-medium">/ {assignment.totalPoints}</span>
                              </div>
                              <Badge variant={isPassing ? "default" : "destructive"} className={isPassing ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}>
                                {percentage.toFixed(0)}% Score
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <p className="text-sm font-medium flex items-center gap-2">
                                <FileText className="size-4 text-gray-400" />
                                Your Submission
                              </p>
                              <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 leading-relaxed h-full">
                                {submission?.content}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-sm font-medium flex items-center gap-2">
                                <CheckCircle2 className="size-4 text-gray-400" />
                                Instructor Feedback
                              </p>
                              {submission?.feedback ? (
                                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 h-full">
                                  <p className="text-sm text-blue-800 leading-relaxed italic">
                                    "{submission.feedback}"
                                  </p>
                                </div>
                              ) : (
                                <div className="bg-gray-50 border border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center h-full">
                                  <span className="text-gray-400 text-sm">No feedback provided yet.</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-gray-50/50">
                <div className="size-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <CheckCircle className="size-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">No Graded Assignments</h3>
                <p className="text-gray-500 mt-1">Assignments will appear here once they have been graded.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

