import { createContext, useContext, useState, useEffect } from "react";
import { ROLE_PERMISSIONS } from "../data/permissions";

const readLocalStorage = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const defaultUsers = [
  {
    id: 1,
    name: "System Admin",
    email: "admin@aegiscare.com",
    role: "admin",
    status: "Active",
    plan: "Enterprise",
    serviceStart: "2026-01-01",
    serviceEnd: "2027-01-01",
    services: ["AI Fleet Tracking", "Secure Access Control", "Analytics Suite"],
    phone: "+91 98765 43210",
    address: "AegisCore HQ",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    emergencyContact: "+91 90000 11111",
    avatar: "SA",
  },
  {
    id: 2,
    name: "Ava Patel",
    email: "user@aegiscare.com",
    role: "user",
    status: "Active",
    plan: "Essential",
    serviceStart: "2026-08-01",
    serviceEnd: "2026-12-31",
    services: ["Fleet Monitoring", "Medication Alerts"],
    phone: "+91 98765 12345",
    address: "22 Lakeview Residency",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    emergencyContact: "+91 98200 99881",
    avatar: "AP",
    ownedRobotId: "AegisCare-AC001",
  },
  {
    id: 3,
    name: "Daniel Ng",
    email: "daniel.ng@aegiscare.com",
    role: "user",
    status: "Active",
    plan: "Essential",
    serviceStart: "2026-08-12",
    serviceEnd: "2026-11-30",
    services: ["Fleet Monitoring"],
    phone: "+91 88440 11223",
    address: "15 Green Park",
    city: "Delhi",
    state: "Delhi",
    country: "India",
    emergencyContact: "+91 98111 99887",
    avatar: "DN",
  },
  {
    id: 4,
    name: "Leena Thomas",
    email: "leena.thomas@aegiscare.com",
    role: "user",
    status: "Pending",
    plan: "Advanced",
    serviceStart: "2026-08-20",
    serviceEnd: "2026-12-31",
    services: ["Fleet Monitoring", "Care Insights"],
    phone: "+91 98333 55667",
    address: "8 Violet Heights",
    city: "Kochi",
    state: "Kerala",
    country: "India",
    emergencyContact: "+91 99000 77889",
    avatar: "LT",
  },
  {
    id: 5,
    name: "Ryan Brooks",
    email: "ryan.brooks@aegiscare.com",
    role: "user",
    status: "Active",
    plan: "Advanced",
    serviceStart: "2026-07-04",
    serviceEnd: "2026-10-31",
    services: ["Fleet Monitoring", "Medication Alerts", "Inspections"],
    phone: "+91 99666 44112",
    address: "72 Whitefield Avenue",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    emergencyContact: "+91 98224 76767",
    avatar: "RB",
  },
  {
    id: 6,
    name: "Sara Iqbal",
    email: "sara.iqbal@aegiscare.com",
    role: "user",
    status: "Disabled",
    plan: "Essential",
    serviceStart: "2026-06-11",
    serviceEnd: "2026-09-30",
    services: ["Medication Alerts"],
    phone: "+91 98555 32144",
    address: "31 Lotus Lane",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    emergencyContact: "+91 97999 33221",
    avatar: "SI",
  },
];

const defaultRobots = [
  {
    id: "RBT-101",
    name: "Astra Scout",
    type: "Ground Patrol",
    status: "Active",
    zone: "Ward A",
    load: 78,
    battery: 92,
    task: "Medicine run",
    ownerId: 2,
    ownerName: "Ava Patel",
    model: "AegisCare-AC001",
  },
  { id: "RBT-102", name: "Nimbus Care", type: "Delivery Robot", status: "Charging", zone: "Service Bay", load: 46, battery: 58, task: "Dock reset" },
  { id: "RBT-103", name: "Eclipse Relay", type: "Security Drone", status: "Active", zone: "Gate 04", load: 83, battery: 89, task: "Perimeter scan" },
  { id: "RBT-104", name: "Helio Helper", type: "Assist Unit", status: "Standby", zone: "Pharmacy", load: 51, battery: 64, task: "Inventory check" },
];

const defaultProducts = [
  {
    id: "home",
    name: "AegisCare Home",
    model: "AC-HOME-01",
    price: 89999,
    description: "A compact companion robot for automated health reminders and home monitoring.",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a1f8?auto=format&fit=crop&w=1200&q=80",
    features: ["AI health reminders", "Home patrol", "Night monitoring"],
    availability: "In stock",
    status: "Available",
    warranty: "18 months service" ,
    sensors: ["Motion", "Vision", "Sound"],
    aiCapabilities: ["Sleep pattern tracking", "Medication reminders"],
    navigation: ["Room mapping", "Obstacle detection"],
  },
  {
    id: "pro",
    name: "AegisCare Pro",
    model: "AC-PRO-02",
    price: 134999,
    description: "Premium autonomous care robot for proactive care delivery and monitoring.",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1200&q=80",
    features: ["Multi-room navigation", "Medication delivery", "Fall detection"],
    availability: "Limited stock",
    status: "Popular",
    warranty: "24 months service",
    sensors: ["Thermal", "LiDAR", "Vision"],
    aiCapabilities: ["Predictive alerts", "Care scheduling"],
    navigation: ["Map-based routing", "Adaptive obstacle avoidance"],
  },
  {
    id: "careplus",
    name: "AegisCare Care+",
    model: "AC-CARE-PLUS",
    price: 189999,
    description: "High-capability robotic care assistant for advanced family support and wellness monitoring.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    features: ["Advanced monitoring", "Smart scheduling", "Emergency response"],
    availability: "Pre-order",
    status: "New",
    warranty: "36 months service",
    sensors: ["Multi-sensor fusion", "Haptics", "Vision"],
    aiCapabilities: ["Emergency detection", "Adaptive care response"],
    navigation: ["Floor-aware route planning", "Autonomous docking"],
  },
];

const defaultPurchaseRequests = [
  {
    id: "PR-1001",
    customerId: 2,
    customerName: "Ava Patel",
    email: "user@aegiscare.com",
    productId: "pro",
    productName: "AegisCare Pro",
    price: 134999,
    requestDate: "2026-08-31",
    status: "Approved",
    notes: "Home care package",
  },
];

const defaultSupportTickets = [
  {
    id: "SUP-001",
    customerId: 2,
    customerName: "Ava Patel",
    subject: "Robot is not charging",
    status: "In Progress",
    createdAt: "2026-08-30",
    priority: "High",
    description: "The robot is showing battery drop despite being docked overnight.",
  },
];

const defaultContactMessages = [
  {
    id: "MSG-001",
    name: "Ava Patel",
    email: "user@aegiscare.com",
    phone: "+91 98765 12345",
    subject: "General enquiry",
    message: "Looking for more details about AegisCare Pro and installation timeline.",
    status: "Resolved",
    createdAt: "2026-08-28",
  },
];

const defaultNotifications = [
  { id: 1, type: "purchase", title: "Purchase request received", message: "Ava Patel submitted a request for AegisCare Pro." },
  { id: 2, type: "support", title: "Support update", message: "Ticket SUP-001 is now being reviewed." },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readLocalStorage("aegiscare_user", null));
  const [userDirectory, setUserDirectory] = useState(() => readLocalStorage("aegiscare_users", defaultUsers));
  const [robotDirectory, setRobotDirectory] = useState(() => readLocalStorage("aegiscare_robots", defaultRobots));
  const [productDirectory, setProductDirectory] = useState(() => readLocalStorage("aegiscare_products", defaultProducts));
  const [purchaseRequests, setPurchaseRequests] = useState(() => readLocalStorage("aegiscare_purchase_requests", defaultPurchaseRequests));
  const [supportTickets, setSupportTickets] = useState(() => readLocalStorage("aegiscare_support_tickets", defaultSupportTickets));
  const [contactMessages, setContactMessages] = useState(() => readLocalStorage("aegiscare_contact_messages", defaultContactMessages));
  const [notifications, setNotifications] = useState(() => readLocalStorage("aegiscare_notifications", defaultNotifications));
  const [isAdminPreview, setIsAdminPreview] = useState(false);
  const [previewUserId, setPreviewUserId] = useState(null);

  useEffect(() => { localStorage.setItem("aegiscare_users", JSON.stringify(userDirectory)); }, [userDirectory]);
  useEffect(() => { localStorage.setItem("aegiscare_robots", JSON.stringify(robotDirectory)); }, [robotDirectory]);
  useEffect(() => { localStorage.setItem("aegiscare_products", JSON.stringify(productDirectory)); }, [productDirectory]);
  useEffect(() => { localStorage.setItem("aegiscare_purchase_requests", JSON.stringify(purchaseRequests)); }, [purchaseRequests]);
  useEffect(() => { localStorage.setItem("aegiscare_support_tickets", JSON.stringify(supportTickets)); }, [supportTickets]);
  useEffect(() => { localStorage.setItem("aegiscare_contact_messages", JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem("aegiscare_notifications", JSON.stringify(notifications)); }, [notifications]);

  const normalizeUser = (userData) => ({
    ...userData,
    id: userData.id ?? userData.email,
    role: userData.role || "user",
    status: userData.status || "Active",
    plan: userData.plan || "Essential",
    serviceStart: userData.serviceStart || "2026-08-29",
    serviceEnd: userData.serviceEnd || "2026-12-31",
    services: userData.services || ["Fleet Monitoring"],
    phone: userData.phone || "+91 90000 00000",
    address: userData.address || "N/A",
    city: userData.city || "Bengaluru",
    state: userData.state || "Karnataka",
    country: userData.country || "India",
    emergencyContact: userData.emergencyContact || "N/A",
    avatar: userData.avatar || (userData.name ? userData.name.split(" ").map((word) => word[0]).slice(0, 2).join("").toUpperCase() : "US"),
  });

  const syncUserDirectory = (nextUser) => {
    setUserDirectory((current) => {
      const exists = current.some((entry) => String(entry.email) === String(nextUser.email));
      if (!exists) return [...current, nextUser];
      return current.map((entry) => (String(entry.email) === String(nextUser.email) ? { ...entry, ...nextUser } : entry));
    });
  };

  const login = (userData) => {
    const mergedUser = normalizeUser(userData);
    syncUserDirectory(mergedUser);
    localStorage.setItem("aegiscare_user", JSON.stringify(mergedUser));
    setUser(mergedUser);
    setIsAdminPreview(false);
    setPreviewUserId(null);
  };

  const signup = ({ name, email, phone, password, address, city, state, country, emergencyContact }) => {
    const newUser = normalizeUser({
      id: `cust-${Date.now()}`,
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      country,
      emergencyContact,
      role: "user",
      plan: "Essential",
      status: "Active",
      services: ["Fleet Monitoring"],
    });

    syncUserDirectory(newUser);
    localStorage.setItem("aegiscare_user", JSON.stringify(newUser));
    setUser(newUser);
    setIsAdminPreview(false);
    setPreviewUserId(null);
    return newUser;
  };

  const updateCurrentUser = (updates) => {
    setUser((current) => {
      if (!current) return current;
      const nextUser = normalizeUser({ ...current, ...updates });
      localStorage.setItem("aegiscare_user", JSON.stringify(nextUser));
      setUserDirectory((allUsers) =>
        allUsers.map((entry) =>
          String(entry.email) === String(current.email) ? { ...entry, ...nextUser } : entry
        )
      );
      return nextUser;
    });
  };

  const updateUserProfile = (userId, updates) => {
    const nextUserData = { ...updates };
    setUserDirectory((current) =>
      current.map((entry) => (String(entry.id) === String(userId) ? normalizeUser({ ...entry, ...nextUserData }) : entry))
    );
    setUser((current) => {
      if (!current || String(current.id) !== String(userId)) return current;
      const nextUser = normalizeUser({ ...current, ...nextUserData });
      localStorage.setItem("aegiscare_user", JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const enterCustomerPreview = (customerId) => {
    if (!user || user.role !== "admin") return;
    setIsAdminPreview(true);
    setPreviewUserId(customerId);
  };

  const exitCustomerPreview = () => {
    setIsAdminPreview(false);
    setPreviewUserId(null);
  };

  const getPreviewUser = () => {
    if (!isAdminPreview || !previewUserId) return null;
    return userDirectory.find((entry) => String(entry.id) === String(previewUserId)) || null;
  };

  const submitPurchaseRequest = (payload) => {
    const request = {
      id: `PR-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: payload.customerId,
      customerName: payload.customerName,
      email: payload.email,
      productId: payload.productId,
      productName: payload.productName,
      price: payload.price,
      requestDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      notes: payload.notes || "Requested by customer",
    };
    setPurchaseRequests((current) => [request, ...current]);
    setNotifications((current) => [{ id: Date.now(), type: "purchase", title: "New purchase request", message: `${request.customerName} requested ${request.productName}.` }, ...current].slice(0, 8));
    return request;
  };

  const updatePurchaseRequest = (requestId, updates) => {
    setPurchaseRequests((current) =>
      current.map((request) => (request.id === requestId ? { ...request, ...updates } : request))
    );
    if (updates.status === "Approved") {
      const request = purchaseRequests.find((item) => item.id === requestId);
      if (request) {
        setRobotDirectory((current) =>
          current.map((robot) =>
            robot.productId === request.productId || robot.id === request.productId
              ? { ...robot, ownerId: request.customerId, ownerName: request.customerName, status: "Assigned" }
              : robot
          )
        );
      }
    }
  };

  const submitSupportTicket = (payload) => {
    const ticket = {
      id: `SUP-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: payload.customerId,
      customerName: payload.customerName,
      subject: payload.subject,
      status: "Open",
      priority: payload.priority || "Medium",
      createdAt: new Date().toISOString().slice(0, 10),
      description: payload.description,
    };
    setSupportTickets((current) => [ticket, ...current]);
    setNotifications((current) => [{ id: Date.now(), type: "support", title: "Support ticket created", message: `${ticket.subject} was submitted.` }, ...current].slice(0, 8));
    return ticket;
  };

  const updateSupportTicket = (ticketId, updates) => {
    setSupportTickets((current) =>
      current.map((ticket) => (ticket.id === ticketId ? { ...ticket, ...updates } : ticket))
    );
  };

  const submitContactMessage = (payload) => {
    const message = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.message,
      status: "New",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setContactMessages((current) => [message, ...current]);
    return message;
  };

  const logout = () => {
    localStorage.removeItem("aegiscare_user");
    setUser(null);
    setIsAdminPreview(false);
    setPreviewUserId(null);
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    if (user.role === "admin") return true;
    return ROLE_PERMISSIONS[user.role]?.[permission] ?? false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDirectory,
        setUserDirectory,
        robotDirectory,
        setRobotDirectory,
        productDirectory,
        setProductDirectory,
        purchaseRequests,
        setPurchaseRequests,
        supportTickets,
        setSupportTickets,
        contactMessages,
        setContactMessages,
        notifications,
        setNotifications,
        isAdminPreview,
        previewUserId,
        login,
        signup,
        updateCurrentUser,
        updateUserProfile,
        logout,
        enterCustomerPreview,
        exitCustomerPreview,
        getPreviewUser,
        submitPurchaseRequest,
        updatePurchaseRequest,
        submitSupportTicket,
        updateSupportTicket,
        submitContactMessage,
        isAuthenticated: !!user,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}