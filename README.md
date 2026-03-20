# Student Attendance Dashboard

A highly-polished, responsive Student Attendance Dashboard built with **React**, **Vite**, and **Tailwind CSS v4**.

## ✨ Features
- **Modern Dark UI:** A vibrant glassmorphic dark theme featuring animated glowing background orbs, deep shadow highlights, and rich gradient-filled components.
- **Dynamic Data Generation:** Seamlessly fetches placeholder student details from the JSONPlaceholder API and augments them with randomized attendance records and status markers.
- **Advanced Filtering & Sorting:** Sort by attendance percentage, filter records by "Present" or "Absent", and toggle a dedicated view exclusively for students with `<75%` attendance.
- **Expandable Detailed Rows:** Clicking any student smoothly reveals a supplementary details card packed with contact information, location, and web portal links via a Tailwind-powered accordion animation.
- **Reactive UI Feedback:** Implements beautifully hovering data rows, pulsing status dots, and rich colorful avatars that dynamically adjust their style depending on their selection status.

## 🏗️ Code Architecture

The architecture relies on an intuitive top-down React data flow, leveraging the `useState` and `useEffect` hooks for fetching and state propagation.

### 1. `src/App.jsx`
The central root/container component of the application.
- **State Management:** Manages all core states: `students`, `filterType`, `selectedStudent`, `showLowAttendance`, `sortOrder`, and `loading`.
- **API Fetching:** Employs `useEffect` to grab the JSON student payload, attaching mathematically randomized `.attendance` and `.status` fields to each record.
- **Processing Logic:** Contains the core computation algorithms necessary to slice, map, sort, and filter the raw student array into `displayedStudents` before drilling the data down.
- **Visuals:** Renders the main dashboard glowing background aesthetics and static header telemetry cards (e.g. 'Total Limit', 'Avg Rate').

### 2. `src/components/FilterBar.jsx`
The primary user interaction panel.
- Allows teachers to toggle and shift global views.
- Dispatches state updates (e.g. `setFilterType`, `setShowLowAttendance`) directly back up to `App.jsx`, forcing reactive downstream renders.
- Styled as a frosted glass container with segmented controls and animated sorting toggles.

### 3. `src/components/StudentTable.jsx`
The main data visualization component.
- Consumes the processed `displayedStudents` array.
- **Avatars & Gradients:** Dynamically applies distinct rich CSS gradients based on a string-hash algorithm (`getAvatarStyle`) for avatars. Displays reactive attendance percentage progress bars based on the student's status.
- **Accordion Row:** Uses `<React.Fragment>` to couple a primary student list row with a completely hidden `.max-h-0` secondary row. When a user clicks the primary row, the `selectedStudent` triggers a `.max-h-[500px]` transition—producing a fluid accordion dropdown that showcases the deeply nested API attributes (`email`, `phone`, `address`, `website`).

### 4. `src/index.css` & `src/main.jsx`
- **Tailwind v4 Integration:** Tailwind CSS is injected via the modern `@import "tailwindcss";` pattern directly in `index.css`.
- Connects standard browser normalizations, standard text colors, and custom fonts (Outfit) globally into the application.

## 🚀 Setup & Installation

1. Navigate to the project directory and install all required Node/Vite dependencies:
   ```bash
   npm install
   ```
2. Spin up the Vite development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/` in your local browser to view the application in action.
