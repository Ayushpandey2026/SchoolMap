# 🏫 SchoolMap — School Management System

A full-stack, production-ready **School Management System** built with **Node.js**, **Express**, **MySQL** on the backend and **React + Tailwind CSS** on the frontend. Supports adding schools and listing them sorted by geographic distance using the **Haversine Formula**.

---

## ✨ Features

- 📍 **Distance-Based Sorting** — Haversine formula calculates distance between user and each school
- 🏫 **School Registry** — Add schools with name, address, latitude, longitude
- ✅ **Server-Side Validation** — Full input validation with clear error messages
- 📡 **RESTful API** — Clean MVC architecture with centralized error handling
- 🎯 **GPS Auto-Detect** — Browser Geolocation API for one-click location
- 🔍 **Search Filter** — Filter schools by name or address client-side
- 💀 **Skeleton Loaders** — Polished loading states
- 🔔 **Toast Notifications** — Success and error feedback
- 🌑 **Dark UI** — Modern dark-themed Tailwind CSS design

---

## 🛠 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Backend    | Node.js, Express.js               |
| Database   | MySQL (via mysql2)                |
| Frontend   | React 18, React Router v6        |
| Styling    | Tailwind CSS                      |
| HTTP Client| Axios                             |
| Dev Tools  | Vite, nodemon, dotenv, cors       |

---

## 📁 Project Structure

```
school-management/
├── backend/
│   ├── config/
│   │   └── db.js                  # MySQL connection pool
│   ├── controllers/
│   │   └── schoolController.js    # Business logic
│   ├── middleware/
│   │   ├── validate.js            # Input validation
│   │   └── errorHandler.js        # Global error handler
│   ├── routes/
│   │   └── schoolRoutes.js        # API route definitions
│   ├── utils/
│   │   └── distanceCalculator.js  # Haversine formula
│   ├── app.js                     # Express setup
│   ├── server.js                  # Entry point
│   ├── schema.sql                 # Database schema
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── SchoolCard.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AddSchoolPage.jsx
│   │   │   └── ListSchoolsPage.jsx
│   │   ├── services/
│   │   │   └── api.js             # Axios instance + API functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
│
├── SchoolManagement.postman_collection.json
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
DB_PORT=3306

CORS_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🗄️ Database Setup

1. Open your MySQL client (MySQL Workbench, TablePlus, or CLI).
2. Run the schema file:

```sql
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id         INT          NOT NULL AUTO_INCREMENT,
  name       VARCHAR(255) NOT NULL,
  address    VARCHAR(500) NOT NULL,
  latitude   FLOAT        NOT NULL,
  longitude  FLOAT        NOT NULL,
  created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
```

Or run the provided file:
```bash
mysql -u root -p < backend/schema.sql
```

---

## 🚀 Installation & Running Locally

### Prerequisites
- Node.js 18+
- MySQL 8+
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/Ayushpandey2026/SchoolMap
cd schoolMap
```

### 2. Backend Setup

```bash
cd backend
npm install

cp .env.example .env
# Edit .env with your MySQL credentials

npm run dev   # development (nodemon)
# or
npm start     # production
```

Backend runs on: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install

cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:5000

npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📡 API Endpoints

### `POST /addSchool`

Add a new school.

**Request Body:**
```json
{
  "name": "Central Academy",
  "address": "Civil Lines, Prayagraj, UP",
  "latitude": 25.4358,
  "longitude": 81.8463
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "School added successfully",
  "data": { "id": 1, "name": "...", ... }
}
```

---

### `GET /listSchools?latitude=25.4358&longitude=81.8463`

Fetch all schools sorted by distance from user's coordinates.

**Query Params:**
| Param     | Type   | Required | Description       |
|-----------|--------|----------|-------------------|
| latitude  | float  | ✅       | User's latitude   |
| longitude | float  | ✅       | User's longitude  |

**Success Response (200):**
```json
{
  "success": true,
  "message": "Schools fetched successfully",
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Central Academy",
      "address": "Civil Lines, Prayagraj, UP",
      "latitude": 25.4358,
      "longitude": 81.8463,
      "distance": 0
    }
  ]
}
```

---

## 🌐 Deployment

### Backend → Render

1. Push backend to GitHub
2. Create a new **Web Service** on [render.com](https://render.com)
3. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add all environment variables in Render dashboard
5. Set `NODE_ENV=production`

### Frontend → Vercel

1. Push frontend to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Set **Framework Preset** to `Vite`
4. Add `VITE_API_BASE_URL=https://your-render-backend.onrender.com`
5. Deploy

### Database → Railway or PlanetScale or Aiven

**Railway:**
1. Create new project → Add MySQL service
2. Copy connection credentials to Render environment variables

**PlanetScale:**
1. Create database
2. Create a branch, get connection string
3. Use `DB_HOST`, `DB_USER`, `DB_PASSWORD` from PlanetScale dashboard

---

## 🧪 Testing with Postman

Import `SchoolManagement.postman_collection.json` into Postman.

Set the `base_url` collection variable to `http://localhost:5000`.

---

## 📐 Distance Algorithm

The **Haversine Formula** calculates great-circle distance between two points on a sphere given their longitudes and latitudes:

```
a = sin²(Δlat/2) + cos(lat1) · cos(lat2) · sin²(Δlon/2)
c = 2 · atan2(√a, √(1−a))
d = R · c
```

Where `R = 6371 km` (Earth's radius).


---

## 📜 License

MIT — free to use, modify, and distribute.
