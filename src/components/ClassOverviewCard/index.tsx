import { ArrowUpIcon } from '@heroicons/react/24/outline';
// import Chip from 'Chip';
import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';
import React from 'react';

import Chip from '../Chip';

interface Props extends React.PropsWithChildren {
  className?: string;
  label: string;
  currentData: string;
  pastData?: string;
  pastDataLabel?: string;
  change: number | null;
}

/**
 * This React component is similar to a HTML <a> tag,
 * but it is intended for client-side redirects.
 */
const ClassOverviewCard: React.FC<Props> = function (props) {
  const {
    className,
    label,
    currentData,
    pastData,
    pastDataLabel,
    children,
    change,
  } = props;

  return (
    <div
      className={classNames(
        'col-span-1 mr-2 mb-2 px-5 py-2.5 text-left font-medium text-gray-900',
        className
      )}
    >
      <div className="inline-block flex">
        {children}
        <span className="mb-3 inline-flex text-gray-500">{label}</span>
      </div>

      <p className="mr-auto inline text-3xl">{currentData}</p>
      {change != null && (
        <Chip
          scheme={change > 0 ? 'success' : 'danger'}
          className="float-right"
          text="this week"
          number={change.toString()}
          Icon={ArrowUpIcon}
        />
      )}

      <span className="mb-3 inline-flex text-gray-500">{pastData}</span>
      <p className="mr-auto text-3xl">{pastDataLabel}</p>
    </div>
  );
};
export default ClassOverviewCard;
