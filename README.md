# TeamCollab API

A GraphQL API for managing teams, projects, and tasks within an organization.

## This project will showcase expertise in GraphQL API development using:

- Express.js → Server framework
- TypeScript → Type safety & maintainability
- Mongoose → Database management (MongoDB)
- Apollo Server → GraphQL API server
- GraphQL Shield + JWT → Authentication & Authorization
- Dataloader + Redis → Caching & query optimization
- Prometheus + Grafana → Performance monitoring

## Project Features

1. User Authentication (JWT-based) ✅
- Sign up, login, password reset and logout
- Role-Based Access Control (admin, manager, member)

2. Teams & Members Management ✅
- Create teams
- Assign members to teams
- Fetch team details efficiently (Dataloader)

3. Project & Task Management
- Create projects
- Assign team members to projects
- Create tasks under projects

4. Optimized Queries with Dataloader + Redis
- Prevent duplicate DB calls for fetching team members
- Cache frequently accessed data in Redis

5. Security with GraphQL Shield ✅
- Protect sensitive queries & mutations based on roles

6. Performance Monitoring
- Track API performance using Prometheus & Grafana
