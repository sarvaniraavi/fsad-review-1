# 🎓 EduLearn - Advanced Course Management System

[![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**EduLearn** is a premium, full-stack immersive learning platform designed to bridge the gap between education and cultural heritage. Built with a modern tech stack centered around React, Tailwind CSS 4, and Motion, it provides a seamless, high-performance experience for both students and educators.

---

## 🌟 Key Features

### 👨‍🎓 For Students
- **Smart Dashboard**: Real-time tracking of course progress, upcoming deadlines, and learning analytics.
- **Interactive Course Player**: Immersive lesson navigation with support for video, text content, and interactive assessments.
- **Course Discovery**: Advanced filtering, search, and categorization to find heritage and skill-based courses.
- **Personalized Profile**: Manage your learning journey, achievements, and account settings.

### 👩‍🏫 For Educators
- **Powerful Course Builder**: Intuitive drag-and-drop-style interface for creating modules and lessons.
- **Engagement Analytics**: Track student enrollment and performance using integrated charts (Recharts).
- **Student Management**: Overview of enrolled students and their progress within specific courses.

### 🎨 Design & Experience
- **Premium Aesthetics**: Sleek glassmorphism, smooth animations (Motion), and a refined Indigo-Violet color palette.
- **Responsive Layout**: Optimized for mobile, tablet, and desktop viewports.
- **Dark Mode Ready**: Fully themed for low-light environment learning.

---

## 🛠️ Technology Stack

| Category | Tools |
| :--- | :--- |
| **Frontend Framework** | React 18 (Vite) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Motion / Framer Motion |
| **Components** | Radix UI, Shadcn UI, MUI Material |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Routing** | React Router 7 |
| **Forms** | React Hook Form |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/EduLearn.git
   cd EduLearn
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── auth/         # Login, Registration & Auth Logic
│   │   ├── educator/     # Educator-specific Dashboards & Builder
│   │   ├── student/      # Student-specific Views & Course Player
│   │   ├── shared/       # Reusable UI Patterns (Logo, Cards, Layouts)
│   │   └── ui/           # Primitive Components (Radix/Shadcn)
│   ├── lib/              # Mock Data, Utilities & API Helpers
│   ├── types/            # TypeScript Interface Definitions
│   └── App.tsx           # Global Routing & State Management
├── styles/
│   ├── index.css         # Global Styles & Tailwind Directives
│   └── theme.css         # Design System Tokens (Colors, Radius)
└── main.tsx              # Entry Point
```

---

## 📖 Mock Data & Standalone Mode
The application is currently configured with a robust **Mock Data Layer** (`src/app/lib/mock-data.ts`). This allows for immediate exploration of all features (Admin, Student, Educator) without needing a live backend connection. 

- **Student Credentials:** Use any mock student account from the login page.
- **Educator Credentials:** Use any mock educator account to access the Course Builder.

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Developed with ❤️ by the EduLearn Team
</p>
