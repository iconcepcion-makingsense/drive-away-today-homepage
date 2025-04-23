
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Initialize data layer array if it doesn't exist
window.dataLayer = window.dataLayer || [];

export const GTM_ID = 'GTM-XXXXX'; // Replace with your actual GTM ID

export const pushEvent = (event: string, data?: Record<string, any>) => {
  window.dataLayer.push({
    event,
    ...data,
  });
};

