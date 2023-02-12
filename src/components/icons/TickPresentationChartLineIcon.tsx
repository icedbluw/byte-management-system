import classNames from 'classnames';
import React from 'react';

interface IconProps extends React.PropsWithChildren {
  className?: string;
  width?: string;
  height?: string;
}

const TickPresentationChartLineIcon: React.FC<IconProps> = function (props) {
  const {
    children,
    className,
    width = '24px',
    height = '24px',
    ...otherProps
  } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('mr-2 inline-flex', className)}
      {...otherProps}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2 4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4C22 4.55228 21.5523 5 21 5V16C21 16.5304 20.7893 17.0391 20.4142 17.4142C20.0391 17.7893 19.5304 18 19 18H14.4142L16.7071 20.2929C17.0976 20.6834 17.0976 21.3166 16.7071 21.7071C16.3166 22.0976 15.6834 22.0976 15.2929 21.7071L12 18.4142L8.70711 21.7071C8.31658 22.0976 7.68342 22.0976 7.29289 21.7071C6.90237 21.3166 6.90237 20.6834 7.29289 20.2929L9.58579 18H5C4.46957 18 3.96086 17.7893 3.58579 17.4142C3.21071 17.0391 3 16.5304 3 16V5C2.44772 5 2 4.55228 2 4ZM5 5V16H11.9993H12.0007H19V5H5Z"
        fill="#6B7280"
      />
      <path
        d="M16.1213 7.5C16.5118 7.89052 16.5118 8.52369 16.1213 8.91421L12.1213 12.9142C11.7308 13.3047 11.0976 13.3047 10.7071 12.9142L8.70711 10.9142C8.31658 10.5237 8.31658 9.89052 8.70711 9.5C9.09763 9.10948 9.7308 9.10948 10.1213 9.5L11.4142 10.7929L14.7071 7.5C15.0976 7.10948 15.7308 7.10948 16.1213 7.5Z"
        fill="#6B7280"
      />
    </svg>
  );
};

export default TickPresentationChartLineIcon;
