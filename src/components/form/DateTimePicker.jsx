import { formatDateForInput, formatTimeForInput } from '../../utils/dateUtils';
import '../../styles/components/date-time-picker.css';

const DateTimePicker = ({ 
  useCustomDate, 
  setUseCustomDate, 
  customDate, 
  setCustomDate,
  useCustomTime,
  setUseCustomTime,
  customTime,
  setCustomTime
}) => {
  return (
    <>
  
      <div className="form-group">
        <div className="form-checkbox-group">
          <input
            id="use-custom-date"
            type="checkbox"
            className="form-checkbox"
            checked={useCustomDate}
            onChange={() => setUseCustomDate(!useCustomDate)}
          />
          <label htmlFor="use-custom-date">Set specific date</label>
        </div>
        
        {useCustomDate && (
          <div className="form-date-time">
            <input
              type="date"
              className="form-date-time-input"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              min={formatDateForInput()}
            />
          </div>
        )}
      </div>
      
      <div className="form-group">
        <div className="form-checkbox-group">
          <input
            id="use-custom-time"
            type="checkbox"
            className="form-checkbox"
            checked={useCustomTime}
            onChange={() => setUseCustomTime(!useCustomTime)}
          />
          <label htmlFor="use-custom-time">Set specific time (default: current time)</label>
        </div>
        
        {useCustomTime && (
          <div className="form-date-time">
            <input
              type="time"
              className="form-date-time-input"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              defaultValue={formatTimeForInput()}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default DateTimePicker;