import { Plus } from 'lucide-react';
import '../../styles/components/create-new-button.css';

const CreateNewButton = ({ onClick }) => {
  return (
    <div className="create-new-container">
      <button
        className="create-new-button"
        onClick={onClick}
        aria-label="Create new task"
      >
        <div className="plus-circle">
          <Plus size={20} />
        </div>
        <span>Create New</span>
      </button>
    </div>
  );
};

export default CreateNewButton;