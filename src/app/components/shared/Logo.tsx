import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Sparkles } from "lucide-react";

interface LogoProps {
    className?: string;
    size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
    const sizeClasses = {
        sm: "h-8 text-lg",
        md: "h-10 text-xl",
        lg: "h-12 text-2xl",
    };

    const iconSizes = {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
    };

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <motion.div
                className="relative flex items-center justify-center"
                initial="rest"
                whileHover="hover"
                animate="rest"
            >
                <motion.div
                    className={`bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl p-2.5 shadow-lg shadow-indigo-500/20`}
                    variants={{
                        rest: { rotate: 0, scale: 1 },
                        hover: { rotate: 5, scale: 1.05 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                    <GraduationCap className={`${iconSizes[size]} text-white`} />
                </motion.div>

                <motion.div
                    className="absolute -top-1 -right-1"
                    variants={{
                        rest: { scale: 0, rotate: 0 },
                        hover: { scale: 1, rotate: 180 },
                    }}
                >
                    <Sparkles className="size-3 text-amber-400 fill-amber-400" />
                </motion.div>
            </motion.div>

            <div className="flex flex-col">
                <motion.h1
                    className={`font-bold tracking-tight text-gray-900 dark:text-gray-100 ${sizeClasses[size].split(' ')[1]}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Edu</span>
                    Learn
                </motion.h1>
            </div>
        </div>
    );
}
