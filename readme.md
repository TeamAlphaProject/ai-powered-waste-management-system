# Waste Management System - Frontend Routes

All routes supported by the frontend application:

## Citizen Routes
- `/` - Splash Screen (Auto-redirects to login)
- `/login` - Citizen Login Page
- `/registration` - New Citizen Registration
- `/dashboard` - User Dashboard (Summary of reports)
- `/report` - Report a New Waste Issue
- `/history` - View Complaint History
- `/profile` - User Profile & Settings
- `/complaint/:complaintId` - Detailed view of a specific complaint

## Admin / Officer Routes
- `/admin/login` - Admin Login Page
- `/admin/dashboard` - Admin Overview Dashboard
- `/admin/issues` - List of all issues (Level 1 by default)
- `/admin/issues/:level` - Filtered list (L1, L2, L3)
- `/admin/issue/:complaintId` - Admin view for managing specific complaints

## Implementation Details
- **Routing Engine**: `react-router-dom`
- **Main Entry**: `src/routes/AppRoutes.jsx`
- **Container**: Mobile-responsive layout defined in `App.jsx`


 { path: '/custom/path/.env' }
MongoDB Connected for seeding...
Officer account created successfully:
Email: officer@city.gov
Password: officerpassword123
