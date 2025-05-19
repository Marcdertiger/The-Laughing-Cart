import axios from "axios";
import { getSmileAuthToken } from '../api/smile';

export const initializeSmile = async () => {
  const runInit = async () => {
    try {
      const id = process.env.REACT_APP_SMILE_CUSTOMER_ID || "";
      const { token } = await getSmileAuthToken(id);

      (window as any).SmileUI.init({
        channel_key: process.env.REACT_APP_SMILE_CHANNEL_KEY,
        customer_identity_jwt: token,
      });

      const customer = await (window as any).SmileUI.customerReady();

      if (customer) {
        console.log("Smile customer identified:", customer);

        await (window as any).SmileUI.ready();
      } else {
        console.warn("No Smile customer identified");
      }
    } catch (err) {
      console.error("Smile initialization failed:", err);
    }
  };

  if (!(window as any).SmileUI?.init) {
    document.addEventListener("smile-ui-loaded", runInit, { once: true });
  } else {
    await runInit();
  }
};
