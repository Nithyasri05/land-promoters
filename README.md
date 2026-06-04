# Land Promoters — Project

This repository contains a Node.js/Express backend and a React + Vite frontend.

## Admin setup

1. Add environment variables in `backend/config/config.env` (do NOT commit secrets):

```
DB_LOCAL_PORT=<your mongo uri>
NET_TOKEN=<jwt secret>
MAIL_USER=<smtp user>
MAIL_PASS=<smtp password>
ADMIN_EMAIL=admin@landpromoters.local
ADMIN_PASS=ChangeMe123!
ADMIN_ALLOW_REGISTRATION=false
```

2. Seed initial admin (from project root):

```powershell
cd "d:\Project land promoters"
node backend/utils/createAdmin.js
```

3. Start backend and frontend:

```powershell
# in project root (backend server script may be defined in package.json)
npm run server
# in Frontend
cd Frontend
npm install
npm run start
```

## Admin UI

- Visit `/admin` to login.
- After login you will be redirected to `/admin/dashboard` where you can:
  - See messages submitted through contact form
  - View message details, mark read/unread
  - Delete messages
  - Reply to a message by sending an email
  - Change admin password (available in the dashboard actions)

## Security notes

- Keep `backend/config/config.env` out of source control. Remove any committed secrets and rotate them.
- Use a strong `NET_TOKEN` JWT secret.
- Use an app-specific SMTP password (e.g., Gmail app password) for `MAIL_PASS`.
- Set `ADMIN_ALLOW_REGISTRATION=false` in production to prevent open registration.

## API (admin)

- POST `/api/landpromoters/admin/login` — { email, password } → { token }
- POST `/api/landpromoters/admin/register` — create admin (requires admin token unless `ADMIN_ALLOW_REGISTRATION=true`)
- POST `/api/landpromoters/admin/change-password` — (auth) { currentPassword, newPassword }
- GET `/api/landpromoters/admin/messages` — (auth) list
- GET `/api/landpromoters/admin/messages/:id` — (auth) detail
- PATCH `/api/landpromoters/admin/messages/:id` — (auth) { read: true }
- DELETE `/api/landpromoters/admin/messages/:id` — (auth)
- POST `/api/landpromoters/admin/messages/:id/reply` — (auth) { replyBody, replySubject? }


If you want, I can:
- Add a small admin link in the site navbar
- Add better routing with `react-router`
- Add change-password and register forms to the dashboard UI

*** End of README.md"}