import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/nav/Navbar";
import { useGetProjectsQuery } from "./features/project/projectAPI";
import { useDispatch } from "react-redux";
import { loadProjects } from "./features/filters/filterSlice";

function App() {
  const dispatch = useDispatch();
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  if (!isLoading && !isError && projects?.length > 0) {
    dispatch(loadProjects(projects));
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/create-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
