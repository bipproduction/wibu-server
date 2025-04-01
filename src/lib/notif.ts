import toast from "react-simple-toasts";

const notif = {
  success: (message: string) => {
    toast(`[SUCCESS] ${message}`);
  },
  error: (message: string) => {
    toast(`[ERROR] ${message}`);
  },
  info: (message: string) => {
    toast(`[INFO] ${message}`);
  },
  warning: (message: string) => {
    toast(`[WARNING] ${message}`);
  },
};

export default notif;
