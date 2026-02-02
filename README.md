# Lottery Game – Vue 3 Application

A small lottery game built with Vue 3 where registered users can place bets, participate in a live draw, and track winnings in real time.

---

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**
- **Pinia** – state management
- **Vue Router** – navigation & route guards
- **Naive UI** – UI component library
- **Supabase** – authentication & database

---

## Authentication

Authentication is handled using **Supabase Email/Password Auth**.

### Features

- User registration with email & password
- User sign-in with client-side validation
- Protected routes (only authenticated users can access the app)
- Logout functionality
- Error handling and success messages

---

## Application Pages

### Sign In

- Centered sign-in form
- Email & password validation
- “Register now” option
- On success → redirect to Home
- On failure → error message displayed

### Register

- Centered registration form
- Email & password validation
- On success → redirect to Sign In with success message
- On failure → error message displayed

---

## Home Page

- Board of **30 numbers (1–30)**
- Player selects **exactly 5 numbers**
- Submit button enabled **only when 5 numbers are selected**
- On submit → redirect to Draw Page

---

## Draw Page

> Access is allowed **only after submitting a bet**.

### Draw Process

- Draw starts **3 seconds** after entering the page
- **5 random numbers** are drawn (range 1–30)
- Matching numbers are highlighted in real time

### Winning Rules

| Matching Numbers | Prize |
| ---------------- | ----- |
| 3 numbers        | 5 €   |
| 4 numbers        | 10 €  |
| 5 numbers        | 20 €  |

- Winnings update live during the draw
- A bet with **3 or more matches** is considered a winning bet

---

## Draw Completion Modal

Displayed after the draw ends:

- Result message
- Total amount won
- **Save to History** button
- **Go Back** button

### Save to History

Stores the following in Supabase:

- Timestamp
- Drawn numbers
- Player bet
- Total amount won

After saving → redirect to Home to start a new game

### Go Back

- Redirects to Home without saving

---

## 🔽 Clone & Run Locally

> **Note:** This project requires **Node.js v18 or higher**.  
> You can manage Node versions with [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 18
nvm use 18
```

### 1. Clone the repository

```bash
git clone https://github.com/ariadiam/lottery-app.git
cd lottery-app
```

### 2. Install dependencies

```bash
npm install
```

## Supabase Setup

This project uses Supabase for authentication and data persistence.

### 3. Create a Supabase project

Go to [Supabase](https://supabase.com) and create a new project.
Copy the Project URL and Publishable Key.

### 4. Configure environment variables

Create a `.env` file in the project root using `.env.example` as reference:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### 5. Enable Email/Password authentication

In the Supabase Dashboard:

- Navigate to **Authentication → Providers**
- Enable **Email**

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

The app will be available at:

http://localhost:5173

## Build for Production

```bash
npm run build
```

## Run Unit Tests

```bash
npm run test:unit
```

## Lint the Project

```bash
npm run lint
```
