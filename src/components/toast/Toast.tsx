import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

export default function Toast({ message, type }: { message: string; type: ToastType }) {
  switch (type) {
    case "SUCCESS":
      return toast.success(message, {
        className: "toast-custom",
      });
    case "ERROR":
      return toast.error(message);
    default:
      return null;
  }
}
