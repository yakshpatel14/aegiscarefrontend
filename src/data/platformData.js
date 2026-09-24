export const PLATFORM_DATA = {
  admin: {
    greeting: "AegisCore Control Center",
    headline: "Platform operations and business health",
    kpis: [
      { label: "Total Users", value: "2,481", delta: "+8.4% this month", tone: "cyan" },
      { label: "Robots Online", value: "186 / 194", delta: "95.9% availability", tone: "green" },
      { label: "Server Load", value: "42%", delta: "Normal", tone: "amber" },
      { label: "Pending Payments", value: "₹1.24L", delta: "18 accounts", tone: "purple" },
      { label: "Monthly Revenue", value: "₹8.42L", delta: "+12.6%", tone: "cyan" },
      { label: "Active Sessions", value: "1,284", delta: "94% stable", tone: "green" },
      { label: "System Uptime", value: "99.94%", delta: "7d 12h", tone: "cyan" },
    ],
    services: [
      { name: "API Gateway", status: "Healthy", value: "99.9%", tone: "success" },
      { name: "Database Cluster", status: "Healthy", value: "Online", tone: "success" },
      { name: "MQTT Broker", status: "Stable", value: "Online", tone: "info" },
      { name: "Robot Mesh", status: "Active", value: "186 linked", tone: "neutral" },
    ],
    systemAlerts: [
      { title: "Fleet sync delay", detail: "Two edge units reported temporary latency. Monitoring confirms recovery in progress.", tone: "warning" },
      { title: "Billing queue", detail: "18 pending payments are awaiting review from the finance team.", tone: "info" },
      { title: "Security layer", detail: "Threat detection remains green with no unauthorised access events.", tone: "success" },
    ],
    fleet: [
      { id: "RBT-101", name: "Astra Scout", owner: "Ava Patel", status: "Online", battery: 84, location: "Living Room", heartbeat: "12 sec ago", firmware: "v3.7.2", mission: "Medication round" },
      { id: "RBT-201", name: "Nimbus Care", owner: "Rahul Sharma", status: "Charging", battery: 52, location: "Dock 2", heartbeat: "47 sec ago", firmware: "v3.7.1", mission: "Dock reset" },
      { id: "RBT-302", name: "Helio Helper", owner: "Priya Menon", status: "Maintenance", battery: 29, location: "Service bay", heartbeat: "1 min ago", firmware: "v3.6.8", mission: "Diagnostics" },
      { id: "RBT-404", name: "Eclipse Relay", owner: "System Ops", status: "Warning", battery: 63, location: "Gate 04", heartbeat: "22 sec ago", firmware: "v3.7.2", mission: "Perimeter sweep" },
    ],
    serverMetrics: [
      { label: "CPU", value: 38, status: "Healthy" },
      { label: "RAM", value: 61, status: "Warning" },
      { label: "Disk", value: 44, status: "Healthy" },
      { label: "Network", value: 28, status: "Healthy" },
      { label: "API Latency", value: 128, status: "Stable" },
      { label: "Active API Requests", value: 421, status: "Healthy" },
    ],
    revenue: {
      monthly: "₹8.42L",
      yearly: "₹94.8L",
      pending: "₹1.24L",
      failed: "₹42k",
      subscriptions: 1248,
      cancelled: 58,
    },
    analytics: [
      { label: "Robot Utilization", value: "76%" },
      { label: "Daily Active Users", value: "1,248" },
      { label: "Mission Success Rate", value: "97.4%" },
      { label: "Average Task Duration", value: "11.5 min" },
      { label: "Avg Battery", value: "81%" },
      { label: "Customer Growth", value: "+12.6%" },
    ],
  },
  user: {
    greeting: "Good morning, Ava",
    statusText: "Your AegisCare system is operating normally.",
    robot: {
      name: "AegisCare-AC001",
      online: true,
      battery: 84,
      connection: "Excellent",
      location: "Living Room",
      status: "Online",
      lastSeen: "2 min ago",
      mission: "Medication round",
      firmware: "v3.7.2",
    },
    summaryCards: [
      { label: "Battery", value: "84%", detail: "Charging stable" },
      { label: "Connection", value: "Excellent", detail: "Strong link" },
      { label: "Alerts", value: "1", detail: "No critical issues" },
      { label: "Today's tasks", value: "4", detail: "3 completed" },
    ],
    careSchedule: [
      { title: "Medicine reminders", detail: "3 completed / 1 upcoming", tone: "success" },
      { title: "Robot activity", detail: "Autonomous monitoring has been stable for 8 hours.", tone: "info" },
      { title: "Safety status", detail: "No critical alerts. Pressure sensors are within normal range.", tone: "success" },
    ],
    activity: [
      { time: "08:42 AM", text: "Robot completed room inspection" },
      { time: "09:12 AM", text: "Medication reminder delivered" },
      { time: "10:05 AM", text: "Living room sensors synced" },
      { time: "10:48 AM", text: "Battery check completed" },
    ],
    tasks: [
      { id: "TSK-101", title: "Morning medicine reminder", time: "09:30 AM", status: "Completed", priority: "High" },
      { id: "TSK-104", title: "Mobility check", time: "11:00 AM", status: "In progress", priority: "Medium" },
      { id: "TSK-108", title: "Evening wellness check", time: "06:30 PM", status: "Scheduled", priority: "Medium" },
    ],
    alerts: [
      { title: "Battery status", detail: "Battery is above safety threshold and charging is stable.", severity: "Low" },
      { title: "Connectivity", detail: "Home network signal remains strong and stable.", severity: "Low" },
      { title: "Care note", detail: "Water intake reminder is set for 8:00 PM.", severity: "Info" },
    ],
    billing: {
      plan: "Essential",
      status: "Paid",
      nextBilling: "27 Sep 2026",
      invoiceAmount: "₹1,299",
      paymentHistory: [
        { label: "Aug 2026", amount: "₹1,299", status: "Paid" },
        { label: "Jul 2026", amount: "₹1,299", status: "Paid" },
        { label: "Jun 2026", amount: "₹1,299", status: "Paid" },
      ],
    },
  },
};

export const adminNav = [
  { label: "Overview", items: [
    { label: "Admin Dashboard", path: "/admin/dashboard" },
  ]},
  { label: "Users", items: [
    { label: "Users Database", path: "/admin/users" },
    { label: "Customer Service", path: "/admin/customer-service" },
  ]},
  { label: "Robotics", items: [
    { label: "Robot Manager", path: "/admin/fleet" },
  ]},
  { label: "Accounts", items: [
    { label: "My Accounts", path: "/admin/billing" },
  ]},
];

export const userNav = [
  { label: "Dashboard", items: [{ label: "Overview", path: "/user/dashboard" }] },
  { label: "My Robot", items: [
    { label: "Robot Overview", path: "/user/robot" },
    { label: "Robot Status", path: "/user/robot" },
  ]},
  { label: "Monitoring", items: [
    { label: "Live Camera", path: "/user/monitoring" },
    { label: "Robot Activity", path: "/user/monitoring" },
  ]},
  { label: "Explore", items: [
    { label: "AegisCare Robots", path: "/shop" },
    { label: "My Orders", path: "/user/orders" },
  ]},
  { label: "Missions", items: [
    { label: "Current Tasks", path: "/user/tasks" },
    { label: "Task History", path: "/user/tasks" },
  ]},
  { label: "Support", items: [
    { label: "Support Center", path: "/user/support" },
    { label: "Contact Us", path: "/contact" },
  ]},
  { label: "Safety", items: [
    { label: "Alerts", path: "/user/alerts" },
    { label: "Emergency Events", path: "/user/alerts" },
  ]},
  { label: "Subscription", items: [
    { label: "My Plan", path: "/user/billing" },
    { label: "Billing", path: "/user/billing" },
  ]},
  { label: "Profile", items: [
    { label: "Edit Profile", path: "/user/profile" },
    { label: "Settings", path: "/user/settings" },
  ]},
];
