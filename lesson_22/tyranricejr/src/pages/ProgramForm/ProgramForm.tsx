import './ProgramForm.scss';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ProgramManagement} from '@/hooks/ProgramManagement';

export const ProgramForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const {addProgram} = ProgramManagement();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', {title, description});

    addProgram(title, description);

    setTitle('');
    setDescription('');

    navigate('/');
  };

  return (
    <div className="program-form-page">
      <div className="program-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Program Form Page</h2>

          <div className="form-group">
            <label htmlFor="title">Program Title:</label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter program title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Program Description:</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter program description"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Submit Program
          </button>
        </form>
      </div>
    </div>
  );
};
