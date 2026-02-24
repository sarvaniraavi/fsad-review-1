import { useState } from 'react';
import { User, Enrollment, Course } from '../../types';
import { mockEnrollments, mockCourses } from '../../lib/mock-data';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowLeft, Mail, User as UserIcon, BookOpen, GraduationCap, Shield, Camera } from 'lucide-react';
import { motion } from "motion/react";

interface ProfilePageProps {
    user: User;
    onBack: () => void;
}

export function ProfilePage({ user, onBack }: ProfilePageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        avatar: user.avatar || ''
    });

    // Calculate stats based on role
    const isStudent = user.role === 'student';
    const studentEnrollments = isStudent ? mockEnrollments.filter(e => e.studentId === user.id) : [];
    const completedCourses = isStudent ? studentEnrollments.filter(e => e.progress === 100).length : 0;

    const educatorCourses = !isStudent ? mockCourses.filter(c => c.instructorId === user.id) : [];
    const totalStudents = !isStudent ? educatorCourses.reduce((acc, curr) => acc + curr.enrolledStudents, 0) : 0;

    const handleSave = () => {
        // In a real app, this would update the backend
        console.log('Saving profile:', formData);
        setIsEditing(false);
        // basic toast or alert could go here
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
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
                                Back to Dashboard
                            </Button>
                            <div className="h-6 w-px bg-gray-200" />
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">My Profile</h1>
                        </div>
                        {isEditing ? (
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button size="sm" onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                            </div>
                        ) : (
                            <Button onClick={() => setIsEditing(true)} variant="outline">Edit Profile</Button>
                        )}
                    </div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                <div className="grid gap-8 md:grid-cols-[1fr_2fr]">

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <Card className="overflow-hidden border-none shadow-lg">
                            <div className="h-32 bg-gradient-to-br from-indigo-600 to-violet-600 relative">
                                <div className="absolute inset-0 bg-black/10" />
                            </div>
                            <CardContent className="pt-0 relative">
                                <div className="flex justify-center -mt-16 mb-4 relative">
                                    <div className="relative group">
                                        <Avatar className="size-32 border-4 border-white shadow-xl">
                                            <AvatarImage src={formData.avatar} className="object-cover" />
                                            <AvatarFallback className="text-4xl bg-indigo-100 text-indigo-600">
                                                {user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {isEditing && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                                <Camera className="size-8 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-center space-y-2 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <Mail className="size-4" />
                                        {user.email}
                                    </div>
                                    <div className="pt-2">
                                        <Badge variant="secondary" className="px-3 py-1 capitalize bg-indigo-50 text-indigo-700 border-indigo-100">
                                            {user.role} Account
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {isStudent ? studentEnrollments.length : educatorCourses.length}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                                            {isStudent ? 'Enrolled' : 'Courses'}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-2xl font-bold text-gray-900">
                                            {isStudent ? completedCourses : totalStudents}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                                            {isStudent ? 'Completed' : 'Students'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Shield className="size-4 text-indigo-600" />
                                    Account Status
                                </h3>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Member Since</span>
                                    <span className="font-medium">Jan 2026</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Verification</span>
                                    <span className="text-green-600 font-medium flex items-center gap-1">
                                        Verified
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Edit Form */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Information</CardTitle>
                                <CardDescription>
                                    Update your personal details and public profile information.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <div className="relative">
                                            <UserIcon className="absolute left-3 top-2.5 size-4 text-gray-400" />
                                            <Input
                                                id="fullName"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                disabled={!isEditing}
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-2.5 size-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                disabled={!isEditing} // Email usually immutable or requires verification
                                                className="pl-9"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Input
                                        id="bio"
                                        placeholder="Tell us a little about yourself"
                                        disabled={!isEditing}
                                        className="h-24 pb-16" // Simulating textarea with input for now or replace with Textarea
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                                    <Input
                                        id="avatarUrl"
                                        value={formData.avatar}
                                        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                        disabled={!isEditing}
                                        placeholder="https://..."
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Preferences</CardTitle>
                                <CardDescription>
                                    Manage your notification and display settings.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">Receive emails about your account activity.</p>
                                    </div>
                                    {/* Switch would go here */}
                                    <Badge variant="outline">Enabled</Badge>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t">
                                    <div className="space-y-0.5">
                                        <Label className="text-base text-red-600">Delete Account</Label>
                                        <p className="text-sm text-muted-foreground">Permanently remove your account and all data.</p>
                                    </div>
                                    <Button variant="destructive" size="sm" disabled={!isEditing}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

