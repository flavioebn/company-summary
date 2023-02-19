import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link className="header-link" to="/">
        Funds
      </Link>
      <Link className="header-link" to="/kills">
        Kills
      </Link>
    </div>
  );
};

export default Header;
