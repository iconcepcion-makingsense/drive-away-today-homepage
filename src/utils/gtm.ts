
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize data layer array if it doesn't exist
window.dataLayer = window.dataLayer || [];

export const GTM_ID = 'GTM-58ZMGSGJ'; // Replace with your actual GTM ID

/**
 * Push an event to the Google Tag Manager data layer
 * @param event The event name
 * @param data Additional data to send with the event
 */
export const pushEvent = (event: string, data?: Record<string, any>) => {
  console.log(`Pushing event to GTM: ${event}`, data);
  window.dataLayer.push({
    event,
    ...data,
  });
};

/**
 * Track an experiment view
 * @param experimentId The experiment ID
 * @param variationId The variation ID
 * @param variationName The variation name/value
 */
export const trackExperiment = (
  experimentId: string, 
  variationId: string | number, 
  variationName: string | number | boolean
) => {
  pushEvent('experiment_viewed', {
    experiment_id: experimentId,
    variation_id: variationId,
    variation_name: variationName
  });
};

/**
 * Track a conversion event
 * @param action The conversion action (e.g., 'click', 'signup', 'purchase')
 * @param category The category of the conversion (e.g., 'engagement', 'revenue')
 * @param label Optional label for the conversion
 * @param value Optional value for the conversion
 */
export const trackConversion = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  pushEvent('conversion', {
    action,
    category,
    label,
    value
  });
};
