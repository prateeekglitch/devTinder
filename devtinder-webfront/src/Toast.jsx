import React, { useState } from "react";

const Toast = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  // expose globally (simple approach)
  window.showToast = (msg) => {
    setMessage(msg);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg">
        {message}
      </div>
    </div>
  );
};

export default Toast;
