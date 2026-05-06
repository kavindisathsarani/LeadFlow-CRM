# LeadFlow CRM - Full Stack Lead Management

## Project Structure

```
LeadFlow-CRM/
  client/
    src/
      components/
      hooks/
      pages/
      services/
  server/
    config/
    controllers/
    middleware/
    models/
    routes/
```

## Backend Setup

1. Open terminal:
   - `cd server`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - copy `.env.example` to `.env`
4. Update `.env` values:
   - `PORT=5000`
   - `MONGO_URI=mongodb://127.0.0.1:27017/leadflow_crm`
   - `JWT_SECRET=your_strong_secret`
5. Start server:
   - `npm run dev`

Backend base URL: `http://localhost:5000/api`

## Frontend Setup

1. Open terminal:
   - `cd client`
2. Install dependencies:
   - `npm install`
3. Create env file:
   - copy `.env.example` to `.env`
4. Verify env:
   - `VITE_API_BASE_URL=http://localhost:5000/api`
5. Start app:
   - `npm run dev`

Frontend URL: `http://localhost:5173`

## Test Login

- Email: `admin@example.com`
- Password: `password123`

## API Endpoints

### Auth
- `POST /api/auth/login`

### Leads
- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PUT /api/leads/:id`
- `DELETE /api/leads/:id`

### Notes
- `POST /api/notes`
- `GET /api/notes/:leadId`

### Dashboard
- `GET /api/dashboard`

## Sample API Responses

### Login success
```json
{
  "success": true,
  "token": "jwt.token.here",
  "user": {
    "id": "1",
    "email": "admin@example.com",
    "name": "CRM Admin"
  }
}
```

### Leads list
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "681a4f232a5f9d1234abcd98",
      "name": "John Doe",
      "company": "Acme Inc",
      "email": "john@acme.com",
      "phone": "+1 222 333 4444",
      "source": "LinkedIn",
      "salesperson": "Jane Smith",
      "status": "Qualified",
      "dealValue": 15000,
      "createdAt": "2026-05-06T10:11:12.000Z",
      "updatedAt": "2026-05-06T10:11:12.000Z"
    }
  ]
}
```

### Dashboard
```json
{
  "success": true,
  "data": {
    "totalLeads": 12,
    "newLeads": 3,
    "qualifiedLeads": 4,
    "wonLeads": 2,
    "lostLeads": 1,
    "totalDealValue": 120000,
    "totalWonValue": 45000
  }
}
```
