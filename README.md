# Vatsalya — Animal Welfare Network

> **Every life deserves a second chance.**

Vatsalya is a digital animal-welfare platform that connects the complete journey of an animal in one place.

Instead of keeping rescue, medical care, shelter management, adoption, and follow-up as separate processes, Vatsalya connects them into one continuous lifecycle:

**Report → Rescue → Animal → Medical → Shelter → Adoption Ready → Application → Approval → Adopted → Follow-up**

---

## Why Vatsalya?

Animal-welfare work is often spread across different people, organizations, messages, and records. This can make it difficult to know what happened to an animal after it was reported.

Vatsalya solves this by giving every animal a connected digital journey.

A citizen can report an animal in need, a rescue team can respond, a veterinarian can record treatment, a shelter can manage care and capacity, and an adopter can apply for an animal that is ready for a home.

The journey continues even after adoption through follow-up care.

---

## Key Features

### Animal Reporting
Citizens can report animals in need using:

- Animal photo
- Description
- Urgency level
- Location

Reports are stored as rescue cases and can be tracked through the system.

### Rescue Management
Rescue teams receive incoming cases and manage their progress:

```text
Pending → Dispatched → Rescued → Closed
# Vatsalya — Every life deserves a second chance

Vatsalya aims to make animal welfare more connected, transparent, and easier to manage by bringing citizens, rescuers, veterinarians, shelters, adopters, and administrators onto one platform.

The goal is simple:
* Report a life in need.
* Connect the people who can help.
* Follow that life all the way to a safe home.

---
**
##  What Makes Vatsalya Different?**

Instead of isolated modules, Vatsalya connects every major stage through **one connected lifecycle**:

Citizen Report → Rescue → Animal Record → Medical Care → Shelter → Adoption Ready → Application → Approval → Adopted → Follow-up

This means an animal's information does not get lost when it moves from one department to another.

### ⚡ Automatic Lifecycle Updates
Important actions automatically update related information. For example:
* **Complete Adoption**
  ↓
* **Animal → ADOPTED**
  ↓
* **Shelter Capacity Updated**
  ↓
* **Follow-up Created**

---

## 👥 Role-Based Workspaces

Different users get different dashboards based on their responsibilities:

| Role | Responsibility | Dashboard Route |
| :--- | :--- | :--- |
| **CITIZEN** | Report animals and track cases | `/citizen` |
| **ADOPTER** | Browse and apply for animals | `/adopter` |
| **RESCUER** | Manage rescue cases | `/dashboard` |
| **VETERINARIAN** | Manage medical care | `/medical` |
| **SHELTER** | Manage animals, capacity and adoption | `/shelter` |
| **ADMIN** | Monitor the overall system | `/admin` |

---

## 📊 Current Modules

* ✅ Landing Page
* ✅ Authentication
* ✅ Citizen Reporting
* ✅ Rescue Management
* ✅ Animal Management
* ✅ Veterinary Management
* ✅ Shelter Management
* ✅ Adoption Workflow
* ✅ Follow-up Workflow
* ✅ Admin Dashboard
* ✅ Role-Based Dashboards
* ✅ PostgreSQL Integration
* ✅ Responsive UI
* ✅ Vatsalya Branding & Logo

---

## 🛠️ Technology Stack

* **Frontend**
  * React, Vite, Tailwind CSS, React Router, Framer Motion, Lucide React, Recharts, React Leaflet / Leaflet, Swiper
* **Backend**
  * Java 17, Spring Boot 3.3, Spring Web, Spring Data JPA, Hibernate, Maven
* **Database**
  * PostgreSQL
* **Security**
  * BCrypt password hashing, Role-based access control, Environment-based database credentials

---

## 🏗️ Project Structure

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
