import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className="logo-wapper">
        <img className="size-14" src="/logo.png" alt="" />
        <span>CYCLE MART</span>
      </div>
    </Link>
  );
};

export default Logo;
