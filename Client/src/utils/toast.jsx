// Cravely / Client / src / utils / toast.jsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

const defaultDuration = 5000;

const baseStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "16px",
  borderRadius: "0.75rem",
  fontWeight: 600,
  fontFamily: '"Inria Serif", serif',
  color: "#FFFFFF",
  justifyContent: "flex-start",
  minWidth: "300px",
};

const gradientStyle = (from, to, borderColor) => ({
  ...baseStyle,
  background: `linear-gradient(45deg, ${from}, ${to})`,
  border: `2px solid ${borderColor}`,
});

const CustomCloseButton = ({ closeToast }) => (
  <FiX
    onClick={closeToast}
    style={{
      color: "#FFFFFF",
      cursor: "pointer",
      position: "absolute",
      top: "8px",
      right: "8px",
      fontSize: "18px",
    }}
  />
);

const toastContent = (message, Icon) => (
  <div className="animate-slide-in flex items-center w-full">
    {Icon && <Icon className="text-2xl mr-3 text-white shrink-0" />}
    <span className="font-semibold">{message}</span>
  </div>
);

export const showSuccessToast = (message) =>
  toast.success(toastContent(message, FaCheckCircle), {
    style: gradientStyle("#16A34A", "#22C55E", "rgba(134,239,172,0.5)"),
    position: "top-right",
    autoClose: defaultDuration,
    icon: false,
    closeButton: CustomCloseButton,
  });

export const showErrorToast = (message) =>
  toast.error(toastContent(message, FaTimesCircle), {
    style: gradientStyle("#DC2626", "#EF4444", "rgba(248,113,113,0.5)"),
    position: "top-right",
    autoClose: defaultDuration,
    icon: false,
    closeButton: CustomCloseButton,
  });

export const showWarningToast = (message) =>
  toast.warning(toastContent(message, FaExclamationTriangle), {
    style: gradientStyle("#F97316", "#F59E0B", "rgba(253,186,116,0.5)"),
    position: "top-right",
    autoClose: defaultDuration,
    icon: false,
    closeButton: CustomCloseButton,
  });

export const showInfoToast = (message) =>
  toast.info(toastContent(message, FaInfoCircle), {
    style: gradientStyle("#3b82F6", "#06B6D4", "rgba(96,165,250,0.5)"),
    position: "top-right",
    autoClose: defaultDuration,
    icon: false,
    closeButton: CustomCloseButton,
  });
