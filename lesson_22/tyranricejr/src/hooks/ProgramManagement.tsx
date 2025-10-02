import {useEffect, useState} from 'react';

interface ProgramData {
  id: number;
  title: string;
  description: string;
}

// Module-level state to share between components
let sharedPrograms: ProgramData[] = [];
let subscribers: Array<(programs: ProgramData[]) => void> = [];

const notifySubscribers = () => {
  subscribers.forEach(callback => callback([...sharedPrograms]));
};

export const ProgramManagement = () => {
  const [programs, setPrograms] = useState<ProgramData[]>(sharedPrograms);

  useEffect(() => {
    // Initialize programs if empty
    if (sharedPrograms.length === 0) {
      sharedPrograms = [
        {
          id: 1,
          title: 'Coding Classes',
          description:
            'Our coding classes are designed to teach participants the fundamentals of programming, web development, and software engineering. We offer classes for beginners as well as advanced learners.',
        },
        {
          id: 2,
          title: 'Web Development Bootcamp',
          description:
            'Intensive bootcamp covering modern web development technologies and best practices.',
        },
      ];
    }

    setPrograms([...sharedPrograms]);

    // Subscribe to updates
    const updateLocal = (newPrograms: ProgramData[]) => {
      setPrograms(newPrograms);
    };
    subscribers.push(updateLocal);

    return () => {
      subscribers = subscribers.filter(sub => sub !== updateLocal);
    };
  }, []);

  const addProgram = (title: string, description: string) => {
    const newProgram: ProgramData = {
      id: Date.now(),
      title,
      description,
    };
    sharedPrograms = [...sharedPrograms, newProgram];
    notifySubscribers();
  };

  return {programs, addProgram};
};
