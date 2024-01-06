import SideBar from "../components/sidebar/SideBar";
import TaskContainer from "../components/content/TaskContainer";

function Tasks() {
  return (
    <div className="container relative">
      <SideBar />
      <TaskContainer />
    </div>
  );
}
export default Tasks;
