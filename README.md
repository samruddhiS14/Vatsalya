# Vatsalya — Animal Welfare Network

> **Every life deserves a second chance.**

Vatsalya is a digital animal-welfare platform that connects the complete journey of an animal in one place, bringing citizens, rescuers, veterinarians, shelters, adopters, and administrators onto a single, transparent platform.

The goal is simple:
* Report a life in need.
* Connect the people who can help.
* Follow that life all the way to a safe home.

---
## 🚀 Live Demo
* **Frontend (Vercel):** [https://vatsalya-h2fe0c759-samruddhi-sunil-shinde-s-projects.vercel.app](https://vatsalya-h2fe0c759-samruddhi-sunil-shinde-s-projects.vercel.app)

## What Makes Vatsalya Different?

Instead of isolated modules, Vatsalya connects every major stage through **one connected lifecycle**:

**Citizen Report → Rescue → Animal Record → Medical Care → Shelter → Adoption Ready → Application → Approval → Adopted → Follow-up**

This means an animal's information does not get lost when it moves from one department to another.

### Automatic Lifecycle Updates

Important actions automatically update related information. For example:

* **Complete Adoption**
  ↓
* **Animal → ADOPTED**
  ↓
* **Shelter Capacity Updated**
  ↓
* **Follow-up Created**

---

## Role-Based Workspaces

Different users get different dashboards based on their responsibilities:

| Role | Responsibility | Dashboard Route |
| :--- | :--- | :--- |
| **CITIZEN** | Report animals and track cases | `/citizen` |
| **ADOPTER** | Browse and apply for animals | `/adopter` |
| **RESCUER** | Manage rescue cases | `/dashboard` |
| **VETERINARIAN** | Manage medical care | `/medical` |
| **SHELTER** | Manage animals, capacity, and adoption | `/shelter` |
| **ADMIN** | Monitor the overall system | `/admin` |

---

## Complete Animal Lifecycle

```text
┌───────────────┐
│    REPORT     │
└───────┬───────┘
        ↓
┌───────────────┐
│    RESCUE     │
└───────┬───────┘
        ↓
┌───────────────┐
│ ANIMAL RECORD │
└───────┬───────┘
        ↓
┌───────────────┐
│    MEDICAL    │
└───────┬───────┘
        ↓
┌───────────────┐
│    SHELTER    │
└───────┬───────┘
        ↓
┌───────────────┐
│ ADOPTION READY│
└───────┬───────┘
        ↓
┌───────────────┐
│  APPLICATION  │
└───────┬───────┘
        ↓
┌───────────────┐
│   APPROVAL    │
└───────┬───────┘
        ↓
┌───────────────┐
│    ADOPTED    │
└───────┬───────┘
        ↓
┌───────────────┐
│   FOLLOW-UP   │
└───────────────┘
```

---

## Current Modules

* Landing Page
* Authentication
* Citizen Reporting
* Rescue Management
* Animal Management
* Veterinary Management
* Shelter Management
* Adoption Workflow
* Follow-up Workflow
* Admin Dashboard
* Role-Based Dashboards
* PostgreSQL Integration
* Responsive UI
* Vatsalya Branding & Logo

---

## Technology Stack

* **Frontend**
  * React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide React, Recharts, React Leaflet / Leaflet, Swiper
* **Backend**
  * Java 17, Spring Boot 3.3, Spring Web, Spring Data JPA, Hibernate, Maven
* **Database**
  * PostgreSQL
* **Security**
  * BCrypt password hashing, Role-based access control, Environment-based database credentials

---

## Project Structure

```text
vatsalya/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── backend/
    ├── src/
    └── pom.xml
```

---

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/samruddhiS14/Vatsalya.git
cd Vatsalya
```

### 2. Start PostgreSQL

Create a database named:

```sql
vatsalya_db
```

### 3. Start the Backend

```bash
cd backend
export DB_URL="jdbc:postgresql://localhost:5432/vatsalya_db"
export DB_USERNAME="postgres"
read -s -p "Enter your PostgreSQL password: " DB_PASSWORD
echo
export DB_PASSWORD="$DB_PASSWORD"

mvn clean spring-boot:run
```

* **Backend URL:** `http://localhost:8080`
* **Health Check:** `http://localhost:8080/api/health`

### 4. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

* **Frontend URL:** `http://localhost:5173`

---

## Security Notes

* New user passwords are securely stored using **BCrypt hashing**.
* Database credentials are supplied through environment variables instead of being hardcoded in source code.
* Role-based access control is strictly enforced across application dashboards.
* Never commit real database passwords, API keys, or other secrets to GitHub.

---

## Vision

Vatsalya aims to make animal welfare more connected, transparent, and easier to manage by bringing citizens, rescuers, veterinarians, shelters, adopters, and administrators onto one platform.

---

Built with care by the Vatsalya Team
*Vatsalya — Every life deserves a second chance.*
