import { useNotification } from "../context/NotificationContext.jsx";

export function Toast({ notification }) {
  const { removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✓";
      case "error":
        return "✕";
      case "warning":
        return "⚠";
      case "info":
      default:
        return "ℹ";
    }
  };

  return (
    <div className={`toast toast-${notification.type}`}>
      <span className="toast-icon">{getIcon(notification.type)}</span>
      <span className="toast-message">{notification.message}</span>
      <button
        className="toast-close"
        onClick={() => removeNotification(notification.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { notifications } = useNotification();

  return (
    <div className="toast-container">
      {notifications.map((notification) => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
