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
- The backend will start on port `http://localhost:53422`

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

# Docker Compose Development

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)
- [Docker Engine](https://docs.docker.com/engine/install/) (Linux)

## Quick Start

1. Clone the repository:
   ```sh
   git clone https://github.com/your-org/military-cat-agency.git
   cd military-cat-agency
   ```
2. Start the app with Docker Compose:
   ```sh
   docker-compose up --build
   ```
   - The backend will be available at [http://localhost:53422](http://localhost:53422)
   - The frontend will be available at [http://localhost:5173](http://localhost:5173)

3. The backend `.env` file will be auto-generated from `.env.example` if missing.

4. Code changes will hot-reload in both frontend and backend containers.

## Customization
- To change the backend port, edit `mca-backend/.env.example` and update `docker-compose.yml` accordingly.
- To point the frontend to a different backend, set `VITE_API_URL` in `docker-compose.yml` under the `frontend` service.

## Stopping
```sh
docker-compose down
```