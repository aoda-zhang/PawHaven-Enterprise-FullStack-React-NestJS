import * as Sentry from '@sentry/react';

export const initMonitor = (options: Sentry.BrowserOptions) => {
  Sentry.init({
    dsn: options.dsn,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: options.sendDefaultPii,
    environment: options.environment,
    enableLogs: true,
  });
};
