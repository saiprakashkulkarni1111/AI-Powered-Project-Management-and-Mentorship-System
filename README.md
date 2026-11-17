# AETHERIS // Academic OS & AI Mentorship System

> **A tactile, frosted-obsidian research governance and AI mentorship platform for academic engineering capstones.**  
> Inspired by the craft of Linear, Raycast, and Cron. Built with React, Tailwind CSS, Framer Motion, and Lucide Icons.

---

## 🎨 Visual Design System: "Tactile Frosted Obsidian"

- **Background Canvas**: Deep Charcoal-Obsidian (`#0B0D12`) layered with slow-moving ambient mesh lighting (`#112A32` deep slate teal, `#2A1F14` warm amber-gold, `#181B2C` muted indigo) and a 2% SVG fractal noise overlay.
- **Glass Tokens**:
  - `glass-panel`: `rgba(22, 26, 35, 0.55)` with `backdrop-filter: blur(20px) saturate(140%)`, 1px hairline border `rgba(255, 255, 255, 0.08)`, and a 1px inset specular highlight `rgba(255, 255, 255, 0.14)`.
  - `glass-modal`: `rgba(30, 35, 48, 0.75)` with `backdrop-filter: blur(28px)` and deep elevation shadow `0 24px 48px -12px rgba(0, 0, 0, 0.75)`.
- **Chromatic Hierarchy**:
  - **Glacier Cyan (`#38BDF8`)**: System navigation, active tabs, primary CTAs, progress indicators.
  - **Solar Amber (`#F59E0B`)**: Reserved exclusively for AI Copilot operations, synthesized roadmaps, and risk flags.
  - **Emerald (`#10B981`)**: On-Track milestones and validated grades.
  - **Coral (`#F43F5E`)**: Critical blockers, P0 priorities, and security logs.
  - **JetBrains Mono (`font-mono-tabular`)**: Monospace tabular numerals for dates, risk metrics, git commit hashes, and audit trails.

---

## 🏛️ Personas & Role-Based Workspaces (RBAC)

1. **Student Dashboard (Execution Mode)**:
   - Capstone Hero Bento with live sprint telemetry and Git master commit tracking.
   - SVG Circular Progress Ring showing 68% milestone velocity.
   - Interactive 4-column Kanban Board (`Backlog`, `In Progress`, `In Review`, `Completed`) with priority tags (P0/P1/P2), commit hashes, and interactive subtask checklists.
   - Milestone Roadmap & Gantt view with IEEE grade evaluations.
   - Document Management Dropzone with simulated drag-and-drop file ingestion.

2. **Faculty / Mentor Dashboard (Oversight Mode)**:
   - Multi-Team Health Grid tracking 4 concurrent engineering pods (Team Alpha, Beta, Gamma, Delta).
   - Automated AI Risk Analyzer flags (highlighting hardware blockers, low commit velocities).
   - Milestone Approval Center with one-click sign-off (`Grade: 96 / 100 A`) or revision requests.
   - Split-screen Document Annotation Modal where mentors highlight technical text and leave pinned advice threads.

3. **Admin Dashboard (Governance Mode)**:
   - Interactive RBAC Permission Matrix with live toggles across 5 personas and 8 granular capabilities.
   - System-wide Project Analytics (48 Capstones, SLA turnaround, AI Token consumption, domain distribution).
   - Monospace Audit Trail viewer with live search and severity filtering (`ALL`, `INFO`, `WARN`, `SECURITY`).

---

## ⚡ Global Interactive Micro-Interactions

- **Command Palette (`Cmd + K` / `Ctrl + K`)**: Fast modal search across tasks, documents, AI actions, and role switches.
- **AI Intelligence Drawer**: Collapsible right-hand glass panel with:
  - **Task Recommendation Engine**: Synthesizes tasks from blockers with an interactive **"Apply to Board"** button that immediately adds them to the live Kanban board.
  - **Project Roadmap Generator**: Generates sprint breakdown from research specs.
  - **Progress & Risk Analyzer**: Scans hardware thermals and commit frequencies.
- **Split-Screen Document Reviewer**: Side-by-side inspection of PDF architectures with interactive highlight-to-comment functionality.

---

## 🔌 Python Flask REST API Integration

The application is structured with a clean API adapter service (`src/services/api.js`) ready to connect to a Flask backend:

```python
# flask_backend/app.py example
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/projects/<project_id>', methods=['GET'])
def get_project(project_id):
    return jsonify({"status": 200, "data": {"id": project_id, "title": "Edge-AI Traffic Telemetry"}})

@app.route('/api/v1/tasks', methods=['POST'])
def create_task():
    task = request.json
    return jsonify({"status": 201, "data": task}), 201

if __name__ == '__main__':
    app.run(port=5000, debug=True)
```

Configure `VITE_API_URL=http://localhost:5000/api/v1` in `.env` to connect.

---

## 🚀 Development & Build

```bash
# Start local development server
npm run dev

# Compile production bundle
npm run build

# Preview build locally
npm run preview
```
