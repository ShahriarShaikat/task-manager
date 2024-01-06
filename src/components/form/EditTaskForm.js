import { useEffect, useState } from "react";
import Option from "../ui/Option";
import { useGetProjectsQuery } from "../../features/project/projectAPI";
import { useGetTeamsQuery } from "../../features/team/teamAPI";
import { useEditTaskMutation } from "../../features/task/taskAPI";
import { useNavigate } from "react-router-dom";

function EditTaskForm({ task }) {
  const navigate = useNavigate();
  const [editTask, { isSuccess, isLoading }] = useEditTaskMutation();
  const {
    data: team,
    isLoading: isLoadingT,
    isError: isErrorT,
  } = useGetTeamsQuery();
  const {
    data: projects,
    isLoading: isLoadingP,
    isError: isErrorP,
  } = useGetProjectsQuery();
  const {
    id,
    taskName: itaskName,
    deadline: ideadline,
    project: iproject,
    teamMember: iteamMember,
  } = task;

  const [taskName, setTaskName] = useState(itaskName);
  const [deadline, setDeadline] = useState(ideadline);
  const [project, setProject] = useState(iproject);
  const [teamMember, setTeamMember] = useState(iteamMember);

  const assignProject = (e) => {
    // eslint-disable-next-line eqeqeq
    setProject(projects.find((p) => p.projectName == e.target.value));
  };
  const assignTeamMember = (e) => {
    // eslint-disable-next-line eqeqeq
    setTeamMember(team.find((t) => t.name == e.target.value));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    editTask({ id, data: { taskName, teamMember, project, deadline } });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="fieldContainer">
        <label htmlFor="lws-taskName">Task Name</label>
        <input
          type="text"
          name="taskName"
          id="lws-taskName"
          required
          placeholder="Implement RTK Query"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>

      <div className="fieldContainer">
        <label>Assign To</label>
        {!isLoadingT && !isErrorT && team?.length > 0 && (
          <select
            name="teamMember"
            id="lws-teamMember"
            required
            value={teamMember.name}
            onChange={assignTeamMember}
          >
            <option value="" hidden>
              Select Job
            </option>
            {team.map((t) => (
              <Option key={t.id} name={t.name} />
            ))}
          </select>
        )}
      </div>
      <div className="fieldContainer">
        <label htmlFor="lws-projectName">Project Name</label>
        {!isLoadingP && !isErrorP && team?.length > 0 && (
          <select
            id="lws-projectName"
            name="projectName"
            required
            value={project.projectName}
            onChange={assignProject}
          >
            <option value="" hidden>
              Select Project
            </option>
            {projects.map((p) => (
              <Option key={p.id} name={p.projectName} />
            ))}
          </select>
        )}
      </div>

      <div className="fieldContainer">
        <label htmlFor="lws-deadline">Deadline</label>
        <input
          type="date"
          name="deadline"
          id="lws-deadline"
          required
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <div className="text-right">
        <button type="submit" className="lws-submit" disabled={isLoading}>
          Save
        </button>
      </div>
    </form>
  );
}
export default EditTaskForm;
