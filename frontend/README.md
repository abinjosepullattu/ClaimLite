# ClaimLite Frontend

The ClaimLite frontend is an **Angular 21 application managed by Nx**.

It provides the user interface for policyholder registration, policyholder listing, claim creation, and claim listing.

The application uses the **Duet Design System** for its UI components and **Angular Reactive Forms** for form handling and validation.

---

# 🛠️ Technology Stack

| Technology | Details |
|---|---|
| Angular | 21 |
| Nx | 22.6.0 |
| Node.js | 22.13.0 |
| npm | 11.6.2 |
| TypeScript | 5.9.3 |
| Duet | `@duetds/components` 10.8.1 |
| Forms | Angular Reactive Forms |
| HTTP | Angular HttpClient |
| Build | esbuild |
| Unit Tests | Vitest |
| E2E Tests | Playwright |

---

# 📁 Project Structure

```text
frontend/
│
├── apps/
│   │
│   ├── claimlite/
│   │   ├── src/
│   │   │
│   │   ├── app/
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.scss
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   │
│   │   │   ├── landing.ts
│   │   │   ├── landing.html
│   │   │   ├── landing.css
│   │   │   │
│   │   │   ├── user-form.ts
│   │   │   ├── user-form.html
│   │   │   ├── user-form.css
│   │   │   │
│   │   │   ├── user-list.ts
│   │   │   ├── user-list.html
│   │   │   ├── user-list.css
│   │   │   │
│   │   │   ├── claim-form.ts
│   │   │   ├── claim-form.html
│   │   │   ├── claim-form.css
│   │   │   │
│   │   │   ├── claim-list.ts
│   │   │   ├── claim-list.html
│   │   │   ├── claim-list.css
│   │   │   │
│   │   │   └── services/
│   │   │       ├── user.service.ts
│   │   │       ├── user.service.spec.ts
│   │   │       ├── claim.service.ts
│   │   │       └── claim.service.spec.ts
│   │   │
│   │   ├── environments/
│   │   │   └── environment.ts
│   │   │
│   │   ├── main.ts
│   │   └── index.html
│   │
│   └── claimlite-e2e/
│
├── nx.json
├── package.json
├── package-lock.json
├── tsconfig.base.json
└── README.md
```

---

# 🏗️ Frontend Architecture

```text
ClaimLite Frontend
│
├── Landing
│
├── Policyholders
│   ├── UserForm
│   └── UserList
│
└── Claims
    ├── ClaimForm
    └── ClaimList
```

Services handle API communication:

```text
UserService
ClaimService
```

---

# 🧭 Routes

| Route | Component | Purpose |
|---|---|---|
| `/` | `Landing` | Home page |
| `/users` | `UserList` | Policyholder list |
| `/add-user` | `UserForm` | Add policyholder |
| `/claims` | `ClaimList` | Claims list |
| `/add-claim` | `ClaimForm` | Log claim |

---

# 🌐 API Configuration

API configuration is stored in:

```text
apps/claimlite/src/environments/environment.ts
```

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:3000/api',
};
```

Services use this base URL:

```ts
private apiUrl = `${environment.apiBaseUrl}/users`;
```

and:

```ts
private apiUrl = `${environment.apiBaseUrl}/claims`;
```

---

# 👤 Policyholder Form

File:

```text
apps/claimlite/src/app/user-form.ts
```

The form contains:

- Full Name
- Email
- Phone

Validation:

```text
Full Name
- Required
- 2–50 characters
- Cannot be whitespace only

Email
- Required
- Valid email format
- Lowercase before submission

Phone
- Required
- Exactly 10 digits
```

The phone number is normalized before submission.

---

# 📋 Policyholder List

File:

```text
apps/claimlite/src/app/user-list.ts
```

Columns:

```text
ID
Full Name
Email
Phone
Registration Date
```

Formatting:

```text
ID               → Last 4 ObjectId characters
Phone            → (123) 456-7890
Registration Date → DD-MMM-YYYY
```

Newest policyholders appear first.

Empty state:

```text
No users registered yet. Please add a policyholder.
```

---

# 📝 Claim Form

File:

```text
apps/claimlite/src/app/claim-form.ts
```

Fields:

```text
Policyholder
Claim Type
Claim Amount
Description
```

---

## Policyholder

Policyholders are loaded dynamically from:

```http
GET /api/users
```

Displayed as:

```text
Full Name (Email)
```

The selected ObjectId is submitted to the backend.

If there are no policyholders:

```text
Action Required: You must register at least one Policyholder before logging a claim.
```

The claim action is disabled.

---

## Claim Type

Supported values:

```text
Auto
Home
Health
```

---

## Claim Amount

Validation:

```text
> 0
≤ 1,000,000
Maximum 2 decimal places
```

Examples:

```text
1250
1250.5
1250.50
```

---

## Description

Validation:

```text
Required
Minimum 10 characters
Maximum 500 characters
```

The UI includes a character counter.

---

# 📊 Claims List

File:

```text
apps/claimlite/src/app/claim-list.ts
```

Columns:

```text
Claim ID
Policyholder Name
Claim Type
Amount
Submission Date
```

Formatting:

```text
Claim ID         → Last 4 ObjectId characters
Amount           → $1,250.50
Submission Date  → DD-MMM-YYYY HH:mm
```

The backend populates the related policyholder and the frontend displays:

```ts
claim.userId.fullName
```

No separate request is made per claim.

Empty state:

```text
No claims have been logged yet.
```

---

# 🎨 Duet Design System

Installed packages:

```bash
npm install @duetds/components
npm install @duetds/css @duetds/fonts
```

Main Duet components used:

```html
<duet-button>
<duet-card>
<duet-input>
<duet-select>
<duet-choice-group>
<duet-choice>
<duet-textarea>
```

---

# ⚙️ Duet Initialization

File:

```text
apps/claimlite/src/main.ts
```

Duet components are initialized once:

```ts
import { defineCustomElements } from '@duetds/components/lib/loader';

defineCustomElements(window);
```

Angular components using Duet Web Components include:

```ts
CUSTOM_ELEMENTS_SCHEMA
```

---

# 🧩 Reactive Forms

Angular Reactive Forms are used for both forms.

Duet Web Components are synchronized with Angular form controls using Duet events.

Example:

```html
<duet-input
  [value]="userForm.controls.fullName.value"
  (duetInput)="onFieldInput('fullName', $event)"
></duet-input>
```

The event value is transferred to the Angular form control.

This allows Angular validation and form state management to work with the Duet Web Components.

---

# 🔧 Services

## UserService

File:

```text
apps/claimlite/src/app/services/user.service.ts
```

Methods:

```ts
getUsers()
createUser(userData)
```

API:

```text
GET  /api/users
POST /api/users
```

---

## ClaimService

File:

```text
apps/claimlite/src/app/services/claim.service.ts
```

Methods:

```ts
getClaims()
createClaim(claimData)
```

API:

```text
GET  /api/claims
POST /api/claims
```

---

# ❌ Error Handling

Duplicate email:

```text
Email already exists.
```

Server/system error:

```text
System Error: Unable to process request. Please try again.
```

Other backend errors are displayed using the returned API message when available.

---

# ⏳ Submission States

Policyholder form:

```text
Registering...
```

Claim form:

```text
Logging Claim...
```

Buttons are disabled during active API requests to prevent duplicate submissions.

---

# ✅ Successful Submission

After a successful POST:

```text
1. Success message displayed
2. Form reset
3. Form marked pristine
4. Form marked untouched
5. Submit button becomes available
```

---

# 📦 Install Dependencies

From the frontend directory:

```bash
npm install
```

---

# ▶️ Run Development Server

```bash
npx nx serve claimlite
```

Application:

```text
http://localhost:4200
```

---

# 🏭 Production Build

```bash
npx nx build claimlite
```

Output:

```text
dist/apps/claimlite
```

The production build has been successfully verified.

---

# 🧪 Testing

Run unit tests:

```bash
npx nx test claimlite
```

The workspace uses **Vitest** for unit tests.

The E2E project is located at:

```text
apps/claimlite-e2e/
```

and uses **Playwright**.

---

# 🧰 Nx Commands

Show all projects:

```bash
npx nx show projects
```

Show available targets for ClaimLite:

```bash
npx nx show project claimlite
```

Run development server:

```bash
npx nx serve claimlite
```

Build application:

```bash
npx nx build claimlite
```

Run tests:

```bash
npx nx test claimlite
```

Visualize the workspace:

```bash
npx nx graph
```

---

# ➕ Generate Nx Projects

Generate an Angular application:

```bash
npx nx g @nx/angular:app demo
```

Generate an Angular library:

```bash
npx nx g @nx/angular:lib mylib
```

View installed plugins:

```bash
npx nx list
```

View generators for the Angular plugin:

```bash
npx nx list @nx/angular
```

---

# ☁️ Nx Cloud / CI

Nx Cloud is optional for this workspace.

Connect the workspace:

```bash
npx nx connect
```

Generate a CI workflow:

```bash
npx nx g ci-workflow
```

Nx Cloud can provide:

- Remote caching
- Distributed task execution
- E2E test splitting
- Flaky task detection and rerunning

More information:

https://nx.dev/ci/intro/ci-with-nx

---

# 🖥️ Nx Console

Nx Console is an IDE extension available for VS Code and IntelliJ.

It provides:

- Nx task execution
- Project navigation
- Code generation
- Generator configuration
- Improved autocompletion

Documentation:

https://nx.dev/getting-started/editor-setup

---

# 🔄 Local Development Workflow

Start the backend from the project root:

```bash
cd backend
npm start
```

In another terminal:

```bash
cd frontend
npx nx serve claimlite
```

Frontend:

```text
http://localhost:4200
```

Backend API:

```text
http://localhost:3000/api
```

---

# 🎯 Frontend Development Flow

```text
1. Create Nx Angular workspace
2. Configure Angular application
3. Install Duet Design System
4. Initialize Duet Web Components
5. Configure routes
6. Create global navigation
7. Create landing page
8. Create UserService
9. Build policyholder form
10. Add Reactive Form validation
11. Integrate Duet controls
12. Build policyholder list
13. Create ClaimService
14. Build claim form
15. Load policyholders dynamically
16. Add claim validation
17. Integrate Duet controls
18. Build claims list
19. Add formatting and empty states
20. Add error handling
21. Add loading/submission states
22. Configure environment API URL
23. Polish list UI
24. Test the application
25. Run production build
```

---

# ✅ Implementation Status

```text
✅ Nx Angular workspace
✅ Angular 21
✅ Duet Design System
✅ Global navigation
✅ Landing page
✅ Policyholder form
✅ Policyholder validation
✅ Duplicate email handling
✅ Policyholder list
✅ Claim form
✅ Claim validation
✅ Dynamic policyholder selection
✅ Zero-policyholder protection
✅ Claims list
✅ Currency/date formatting
✅ Empty states
✅ API error handling
✅ Submission states
✅ Environment API configuration
✅ Production build
```

---

# 🔗 Useful Nx Links

- https://nx.dev
- https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial
- https://nx.dev/features/run-tasks
- https://nx.dev/concepts/nx-plugins
- https://nx.dev/plugin-registry
- https://nx.dev/ci/intro/ci-with-nx
- https://nx.dev/getting-started/editor-setup
- https://nx.dev/features/manage-releases

---

# 🌐 Nx Community

- https://go.nx.dev/community
- https://twitter.com/nxdevtools
- https://www.linkedin.com/company/nrwl
- https://www.youtube.com/@nxdevtools
- https://nx.dev/blog