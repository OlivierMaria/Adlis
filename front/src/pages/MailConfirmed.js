import React from "react";

const MailConfirmed = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sid = urlParams.get("sid");

  if (sid) {
    return (
      <div className="confirmation-page">
        <h2>Email Confirmed</h2>
        <p>Your email has been successfully verified.</p>
        <p>
          You can now <a href="/signin">sign in</a> to your account.
        </p>
      </div>
    );
  } else {
    return (
      <div className="confirmation-page">
        <h2>Email Confirmation Failed</h2>
        <p>The email confirmation link is invalid or has expired.</p>
      </div>
    );
  }
};

export default MailConfirmed;
