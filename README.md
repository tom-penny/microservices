# Microservice Polyglot

## System Architecture

![System_Architecture](https://github.com/user-attachments/assets/76592818-fad1-4a88-a832-0aca86e34c62)

## Key Features

- **Event-Driven Architecture** - Leverages domain and integration events to decouple service interactions and factiliate asynchronous communication.
- **Order Saga Management** - Leverages event choreography to facilitate long-lived order transactions and workflows, ensuring data consistency and integrity across service boundaries.
- **Polyglot Persistence** - Leverages custom database solutions for individual services, prioritising consistency, availability, and/or partition tolerance based on use case requirements.
- **Authentication & Authorisation** - Integrates Firebase Auth with JSON Web Tokens (JWT) for secure authentication and fine-grained authorisation controls.
- **Unit & Integration Testing** - Includes automated testing suites for individual services using Jest, Mocha, and xUnit.

## Project Structure

- `Client` - Frontend ecommerce store built with React.
- `Services.Basket` - Basket API built with NodeJS and Redis.
- `Services.Gateway` - API gateway built with TypeScript and Firebase Auth.
- `Services.Identity` - Identity API built with Node.js, Firestore, and Firebase Auth.
- `Services.Order` - Order API built with .NET Core, Entity Framework, and PostgreSQL.
- `Services.Product` - Product API built with Node.js, Mongoose, and MongoDB.
