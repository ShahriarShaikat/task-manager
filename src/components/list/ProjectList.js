import Project from "../list-item/Project";
//import { useGetProjectsQuery } from "../../features/project/projectAPI";
import { useSelector } from "react-redux";

function ProjectList() {
  const projects = useSelector((state) => state.filters.project);

  // decide what to render
  let content = null;

  // if (isLoading) {
  //   content = <div className="col-span-12">Loading...</div>;
  // }

  // if (!isLoading && isError) {
  //   content = <div className="col-span-12">{error}</div>;
  // }

  // if (!isLoading && !isError && projects?.length === 0) {
  //   content = <div className="col-span-12">No related projects found</div>;
  // }

  // if (!isLoading && !isError && projects?.length > 0) {
  //   content = projects.map((project) => (
  //     <Project key={project.id} project={project} />
  //   ));
  // }
  if (projects?.length === 0) {
    content = <div className="col-span-12">No related projects found</div>;
  }

  if (projects?.length > 0) {
    content = projects.map((project) => (
      <Project key={project.id} project={project} />
    ));
  }

  return <div className="mt-3 space-y-4">{content}</div>;
}
export default ProjectList;
