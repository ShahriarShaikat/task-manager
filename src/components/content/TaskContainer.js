import TaskContainerHeader from "../header/TaskContainerHeader";
import TaskList from "../list/TaskList";

function TaskContainer() {
  return (
    <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <TaskContainerHeader />
        <TaskList />
      </main>
    </div>
  );
}
export default TaskContainer;
