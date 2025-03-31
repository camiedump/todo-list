import '../../styles/components/header.css';
import CreateNewButton from '../ui/CreateNewButton';

const Header = ({ title, onCreateNew }) => {
  return (
    <div className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-underline"></div>

      {onCreateNew && (
        <div className="header-actions">
          <CreateNewButton onClick={onCreateNew} />
        </div>
      )}
    </div>
  );
};

export default Header;