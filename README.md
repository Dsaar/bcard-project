# BCard Project

BCard is a **full-featured business card management application** built with **React**, **Material UI**, and **Node.js**.  
It allows users to create, manage, and share business cards online, with role-based access and secure authentication.  
The platform includes dedicated features for regular users, business users, and administrators.

---

## Project Contents 
```
src/
├── app/         # App entry point, layout, router, and global providers
├── shared/      # Reusable UI components, hooks, API clients, and utilities
├── features/    # Feature-based modules (cards, users, auth, about, errors)
---
```

## Functionalities

- **User Authentication** – Register, log in, and manage your profile
- **Profile Management** – Users can edit their profile details or delete their account entirely
- **Role-Based Access** – Admin, business, and regular user permissions
- **Admin CRM Access** – Admin users have access to a CRM dashboard of all registered users, with the ability to:
  - Edit any user's status (e.g., business status)
  - Delete any user account
- **Login Security** – After three failed login attempts, a user is locked out of the site for **24 hours**
- **Business Card Management**:
  - Create, edit, delete cards
  - Like/unlike cards
  - View card details
- **Favorites Page** – Easily access cards you liked
- **Search Filtering** – Search by title, subtitle, or description
- **Pagination** – Browse cards in a paginated view
- **Responsive Design** – Works across desktop and mobile
- **Dark Mode Support** – Theme-aware design
- **Snackbar Notifications** – Inform users of success/errors

---
##  Installation & Setup

###  Clone the Repository

Clone the repository from GitHub to your local machine:
```bash
git clone https://github.com/Dsaar/bcard-project.git
```
###  Navigate to the Project Folder

cd buiscard-project

###  Install Dependencies

npm install

### Configure Environment Variables
Create a .env file in the root directory and add:
```
VITE_API_BASE_URL=https://monkfish-app-z9uza.ondigitalocean.app/bcard2
```

###  Start the Development Server

npm start
