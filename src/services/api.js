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
  }
};
