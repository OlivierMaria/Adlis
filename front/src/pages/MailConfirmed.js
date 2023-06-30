import React, { useEffect, useState } from "react";
import axios from "axios";

const MailConfirmed = () => {
  const [confirmationStatus, setConfirmationStatus] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sid = urlParams.get("sid");

    if (sid) {
      const fetchConfirmationStatus = async () => {
        try {
          const response = await axios.get(
            `https://adlis-077af6a0b065.herokuapp.com/identity/email_verification?sid=${sid}`
          );
          const confirmationData = response.data; // Les données renvoyées par le contrôleur Rails
          setConfirmationStatus(confirmationData.status); // Met à jour l'état de confirmationStatus
        } catch (error) {
          console.error(error);
          // Gérez les erreurs de requête
        }
      };

      fetchConfirmationStatus();
    }
  }, []);

  if (confirmationStatus === "success") {
    return (
      <div className="confirmation-page">
        <h2>Email Confirmed</h2>
        <p>Your email has been successfully verified.</p>
        <p>
          You can now <a href="/signin">sign in</a> to your account.
        </p>
      </div>
    );
  } else if (confirmationStatus === "failure") {
    return (
      <div className="confirmation-page">
        <h2>Email Confirmation Failed</h2>
        <p>The email confirmation link is invalid or has expired.</p>
      </div>
    );
  } else {
    return (
      <div className="confirmation-page">
        <h2>Processing...</h2>
        <p>Verifying email confirmation...</p>
      </div>
    );
  }
};

export default MailConfirmed;
