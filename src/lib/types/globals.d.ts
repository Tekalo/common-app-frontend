declare global {
  interface Window {
    consentGranted: () => void;
    dataLayerEvent: (eventName: string) => void;
    gaMeasurementId: string;
    gtag?: (
      action: 'get',
      target: string,
      value: string,
      callback: any
    ) => void;
  }
}

export {};
