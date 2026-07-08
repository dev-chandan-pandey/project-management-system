# Client

This is a minimal Next.js frontend that connects to the server backend in this repository.

How to run:

1. cd client
2. npm install
3. Set environment variable if needed: export NEXT_PUBLIC_API_URL="http://localhost:5000"
4. npm run dev

What I added in branch `add-client-frontend`:

- Basic Next.js pages (pages/index.tsx, pages/_app.tsx)
- TypeScript config and next-env.d.ts
- Simple API client (utils/api.ts)
- Basic layout component and Tailwind globals

Next steps I can take (ask me to):
- Wire authentication and forms to match the server endpoints
- Implement full CRUD for projects, tasks, users
- Add React Query and optimistic updates
- Add Socket.IO client integration for real-time updates
