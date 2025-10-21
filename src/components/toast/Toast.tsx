import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

export default function Toast({ message, type }: { message: string; type: ToastType }) {
  switch (type) {
    case "SUCCESS":
      return toast.success(message, {
        className: "toast-success",
        progressClassName: "toast-progress",
      });
    case "ERROR":
      return toast.error(message, {
        className: "toast-error",
        progressClassName: "toast-progress",
      });
    case "INFO":
      return toast.info(message);
    default:
      return null;
  }
}
