# A modern, full-stack job board application built with Next.js 15 and Supabase. It features distinct role-based dashboards for companies and job seekers, real-time search, a complete application tracking system with automated email notifications, and much more.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

**➡️ Live Demo: [https://job-board-brown-delta.vercel.app/](https://job-board-brown-delta.vercel.app/)**

---

![Project Showcase GIF](https://your-gif-url.com/showcase.gif) 

---

## 🚀 About The Project

This project was built from the ground up as a comprehensive portfolio piece demonstrating a full range of modern web development skills. It's a fully functional job board platform designed with a clear separation of concerns for two main user roles:

* **Companies:** Can manage their profile, post and manage job listings, and track applicants through a dedicated dashboard.
* **Job Seekers:** Can build their professional profile, manage CVs, search for jobs, and apply for positions.

The architecture leverages the power of the **Next.js App Router** for a highly performant, server-centric application, with **Supabase** providing a robust and scalable backend for authentication, database, storage, and database functions.

---

## 🛠️ Built With

This project showcases a modern, powerful, and scalable tech stack.

* **Framework:** Next.js 15
* **Language:** TypeScript
* **Backend & DB:** Supabase (Auth, PostgreSQL, Storage)
* **Styling:** Tailwind CSS
* **Component Library:** Shadcn UI
* **Email Service:** Resend
* **Deployment:** Vercel

---

## ✨ Features

This application is packed with features that demonstrate core competencies in full-stack development, database design, and user experience.

#### **🔑 Core & Authentication**
* **Role-Based Access Control (RBAC):** Distinct user flows and permissions for **Company** and **Personal** (Job Seeker) roles.
* **Secure Authentication:** Full auth flow including sign-up, sign-in, and social login (Google OAuth).
* **Protected Routes:** Utilizes Next.js Middleware and server-side checks to protect pages based on authentication status and user role.
* **User Onboarding:** A dedicated onboarding flow for new users to complete their profile (`full_name`, `role`) before using the app.

#### **🏢 Company Features (Dashboard)**
* **Full Company Dashboard:** A dedicated, nested layout with a sidebar for companies to manage their presence.
* **Company Profile Management:** Companies can create and update their profiles (name, description, employee count, etc.).
* **Job Management (CRUD):** Full create, read, update, and delete functionality for job postings.
* **Job Status Control:** Ability to activate and deactivate job listings (`soft deletes`) without permanently losing data.
* **Applicant Tracking System (ATS):**
    * View and filter a data table of all applicants for each job.
    * Change an applicant's status (`Under Review`, `Accepted`, etc.).
    * View applicant details in a modal, including their full profile, submitted CV, and cover letter.
* **Automated Email Notifications:**
    * **Send templated emails** to applicants directly from the dashboard upon status change.
    * A dedicated page to **create and customize email templates** for different statuses (e.g., "Invited for Interview", "Rejected").

#### **👨‍💻 Job Seeker Features**
* **Advanced Job Search:**
    * Real-time search by title, company, or location.
    * **Debounced "Search-as-you-type"** for a smooth, responsive user experience.
    * Partial word and phrase matching (`ilike` with wildcards).
* **Comprehensive User Profile:** A dedicated page for users to update their personal details, password, and social links (LinkedIn, GitHub).
* **CV Management:** Users can upload, view, and manage up to two CVs (PDFs) stored securely in Supabase Storage.
* **Full Job Application System:** A complete application flow where users can apply by choosing a saved CV or uploading a new one.

---

## 🔧 Technical Highlights

This section highlights key technical implementations that add significant value to the project.

* **Server-Centric Architecture:** Primarily built using **React Server Components (RSC)** for optimal performance, fetching data directly on the server where it's closest to the database.
* **Secure & Modern Mutations:** All form submissions and data mutations (`UPDATE`, `INSERT`, `DELETE`) are handled securely through **Next.js Server Actions** with integrated loading states using the `useActionState` hook.
* **Advanced Database Security & Performance:**
    * Implemented fine-grained **Row-Level Security (RLS) policies** for all major tables and storage buckets, ensuring users can *only* access data they own or are permitted to see.
    * Created a **PostgreSQL `VIEW` (`application_details`)** to efficiently join data from 5 different tables, simplifying complex queries in the application code into a single, performant API call.
    * Utilized **PostgreSQL Triggers** to automate profile creation in the `profiles` table for every new user signing up.
* **Third-Party Service Integration:** Seamlessly integrated the **Resend API** for reliable transactional email delivery, handled securely via Server Actions.

---

## 📞 Contact

**Bryan Imanuell** - [LinkedIn](https://www.linkedin.com/in/bryanimanuell/) - bryanimanuell17@gmail.com

Project Link: [GitHub](https://github.com/bryanimanuell/JobBoard)
