# 📅 Day 7 — Backend Completion, Custom Identifier Design & Architecture Alignment

---

## 🎯 Goals

- Complete backend CRUD functionality
- Introduce business-friendly user identifier (`userCode`)
- Align backend design with cloud-native and DevOps goals
- Stabilize API behavior for future frontend and deployment phases

---

## ✅ Work Completed

---

### ✅ 1. Full CRUD API Implementation

Implemented and tested complete user CRUD operations:

| API | Description |
|-----|------------|
| POST /api/users | Create user |
| GET /api/users | Get all users |
| GET /api/users/{id} | Get user by ID |
| PUT /api/users/{id} | Update user |
| DELETE /api/users/{id} | Delete user |

---

### ✅ 2. Custom Business Identifier (`userCode`)

Introduced a human-readable user identifier:
CTP + FirstLetter(FirstName) + LastName + SequenceNumber

---

### ✅ Example

| Input | Generated userCode |
|------|--------------------|
| john.snow@email.com | CTPJSNOW1 |
| john.snow@email.com | CTPJSNOW2 |

---

### ✅ Implementation Details

#### ✅ Entity Update

```java
@Column(unique = true)
private String userCode;


✅ Repository Method
Javalong countByUserCodeStartingWith(String prefix);Show more lines

✅ Service Logic
Javaprivate String generateUserCode(UserRequest request) {    String[] parts = request.getEmail().split("@")[0].split("\\.");    String first = parts.length > 0 ? parts[0] : "x";    String last = parts.length > 1 ? parts[1] : "x";    char firstChar = Character.toUpperCase(first.charAt(0));    String lastNameUpper = last.toUpperCase();    String baseCode = "CTP" + firstChar + lastNameUpper;    long count = repository.countByUserCodeStartingWith(baseCode);    return baseCode + (count + 1);}``Show more lines

✅ Integration in Service
Javauser.setUserCode(generateUserCode(request));``Show more lines

✅ Response Mapping
Javaresponse.setUserCode(savedUser.getUserCode());Show more lines

✅ 3. API Response Standardization
Introduced structured response format:
JSON{  "status": "SUCCESS",  "data": {    "id": "...",    "userCode": "CTPJSNOW1",    "email": "...",    "username": "..."  }}Show more lines

✅ 4. End-to-End API Testing
Tested all APIs using:

✅ PowerShell (Invoke-RestMethod)
✅ Hoppscotch (browser tool)


🚧 Issues Faced & Troubleshooting

❌ Issue 1: userCode Not Generated
Problem:
"userCode": ""

Root Cause:

generateUserCode() not invoked before saving user

Fix:
Javauser.setUserCode(generateUserCode(request));Show more lines
✅ Result: Fixed

❌ Issue 2: Repository Method Not Found
Problem:
countByUserCodeStartingWith() undefined

Root Cause:

Method not declared in repository

Fix:
Javalong countByUserCodeStartingWith(String prefix);Show more lines
✅ Result: Fixed

❌ Issue 3: Entity Structure Errors
Problem:

Invalid placement of fields outside class
Duplicate userCode
Repository logic inside entity

Fix:

Clean separation of layers
Correct Java class structure

✅ Result: Fixed

❌ Issue 4: IDE / Compilation Errors
Problem:

Methods not recognized despite being implemented

Root Cause:

IDE cache / Maven sync issue

Fix:

mvn clean install -DskipTests``Show more lines

Restart Java Language Server

✅ Result: Fixed

❌ Issue 5: PowerShell API Testing Errors
Problem:
/{id} not working

Root Cause:

Placeholder used instead of actual UUID

Fix:

Use real UUID value in API call

✅ Result: Fixed

🧠 Key Learnings

✅ Backend Design

DTO-based API design
Separation of concerns (Controller → Service → Repository)
Custom identifier implementation
Clean response structuring


✅ Problem Solving

Debugging integration issues
Fixing multi-layer inconsistencies
Understanding Spring Data JPA method naming


✅ System Thinking

Differentiating:

Internal ID (UUID)
Business ID (userCode)


Designing user-friendly identifiers with uniqueness


✅ Tooling

PowerShell API usage
JSON handling in CLI
Debugging Maven build issues


🚀 Final Outcome

✅ Fully functional backend system
✅ Production-style API design
✅ Custom business identifier implemented
✅ API tested successfully end-to-end
✅ Codebase aligned with cloud-native goals

🔥 Architectural Status (Version 1.0 - Backend Complete)
Client (CLI / Hoppscotch)
         ↓
Spring Boot REST API
         ↓
Service Layer
         ↓
Repository (JPA)
         ↓
H2 Database
