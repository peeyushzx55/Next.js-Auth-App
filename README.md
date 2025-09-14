# Full Stack User Authentication App

A modern, secure user authentication application built with Next.js 15, featuring email verification, JWT-based authentication, and MongoDB integration.

## Features

- 🔐 Secure user authentication
- ✉️ Email verification system
- 🎯 JWT (JSON Web Token) based authorization
- 👤 User profile management
- 🔒 Password hashing with bcrypt
- 🎨 Responsive UI with Tailwind CSS
- 📱 TypeScript support for better type safety

## Tech Stack

- **Frontend:**

  - Next.js 15.5.2
  - React 19.1.0
  - TypeScript
  - Tailwind CSS
  - React Hot Toast for notifications

- **Backend:**
  - Next.js API Routes
  - MongoDB with Mongoose
  - JWT for authentication
  - Nodemailer for email services
  - Bcrypt for password hashing

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- MongoDB (Local installation or MongoDB Atlas account)
- Git

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/peeyushzx55/Next.js-Auth-App.git
   cd full-stack-user-auth-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_HOST=your_email_smtp_host
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
src/
├── app/               # Next.js app directory
│   ├── api/          # API routes
│   ├── login/        # Login page
│   ├── profile/      # User profile pages
│   └── signup/       # Signup page
├── db/               # Database configuration
├── helpers/          # Helper utilities
├── models/           # MongoDB models
└── templates/        # Email templates
```

## Development Features

- **Turbopack Integration:** Utilizing Next.js with Turbopack for faster development experience
- **ESLint Configuration:** Comprehensive linting setup for code quality
- **TypeScript Support:** Full type checking and IntelliSense support
- **Hot Reload:** Automatic page updates during development

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [MongoDB](https://www.mongodb.com/) - The database for modern applications
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
