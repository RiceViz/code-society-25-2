import React from 'react';

import {ProgramManagement} from '@/hooks/ProgramManagement';

import {Program} from '../../components/program/Program';

export const ProgramsList: React.FC = () => {
  const {programs} = ProgramManagement();

  return (
    <ul className="programs">
      {programs.map(program => (
        <Program
          key={program.id}
          title={program.title}
          description={program.description}
        />
      ))}
    </ul>
  );
};
