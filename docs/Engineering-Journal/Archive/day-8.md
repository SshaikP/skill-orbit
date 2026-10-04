
# 📅 Day 8 — Frontend Development & Full-Stack Integration

---

## 🎯 Goals

- Set up frontend environment under restricted system constraints
- Build React-based UI
- Integrate frontend with backend APIs
- Establish complete 3-tier application flow

---

## ✅ Work Completed

---

### ✅ 1. Node.js Installation Under Constraints

- Installed Node.js via corporate app center
- Faced PowerShell execution policy restrictions

---

### ✅ Workaround Applied

- Used `.cmd` executables (`npm.cmd`, `npx.cmd`)
- Avoided requiring admin privileges

---

### ✅ Verification

```bash
node -v
npm.cmd -v
npx.cmd -v
✅ 2. React Application Setup
Created frontend project:
Shellnpx.cmd create-react-app frontend``Show more lines
Started application:
Shellcd frontendnpm.cmd start``Show more lines

✅ 3. Project Structure Setup
Organized React app:
src/
├── components/
│   ├── UserForm.js
│   └── UserList.js
├── services/
│   └── api.js
└── App.js


✅ 4. API Integration
Frontend connected to backend:
JavaScriptconst BASE_URL = "http://localhost:8080/api/users";``Show more lines

✅ Implemented:

✅ Create User API call
✅ Fetch Users API call
✅ Display users dynamically


✅ 5. UI Development
✅ User Form

Email input
Username input
Password input

✅ User List

Displays:

userCode
Email
Username




✅ 6. CORS Issue Resolution (Critical)

❌ Issue:
TypeError: Failed to fetch


✅ Root Cause:

Frontend (port 3000)
Backend (port 8080)
Browser blocked cross-origin requests


✅ Fix Applied:
Java@CrossOrigin(origins = "http://localhost:3000")Show more lines

✅ Result:

✅ API calls successful
✅ Data transferred correctly
✅ UI updated dynamically


✅ 7. React Runtime Error Fix

❌ Issue:
reportWebVitals not found


✅ Fix:

Removed import from index.js
Cleaned unused files


✅ 8. End-to-End Testing

Verified:

✅ User creation from UI
✅ Data persistence in database
✅ Data displayed in UI
✅ API responses correct


🚧 Issues Faced & Troubleshooting

❌ Issue 1: Node Not Recognized
Fix:

Installed Node.js via app center


❌ Issue 2: npm Execution Error
Error:
npm.ps1 cannot be loaded

Fix:

Used npm.cmd and npx.cmd


❌ Issue 3: React Build Failure
Fix:

Removed missing imports (reportWebVitals)


❌ Issue 4: API Connectivity Failure
Error:
Failed to fetch

Fix:

Enabled CORS in backend


🧠 Key Learnings

✅ Full-Stack Development

Frontend ↔ Backend communication
API consumption in React
State management using React hooks


✅ System Constraints Handling

Working without admin privileges
Handling PowerShell execution policies
Using alternative command execution methods


✅ Debugging Skills

Identifying CORS issues
Resolving build/runtime errors
Fixing environment setup issues


✅ Architecture Understanding

Separation of concerns:

Frontend → UI
Backend → API + logic
Database → persistence




🚀 Final Outcome

✅ Fully functional frontend application
✅ Backend API integrated successfully
✅ End-to-end data flow working
✅ User interface displaying real-time data

🔥 System Status (Version 1.0 Complete)
React Frontend
        ↓
Spring Boot Backend
        ↓
H2 Database


✅ Alignment with Project Vision
Day 8 successfully transitioned the project into:
✅ A working 3-tier architecture
✅ A full-stack application
✅ A cloud-ready foundation

⚠️ Observations / Improvements

Username currently user-provided (can be auto-generated in future)
Login/authentication not yet implemented
UI minimal (to be improved)

