# AI Powered Project Management and Mentorship System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-cyan?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-10B981?style=for-the-badge)

**A production-grade academic SaaS platform for managing capstone projects, AI-assisted mentorship, faculty oversight, and institutional governance — built with Deep Space Glassmorphic design.**

[Report Bug](https://github.com/saiprakashkulkarni1111/AI-Powered-Project-Management-and-Mentorship-System/issues) · [Request Feature](https://github.com/saiprakashkulkarni1111/AI-Powered-Project-Management-and-Mentorship-System/issues)

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Design System](#-design-system)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Role-Based Dashboards](#-role-based-dashboards)
- [AI Intelligence Features](#-ai-intelligence-features)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [API Integration](#-api-integration)
- [Component Reference](#-component-reference)
- [Mock Data](#-mock-data)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛰️ About The Project

**AI Powered Project Management and Mentorship System** is a full-featured, role-aware web application designed for academic institutions managing capstone and research projects. It supports three distinct user personas — **Student**, **Faculty/Mentor**, and **Admin** — each with a purpose-built workspace.

The platform integrates:
- **Real-time project tracking** with Kanban boards and timeline views
- **AI mentorship tools** (roadmap generation, task recommendations, risk analysis)
- **Faculty oversight** with inline document annotation and milestone approvals
- **Institutional governance** via RBAC management, analytics, and tamper-evident audit logs

The UI is inspired by tools like **Linear**, **Raycast**, and **Cron** — prioritising information density, micro-interactions, and authenticity over generic template aesthetics.

> **Academic Context:** The bundled mock dataset models a real capstone project — *"Edge-AI Traffic Telemetry System"* — with realistic sprint milestones, document revisions, commit history, and risk flags.

---

## 🎨 Design System

### Visual Aesthetic: *Deep Space Glassmorphism*

The interface layers semi-transparent frosted-glass panels over a deep space gradient background — giving every surface a sense of physical depth and grain.

#### Background Canvas

| Token | Value | Usage |
|---|---|---|
| `--bg-base` | `#06070B` | Root background (near-black) |
| `--bg-gradient-top` | `#38125E` | Rich purple (top of canvas) |
| `--bg-gradient-left` | `#0F328C` | Electric blue (bottom-left) |
| `--bg-gradient-right` | `#0891B2` | Vibrant cyan/teal (bottom-right) |

#### Glass Surface Tokens

| Surface | Background | Backdrop Filter | Border |
|---|---|---|---|
| Primary Panel | `rgba(24, 18, 36, 0.58)` | `blur(20px) saturate(140%)` | `1px solid rgba(255,255,255,0.08)` |
| Elevated Modal | `rgba(30, 22, 48, 0.72)` | `blur(28px)` | `1px solid rgba(255,255,255,0.12)` |
| Top Navigation | `rgba(10, 8, 20, 0.75)` | `blur(24px)` | Bottom hairline `rgba(255,255,255,0.06)` |

#### Color Palette

| Role | Color | Hex | Usage |
|---|---|---|---|
| **Primary Accent** | Glacier Cyan | `#00F2FE` | Active nav, CTAs, avatar rings, links |
| **AI Accent** | Solar Amber | `#FF6B00` | All AI-powered features exclusively |
| **On-Track** | Teal | `#14B8A6` | Status badges, progress charts |
| **Progress Ring** | Emerald | `#10B981` | Percentage numerals inside ring |
| **High Risk** | Coral | `#F43F5E` | Overdue milestones, risk flags |
| **P0 Priority** | Neon Pink | `#FF007F` | Critical task badges |
| **P1 Priority** | Orange | `#FF6B00` | High-priority task badges |
| **P2 Priority** | Blue | `#3B82F6` | Medium-priority task badges |
| **Secondary Text** | Slate | `#94A3B8` | Descriptions, metadata |
| **Primary Text** | Off-White | `#F1F5F9` | Headings, card titles |

#### Typography

| Font | Weight | Usage |
|---|---|---|
| **Inter / Plus Jakarta Sans** | 300–700 | UI hierarchy, headings, body |
| **JetBrains Mono** | 400–600 | Dates, risk scores, audit timestamps, version numbers, commit hashes |

---

## ✨ Features

### 🧑‍🎓 Student Workspace
- **Interactive Kanban Board** — task cards across `To Do → In Progress → Review → Done` columns
- **Timeline / Gantt View** — milestone timeline with status indicators and date ranges
- **Progress Ring** — animated circular progress tracker showing sprint completion
- **Document Manager** — file dropzone with version history, revision tags, and document preview
- **Create Task Modal** — rich form with priority, assignee, label, and due date fields
- **AI Mentorship Drawer** — slide-over pane with roadmap generation, task recommendations, and risk analysis

### 👩‍🏫 Faculty / Mentor Workspace
- **Multi-Team Health Grid** — overview cards for all supervised projects with health indicators
- **Milestone Approval Center** — one-click approve/reject for student milestone submissions
- **Document Annotation Modal** — split-screen viewer with text highlight and pinned inline feedback threads
- **Progress & Risk Analyzer** — AI-flagged risk items with severity ratings and suggested interventions

### 🔐 Admin Workspace
- **RBAC Permission Matrix** — role × permission grid with toggle switches; full audit trail on each change
- **System Analytics** — platform-wide metrics: active projects, submission rates, milestone completion, user activity
- **Audit Logs Viewer** — filterable, monospace log stream with actor, action, timestamp, and resource columns

### 🤖 AI Intelligence Drawer (Global)
- **Project Roadmap Generator** — generates a phased milestone roadmap from a project brief with streaming skeleton animation
- **Task Recommendation Engine** — suggests next-sprint tasks ranked by priority with "Apply to Board" action
- **Risk Analyzer** — evaluates current sprint velocity and flags at-risk milestones with probability scores
- **Apply to Board** — accepted AI recommendations are inserted directly into the Kanban board via React state

### 🌐 Global UX
- **Command Palette** (`Ctrl+K` / `Cmd+K`) — fuzzy search across projects, tasks, documents; trigger AI tools instantly
- **Role Switcher** — switch between Student / Faculty / Admin personas via Profile popover → Sample Login Pages
- **Notification Popover** — frosted-glass toast stream with unread badge count
- **Ambient Background** — slow-moving deep space gradient with animated mesh lighting

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|---|---|---|
| **UI Framework** | React (Functional Components + Hooks) | 18.3.1 |
| **Build Tool** | Vite | 5.4.11 |
| **Styling** | Tailwind CSS | 3.4.15 |
| **Animation** | Framer Motion | 11.11.17 |
| **Icons** | Lucide React (1.5px stroke) | 0.460.0 |
| **Utilities** | clsx, tailwind-merge | latest |
| **Backend (stub)** | Flask REST API adapter | — |

---

## 📁 Project Structure

```
ai-powered-project-management/
├── index.html                        # Vite entry HTML
├── vite.config.js                    # Vite + React plugin config
├── tailwind.config.js                # Custom tokens, fonts, glassmorphism utilities
├── postcss.config.js                 # Autoprefixer
├── package.json
├── README.md
│
└── src/
    ├── main.jsx                      # React DOM root
    ├── App.jsx                       # Root router: Login ↔ Dashboard
    ├── index.css                     # Global styles, CSS custom properties, noise texture
    │
    ├── context/
    │   └── AppContext.jsx            # Central React Context: role, tasks, milestones,
    │                                 # documents, RBAC permissions, audit logs,
    │                                 # notifications, AI recommendations
    │
    ├── data/
    │   └── mockData.js               # Full academic mock dataset
    │                                 # (Edge-AI Traffic Telemetry capstone)
    │
    ├── services/
    │   └── api.js                    # Flask REST API adapter with simulated latency
    │                                 # (ready to swap for real endpoints)
    │
    └── components/
        ├── common/
        │   ├── AmbientBackground.jsx # Animated deep space gradient canvas
        │   ├── Badge.jsx             # Priority / status badge with variant tokens
        │   ├── CommandPalette.jsx    # Ctrl+K floating search modal
        │   ├── NotificationPopover.jsx
        │   ├── ProfilePopover.jsx    # Avatar menu → role login, settings
        │   └── TopNavigation.jsx     # App header with logo, search, AI button, avatar
        │
        ├── ai/
        │   └── AiDrawer.jsx          # Collapsible right-panel AI tools
        │                             # (Roadmap, Tasks, Risk — Solar Amber themed)
        │
        ├── auth/
        │   ├── AuthModal.jsx         # Login modal overlay
        │   └── LoginPage.jsx         # Full-screen role-specific login pages
        │
        ├── student/
        │   ├── StudentDashboard.jsx  # Layout shell + view switcher
        │   ├── KanbanBoard.jsx       # 4-column Kanban with state management
        │   ├── TaskCard.jsx          # Individual task card with priority badge
        │   ├── TimelineView.jsx      # Milestone Gantt / timeline component
        │   ├── DocumentManager.jsx   # File list + version history + dropzone
        │   └── CreateTaskModal.jsx   # New task form modal
        │
        ├── mentor/
        │   ├── MentorDashboard.jsx           # Faculty layout + team health grid
        │   ├── MilestoneApprovalCenter.jsx   # Approve/reject milestone submissions
        │   └── DocumentAnnotationModal.jsx   # Split-screen doc viewer + annotations
        │
        └── admin/
            ├── AdminDashboard.jsx    # Admin layout + metric cards
            ├── RBACMatrix.jsx        # Role × permission toggle matrix
            ├── SystemAnalytics.jsx   # Platform-wide charts and KPIs
            └── AuditLogsViewer.jsx   # Searchable, filterable audit log table
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/saiprakashkulkarni1111/AI-Powered-Project-Management-and-Mentorship-System.git

# 2. Navigate into the project directory
cd AI-Powered-Project-Management-and-Mentorship-System

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**

### Build for Production

```bash
npm run build        # Outputs to dist/
npm run preview      # Preview the production build locally
```

> The production bundle is ~425 kB (gzipped) with 1,957 modules transformed.

---

## 👥 Role-Based Dashboards

The platform supports three RBAC personas, each with a fully independent workspace layout.

### Switching Roles (Demo Mode)

1. Click the **avatar / profile icon** in the top-right corner of the navigation bar
2. Select **"Sample Login Pages"** from the dropdown
3. Choose the persona card — **Student**, **Faculty / Mentor**, or **Admin**
4. The entire workspace re-renders for the selected role

> Role state is managed globally via `AppContext`. All role-specific data, permissions, and UI layouts are derived from the active role token.

| Role | Primary Focus | Key Interactions |
|---|---|---|
| **Student** | Execution & progress | Kanban, Timeline, Document upload, AI Drawer |
| **Faculty / Mentor** | Oversight & feedback | Team health, Milestone approvals, Annotation threads |
| **Admin** | Governance | RBAC matrix, System analytics, Audit logs |

---

## 🤖 AI Intelligence Features

All AI features are visually distinguished by the **Solar Amber (#FF6B00)** color accent to make AI-generated content clearly separable from system data.

### AI Drawer Panels

| Panel | Function |
|---|---|
| **Project Roadmap Generator** | Enter a project brief → generates a phased sprint roadmap with milestones and deliverables |
| **Task Recommendation Engine** | Analyzes current board state → suggests prioritized next-sprint tasks |
| **Progress & Risk Analyzer** | Evaluates sprint velocity and flags at-risk milestones with probability scores |

### Apply to Board
When a task recommendation is accepted, clicking **"Apply to Board"** dispatches an action to `AppContext` that inserts the AI-generated task card directly into the Kanban `To Do` column — no page reload, no manual copy-paste.

### Streaming Skeleton States
All AI panels show realistic shimmer skeleton loaders during the simulated generation phase, mimicking the latency of a real LLM API response.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + K` / `Cmd + K` | Open Command Palette |
| `Escape` | Close any open modal / drawer / palette |
| `↑` / `↓` | Navigate Command Palette results |
| `Enter` | Execute highlighted Command Palette action |

---

## 🔌 API Integration

The file `src/services/api.js` is a **drop-in Flask REST API adapter**. All functions simulate async network latency (300–800ms) using `setTimeout` so the UI feels like a real networked application.

### Swapping to a Real Backend

Replace the mock implementations in `api.js` with real `fetch` / `axios` calls to your Flask endpoints:

```js
// Current mock implementation
export const fetchTasks = async (projectId) => {
  await delay(400);
  return mockData.tasks.filter(t => t.projectId === projectId);
};

// Replace with your Flask endpoint:
export const fetchTasks = async (projectId) => {
  const res = await fetch(`/api/projects/${projectId}/tasks`);
  return res.json();
};
```

### Expected Flask Endpoints

```
GET    /api/projects                       → List all projects
GET    /api/projects/:id/tasks             → Get tasks for a project
POST   /api/projects/:id/tasks             → Create a new task
PATCH  /api/tasks/:id                      → Update task (status, priority)
DELETE /api/tasks/:id                      → Delete a task

GET    /api/projects/:id/milestones        → List milestones
PATCH  /api/milestones/:id/approve         → Approve milestone (Faculty)

GET    /api/documents                      → List documents
POST   /api/documents                      → Upload document
POST   /api/documents/:id/annotations      → Add annotation

GET    /api/admin/audit-logs               → Paginated audit log
GET    /api/admin/analytics                → System-wide metrics
PATCH  /api/admin/rbac                     → Update role permissions

POST   /api/ai/roadmap                     → Generate project roadmap
POST   /api/ai/tasks                       → Recommend next tasks
POST   /api/ai/risk                        → Analyze project risk
```

---

## 📦 Component Reference

### `<AppContext />`
Central state provider. Exposes:

| State | Type | Description |
|---|---|---|
| `role` | `string` | Active persona: `'student'`, `'mentor'`, `'admin'` |
| `tasks` | `Task[]` | All Kanban tasks for current project |
| `milestones` | `Milestone[]` | Sprint milestones with status and dates |
| `documents` | `Document[]` | Uploaded files with version history |
| `notifications` | `Notification[]` | Unread notification queue |
| `auditLogs` | `AuditLog[]` | Tamper-evident admin audit trail |
| `aiRecommendations` | `Task[]` | Pending AI-suggested tasks |
| `addTask` | `fn` | Add task to Kanban board |
| `updateTask` | `fn` | Move task / change status |
| `approveMilestone` | `fn` | Faculty approval action |
| `applyAiTask` | `fn` | Insert AI recommendation into board |

### `<CommandPalette />`
- Triggered by `Ctrl+K`
- Searches across: projects, tasks, documents, AI tools
- Each result has an `icon`, `label`, `category`, and `action` callback
- Rendered as a frosted-glass floating modal with `AnimatePresence` exit animation

### `<AiDrawer />`
- Collapsible right-side panel (triggered from top nav AI button)
- Three tab panels: Roadmap, Tasks, Risk
- Each panel has: input area, generate button, shimmer skeleton state, result display, and Apply/Accept actions
- Solar Amber (`#FF6B00`) border and icon tints throughout

---

## 🗄️ Mock Data

Located in `src/data/mockData.js`. Models a realistic academic capstone project:

**Project:** *Edge-AI Traffic Telemetry System*
> Real-time traffic density analysis using edge-deployed neural networks on NVIDIA Jetson hardware, with a React dashboard for visualization.

**Mock dataset includes:**
- 12 Kanban tasks across 4 sprint columns with priorities (P0–P2), assignees, labels, and due dates
- 6 sprint milestones with statuses (`completed`, `in_progress`, `upcoming`, `at_risk`)
- 8 project documents with version history and revision timestamps
- 15 audit log entries covering task creation, role changes, milestone approvals, document uploads
- 5 AI-generated task recommendations with confidence scores
- 10 notification events with read/unread state
- 3 user profiles (student, mentor, admin) with avatars and permission sets

---

## 🗺️ Roadmap

- [ ] Flask REST API backend integration
- [ ] PostgreSQL database schema + SQLAlchemy ORM
- [ ] Real LLM integration (Gemini / GPT-4o) for AI Drawer panels
- [ ] Live WebSocket notifications
- [ ] Drag-and-drop Kanban (`@dnd-kit`)
- [ ] GitHub / GitLab commit activity feed integration
- [ ] PDF export for project reports and audit logs
- [ ] Dark / Light mode toggle
- [ ] Multi-project workspace support
- [ ] Mobile-responsive layout (tablet breakpoints)
- [ ] Internationalization (i18n)

---

## 🤝 Contributing

Contributions are welcome and appreciated.

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes (use conventional commits)
git commit -m "feat: add drag-and-drop Kanban support"

# 4. Push to your branch
git push origin feature/your-feature-name

# 5. Open a Pull Request against main
```

Please follow the existing component structure and design system tokens. All new AI-powered features must use the **Solar Amber** color accent to maintain visual consistency.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 👨‍💻 Authors

| Name | Role |
|---|---|
| **Saiprakash Kulkarni** | Lead Developer & Designer |

---

## 🙏 Acknowledgements

- [Linear](https://linear.app) — interaction design inspiration
- [Raycast](https://raycast.com) — Command Palette UX pattern
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — animation primitives
- [Lucide Icons](https://lucide.dev) — crisp, consistent icon set
- [Vite](https://vitejs.dev) — lightning-fast build tooling

---

<div align="center">

Made with ❤️ for academic excellence

**AI Powered Project Management and Mentorship System** · v1.0.0 · MIT License

</div>
