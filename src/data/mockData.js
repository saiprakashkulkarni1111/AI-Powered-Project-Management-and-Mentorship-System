// Production-grade Academic Software Engineering Mock Dataset for AETHERIS Academic OS

export const initialProject = {
  id: "proj_edge_ai_2026",
  code: "CAPSTONE-2026-CS89",
  title: "Edge-AI Traffic Telemetry & Adaptive Signal Control",
  department: "School of Computing & Intelligent Cyber-Physical Systems",
  academicYear: "2026 - 2027",
  cohort: "Senior Fall Capstone (Cohort Alpha)",
  progress: 68,
  velocity: 38, // story points per sprint
  burndownTrend: "+14% ahead of schedule",
  riskScore: 14, // Low risk
  riskLabel: "Low Risk",
  sprint: {
    current: 4,
    total: 6,
    name: "Sprint 4: TensorRT Quantization & V2X Bridge",
    daysRemaining: 12,
    targetDate: "Nov 30, 2026"
  },
  mentor: {
    name: "Dr. Elena Vance",
    title: "Associate Professor of Distributed Systems & Capstone Director",
    email: "elena.vance@mit.edu",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    officeHours: "Tues / Thurs 14:00 - 16:30",
    lastReviewTimestamp: "2026-11-15T10:45:00Z"
  },
  team: [
    { id: "u_alex", name: "Alex Mercer", role: "Lead Architect & Edge ML", email: "alex.mercer@student.edu", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", commits: 64 },
    { id: "u_liam", name: "Liam Chen", role: "Embedded Systems Engineer", email: "liam.chen@student.edu", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", commits: 48 },
    { id: "u_sarah", name: "Sarah Jenkins", role: "V2X Protocol & Telemetry", email: "sarah.j@student.edu", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", commits: 41 },
    { id: "u_kavya", name: "Kavya Patel", role: "Data Pipeline & Cloud Sync", email: "kavya.p@student.edu", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", commits: 37 }
  ],
  repository: {
    url: "github.com/capstone-intel/edge-ai-telemetry",
    branch: "main",
    lastCommit: "b49e8a1",
    totalCommits: 190,
    openIssues: 7
  }
};

export const initialTasks = [
  {
    id: "TASK-104",
    title: "Profile INT8 quantization drift on Cityscapes dataset",
    description: "Benchmark TensorRT 8.6 INT8 engine against FP16 baseline across 500 edge frames. Ensure mAP@50 degradation is under 1.8%.",
    status: "in_progress",
    priority: "P0",
    assignee: { name: "Alex Mercer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    milestone: "M3: Model Quantization",
    dueDate: "Nov 22, 2026",
    subtasks: [
      { id: "st-1", title: "Generate calibration dataset with diverse lighting", done: true },
      { id: "st-2", title: "Compile engine with dynamic batch size 1-4", done: true },
      { id: "st-3", title: "Measure latency percentile (p95, p99)", done: false }
    ],
    commitHash: "a8f9c12",
    tags: ["TensorRT", "Edge-AI", "Accuracy"]
  },
  {
    id: "TASK-109",
    title: "Optimize zero-copy CUDA memory buffer in OpenCV GStreamer bridge",
    description: "Eliminate CPU-GPU memory copy overhead on Jetson Orin Nano by utilizing unified virtual memory (UVM) pools.",
    status: "in_progress",
    priority: "P1",
    assignee: { name: "Liam Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    milestone: "M4: Real-time Pipeline",
    dueDate: "Nov 25, 2026",
    subtasks: [
      { id: "st-4", title: "Allocate EGLImageKHR from CSI camera", done: true },
      { id: "st-5", title: "Benchmark latency reduction on 1080p@60fps stream", done: false }
    ],
    commitHash: "c412f8e",
    tags: ["CUDA", "C++", "Zero-Copy"]
  },
  {
    id: "TASK-112",
    title: "Draft Section 4.3: Telemetry packet loss under 5.9GHz DSRC",
    description: "Document multi-path fading simulation results using NS-3 network emulator with Nakagami-m channel model.",
    status: "in_review",
    priority: "P1",
    assignee: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    milestone: "M4: Real-time Pipeline",
    dueDate: "Nov 20, 2026",
    subtasks: [
      { id: "st-6", title: "Export NS-3 CSV packet delivery ratios", done: true },
      { id: "st-7", title: "Generate Matplotlib LaTeX vector figures", done: true },
      { id: "st-8", title: "Submit to Dr. Vance for preliminary feedback", done: true }
    ],
    commitHash: "f9901ad",
    tags: ["Thesis", "V2X", "LaTeX"]
  },
  {
    id: "TASK-101",
    title: "Benchmark Jetson Orin Nano vs Raspberry Pi 5 Hailo-8 TPU",
    description: "Comparative thermal dissipation, power draw (TDP), and FPS throughput on YOLOv8n and MobileNetV3.",
    status: "completed",
    priority: "P0",
    assignee: { name: "Alex Mercer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
    milestone: "M1: Hardware Selection",
    dueDate: "Oct 18, 2026",
    subtasks: [
      { id: "st-9", title: "Run 2-hour burn-in stress test", done: true },
      { id: "st-10", title: "Log power via INA219 shunt sensor", done: true },
      { id: "st-11", title: "Publish comparative matrix to Capstone Wiki", done: true }
    ],
    commitHash: "1e72bb0",
    tags: ["Hardware", "Benchmarking"]
  },
  {
    id: "TASK-115",
    title: "Setup GitHub Action matrix for ARM64 cross-compilation",
    description: "Automate Docker-based multi-arch builds for JetPack 6.0 and produce signed release deb packages.",
    status: "completed",
    priority: "P2",
    assignee: { name: "Kavya Patel", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80" },
    milestone: "M2: Infrastructure",
    dueDate: "Nov 04, 2026",
    subtasks: [
      { id: "st-12", title: "Configure QEMU binfmt-support on runner", done: true },
      { id: "st-13", title: "Upload build artifacts to S3 staging", done: true }
    ],
    commitHash: "4bb83c1",
    tags: ["DevOps", "CI/CD", "ARM64"]
  },
  {
    id: "TASK-120",
    title: "Implement Extended Kalman Filter for occlusion tracking",
    description: "Maintain vehicle bounding box trajectory across 30 consecutive frame occlusions at intersections.",
    status: "backlog",
    priority: "P1",
    assignee: { name: "Liam Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" },
    milestone: "M5: Real-world Validation",
    dueDate: "Dec 05, 2026",
    subtasks: [
      { id: "st-14", title: "Formulate state transition covariance matrix", done: false },
      { id: "st-15", title: "Implement Hungarian algorithm matching step", done: false }
    ],
    tags: ["Algorithms", "State-Estimation"]
  },
  {
    id: "TASK-124",
    title: "Hardware thermal stress testing under 45°C ambient",
    description: "Verify aluminum passive cooling enclosure maintains junction temp below 85°C during continuous inference.",
    status: "backlog",
    priority: "P0",
    assignee: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
    milestone: "M5: Real-world Validation",
    dueDate: "Dec 08, 2026",
    subtasks: [
      { id: "st-16", title: "Place prototype inside climate chamber", done: false }
    ],
    tags: ["Hardware", "Reliability"]
  }
];

export const initialMilestones = [
  {
    id: "M1",
    title: "M1: Literature Review & Edge Architecture Feasibility",
    status: "approved",
    progress: 100,
    dueDate: "Oct 12, 2026",
    deliverables: "Comprehensive state-of-the-art survey & hardware power analysis",
    grade: "96 / 100 (A)",
    reviewedBy: "Dr. Elena Vance",
    approvedAt: "2026-10-15T14:22:00Z",
    feedback: "Exceptional rigor in the edge computing trade-off analysis. Power budgeting is realistic for roadside poles."
  },
  {
    id: "M2",
    title: "M2: Core Neural Pipeline & Quantization Framework",
    status: "approved",
    progress: 100,
    dueDate: "Nov 02, 2026",
    deliverables: "TensorRT compilation pipeline with calibration scripts",
    grade: "94 / 100 (A)",
    reviewedBy: "Dr. Elena Vance",
    approvedAt: "2026-11-04T09:10:00Z",
    feedback: "Clean cross-compilation pipeline. Please ensure Cityscapes test validation runs are fully reproducible."
  },
  {
    id: "M3",
    title: "M3: Sub-20ms Edge Inference & Multi-Object Tracking",
    status: "pending_approval",
    progress: 92,
    dueDate: "Nov 18, 2026",
    deliverables: "Validated Jetson Orin Nano testbed telemetry with zero-copy pipeline",
    grade: "Pending Faculty Sign-off",
    reviewedBy: null,
    approvedAt: null,
    feedback: null
  },
  {
    id: "M4",
    title: "M4: Resilient V2X Mesh Networking Protocol",
    status: "in_progress",
    progress: 58,
    dueDate: "Dec 02, 2026",
    deliverables: "UDP multicast telemetry protocol with Nakagami-m simulation results",
    grade: "In Progress",
    reviewedBy: null,
    approvedAt: null,
    feedback: null
  },
  {
    id: "M5",
    title: "M5: Field Testbed Telemetry & Environmental Validation",
    status: "upcoming",
    progress: 0,
    dueDate: "Dec 16, 2026",
    deliverables: "Field test log on Broadway & 4th Street intersection testbed",
    grade: "Scheduled",
    reviewedBy: null,
    approvedAt: null,
    feedback: null
  },
  {
    id: "M6",
    title: "M6: Defense, Camera-Ready Thesis & Open-Source Release",
    status: "upcoming",
    progress: 0,
    dueDate: "Jan 12, 2027",
    deliverables: "Complete IEEE-formatted thesis, reproducible benchmarks & oral defense",
    grade: "Scheduled",
    reviewedBy: null,
    approvedAt: null,
    feedback: null
  }
];

export const initialDocuments = [
  {
    id: "doc-arch-spec",
    name: "System_Architecture_Spec_v2.4.pdf",
    category: "Architecture Specification",
    size: "4.2 MB",
    version: "v2.4",
    updatedAt: "2026-11-14T18:24:00Z",
    author: "Alex Mercer",
    status: "Pending Review",
    summary: "Complete blueprint detailing CSI sensor ingestion, TensorRT execution graphs, shared memory buffers, and 5.9GHz V2X broadcast framing.",
    contentPreview: `SECTION 3.2: JETSON ORIN NANO EMBEDDED INGESTION PIPELINE

The vision sensor interface utilizes four MIPI CSI-2 2-lane lanes connected directly to the NVIDIA Jetson Orin Nano carrier board. In order to sustain 60 frames per second at 1920x1080 resolution without dropping frames during high vehicle density events, the pipeline eliminates user-space buffer copies through NVIDIA DeepStream 6.3 hardware acceleration.

Raw Bayer frames are converted directly in NVMM (NVIDIA Memory Management) memory surfaces, routed through hardware NVDEC / VIC (Video Image Compositor), and fed to the TensorRT execution context. The quantized INT8 engine runs at an average inference latency of 14.8ms. Under high ambient temperatures (>40°C), thermal throttling has been observed to degrade clock frequency by 18%, requiring dynamic duty cycling.

SECTION 4.1: V2X BROADCAST TRANSMISSION SAFETY CRITICALITY

Telemetry packets comply with SAE J2735 Basic Safety Message (BSM) standards. When vehicle approach velocity exceeds 45 km/h with time-to-collision (TTC) under 2.4 seconds, emergency preemption packets are dispatched over direct DSRC 5.9GHz spectrum using priority queue 0.`,
    annotations: [
      {
        id: "ann-1",
        author: "Dr. Elena Vance",
        role: "Faculty Advisor",
        timestamp: "2026-11-15T11:02:00Z",
        highlightedText: "thermal throttling has been observed to degrade clock frequency by 18%, requiring dynamic duty cycling.",
        comment: "Critical point. Have you calculated whether duty cycling drops the frame rate below the 30 FPS safety requirement under sustained peak summer load? Include a thermal contingency graph.",
        resolved: false
      },
      {
        id: "ann-2",
        author: "Dr. Elena Vance",
        role: "Faculty Advisor",
        timestamp: "2026-11-15T11:15:00Z",
        highlightedText: "time-to-collision (TTC) under 2.4 seconds",
        comment: "Ensure you cite NHTSA 2024 guidance on minimum reaction threshold for urban automated braking here.",
        resolved: true
      }
    ]
  },
  {
    id: "doc-benchmark-rep",
    name: "Edge_Inference_Benchmark_Report.docx",
    category: "Technical Report",
    size: "2.8 MB",
    version: "v1.8",
    updatedAt: "2026-11-10T14:15:00Z",
    author: "Liam Chen",
    status: "Approved",
    summary: "Comparative analysis between TensorRT INT8, ONNX Runtime OpenVINO, and TensorFlow Lite across 5 edge hardware architectures.",
    contentPreview: `SECTION 2: BENCHMARK PROTOCOL AND METRIC DEFINITIONS

All tests were executed over 5,000 continuous frames using Cityscapes validation set. Latency was captured via hardware hardware timestamps on GPU stream sync events. Total power consumption was logged via external high-precision power analyzer.

Key findings:
1. Jetson Orin Nano INT8 achieved 14.2ms / frame at 7.8W TDP.
2. Raspberry Pi 5 + Hailo-8 achieved 16.5ms / frame at 5.2W TDP.
3. Quantization error for INT8 was 1.4% mAP loss compared to FP32 master weights.`,
    annotations: []
  },
  {
    id: "doc-ethics-eval",
    name: "Ethics_and_Privacy_Impact_v1.1.pdf",
    category: "Governance & Ethics",
    size: "1.1 MB",
    version: "v1.1",
    updatedAt: "2026-10-28T09:40:00Z",
    author: "Sarah Jenkins",
    status: "Approved",
    summary: "Compliance audit on edge facial blurring, license plate anonymization, and GDPR/CCPA data minimization protocols.",
    contentPreview: `SECTION 1: ON-DEVICE ZERO-RETENTION PRIVACY GUARANTEE

No raw video feeds are ever stored to non-volatile flash or transmitted over external networks. All facial and automotive license plate detections are irreversibly blurred directly within the camera sensor ASIC prior to frame delivery to the neural inference engine.`,
    annotations: []
  },
  {
    id: "doc-sprint3-deck",
    name: "Sprint_3_Faculty_Presentation.pptx",
    category: "Presentation Deck",
    size: "14.5 MB",
    version: "v3.0",
    updatedAt: "2026-11-02T16:30:00Z",
    author: "Alex Mercer",
    status: "Approved",
    summary: "Mid-semester defense presentation delivered to Capstone Evaluation Committee.",
    contentPreview: `Midterm Capstone Review Slide Summary:
- Project Goal: Real-time intelligent traffic preemption using roadside Edge-AI nodes.
- Current Status: Hardware testbed assembled, sensor calibration complete, 96% on Milestone 1.
- Next Steps: Finalize INT8 model compile and submit Milestone 3 for formal grading.`,
    annotations: []
  }
];

export const facultyTeams = [
  {
    id: "team-alpha",
    name: "Team Alpha // Edge-AI Traffic Telemetry",
    lead: "Alex Mercer",
    membersCount: 4,
    health: 94,
    status: "on_track",
    commitVelocity: "38 commits/wk",
    currentMilestone: "M3: Sub-20ms Edge Inference",
    milestoneProgress: 92,
    pendingDeliverables: 1,
    riskFactors: ["Mild thermal concern on Jetson under peak load"],
    lastActivity: "12m ago by Alex Mercer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "team-beta",
    name: "Team Beta // Quantum Key Distribution in P2P Nets",
    lead: "Dmitri Volkov",
    membersCount: 3,
    health: 54,
    status: "high_risk",
    commitVelocity: "4 commits/wk",
    currentMilestone: "M2: BB84 Protocol Simulation",
    milestoneProgress: 41,
    pendingDeliverables: 2,
    riskFactors: ["Overdue 8 days on milestone deliverable", "Cryogenic hardware simulator license expired", "Low commit frequency"],
    lastActivity: "4d ago by Dmitri Volkov",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "team-gamma",
    name: "Team Gamma // Autonomous Agricultural Drone Swarm",
    lead: "Sofia Rodriguez",
    membersCount: 5,
    health: 82,
    status: "in_review",
    commitVelocity: "24 commits/wk",
    currentMilestone: "M3: Swarm Collision Avoidance Mesh",
    milestoneProgress: 88,
    pendingDeliverables: 1,
    riskFactors: ["Pending FAA test permit approval for outdoor field testing"],
    lastActivity: "2h ago by Sofia Rodriguez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "team-delta",
    name: "Team Delta // Zero-Knowledge Medical Record Vault",
    lead: "Tariq Mansoor",
    membersCount: 4,
    health: 89,
    status: "on_track",
    commitVelocity: "21 commits/wk",
    currentMilestone: "M3: zk-SNARK Prover Optimization",
    milestoneProgress: 84,
    pendingDeliverables: 0,
    riskFactors: ["High memory consumption in browser WASM prover"],
    lastActivity: "5h ago by Tariq Mansoor",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  }
];

export const rbacMatrixData = [
  {
    id: "role-student",
    name: "Student Researcher",
    description: "Standard capstone candidate. Owns tasks, documents, and code execution.",
    usersCount: 142,
    permissions: {
      readProject: true,
      writeTasks: true,
      uploadDocuments: true,
      approveMilestones: false,
      gradeDeliverables: false,
      triggerAIEngine: true,
      viewAuditLogs: false,
      mutateRBAC: false
    }
  },
  {
    id: "role-lead",
    name: "Student Team Lead",
    description: "Team coordinator. Manages sprint backlogs, task assignments, and submission sign-offs.",
    usersCount: 38,
    permissions: {
      readProject: true,
      writeTasks: true,
      uploadDocuments: true,
      approveMilestones: false,
      gradeDeliverables: false,
      triggerAIEngine: true,
      viewAuditLogs: true,
      mutateRBAC: false
    }
  },
  {
    id: "role-faculty",
    name: "Faculty Advisor / Mentor",
    description: "Academic supervisor. Evaluates milestones, writes feedback, and grades submissions.",
    usersCount: 24,
    permissions: {
      readProject: true,
      writeTasks: true,
      uploadDocuments: true,
      approveMilestones: true,
      gradeDeliverables: true,
      triggerAIEngine: true,
      viewAuditLogs: true,
      mutateRBAC: false
    }
  },
  {
    id: "role-reviewer",
    name: "External Industry Reviewer",
    description: "Affiliated technical mentor. Reviews code quality, architecture specs, and security compliance.",
    usersCount: 12,
    permissions: {
      readProject: true,
      writeTasks: false,
      uploadDocuments: false,
      approveMilestones: false,
      gradeDeliverables: true,
      triggerAIEngine: false,
      viewAuditLogs: false,
      mutateRBAC: false
    }
  },
  {
    id: "role-admin",
    name: "Department Administrator",
    description: "Academic systems operator. Controls platform RBAC, project allocations, and compliance audits.",
    usersCount: 6,
    permissions: {
      readProject: true,
      writeTasks: true,
      uploadDocuments: true,
      approveMilestones: true,
      gradeDeliverables: true,
      triggerAIEngine: true,
      viewAuditLogs: true,
      mutateRBAC: true
    }
  }
];

export const initialAuditLogs = [
  {
    id: "audit-1092",
    timestamp: "2026-11-17T21:12:45Z",
    actor: "dr.vance@mit.edu",
    actorName: "Dr. Elena Vance",
    actorRole: "Faculty Advisor",
    action: "MILESTONE_STATUS_CHANGE",
    resource: "Milestone 3: Sub-20ms Edge Inference",
    ipHash: "198.51.100.42",
    severity: "INFO",
    status: "SUCCESS",
    details: "Reviewed testbed telemetry dataset and issued preliminary remarks."
  },
  {
    id: "audit-1091",
    timestamp: "2026-11-17T19:40:12Z",
    actor: "alex.mercer@student.edu",
    actorName: "Alex Mercer",
    actorRole: "Student Lead",
    action: "DOCUMENT_UPLOAD",
    resource: "System_Architecture_Spec_v2.4.pdf",
    ipHash: "203.0.113.19",
    severity: "INFO",
    status: "SUCCESS",
    details: "Uploaded revision v2.4 with updated DeepStream memory mapping."
  },
  {
    id: "audit-1090",
    timestamp: "2026-11-17T17:28:09Z",
    actor: "ai-copilot-engine",
    actorName: "Aetheris AI Service",
    actorRole: "System Bot",
    action: "AI_RISK_SCAN_EXECUTED",
    resource: "Team Beta: Quantum Key Distribution",
    ipHash: "internal-mesh",
    severity: "WARN",
    status: "SUCCESS",
    details: "Automated risk flag raised: Sprint commitment velocity dropped below 15% threshold."
  },
  {
    id: "audit-1089",
    timestamp: "2026-11-17T14:15:33Z",
    actor: "marcus.thorne@admin.edu",
    actorName: "Marcus Thorne",
    actorRole: "Administrator",
    action: "PERMISSION_MUTATED",
    resource: "Role: External Reviewer",
    ipHash: "192.0.2.88",
    severity: "SECURITY",
    status: "SUCCESS",
    details: "Revoked direct write access to Capstone repository master branches."
  },
  {
    id: "audit-1088",
    timestamp: "2026-11-17T11:05:21Z",
    actor: "sarah.j@student.edu",
    actorName: "Sarah Jenkins",
    actorRole: "Student Researcher",
    action: "TASK_STATE_TRANSITION",
    resource: "TASK-112: Draft Section 4.3 Telemetry",
    ipHash: "198.51.100.17",
    severity: "INFO",
    status: "SUCCESS",
    details: "Moved task from 'In Progress' to 'In Review'."
  },
  {
    id: "audit-1087",
    timestamp: "2026-11-16T16:50:00Z",
    actor: "dr.vance@mit.edu",
    actorName: "Dr. Elena Vance",
    actorRole: "Faculty Advisor",
    action: "ANNOTATION_PINNED",
    resource: "System_Architecture_Spec_v2.4.pdf#L34",
    ipHash: "198.51.100.42",
    severity: "INFO",
    status: "SUCCESS",
    details: "Added comment regarding Jetson Orin Nano thermal mitigation limits."
  }
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Mentor Feedback Received",
    message: "Dr. Elena Vance pinned 2 annotations on System Architecture Spec v2.4.",
    time: "25m ago",
    type: "feedback",
    unread: true
  },
  {
    id: "notif-2",
    title: "AI Risk Analyzer Alert",
    message: "Team Beta commit velocity stalled for 8 days. Mentorship intervention recommended.",
    time: "2h ago",
    type: "risk",
    unread: true
  },
  {
    id: "notif-3",
    title: "Milestone Deliverable Pending",
    message: "Milestone 3 deliverable awaiting final faculty approval sign-off.",
    time: "4h ago",
    type: "milestone",
    unread: false
  },
  {
    id: "notif-4",
    title: "Build Successful",
    message: "ARM64 cross-compilation pipeline passed on commit a8f9c12.",
    time: "1d ago",
    type: "system",
    unread: false
  }
];

export const aiRecommendations = [
  {
    id: "rec-1",
    title: "Implement Jetson Dynamic Frequency Scaling (DFS) Throttle Guard",
    reasoning: "Analysis of telemetry reveals GPU frequency throttles by 18% when temperature reaches 78°C. Adding an active PID duty cycler will maintain steady 30 FPS.",
    priority: "P0",
    estimatedHours: 8,
    suggestedAssignee: "Alex Mercer",
    tags: ["Thermal", "CUDA", "Driver"],
    suggestedTask: {
      title: "Implement PID duty-cycle daemon for Jetson thermal regulation",
      description: "Sample tegrastats every 500ms; smoothly throttle frame intake rate before thermal junction hits 82°C.",
      priority: "P0",
      status: "in_progress",
      milestone: "M3: Sub-20ms Edge Inference",
      tags: ["Thermal-Safety", "Jetson", "Edge-AI"]
    }
  },
  {
    id: "rec-2",
    title: "Add Automated Cityscapes mAP Regression Test to CI",
    reasoning: "INT8 quantization drift can silently degrade precision on small vehicle classes. Integrating 50 validation samples into GitHub Actions ensures safety gates.",
    priority: "P1",
    estimatedHours: 4,
    suggestedAssignee: "Kavya Patel",
    tags: ["CI/CD", "Testing", "Quantization"],
    suggestedTask: {
      title: "Integrate automated INT8 mAP regression test in CI pipeline",
      description: "Fail build if mAP@50 drops more than 2% relative to FP16 model checkpoint on Cityscapes subset.",
      priority: "P1",
      status: "backlog",
      milestone: "M3: Sub-20ms Edge Inference",
      tags: ["Regression-Test", "Cityscapes", "Accuracy"]
    }
  },
  {
    id: "rec-3",
    title: "Draft LaTeX Section 5: Hardware Power Envelope Validation",
    reasoning: "Sprint 4 milestone guidelines require a dedicated empirical power breakdown table before oral defense.",
    priority: "P2",
    estimatedHours: 6,
    suggestedAssignee: "Sarah Jenkins",
    tags: ["Thesis", "LaTeX", "Empirical"],
    suggestedTask: {
      title: "Draft Section 5.1: Power dissipation vs frame throughput curves",
      description: "Plot INA219 shunt measurement curves against Hailo-8 and Orin Nano inside LaTeX PGFPlots.",
      priority: "P2",
      status: "backlog",
      milestone: "M4: Resilient V2X Mesh Networking Protocol",
      tags: ["Thesis-Draft", "Power-Metrics"]
    }
  }
];
