import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoIMG from "../../assets/images/logo.svg";
import { setSearch } from "../../features/filters/filterSlice";

function Navbar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.filters.search);

  return (
    <nav className="container relative py-3">
      <div className="flex items-center justify-between">
        <Link to="/">
          <img src={logoIMG} alt="logo" />
        </Link>
        <div className="flex-1 max-w-xs search-field group">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Task"
            className="search-input"
            value={search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            id="lws-searchTask"
          />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
