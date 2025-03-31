import '../../styles/components/header.css';

const Header = ({ title }) => {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-underline"></div>
    </div>
  );
};

export default Header;