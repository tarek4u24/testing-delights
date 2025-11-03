export const testFlags = {
  captureStepScreenshots: process.env.CAPTURE_STEP_SCREENSHOTS === 'true',
  captureFailureScreenshots: process.env.CAPTURE_FAILURE_SCREENSHOTS === 'true',
  retainVideo: process.env.RETAIN_VIDEO === 'true',
  enableTrace: process.env.ENABLE_TRACE === 'true',
};
