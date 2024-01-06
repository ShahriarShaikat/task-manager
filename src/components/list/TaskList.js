import { useSelector } from "react-redux";
import { useGetTasksQuery } from "../../features/task/taskAPI";
import Task from "../list-item/Task";

function TaskList() {
  const search = useSelector((state) => state.filters.search);
  const projects = useSelector((state) => state.filters.project);
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <div className="col-span-12">Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <div className="col-span-12">{error}</div>;
  }

  if (!isLoading && !isError && tasks?.length === 0) {
    content = <div className="col-span-12">No task found</div>;
  }

  if (!isLoading && !isError && tasks?.length > 0 && projects.length > 0) {
    let tsk = tasks;

    if (search) {
      tsk = tsk.filter((t) => t.taskName.search(new RegExp(search, "gi")) >= 0);
    }
    if (tsk.length > 0) {
      tsk = tsk.filter(
        (t) =>
          projects.find((p) => p.projectName === t.project.projectName).check
      );
    }
    if (tsk.length > 0) {
      content = tsk.map((task) => <Task key={task.id} task={task} />);
    } else {
      content = <div className="col-span-12">No related task found...!</div>;
    }
  }

  return <div className="lws-task-list">{content}</div>;
}
export default TaskList;
