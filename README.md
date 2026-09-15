# Vatsalya — Animal Welfare Network

Lifecycle: Report → Rescue → Animal → Medical → Shelter → Adoption Ready → Application → Approval → Adopted → Follow-up

## Run locally

### Backend
```bash
cd ~/vatsalya/backend
export DB_URL="jdbc:postgresql://localhost:5432/vatsalya_db"
export DB_USERNAME="postgres"
read -s "DB_PASSWORD?Enter your PostgreSQL password: "
echo
export DB_PASSWORD="$DB_PASSWORD"
mvn clean spring-boot:run
```

Backend health: http://localhost:8080/api/health

### Frontend
```bash
cd ~/vatsalya/frontend
npm install
npm run dev
```

Frontend: http://localhost:5173

## Roles

CITIZEN → /citizen  
ADOPTER → /adopter  
RESCUER → /dashboard  
VETERINARIAN → /medical  
SHELTER → /shelter  
ADMIN → /admin

## Notes

- New registrations use BCrypt hashing.
- Existing legacy plain-text passwords are migrated on successful login.
- Adoption completion automatically marks the animal ADOPTED, releases shelter capacity when applicable, and creates a 30-day follow-up.
- Demo shelters and animals are seeded by `DataInitializer` when their demo records do not already exist.
- Database credentials are intentionally supplied through environment variables instead of committed to source.
