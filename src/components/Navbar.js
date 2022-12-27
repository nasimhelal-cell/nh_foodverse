import { NavLink } from "react-router-dom";

const Navbar = ({
  searchQuery,
  setSearchQuery,
  inputField,
  searchHandler,
  saveItems,
}) => {
  //Nav link active color
  const navActive = ({ isActive }) => {
    return {
      color: isActive ? "#f43f5e" : null,
    };
  };

  return (
    <div className="navbar flex justify-between items-center container flex-col py-6 lg:flex-row gap-5 lg:gap-0">
      <h2 className="logo text-2xl italic lowercase font-bold ">
        Food<span className="text-rose-500 ">verse</span>
      </h2>
      <form className="serach-bar" onSubmit={searchHandler}>
        <input
          ref={inputField}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Please Search recipe..."
          required
          className="bg-white/75 p-2 px-8 lg:w-96 rounded-full outline-none shadow-lg shadow-rose-100 focus:shadow-rose-200 duration-300"
        />
      </form>
      <ul className="menu flex gap-5">
        <li>
          <NavLink
            style={navActive}
            end
            to="/"
            className="text-gray-400 hover:text-gray-600 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            style={navActive}
            to="/favourites"
            className="text-gray-400 hover:text-gray-600 duration-300"
          >
            Favourites{" "}
            <span className="favourites-count font-bold text-sky-400">
              ({saveItems.length})
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
