# 🕵️‍♂️ The Data Heist: Operation Payload

Welcome to **The Data Heist**, an interactive educational challenge designed to demonstrate the real-world differences, trade-offs, and performance metrics between REST APIs and GraphQL. 

This project drops developers into a high-stakes, hands-on race to extract specific intelligence from two different data vaults. By forcing participants to experience the friction of legacy data extraction before handing them a modern tool, the concepts of **over-fetching**, **under-fetching**, and the **N+1 problem** will click immediately.

## 🚀 Getting Started

First, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to enter the Challenge Portal.

## 🎯 The Challenge Structure

Participants will navigate through a linear progression system. They will be scored on **speed**, **efficiency** (fewest network requests), and **payload size**. 

### Vault Alpha (REST Challenge)
*The Struggle.* Participants must infiltrate legacy infrastructure using standard RESTful conventions at the `/api/rest` base path. They will experience the N+1 problem firsthand as they piece together fragmented intelligence across multiple API calls.

### Vault Beta (GraphQL Challenge)
*The Solution.* Participants will query the quantum infrastructure at the `/api/graphql` endpoint. They must dictate the exact shape of the response they need and extract their target data in exactly **one** network request.

### The Leaderboard
The application automatically tracks and calculates the network footprint of the operative's extraction strategy (total requests made, time elapsed, and total kilobytes downloaded) and ranks them upon successful completion of the heist.

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **API (REST):** Next.js Route Handlers
- **API (GraphQL):** GraphQL Yoga
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS

## 📝 Note for Facilitators

If you are setting this up for the first time, ensure your Supabase database is properly seeded with the provided `schema.sql` and `seed.sql` files. Additionally, verify that you have executed the Leaderboard table migration script in your Supabase SQL editor so that user scores save correctly.

*Note: The target intelligence details and extraction queries are deliberately omitted from this document to prevent spoilers for participants!*
