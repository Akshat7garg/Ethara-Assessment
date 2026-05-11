# 🚀 TaskForge

![Preview](https://taskforge-psi-one.vercel.app/preview.png)

TaskForge is a modern full-stack role-based task and project management platform designed to simplify team collaboration, project organization, and task tracking through dedicated Admin and Member workspaces.

Built with React, TypeScript, Node.js, Express, Prisma ORM, and PostgreSQL, the platform focuses on scalable architecture, clean UI, secure authentication, and real-world workflow management.

---

# 🌐 Live Demo

| Platform | Link                                  |
| -------- | ------------------------------------- |
| Frontend | <https://taskforge-psi-one.vercel.app/> |
| Backend  | Railway Deployment                    |
| Database | Neon PostgreSQL                       |

---

# ✨ Key Features

## 👨‍💼 Admin Workspace

Admins have complete control over project and team management.

### Features

* Create and manage projects
* Add members to projects
* Assign tasks to team members
* Monitor project progress
* Track team workload and task status
* Access analytics dashboard with interactive charts
* Manage personal and project tasks

---

## 👨‍💻 Member Workspace

Members can efficiently manage assigned work and personal productivity.

### Features

* View assigned projects
* Access project teammates and details
* Create and manage personal tasks
* Update task progress and completion status
* Track deadlines and assigned work
* Access dedicated member dashboard

---

## 🔐 Authentication & Security

TaskForge uses secure authentication and protected access control mechanisms.

### Security Features

* JWT Authentication
* Protected API Routes
* Role-Based Access Control
* Persistent Login Sessions
* Secure Backend Middleware

---

# 📊 Dashboard & Analytics

The platform includes responsive dashboards with:

* Task progress visualization
* Team workload insights
* Project tracking
* Status analytics
* Interactive charts using Recharts

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Router DOM
* Axios
* Recharts
* React Hot Toast

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication
* REST APIs

## Database & Deployment

* Neon PostgreSQL
* Railway
* Vercel

---

# 📁 Project Structure

```bash
root/
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── components/
│       ├── context/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       └── types/
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── routes/
│       └── utils/
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=8000
```

Run Prisma migration:

```bash
npx prisma migrate dev
```

Start backend server:

```bash
npm run dev
```

---

# Frontend Setup

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

Start frontend server:

```bash
npm run dev
```

---

# 📌 Core Functionalities

* Role-based authentication system
* Separate Admin and Member dashboards
* Project creation and member assignment
* Personal and project task management
* Task progress tracking and status updates
* Interactive analytics and charts
* Responsive layouts and sidebars
* Secure API architecture using JWT
* Prisma-powered PostgreSQL database management

---

# 🚀 Deployment

## Frontend

* Deployed on Vercel

## Backend

* Deployed on Railway

## Database

* Hosted on Neon PostgreSQL

---

# 🔮 Future Improvements

* Real-time notifications
* Team chat system
* File uploads
* Activity logs
* Email notifications
* Calendar integration
* Advanced analytics
* Dark / Light theme support

---

# 👨‍💻 Author

Developed by Akshat Garg.
