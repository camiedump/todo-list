import { Search } from 'lucide-react';
import '../../styles/components/search-input.css';

const SearchInput = ({ value, onChange, placeholder = 'Search' }) => {
  return (
    <div className="search-input-container">
      <Search className="search-icon" size={16} />
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;