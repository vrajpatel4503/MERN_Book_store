
import { toast } from "react-toastify";
import { MdCheckCircle, MdError } from "react-icons/md";

export const showSuccessToast = (message) => {
  toast.success(message || "Success", {
    icon: <MdCheckCircle className="!text-amber-400 !text-xl" />,
    className: "!bg-zinc-900 !text-white",
    progressClassName: "!bg-amber-400",
    autoClose: 1000,
  });
};

export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong", {
    icon: <MdError className="!text-red-400 !text-xl" />,
    className: "!bg-zinc-900 !text-white",
    progressClassName: "!bg-red-400",
    autoClose: 1500,
  });
};
