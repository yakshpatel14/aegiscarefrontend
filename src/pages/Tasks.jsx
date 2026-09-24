import { useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ClipboardList,
  Pill,
  Play,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

import { taskData, medicineData } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

function Tasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState(taskData);
  const [medicines, setMedicines] = useState(medicineData);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const startTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: "In Progress" }
          : task
      )
    );
  };

  const completeTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, status: "Completed" }
          : task
      )
    );
  };

  const deliverMedicine = (id) => {
    setMedicines((currentMedicines) =>
      currentMedicines.map((medicine) =>
        medicine.id === id
          ? { ...medicine, status: "Delivered" }
          : medicine
      )
    );
  };

  return (
    <div className="tasks-page">

      {/* Page heading */}

      <div className="page-heading">
        <div>
          <p className="eyebrow">CARE & LOGISTICS</p>

          <h2>Tasks & Medicine Delivery</h2>

          <p className="page-description">
            Manage assigned tasks and medicine deliveries for
            AEGISCARE users and operational workflows.
          </p>
        </div>

        <div className="tasks-role-badge">
          {user?.role === "admin" ? "Administrator" : "User"}
        </div>
      </div>

      {/* Summary cards */}

      <div className="task-summary-grid">

        <div className="task-summary-card">
          <div className="task-summary-icon blue">
            <ClipboardList size={19} />
          </div>

          <div>
            <span>Total Tasks</span>
            <strong>{totalTasks}</strong>
            <small>Assigned tasks</small>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-icon orange">
            <Clock3 size={19} />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingTasks}</strong>
            <small>Waiting to start</small>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-icon purple">
            <Play size={19} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{inProgressTasks}</strong>
            <small>Currently active</small>
          </div>
        </div>

        <div className="task-summary-card">
          <div className="task-summary-icon green">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedTasks}</strong>
            <small>Finished today</small>
          </div>
        </div>

      </div>

      {/* Tasks */}

      <section className="tasks-section">

        <div className="tasks-section-header">
          <div>
            <p className="section-label">TASK MANAGEMENT</p>
            <h3>Care Tasks</h3>
          </div>

          <span className="task-count">
            {tasks.length} tasks
          </span>
        </div>

        <div className="tasks-table-wrapper">

          <table className="tasks-table">

            <thead>
              <tr>
                <th>Task</th>
                <th>Resident</th>
                <th>Type</th>
                <th>Scheduled</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {tasks.map((task) => (

                <tr key={task.id}>

                  <td>
                    <div className="task-name">
                      <div className="task-type-icon">
                        <ClipboardList size={15} />
                      </div>

                      <strong>{task.title}</strong>
                    </div>
                  </td>

                  <td>
                    <span className="resident-name">
                      {task.resident}
                    </span>
                  </td>

                  <td>
                    <span className="task-type">
                      {task.type}
                    </span>
                  </td>

                  <td>
                    <span className="scheduled-time">
                      <Clock3 size={13} />
                      {task.scheduledTime}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`priority-badge ${task.priority.toLowerCase()}`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`task-status ${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span></span>
                      {task.status}
                    </span>
                  </td>

                  <td>

                    {task.status === "Pending" && (
                      <button
                        className="task-action-button start"
                        onClick={() => startTask(task.id)}
                      >
                        <Play size={13} />
                        Start
                      </button>
                    )}

                    {task.status === "In Progress" && (
                      <button
                        className="task-action-button complete"
                        onClick={() => completeTask(task.id)}
                      >
                        <CheckCircle2 size={13} />
                        Complete
                      </button>
                    )}

                    {task.status === "Completed" && (
                      <span className="completed-label">
                        <CheckCircle2 size={14} />
                        Done
                      </span>
                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* Medicine delivery */}

      <section className="tasks-section medicine-section">

        <div className="tasks-section-header">

          <div>
            <p className="section-label">MEDICINE DELIVERY</p>
            <h3>Medication Schedule</h3>
          </div>

          <span className="task-count">
            {medicines.length} deliveries
          </span>

        </div>

        <div className="medicine-grid">

          {medicines.map((medicine) => (

            <div
              className="medicine-card"
              key={medicine.id}
            >

              <div className="medicine-card-top">

                <div className="medicine-icon">
                  <Pill size={20} />
                </div>

                <span
                  className={`medicine-status ${medicine.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {medicine.status}
                </span>

              </div>

              <h3>{medicine.medicine}</h3>

              <div className="medicine-details">

                <div>
                  <span>Resident</span>
                  <strong>{medicine.resident}</strong>
                </div>

                <div>
                  <span>Dosage</span>
                  <strong>{medicine.dosage}</strong>
                </div>

                <div>
                  <span>Scheduled</span>
                  <strong>{medicine.scheduledTime}</strong>
                </div>

                <div>
                  <span>Owner</span>
                  <strong>{medicine.caretaker}</strong>
                </div>

              </div>

              {medicine.status === "Pending" && (

                <button
                  className="deliver-button"
                  onClick={() => deliverMedicine(medicine.id)}
                >
                  <PackageCheck size={15} />
                  Mark as Delivered
                </button>

              )}

              {medicine.status === "Delivered" && (

                <div className="medicine-delivered">
                  <CheckCircle2 size={15} />
                  Medicine delivered successfully
                </div>

              )}

              {medicine.status === "Scheduled" && (

                <div className="medicine-scheduled">
                  <AlertCircle size={15} />
                  Scheduled for later
                </div>

              )}

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default Tasks;