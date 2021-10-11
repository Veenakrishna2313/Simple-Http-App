import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";


function init() {
  Sentry.init({
    dsn: "https://511ba320b2f741e38af925c6ff6d71cb@o1034480.ingest.sentry.io/6001104",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {init,log};