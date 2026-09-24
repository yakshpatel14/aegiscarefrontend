import { PLATFORM_DATA } from "../data/platformData";

function UserTasksPage() {
  const { tasks } = PLATFORM_DATA.user;

  return (
    <div className="role-page-shell">
      <div className="page-hero user-hero">
        <div>
          <p className="eyebrow">MISSIONS</p>
          <h1>Current tasks</h1>
          <p className="page-description">Your robot schedule and care activities for today.</p>
        </div>
      </div>

      <section className="panel-card table-card">
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Task</th>
                <th>Time</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.time}</td>
                  <td>{task.priority}</td>
                  <td><span className={`status-badge ${task.status === "Completed" ? "success" : task.status === "In progress" ? "info" : "warning"}`}>{task.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default UserTasksPage;
