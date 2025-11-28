import i18n from '@i18n/i18n.config';
import React from 'react';

interface TripSubmitFailedProps {
  username: string;
}

const TripSubmitFailed = ({ username }: TripSubmitFailedProps) => (
  <div style={{ padding: '20px 40px', boxSizing: 'border-box' }}>
    <img src="" alt="" style={{ width: 30, height: 'auto' }} />
    <h1 style={{ color: '#f44336', fontSize: '24px', marginBottom: '16px' }}>
      {i18n.__('trip_submit_failed.title')}
    </h1>
    <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '12px' }}>
      Dear {username},
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '12px' }}>
      We're sorry to inform you that your trip registration was not successful.
      Please try again or contact our support team for assistance.
    </p>
    <p style={{ fontSize: '16px', lineHeight: '1.5', marginBottom: '12px' }}>
      If you have any questions, feel free to reach out to us.
    </p>
  </div>
);

export default TripSubmitFailed;
