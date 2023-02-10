import classNames from 'classnames';
import React from 'react';

interface ByteLogoProps {
  width?: string;
  height?: string;
  className?: string;
  alt?: string;
}

const ByteLogoIcon: React.FC<ByteLogoProps> = function (props) {
  const { width = '62px', height = '62px', className, ...otherProps } = props;
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...otherProps}
    >
      <path
        d="M36.1513 62H31.3679C29.7121 62 28.4243 60.7122 28.4243 59.0564C28.4243 57.4006 29.7121 56.1128 31.3679 56.1128H36.1513C37.8071 56.1128 39.0949 57.4006 39.0949 59.0564C39.0949 60.7122 37.8071 62 36.1513 62Z"
        fill="#0B2045"
      />
      <path
        d="M40.1989 52.6172L27.3205 52.8012C25.2968 52.8012 23.641 51.1454 23.641 49.1217V46.1781L43.8784 45.9941V48.9377C43.8784 50.9614 42.2226 52.6172 40.1989 52.6172Z"
        fill="#0B2045"
      />
      <path
        d="M53.6291 11.0386C53.6291 10.8546 53.6291 10.6706 53.6291 10.6706C53.6291 10.4866 53.6291 10.4866 53.6291 10.3027C53.6291 10.1187 53.4451 9.93472 53.4451 9.75074C53.4451 9.75074 53.4451 9.56676 53.2611 9.56676C53.0772 9.38279 53.0772 9.19881 52.8932 8.83086C52.7092 8.64688 52.3413 8.09496 52.3413 8.09496C47.7418 3.1276 41.1187 0 33.7597 0C19.5935 0 8.18695 11.4065 8.18695 25.5727C8.18695 39.7389 19.5935 51.1454 33.7597 51.1454C40.3828 51.1454 46.27 48.5697 50.8694 44.5223C51.9733 43.6024 52.7092 42.1306 52.7092 40.4748C52.7092 37.5312 50.3175 35.1395 47.3739 35.1395C46.0861 35.1395 44.7982 35.6914 43.8783 36.4273C42.2226 37.8991 40.1988 39.1869 37.9911 39.7389H37.8071C36.5193 40.1068 35.2315 40.2908 33.9436 40.2908C25.6647 40.2908 19.0416 33.6677 19.0416 25.3887C19.0416 17.1098 25.6647 10.4866 33.9436 10.4866C37.0712 10.4866 39.8309 11.4065 42.2226 13.0623L36.3353 19.6855L42.5905 25.5727L52.7092 13.9822C52.8932 13.7982 53.0772 13.6142 53.2611 13.2463C53.2611 13.2463 53.2611 13.0623 53.4451 13.0623C53.4451 12.8783 53.6291 12.6944 53.6291 12.5104C53.6291 12.3264 53.6291 12.3264 53.6291 12.1424C53.6291 11.9585 53.6291 11.7745 53.8131 11.5905C53.8131 11.4065 53.8131 11.4065 53.8131 11.2226C53.8131 11.0386 53.8131 10.8546 53.8131 10.8546C53.6291 11.2226 53.6291 11.0386 53.6291 11.0386Z"
        fill="#0B2045"
      />
      <path
        d="M42.4065 19.1335C40.5667 17.4777 37.9911 17.6617 36.3353 19.5014L34.3115 21.8931L32.2878 19.5014C30.632 17.6617 28.0564 17.4777 26.2166 19.1335C24.3768 20.7893 24.1928 23.3649 25.8486 25.2047L31.1839 31.2759C31.1839 31.2759 31.3679 31.6439 31.5519 31.6439C31.5519 31.6439 31.9199 31.8279 31.9199 32.0118C32.1038 32.1958 32.2878 32.1958 32.2878 32.1958C32.4718 32.1958 32.4718 32.1958 32.6558 32.3798C32.8397 32.3798 33.0237 32.5638 33.2077 32.5638C33.3917 32.5638 33.3917 32.5638 33.5756 32.5638C33.7596 32.5638 33.9436 32.5638 33.9436 32.5638C34.1276 32.5638 34.1276 32.5638 34.3115 32.5638C34.4955 32.5638 34.4955 32.5638 34.6795 32.5638C34.8635 32.5638 35.0474 32.5638 35.0474 32.5638C35.2314 32.5638 35.2314 32.5638 35.4154 32.5638C35.5994 32.5638 35.7833 32.3798 35.9673 32.3798C36.1513 32.3798 36.1513 32.3798 36.3353 32.1958C36.5193 32.1958 36.8872 31.8278 37.0712 31.8278L37.6231 31.2759L42.9584 25.2047C44.4302 23.5489 44.2463 20.7893 42.4065 19.1335Z"
        fill="#3A84F6"
      />
    </svg>
  );
};

export default ByteLogoIcon;
