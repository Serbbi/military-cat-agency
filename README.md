# Military Cat Agency

Internet is ruled by cats. So is this agency and so is this repo. Have a problem? Talk to the paw...

---

## Prerequisites
- Node.js (v18 or newer recommended)
- npm (comes with Node.js)

---

## 1. Clone the Repository
```sh
git clone <repo-url>
cd military-cat-agency
```

---

## 2. Install Dependencies
### Backend
```sh
cd mca-backend
npm install
```
### Frontend
```sh
cd ../mca-frontend
npm install
```

---

## 3. Database Setup
- The backend uses SQLite. The database file is `mca.db` in the project root.
- Migrations will run automatically if needed.

---

## 4. Running the App
### Start the Backend
```sh
cd mca-backend
npm run dev
```
- The backend will start on a random port (e.g., `http://localhost:63078`).
- Note the port number printed in the terminal.

### Start the Frontend
```sh
cd ../mca-frontend
npm run dev
```
- The frontend will start on `http://localhost:5173` by default.

---

## 5. Project Structure
```
military-cat-agency/
  ├── mca-backend/      # AdonisJS backend (API, auth, SQLite)
  ├── mca-frontend/     # React + Vite frontend (UI)
  └── mca.db            # SQLite database file
```