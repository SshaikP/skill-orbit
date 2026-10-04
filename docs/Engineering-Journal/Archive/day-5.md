# 📅 Day 5 — First API Development & Testing

---

## 🎯 Goals

- Build first working REST API
- Implement layered architecture
- Test API end-to-end
- Store data in database

---

## ✅ Work Completed

### ✅ Created Layered Architecture

- Entity layer (`User`)
- Repository layer (`UserRepository`)
- Service layer (`UserService`)
- Controller layer (`UserController`)

---

### ✅ API Implemented

**POST /api/users**
http
POST http://localhost:8080/api/users

### Request Body
{
  "email": "test@email.com",
  "username": "testuser",
  "password": "1234"
}
✅ Database Integration

Used H2 in-memory DB
Hibernate auto-created users table
Successfully persisted data


✅ API Testing
Tested API using:

✅ curl (PowerShell)
✅ Hoppscotch (web-based tool)


🌐 ✅ HOW TO USE HOPPSCOTCH (POSTMAN ALTERNATIVE)
Hoppscotch is a free, browser-based API testing tool that does not require installation or admin access.

🔹 Step 1: Open Hoppscotch
Go to:
https://hoppscotch.io


🔹 Step 2: Select HTTP Method

Choose POST from dropdown (default is GET)


🔹 Step 3: Enter API URL
http://localhost:8080/api/users


🔹 Step 4: Add Request Body

Select Body tab
Choose JSON

Paste:
JSON{  "email": "test@email.com",  "username": "testuser",  "password": "1234"}Show more lines

🔹 Step 5: Set Headers
Hoppscotch usually auto-detects JSON, but verify:













KeyValueContent-Typeapplication/json

🔹 Step 6: Send Request
Click:
Send ▶️


✅ Expected Response
JSON{  "id": "generated-uuid",  "email": "test@email.com",  "username": "testuser",  "password": "1234"}``Show more lines

🔹 Step 7: Verify in Database
Open H2 console:
http://localhost:8080/h2-console

Run:
SQLSELECT * FROM users;``Show more lines
✅ Data should appear

✅ Why Hoppscotch?
    Advantage	    Benefit
    No install	Works in browser
    Free	        No account required
    Lightweight	Faster than Postman
    Easy UI	    Beginner friendly

⚠️ Common Mistakes

    Mistake	                    Fix
    Using GET instead of POST	Select correct method
    Missing JSON body	        Add request payload
    Server not running	        Start Spring Boot app


✅ Result

Successfully tested API without installing Postman
Verified response and DB insertion


🚧 Issues Faced

❌ Issue 1: 405 Method Not Allowed
Problem:
GET request sent to POST API

Fix:

Used correct method:
POST /api/users



✅ Result: Fixed

❌ Issue 2: curl Not Working Properly
Problem:

PowerShell curl behaves differently (alias to Invoke-WebRequest)
Headers not parsed correctly

Error:
Cannot bind parameter 'Headers'

Fix Options:

Used:
curl.exe


OR switched to:
Invoke-RestMethod



✅ Result: Fixed

❌ Issue 3: JSON Escaping Issue
Problem:

Terminal stuck with:
>>

Root Cause:

Incorrect quoting

Fix:
PowerShell'{"email":"test@email.com","username":"testuser","password":"1234"}'Show more lines
✅ Result: Fixed

❌ Issue 4: API Not Triggering
Fix:

Verified endpoint + method + body

✅ Result: Fixed

✅ Final Outcome

✅ API successfully created
✅ Tested via curl & Hoppscotch
✅ Data persisted in H2 DB


🧠 Key Learnings

HTTP methods (GET vs POST)
CLI vs GUI testing tools
PowerShell vs Linux command differences
API testing workflows


🚀 What This Achieved

First working backend API ✅
End-to-end flow verified ✅
 
