import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialProject,
  initialTasks,
  initialMilestones,
  initialDocuments,
  facultyTeams,
  rbacMatrixData,
  initialAuditLogs,
  initialNotifications,
  aiRecommendations
} from '../data/mockData';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current RBAC Role: 'student' | 'mentor' | 'admin'
  const [role, setRole] = useState('student');

  // Simulated User Profile based on role
  const users = {
    student: {
      name: "Alex Mercer",
      email: "alex.mercer@student.edu",
      title: "Lead Architect & Student Researcher",
      badge: "Student Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    mentor: {
      name: "Dr. Elena Vance",
      email: "elena.vance@mit.edu",
      title: "Associate Professor & Capstone Director",
      badge: "Faculty Advisor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    admin: {
      name: "Marcus Thorne",
      email: "marcus.thorne@admin.edu",
      title: "Academic Systems Administrator",
      badge: "System Admin",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
    }
  };

  const currentUser = users[role];

  // Core Data States
  const [project, setProject] = useState(initialProject);
  const [tasks, setTasks] = useState(initialTasks);
  const [milestones, setMilestones] = useState(initialMilestones);
  const [documents, setDocuments] = useState(initialDocuments);
  const [teams, setTeams] = useState(facultyTeams);
  const [rbacMatrix, setRbacMatrix] = useState(rbacMatrixData);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [recommendations, setRecommendations] = useState(aiRecommendations);
  const [studentProfile, setStudentProfile] = useState({
    name: 'Alex Mercer',
    academicLevel: 'Senior undergraduate',
    skills: ['React', 'Python', 'Machine Learning'],
    interests: 'Intelligent edge systems and applied AI'
  });
  const [projectBlueprint, setProjectBlueprint] = useState(null);
  const [blueprintGenerating, setBlueprintGenerating] = useState(false);
  const [mentorMessages, setMentorMessages] = useState([]);
  const [generatedReports, setGeneratedReports] = useState([]);

  // UI Interactive States
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  // Start at the identity gateway so each profile enters through its own workspace.
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [aiActiveTab, setAiActiveTab] = useState('recommendations'); // 'recommendations' | 'roadmap' | 'risk'
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null); // for split-screen preview
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudentView, setActiveStudentView] = useState('kanban'); // 'kanban' | 'timeline' | 'documents'
  const [activeMentorView, setActiveMentorView] = useState('teams'); // 'teams' | 'approvals' | 'analytics'
  const [activeAdminView, setActiveAdminView] = useState('matrix'); // 'matrix' | 'analytics' | 'audit'

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const loginAs = (newRole) => {
    setRole(newRole);
    setShowLoginPage(false);
    logAudit('USER_AUTHENTICATED', `Logged in as ${users[newRole].name} (${users[newRole].badge})`, 'INFO', `Switched identity via Login Gateway`);
  };

  const logout = () => {
    setShowLoginPage(true);
    logAudit('USER_LOGGED_OUT', currentUser.name, 'INFO', 'User signed out to Login Gateway');
  };

  // Helper to log audit actions
  const logAudit = (action, resource, severity = 'INFO', details = '') => {
    const newLog = {
      id: `audit-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: currentUser.email,
      actorName: currentUser.name,
      actorRole: currentUser.badge,
      action,
      resource,
      ipHash: "198.51.100.82",
      severity,
      status: "SUCCESS",
      details
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Task Actions
  const addTask = async (newTaskData) => {
    const response = await api.createTask(newTaskData);
    if (response.success) {
      const created = {
        ...response.data,
        assignee: newTaskData.assignee || currentUser,
        subtasks: newTaskData.subtasks || [],
        tags: newTaskData.tags || ["Edge-AI"]
      };
      setTasks((prev) => [created, ...prev]);
      logAudit('TASK_CREATED', created.title, 'INFO', `Task created under milestone ${created.milestone}`);
      return created;
    }
  };

  const moveTask = async (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    const task = tasks.find((t) => t.id === taskId);
    logAudit('TASK_STATE_TRANSITION', task ? task.title : taskId, 'INFO', `Moved to ${newStatus}`);
    await api.updateTaskStatus(taskId, newStatus);
  };

  const deleteTask = async (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    logAudit('TASK_DELETED', task ? task.title : taskId, 'WARN', 'Task permanently purged');
    await api.deleteTask(taskId);
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = (task.subtasks || []).map((st) =>
            st.id === subtaskId ? { ...st, done: !st.done } : st
          );
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      })
    );
  };

  // Milestone Actions
  const approveMilestone = async (milestoneId, feedback) => {
    const res = await api.approveMilestone(milestoneId, currentUser.name, feedback);
    if (res.success) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status: 'approved',
                reviewedBy: currentUser.name,
                approvedAt: new Date().toISOString(),
                grade: '96 / 100 (A)',
                feedback: feedback || "Deliverable verified according to IEEE Capstone Criteria."
              }
            : m
        )
      );
      // Update team alpha pending deliverables
      setTeams((prev) =>
        prev.map((tm) =>
          tm.id === 'team-alpha'
            ? { ...tm, pendingDeliverables: Math.max(0, tm.pendingDeliverables - 1), health: 98 }
            : tm
        )
      );
      logAudit('MILESTONE_APPROVED', `Milestone ${milestoneId}`, 'INFO', `Sign-off granted by ${currentUser.name}`);
      
      // Add notification for students
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          title: "Milestone Verified & Signed Off",
          message: `${currentUser.name} signed off on Milestone ${milestoneId} with grade: 96 / 100 (A).`,
          time: "Just now",
          type: "milestone",
          unread: true
        },
        ...prev
      ]);
    }
  };

  const requestRevision = async (milestoneId, notes) => {
    const res = await api.requestMilestoneRevision(milestoneId, notes);
    if (res.success) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId
            ? { ...m, status: 'revision_requested', feedback: notes }
            : m
        )
      );
      logAudit('MILESTONE_REVISION_REQUESTED', `Milestone ${milestoneId}`, 'WARN', notes);
    }
  };

  // Document Annotation Actions
  const addDocumentAnnotation = async (docId, annotationData) => {
    const newAnn = {
      id: `ann-${Date.now()}`,
      author: currentUser.name,
      role: currentUser.badge,
      timestamp: new Date().toISOString(),
      highlightedText: annotationData.highlightedText,
      comment: annotationData.comment,
      resolved: false
    };

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            annotations: [newAnn, ...(doc.annotations || [])]
          };
        }
        return doc;
      })
    );

    // Keep selected document in sync
    if (selectedDocument && selectedDocument.id === docId) {
      setSelectedDocument((prev) => ({
        ...prev,
        annotations: [newAnn, ...(prev.annotations || [])]
      }));
    }

    logAudit('ANNOTATION_PINNED', `${docId}`, 'INFO', `Comment added: "${annotationData.comment.slice(0, 45)}..."`);
  };

  const resolveAnnotation = (docId, annotationId) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            annotations: (doc.annotations || []).map((ann) =>
              ann.id === annotationId ? { ...ann, resolved: true } : ann
            )
          };
        }
        return doc;
      })
    );

    if (selectedDocument && selectedDocument.id === docId) {
      setSelectedDocument((prev) => ({
        ...prev,
        annotations: (prev.annotations || []).map((ann) =>
          ann.id === annotationId ? { ...ann, resolved: true } : ann
        )
      }));
    }
  };

  const uploadDocument = (docMetadata) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      name: docMetadata.name,
      category: docMetadata.category || "Research Deliverable",
      size: docMetadata.size || "3.4 MB",
      version: docMetadata.version || "v1.0",
      updatedAt: new Date().toISOString(),
      author: currentUser.name,
      status: "Pending Review",
      summary: docMetadata.summary || "Newly submitted technical deliverable for capstone evaluation.",
      contentPreview: docMetadata.contentPreview || "Uploaded document preview content.",
      annotations: []
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logAudit('DOCUMENT_UPLOADED', newDoc.name, 'INFO', `Uploaded version ${newDoc.version}`);
  };

  const saveStudentProfile = (profile) => {
    setStudentProfile(profile);
    logAudit('STUDENT_PROFILE_UPDATED', profile.name, 'INFO', 'Skill assessment and academic interests updated');
  };

  const generateProjectBlueprint = async (idea, profile = studentProfile) => {
    if (!idea.trim()) {
      return null;
    }

    setBlueprintGenerating(true);
    try {
      const response = await api.generateProjectBlueprint({ idea: idea.trim(), profile });
      if (!response.success) {
        throw new Error('Project blueprint generation failed');
      }
      setProjectBlueprint(response.data);
      logAudit('PROJECT_BLUEPRINT_GENERATED', idea.trim(), 'INFO', 'Multi-agent planning pipeline completed');
      return response.data;
    } finally {
      setBlueprintGenerating(false);
    }
  };

  const sendMentorMessage = async (message) => {
    if (!message.trim()) {
      return null;
    }

    const userMessage = {
      id: `message-${Date.now()}`,
      role: 'student',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };
    setMentorMessages((prev) => [...prev, userMessage]);

    const response = await api.askMentor({ message, blueprint: projectBlueprint });
    if (!response.success) {
      throw new Error('Mentor response failed');
    }

    const mentorMessage = {
      id: `message-${Date.now()}-mentor`,
      role: 'mentor',
      content: response.data.message,
      timestamp: new Date().toISOString()
    };
    setMentorMessages((prev) => [...prev, mentorMessage]);
    return mentorMessage;
  };

  const generateProjectReport = async (type) => {
    const response = await api.generateProjectReport({
      type,
      blueprint: projectBlueprint,
      profile: studentProfile
    });
    if (!response.success) {
      throw new Error('Project report generation failed');
    }
    setGeneratedReports((prev) => [response.data, ...prev]);
    logAudit('REPORT_GENERATED', response.data.title, 'INFO', `Generated ${type} report`);
    return response.data;
  };

  // AI Actions: Apply Recommended Task to Board
  const applyRecommendationToBoard = async (recId) => {
    const rec = recommendations.find((r) => r.id === recId);
    if (!rec) return;

    const newTask = {
      title: rec.suggestedTask.title,
      description: rec.suggestedTask.description,
      status: rec.suggestedTask.status || 'in_progress',
      priority: rec.priority,
      assignee: { name: rec.suggestedAssignee, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" },
      milestone: rec.suggestedTask.milestone,
      dueDate: "Dec 04, 2026",
      subtasks: [
        { id: `st-${Date.now()}-1`, title: "Execute initial benchmark run", done: false },
        { id: `st-${Date.now()}-2`, title: "Submit telemetry logs to repository", done: false }
      ],
      commitHash: "ai-synth",
      tags: rec.tags
    };

    await addTask(newTask);

    // Remove recommendation or mark as applied
    setRecommendations((prev) => prev.filter((r) => r.id !== recId));
    logAudit('AI_RECOMMENDATION_APPLIED', rec.title, 'INFO', `AI-generated task injected into Kanban`);
  };

  // RBAC Permission Toggle
  const togglePermission = (roleId, permissionKey) => {
    setRbacMatrix((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          const updated = {
            ...r,
            permissions: {
              ...r.permissions,
              [permissionKey]: !r.permissions[permissionKey]
            }
          };
          logAudit('PERMISSION_MUTATED', `${r.name} -> ${permissionKey}`, 'SECURITY', `Toggled to ${updated.permissions[permissionKey]}`);
          return updated;
        }
        return r;
      })
    );
  };

  // Notification helpers
  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, unread: false } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        users,
        project,
        setProject,
        tasks,
        addTask,
        moveTask,
        deleteTask,
        toggleSubtask,
        milestones,
        approveMilestone,
        requestRevision,
        documents,
        uploadDocument,
        studentProfile,
        saveStudentProfile,
        projectBlueprint,
        blueprintGenerating,
        generateProjectBlueprint,
        mentorMessages,
        sendMentorMessage,
        generatedReports,
        generateProjectReport,
        selectedDocument,
        setSelectedDocument,
        addDocumentAnnotation,
        resolveAnnotation,
        teams,
        setTeams,
        rbacMatrix,
        togglePermission,
        auditLogs,
        logAudit,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        recommendations,
        applyRecommendationToBoard,
        // UI Navigation & Modals
        commandPaletteOpen,
        setCommandPaletteOpen,
        aiDrawerOpen,
        setAiDrawerOpen,
        aiActiveTab,
        setAiActiveTab,
        createTaskModalOpen,
        setCreateTaskModalOpen,
        authModalOpen,
        setAuthModalOpen,
        showLoginPage,
        setShowLoginPage,
        loginAs,
        logout,
        searchQuery,
        setSearchQuery,
        activeStudentView,
        setActiveStudentView,
        activeMentorView,
        setActiveMentorView,
        activeAdminView,
        setActiveAdminView
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
