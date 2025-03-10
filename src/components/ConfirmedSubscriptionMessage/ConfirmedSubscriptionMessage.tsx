import "./ConfirmedSubscriptionMessage.css";
import IconThankYou from '@starterFiles/assets/images/icon-thank-you.svg'

const ConfirmedSubscriptionMessage = () => {
  return (
    <div className="message-container">
      <img className="message-container__icon" src={IconThankYou} alt="Red icon with an approved sign/tick"/>
      <h3 className="message-container__title">Thank you!</h3>
      <p className="message-container__paragraph">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@loremgaming.com.
      </p>
    </div>
  );
};

export default ConfirmedSubscriptionMessage;
