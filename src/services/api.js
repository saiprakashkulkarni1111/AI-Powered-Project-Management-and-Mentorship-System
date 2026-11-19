/**
 * AETHERIS REST API Adapter Service
 * Designed to seamlessly interface with a Python Flask REST API backend.
 * Uses realistic endpoints with simulated async latency.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api/v1";

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  // Project endpoints
  getProject: async (projectId = "proj_edge_ai_2026") => {
    await delay();
    return { status: 200, success: true, data: { id: projectId } };
  },

  // Task endpoints
  createTask: async (taskPayload) => {
    await delay(220);
    return {
      status: 201,
      success: true,
      data: {
        ...taskPayload,
        id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
        createdAt: new Date().toISOString()
      }
    };
  },

  updateTaskStatus: async (taskId, newStatus) => {
    await delay(120);
    return { status: 200, success: true, data: { id: taskId, status: newStatus } };
  },

  deleteTask: async (taskId) => {
    await delay(150);
    return { status: 200, success: true, data: { id: taskId } };
  },

  // Milestone actions
  approveMilestone: async (milestoneId, reviewerName, feedback) => {
    await delay(250);
    return {
      status: 200,
      success: true,
      data: {
        id: milestoneId,
        status: "approved",
        reviewedBy: reviewerName,
        approvedAt: new Date().toISOString(),
        grade: "96 / 100 (A)",
        feedback: feedback || "Verified and approved by faculty committee."
      }
    };
  },

  requestMilestoneRevision: async (milestoneId, notes) => {
    await delay(200);
    return {
      status: 200,
      success: true,
      data: {
        id: milestoneId,
        status: "revision_requested",
        feedback: notes
      }
    };
  },

  // Document annotations
  saveAnnotation: async (docId, annotation) => {
    await delay(180);
    return {
      status: 201,
      success: true,
      data: {
        ...annotation,
        id: `ann-${Date.now()}`,
        timestamp: new Date().toISOString()
      }
    };
  },

  // AI tools
  generateRoadmap: async (proposalText) => {
    await delay(800); // realistic AI inference simulation
    return {
      status: 200,
      success: true,
      data: {
        sprintsGenerated: 4,
        confidence: 0.94,
        milestones: [
          "Phase 1: Sensor Hardware Ingestion & Calibration",
          "Phase 2: INT8 TensorRT Engine Compilation",
          "Phase 3: 5.9GHz V2X Mesh Transmission Pipeline",
          "Phase 4: Field Latency & Thesis Defense"
        ]
      }
    };
  },

  analyzeRiskTelemetry: async (projectId) => {
    await delay(600);
    return {
      status: 200,
      success: true,
      data: {
        telemetryScore: 88,
        bottlenecksIdentified: 1,
        recommendation: "Thermal headroom throttles at 82°C. Mitigate with active duty cycle."
      }
    };
  },

  generateProjectBlueprint: async ({ idea, profile }) => {
    await delay(900);
    return {
      status: 200,
      success: true,
      data: {
        idea,
        generatedAt: new Date().toISOString(),
        feasibility: {
          score: 86,
          verdict: "Feasible with a focused MVP",
          reasoning: `The idea is achievable within an academic timeline using ${profile?.skills?.slice(0, 2).join(' and ') || 'the selected skills'} as the foundation.`
        },
        scope: {
          objective: "Build and validate a measurable MVP with a clearly bounded research question.",
          inScope: [
            "Core workflow and measurable success criteria",
            "A reproducible validation dataset or test plan",
            "Technical documentation and progress evidence"
          ],
          outOfScope: [
            "Production-scale infrastructure",
            "Unvalidated features beyond the academic research question"
          ]
        },
        technologyStack: [
          { category: "Frontend", recommendation: "React + Tailwind CSS", reasoning: "Fast iteration for an interactive academic workspace." },
          { category: "Backend", recommendation: "Flask REST API", reasoning: "Simple, testable service boundary for project and mentor workflows." },
          { category: "AI", recommendation: "Agent orchestration with an external LLM API", reasoning: "Supports specialized feasibility, planning, risk, and report agents." },
          { category: "Data", recommendation: "MySQL + document storage", reasoning: "Separates structured project data from generated artifacts." }
        ],
        weeklyPlan: [
          { week: 1, title: "Profile and research framing", outcome: "Complete skill assessment and define the research question." },
          { week: 2, title: "Feasibility and scope", outcome: "Validate constraints, acceptance criteria, and MVP boundaries." },
          { week: 3, title: "Technology spike", outcome: "Prototype the riskiest technical dependency." },
          { week: 4, title: "Core implementation", outcome: "Deliver the first measurable end-to-end workflow." },
          { week: 5, title: "Validation and risk mitigation", outcome: "Run tests, resolve blockers, and update the plan." },
          { week: 6, title: "Documentation and mentor review", outcome: "Generate reports and prepare the faculty review package." }
        ],
        risks: [
          { level: "High", risk: "Scope expansion", mitigation: "Freeze the MVP acceptance criteria before implementation." },
          { level: "Medium", risk: "Insufficient validation data", mitigation: "Define a repeatable dataset and baseline in week 1." },
          { level: "Medium", risk: "Unfamiliar technology", mitigation: "Time-box a technical spike before committing to the stack." }
        ]
      }
    };
  },

  askMentor: async ({ message, blueprint }) => {
    await delay(500);
    return {
      status: 200,
      success: true,
      data: {
        message: `For "${blueprint?.idea || 'your project'}", start by turning your question into one measurable next step: ${message.trim()} Define the expected evidence, complete that step this week, and share the result with your faculty mentor.`
      }
    };
  },

  generateProjectReport: async ({ type, blueprint, profile }) => {
    await delay(700);
    const reportTitles = {
      synopsis: "Project Synopsis",
      methodology: "Project Methodology",
      progress: "Project Progress Report"
    };
    return {
      status: 201,
      success: true,
      data: {
        id: `report-${Date.now()}`,
        name: `${reportTitles[type] || "Project Report"} - ${new Date().toISOString().slice(0, 10)}.txt`,
        type,
        title: reportTitles[type] || "Project Report",
        generatedAt: new Date().toISOString(),
        content: [
          reportTitles[type] || "Project Report",
          "",
          `Project idea: ${blueprint?.idea || "Not submitted"}`,
          `Student: ${profile?.name || "Student researcher"}`,
          "",
          type === "synopsis"
            ? blueprint?.feasibility?.reasoning
            : type === "methodology"
              ? `Recommended stack: ${blueprint?.technologyStack?.map((item) => item.recommendation).join(", ") || "To be defined"}`
              : `Current plan: ${blueprint?.weeklyPlan?.[0]?.title || "Complete the project blueprint first."}`
        ].join("\n")
      }
    };
  }
};
