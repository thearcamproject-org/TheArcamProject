export const MOCK_ADMIN = {
  username: "admin",
  password: "adminpassword" // Simple password for testing
};

// We use let so we can update it in memory during the session
export let MOCK_USERS = [
  {
    id: "user_1",
    clientName: "Zenith Holdings",
    projectKey: "ZENITH-2026", // Mock key
    projectDetails: {
      name: "Zenith Capital Systems",
      tier: "Authority Builder (Tier III)",
      investment: "₹1,85,000",
      startDate: "2026-05-10",
      status: "In Development", // Active Phase
      addons: ["Advanced SEO", "Copywriting"]
    },
    updates: [
      { id: 1, date: "2026-05-10", message: "Project kick-off successful. Wireframing phase has commenced.", sender: "Admin" },
      { id: 2, date: "2026-05-12", message: "Initial wireframes have been completed and are ready for your review.", sender: "Admin" }
    ]
  },
  {
    id: "user_2",
    clientName: "Aura Real Estate",
    projectKey: "AURA-8888", // Mock key
    projectDetails: {
      name: "Aura Global Residences",
      tier: "Growth Engine (Tier II)",
      investment: "₹1,10,000",
      startDate: "2026-05-14",
      status: "Pending Kick-off", // New Phase
      addons: ["E-commerce Integration"]
    },
    updates: []
  },
  {
    id: "user_3",
    clientName: "Nova Studios",
    projectKey: "NOVA-9999", // Mock key
    projectDetails: {
      name: "Nova Visuals Portfolio",
      tier: "Digital Foundation (Tier I)",
      investment: "₹50,000",
      startDate: "2026-04-01",
      status: "Completed", // Completed Phase
      addons: []
    },
    updates: [
      { id: 1, date: "2026-04-01", message: "Project kick-off.", sender: "Admin" },
      { id: 2, date: "2026-04-15", message: "Final deployment successful. Handoff complete.", sender: "Admin" }
    ]
  }
];

export const addUpdateToUser = (userId, message) => {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    user.updates.push({
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      message,
      sender: "Admin"
    });
    return true;
  }
  return false;
};

export const updateUserStatus = (userId, newStatus) => {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    user.projectDetails.status = newStatus;
    return true;
  }
  return false;
};
