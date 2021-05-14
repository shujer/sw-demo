import { useCallback, useEffect, useState } from "react";
export const useNotification = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      let listener = (event) => {
        const clientId = event.data.client;
        console.log(`receive message from ${clientId}`);
        setData(event.data);
      };
      navigator.serviceWorker.addEventListener("message", listener);
      return () => {
        navigator.serviceWorker.removeEventListener("message", listener);
      };
    }
  }, []);
  const postMessage = useCallback((message) => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }, []);
  return [data, postMessage];
};
