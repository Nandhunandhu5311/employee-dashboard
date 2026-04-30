import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ darkMode, setDarkMode }: Props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-xl">
      <h3 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
        Employee Dashboard
      </h3>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur transition-all duration-300 hover:scale-110"
        >
          {darkMode ? (
            <FiSun className="text-yellow-400 text-lg" />
          ) : (
            <FiMoon className="text-white text-lg" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;