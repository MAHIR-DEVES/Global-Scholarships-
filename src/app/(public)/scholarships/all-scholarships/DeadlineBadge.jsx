'use client';
import React from 'react';
import dayjs from 'dayjs';

const DeadlineBadge = ({ deadline }) => {
  const today = dayjs();
  const deadlineDate = dayjs(deadline, 'DD-MMM-YYYY'); // Adjust format if needed
  const daysUntilDeadline = deadlineDate.diff(today, 'day');

  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline > 3;
  const isVeryUrgent = daysUntilDeadline <= 3;

  return (
    <div className="mt-2">
      <div
        className={`px-4 py-2 rounded-full text-white font-bold text-sm inline-block ${
          daysUntilDeadline <= 0
            ? 'bg-red-500'
            : isVeryUrgent
            ? 'bg-red-500 animate-pulse'
            : isUrgent
            ? 'bg-orange-500'
            : 'bg-green-500'
        }`}
      >
        {daysUntilDeadline <= 0 ? 'Closed' : `${daysUntilDeadline} days left`}
      </div>
    </div>
  );
};

export default DeadlineBadge;
