# 🐾 Vatsalya — Animal Welfare Network

> **Every life deserves a second chance.**

Vatsalya is a digital animal-welfare platform that connects the complete journey of an animal in one place.

**Report → Rescue → Animal → Medical → Shelter → Adoption Ready → Application → Approval → Adopted → Follow-up**

Instead of keeping rescue, veterinary care, shelter work, adoption and follow-up in separate places, Vatsalya keeps the journey connected.

## ✨ What Vatsalya Does

- 📍 **Report an animal** with a photo, description, urgency and location.
- 🚑 **Manage rescue cases** from triage to dispatch, rescue and closure.
- 🐕 **Create a permanent animal record** after rescue.
- 🩺 **Record medical care**, treatment and vaccination.
- 🏠 **Manage shelter intake and capacity**.
- ❤️ **List adoption-ready animals** and collect applications.
- ✅ **Review and complete adoptions** with lifecycle updates.
- 🔄 **Create post-adoption follow-ups** and collect check-ins.
- 📊 **Monitor the network** through an admin command centre.

## 💡 What Makes It Different

### One connected lifecycle

Every major stage is linked instead of being treated as a separate form.

```text
Citizen Report
      ↓
Rescue Case
      ↓
Animal Record
      ↓
Medical Care
      ↓
Shelter
      ↓
Adoption Ready
      ↓
Application
      ↓
Approval
      ↓
Adopted
      ↓
Follow-up
```

### Automatic updates

Completing an adoption automatically updates the animal to `ADOPTED`, releases shelter capacity when the animal was sheltered, and creates a follow-up scheduled 30 days later.

### Role-based workspaces

| Role | Workspace |
|---|---|
| Citizen | `/citizen` |
| Adopter | `/adopter` |
| Rescue Coordinator | `/dashboard` |
| Veterinarian | `/medical` |
| Shelter Manager | `/shelter` |
| Admin | `/admin` |

## 🛠️ Tech Stack

### Frontend
React · Vite · Tailwind CSS · React Router · Framer Motion · Lucide React · Recharts · React Leaflet · Swiper

### Backend
Java 17 · Spring Boot 3.3 · Spring Web · Spring Data JPA · Hibernate · Maven

### Database
PostgreSQL

### Security
BCrypt password hashing · protected frontend routes · environment-based database credentials

## 🏗️ Project Structure

```text
vatsalya/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    └── pom.xml
```

## 🚀 Run Locally

### 1. Clone

```bash
git clone https://github.com/samruddhiS14/Vatsalya.git
cd Vatsalya
```

### 2. Create the database

Create a PostgreSQL database named `vatsalya_db`.

### 3. Start the backend

```bash
cd backend

export DB_URL="jdbc:postgresql://localhost:5432/vatsalya_db"
export DB_USERNAME="postgres"
read -s "DB_PASSWORD?Enter your PostgreSQL password: "
echo
export DB_PASSWORD="$DB_PASSWORD"

mvn clean spring-boot:run
```

Health check:

`http://localhost:8080/api/health`

### 4. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

`http://localhost:5173`

## 🧪 Demo Lifecycle Test

Use test users for each role and run the system in this order:

```text
Citizen
  ↓ report an animal
Rescue Coordinator
  ↓ dispatch → rescued → create animal record
Veterinarian
  ↓ add treatment → mark adoption ready
Shelter Manager
  ↓ assign shelter → review application → approve → complete
Adopter
  ↓ submit adoption application → complete follow-up
Admin
  ↓ monitor the connected network
```

The application also seeds demo shelters and adoption-ready animals when their demo records are missing, so the adoption workspace can be tested without manually creating the first animals.

## 🔐 Security Notes

- New passwords are stored using BCrypt.
- Existing legacy plain-text passwords are upgraded after a successful login.
- Database credentials are supplied through environment variables.
- Frontend routes are protected by role.
- Never commit real passwords, API keys or other secrets to GitHub.

## 🎨 Branding

The Vatsalya logo is included at:

`frontend/public/vatsalya-logo.svg`

It is used across the landing page, authentication and dashboards.

## 🌱 Vision

Vatsalya is designed around a simple idea:

> **No animal report should disappear between departments.**

Connect the people who can help, keep the animal's journey visible, and continue caring even after adoption.

---

**Vatsalya — Every life deserves a second chance.**
