declare global {
  interface Window {
    consentGranted: () => void;
    dataLayerEvent: (eventName: string) => void;
  }
}

export {};
