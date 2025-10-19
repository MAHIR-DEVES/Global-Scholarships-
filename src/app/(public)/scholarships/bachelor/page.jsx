'use client';
import { getAllScholarships } from '@/lib/scholarshipApi';
import React, { useState, useEffect } from 'react';

const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllScholarships({ level: 'PhD' });
        setScholarships(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Scholarships</h1>
      <ul>
        {scholarships.map(sch => (
          <li key={sch._id}>
            {sch.universityName} - {sch.level} - {sch.applicationDeadline}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScholarshipsPage;
