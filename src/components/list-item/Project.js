import { useDispatch } from "react-redux";
import { setProjectChecked } from "../../features/filters/filterSlice";

function Project({ project }) {
  const dispatch = useDispatch();
  const { id, projectName, colorClass, check } = project || {};
  const checkHandler = (e) => {
    dispatch(setProjectChecked({ id, check: e.target.checked }));
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className={colorClass}
        checked={check}
        onChange={checkHandler}
      />
      <p className="label">{projectName}</p>
    </div>
  );
}
export default Project;
