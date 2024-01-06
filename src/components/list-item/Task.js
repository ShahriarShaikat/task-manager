import { useNavigate } from "react-router-dom";
import {
  useChangeTaskStatusMutation,
  useDeleteTaskMutation,
} from "../../features/task/taskAPI";
import DeleteButton from "../ui/DeleteButton";
import EditButton from "../ui/EditButton";

function Task({ task }) {
  const navigate = useNavigate();
  const [deleteTask] = useDeleteTaskMutation();
  const [changeTaskStatus] = useChangeTaskStatusMutation();
  const { id, status, taskName, teamMember, project, deadline } = task || {};
  const { projectName, colorClass } = project || {};
  const { name, avatar } = teamMember || {};
  const deleteTaskHandler = (e) => {
    e.preventDefault();
    deleteTask(id);
  };
  const handleStatus = (e) => {
    changeTaskStatus({ id, status: e.target.value });
  };

  return (
    <div className="lws-task">
      <div className="flex items-center gap-2 text-slate">
        <h2 className="lws-date">{new Date(deadline).getDate()}</h2>
        <h4 className="lws-month">
          {new Date(deadline).toLocaleString("en-us", { month: "long" })}
        </h4>
      </div>

      <div className="lws-taskContainer">
        <h1 className="lws-task-title">{taskName}</h1>
        <span className={`lws-task-badge ${colorClass}`}>{projectName}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={avatar} alt="task" className="team-avater" />
          <p className="lws-task-assignedOn">{name}</p>
        </div>
        {status === "completed" && (
          <DeleteButton deleteTaskHandler={deleteTaskHandler} />
        )}
        {status !== "completed" && (
          <EditButton navigate={() => navigate(`/edit-task/${id}`)} />
        )}
        <select className="lws-status" value={status} onChange={handleStatus}>
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
export default Task;
