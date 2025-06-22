# TNP Project – Admin Panel with Share Token Generator

#LIVE DEMO (http://tnpproject.vercel.app)

This is a React + Vite web application designed to support authenticated admin users in generating secure, shareable links for recruitment use. It integrates with a backend API and supports token-based access sharing.

##  Features

- Modern UI with Tailwind CSS styling
-  JWT-based authentication flow
-  Automatic token refreshing via `refreshToken()`
-  Share link generation via backend API
-  Dynamic display of candidate data in a styled table
-  Deployed with Vercel

##  Project Structure

- src/ ---Component/ ---AdminPanel /---Login /---PublicShare

--src/-- Pages/ ---AdminPanelPage /---LoginPage /---PublicSharePage

--src/-- utils/---refreshToken



##  Tech Stack

- **Frontend**: React, Tailwind CSS, React Router DOM, Vite
- **Backend**: Express.js (separate repo or hosted API)
- **Auth**: Bearer token with refresh token fallback
- **Hosting**: Vercel (frontend), Render/other (backend)