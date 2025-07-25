# JobBoard

🌐 Website URL : 
# A modern, full-stack job board application built with Next.js and Supabase, featuring role-based access for companies and job seekers, a comprehensive company dashboard, and advanced search functionality.

**Live Demo:** [https://Job Board App](https://job-board-brown-delta.vercel.app/)

---

## 🚀 About The Project

This project was built from scratch to serve as a comprehensive portfolio piece demonstrating a wide range of modern web development skills. It's a fully functional job board platform where companies can manage job postings and applicants, and job seekers can manage their professional profiles and apply for positions.

The architecture leverages the power of Next.js App Router for a highly performant, server-centric application, with Supabase providing a robust backend for authentication, database, and storage.

---

## 🛠️ Built With

This project showcases a modern, full-stack TypeScript-based technology stack.

* **Framework:** ![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
* **Language:** ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
* **Styling:** ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
* **Component Library:** ![Shadcn UI](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
* **Backend & DB:** ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
* **Deployment:** ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
* **Notifications:** ![React Hot Toast](https://img.shields.io/badge/React%20Hot%20Toast-FF4154?style=for-the-badge&logo=react&logoColor=white)

---

## ✨ Features

This application is packed with features that demonstrate core competencies in full-stack development.

#### **Core & Authentication:**
* **Role-Based Access Control (RBAC):** Distinct user flows for **Company** and **Personal** (Job Seeker) roles.
* **Secure Authentication:** Full auth flow including sign-up, sign-in, and social login (Google OAuth).
* **Protected Routes:** Utilizes Next.js Middleware and server-side checks to protect pages based on authentication status and user role.
* **User Onboarding:** A dedicated onboarding flow for new users to complete their profile (`full_name`, `role`) before using the app.

#### **Company Features:**
* **Company Dashboard:** A dedicated, nested layout for companies to manage their presence.
* **Profile Management:** Companies can create and update their profiles (name, description, etc.).
* **Job Management (CRUD):** Companies can create, read, update, and delete job postings.
* **Job Status Control:** Ability to activate and deactivate job listings without deleting them (Soft Deletes).

#### **Job Seeker Features:**
* **Advanced Job Search:**
    * Search by title, company, or location.
    * **Debounced "Search-as-you-type"** for a smooth, responsive user experience without excessive API calls.
* **User Profile Management:** A dedicated page for users to update their personal details, password, and social links (LinkedIn, GitHub).
* **CV Management:** Users can upload, view, and manage up to two CVs (PDFs) stored securely in Supabase Storage.
* **Job Application System:** A full application flow where users can apply for jobs using a saved CV or by uploading a new one.

---

## 🔧 Technical Highlights & Challenges

This section highlights key technical implementations that add significant value to the project.

* **Server-Centric Architecture:** Primarily built using **React Server Components (RSC)** for optimal performance and data fetching directly on the server.
* **Secure Mutations with Server Actions:** All form submissions and data mutations (`UPDATE`, `INSERT`, `DELETE`) are handled securely through Next.js Server Actions, minimizing the need for traditional API endpoints.
* **Advanced Database Security with Supabase RLS:** Implemented **Row-Level Security (RLS) policies** for all major tables (`jobs`, `applications`, `profiles`, `companies`). This ensures that a user can *only* see or modify data that they are explicitly authorized to access (e.g., a company can only see applicants for its own jobs).
* **Automated Profile Creation via DB Triggers:** A PostgreSQL trigger was created on the `auth.users` table to automatically create a corresponding row in the `public.profiles` table for every new user, ensuring data consistency.
* **Complex State Management with React Hooks:** Utilized `useActionState` for modern, progressive enhancement on forms, providing instant feedback and handling pending states, and `useState`/`useEffect` for interactive client-side components like the search bar and profile dropdown.

---

## 📞 Contact

**Bryan Imanuell** - [LinkedIn](https://www.linkedin.com/in/bryanimanuell/) - bryanimanuell17@gmail.com

Project Link: [](https://github.com/your-username/your-repo-name)
