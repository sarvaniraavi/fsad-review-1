import { useState } from 'react';
import { User, LogOut, ChevronLeft, Menu, Sparkles, BookOpen, GraduationCap, LayoutDashboard, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Logo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../ui/utils';

interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
}

interface DashboardLayoutProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
        role: 'student' | 'educator';
    };
    navItems: NavItem[];
    activeSection: string;
    onSectionChange: (sectionId: string) => void;
    onLogout: () => void;
    children: React.ReactNode;
}

export function DashboardLayout({ user, navItems, activeSection, onSectionChange, onLogout, children }: DashboardLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen bg-gray-50/50 overflow-hidden">
            {/* Sidebar - Desktop */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarOpen ? 256 : 80 }}
                className="hidden md:flex flex-col border-r bg-white/80 backdrop-blur-xl z-50 h-full relative"
            >
                <div className="flex items-center h-16 px-4 border-b border-gray-100 justify-between">
                    <div className={cn("transition-opacity duration-200", !isSidebarOpen && "opacity-0 invisible w-0")}>
                        <Logo size="sm" />
                    </div>
                    {/* Collapsed Logo Alternative */}
                    {!isSidebarOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-4">
                            <Sparkles className="size-6 text-indigo-600 fill-indigo-100" />
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-auto absolute -right-4 top-4 rounded-full bg-white border shadow-sm z-50 hover:bg-gray-50"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <ChevronLeft className={cn("size-4 transition-transform", !isSidebarOpen && "rotate-180")} />
                    </Button>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            variant={activeSection === item.id ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start h-10 mb-1 transition-all",
                                activeSection === item.id
                                    ? "bg-indigo-50 text-indigo-700 font-medium"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                                !isSidebarOpen && "justify-center px-0"
                            )}
                            onClick={() => onSectionChange(item.id)}
                        >
                            <item.icon className={cn("size-5", isSidebarOpen && "mr-3 text-indigo-600/80")} />
                            {isSidebarOpen && <span>{item.label}</span>}
                            {!isSidebarOpen && (
                                <div className="sr-only">{item.label}</div>
                            )}
                        </Button>
                    ))}
                </div>

                <div className="p-4 border-t bg-gray-50/50">
                    <div className={cn("flex items-center gap-3", !isSidebarOpen && "justify-center")}>
                        <Avatar className="h-9 w-9 ring-2 ring-white shadow-sm">
                            <AvatarImage src={user.avatar} className="object-cover" />
                            <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                {user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        )}
                        {isSidebarOpen && (
                            <Button variant="ghost" size="icon" onClick={onLogout} className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50">
                                <LogOut className="size-4" />
                            </Button>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between h-16 w-full px-4 border-b bg-white sticky top-0 z-50">
                <Button variant="ghost" size="icon">
                    <Menu className="size-5" />
                </Button>
                <Logo size="sm" />
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} className="object-cover" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-auto bg-gray-50/30 relative">
                <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
                    {children}
                </div>
            </main>
        </div>
    );
}
