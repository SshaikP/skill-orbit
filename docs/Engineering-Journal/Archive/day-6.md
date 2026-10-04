# 📄 ✅ `docs/day-6.md`

```markdown
# 📅 Day 6 — Validation, Error Handling & API Enhancement

---

## 🎯 Goals

- Add input validation
- Implement global exception handling
- Enhance API quality
- Add GET API

---

## ✅ Work Completed

---

### ✅ 1. Input Validation

Added validation annotations:

```java
@NotBlank
@Email

Validated fields:

email
username
password


✅ 2. Validation Enabled in Controller
Javapublic User createUser(@Valid @RequestBody User user)Show more lines

✅ 3. Global Exception Handling
Created:
GlobalExceptionHandler.java

Handled:

Validation errors
Returned structured error messages

Example response:
JSON{  "email": "Email is required",  "username": "Username is required"}Show more lines

✅ 4. GET API Created
GET /api/users

Returns:

List of all users from DB


✅ 5. API Testing
Tested scenarios:

✅ Valid request
✅ Invalid request
✅ GET users

Tools used:

✅ PowerShell (Invoke-RestMethod)
✅ Hoppscotch


🚧 Issues Faced

❌ Issue 1: Maven Command Failure
Problem:
mvn spring-boot:run → No plugin found

Root Cause:

Command executed from wrong directory

Fix:
Shellcd user-servicemvn spring-boot:runShow more lines
✅ Result: Fixed

❌ Issue 2: Missing pom.xml
Problem:
no POM in this directory

Root Cause:

Running Maven outside project root

Fix:

Navigate to correct directory

✅ Result: Fixed

❌ Issue 3: PowerShell Command Syntax Errors
Problem:
A positional parameter cannot be found

Root Cause:

Incorrect use of backticks (`)
Parameters merged incorrectly

Example (wrong):
POST `-Uri ...


✅ Fix:
Correct format:
PowerShellInvoke-RestMethod -Method POST `-Uri "http://localhost:8080/api/users" `-ContentType "application/json" `-Body '{"email":"test@email.com","username":"testuser","password":"1234"}'Show more lines
✅ Result: Fixed

❌ Issue 4: curl Alias Confusion
Problem:

curl in PowerShell is not real curl

Fix:

Used:

Invoke-RestMethod ✅
OR curl.exe ✅



✅ Result: Fixed

✅ Final Outcome

✅ API validation working
✅ Errors handled properly
✅ GET API working
✅ Commands corrected and executed successfully


🧠 Key Learnings
✅ Technical Learnings

Validation with @NotBlank, @Email
Exception handling with @RestControllerAdvice
Clean API error responses
GET vs POST API design


✅ Debugging Learnings

ProblemLearningMaven errorsAlways run from correct directoryPowerShell issuesSyntax matters strictlycurl issuesEnvironment-specific behaviorAPI failuresCheck HTTP method first

🚀 What This Achieved

Transition from basic API → production-ready API
Strong error handling capability
Structured API behavior

