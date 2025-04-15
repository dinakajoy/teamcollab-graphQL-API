# TeamCollab – GraphQL API

**TeamCollab** is a collaborative project and task management API built with **Node.js**, **TypeScript**, **GraphQL**, **MongoDB**, and **DataLoader**. It supports scalable team structures, project tracking, and efficient task management using modern best practices.

## Features

### User Authentication (JWT-based)

- Sign up, login, password reset and logout
- Role-Based Access Control (admin, manager, member)

### Teams & Members Management

- Create teams
- Assign multiple users to one or more teams
- Efficiently fetch user’s teams and team members with DataLoader

### Project & Task Management

- Create projects and assign them to multiple teams
- Create tasks under specific projects
- Assign tasks to a project

### Developer Friendly

- Built with `TypeScript` and `Apollo Server`
- Modular and layered architecture (Resolvers, Controllers, Services)
- Efficient batching and caching using `DataLoader`
- Clean error handling with custom exception classes
- Middleware for authentication and rate-limiting
- CORS setup for frontend integration
- Security with GraphQL Shield
- Performance Monitoring using Prometheus & Grafana

## Tech Stack

- Node.js - Server runtime
- Express.js → Server framework (Middleware and HTTP server)
- TypeScript → Type safety & maintainability
- Mongoose → Database management (MongoDB)
- Apollo Server → GraphQL API server
- GraphQL Shield + JWT → Authentication & Authorization
- Dataloader + Redis → Caching & query optimization
- Prometheus + Grafana → Performance monitoring

## Installation

```bash
git clone https://github.com/dinakajoy/team-collab-graphql-api.git
cd team-collab-graphql-api
npm install
```

## Environment Variables

Create a `.env` file with the following:

```env
PORT=4000
HOST=http://localhost
SALTWORKFACTOR=
DATABASE_URL=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=
```

## Running the Server

```bash
npm start
```

GraphQL Playground: [http://localhost:4000/graphql](http://localhost:4000/graphql)

---

## Sample Queries

```graphql
# Get all users
query {
  users {
    name
    email
    teams {
      name
    }
  }
}
```

```graphql
# Get team details
query {
  team(teamId: "team_id") {
    name
    members {
      name
    }
  }
}
```

## Security

- JWT-based access control
- Refresh token flow for session persistence
- Rate limiting to prevent abuse
- CORS policy for frontend apps
