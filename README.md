# Hometown Hub — Digital Community Platform

> Connect with people from your city, village, or hometown. Share updates, organize events, and keep your local culture alive — online.

---

## What is this?

Most social media platforms are built for the world. Hometown Hub is built for your street, your village, your neighbourhood.

People move away from their hometowns for work or education, and slowly lose touch with where they came from. Existing platforms are too broad — your hometown news drowns in a feed of global content. WhatsApp groups are scattered and unstructured. There's no single place to find local events, announcements, or familiar faces.

Hometown Hub fixes that. It's a focused, community-first platform where people from the same city or village can:

- **Connect** with others who share the same hometown
- **Stay informed** through a local community feed
- **Organise and discover** events happening nearby
- **Preserve** local culture, traditions, and stories

Think of it as a town square — but digital, always open, and accessible from anywhere in the world.

---

## Why use this?

| Problem today | How Hometown Hub solves it |
|---|---|
| Hometown news is lost in global feeds | Dedicated feed per community — only local content |
| WhatsApp groups are chaotic and unstructured | Structured posts, announcements, and threads |
| No central place for local events | Built-in event creation and RSVP |
| Hard to reconnect with people from home | Search and join communities by city or village |
| Local culture gets forgotten | Profiles with hometown details, community archives |

---

## Tech Stack

This project is built on the **MERN** stack with modern tooling for type safety, fast UI development, and great developer experience.

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | React + TypeScript | Component-driven UI with full type safety |
| **Styling** | Tailwind CSS | Utility-first, consistent design without writing custom CSS |
| **Data fetching** | TanStack Query | Server state management, caching, and background sync out of the box |
| **Backend** | Node.js + Express + TypeScript | Familiar JS ecosystem, typed APIs, easy REST route handling |
| **Database** | MongoDB + Mongoose | Flexible document model suits community posts, events, and nested data |

### Why this stack specifically?

**TypeScript across the full stack** means one language, shared types, and bugs caught at compile time rather than in production. No more `undefined is not a function` surprises.

**TanStack Query** replaces `useEffect` + manual loading states with a clean, declarative data layer. Pagination, caching, refetching, and optimistic updates are built in — critical for a real-time community feed.

**Tailwind CSS** lets you build and iterate on UI fast without context-switching between JSX and CSS files. The utility classes make the design consistent by default.

**MongoDB** fits this project naturally — posts have different shapes (text, image, announcement), communities have dynamic member lists, and event schemas vary. A document database handles this better than rigid SQL tables.

---

## Features

### For community members
- Register and log in securely
- Create or join communities by city / village
- Post text and images to the community feed
- Like, comment, and share posts
- Create and RSVP to local events
- Receive notifications for activity in your communities
- Personalised profile with hometown details

### For community moderators
- Pin announcements to the top of the feed
- Moderate posts and manage members
- Onboarding flow to set up a new community in minutes

### For admins
- Dashboard with platform-wide KPIs (registered users, active communities, DAU, engagement rate)
- User and community management
- Content moderation queue

---

## Project Structure

```
hometown-hub/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route-level page components
│   │   ├── hooks/           # TanStack Query hooks
│   │   ├── types/           # Shared TypeScript types
│   │   └── lib/             # Axios instance, utils
│   └── tailwind.config.ts
│
├── server/                  # Express backend
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # Mongoose schemas
│   │   ├── middleware/       # Auth, error handling
│   │   └── types/           # Shared TypeScript types
│   └── tsconfig.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hometown-hub.git
cd hometown-hub

# Install server dependencies
cd server && npm install

# Install client dependencies
cd ../client && npm install
```

### Environment Variables

Create a `.env` file in `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in `/client`:

```env
VITE_API_URL=http://localhost:5000/api
```

### Run locally

```bash
# Start the backend (from /server)
npm run dev

# Start the frontend (from /client)
npm run dev
```

Frontend runs on `http://localhost:5173` · API runs on `http://localhost:5000`

---

## Core Data Models

| Entity | Key fields |
|---|---|
| `User` | name, email, password, hometown, avatar |
| `Community` | name, city/village, description, memberCount, createdBy |
| `Post` | content, images, type (post/announcement), community, author |
| `Event` | title, date, location, community, attendees |
| `Comment` | content, post, author |
| `Notification` | user, type, reference, read |

---

## Deliverables

- [x] Functional web application
- [x] Admin dashboard
- [x] Pandit (community leader) onboarding module
- [x] PRD and technical documentation
- [x] Deployment-ready build

---

## Future Enhancements

- Mobile application (React Native)
- Local marketplace and classifieds
- Emergency alerts and announcements
- Multi-language support
- Integration with local government updates

---

## Internship Context

This project was built as part of an internship assignment. The goal was to design and deliver a full-stack community platform from requirements to deployment — covering database design, REST API development, React UI, and admin tooling.

---

## License

MIT