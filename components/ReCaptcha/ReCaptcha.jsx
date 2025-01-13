const { default: ReCAPTCHA } = require("react-google-recaptcha");

const ReCaptcha = (props) => {
  const { handleCapVal } = props;

  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY}
      onChange={(val) => handleCapVal(val)}
      onExpired={() => handleCapVal("expired")}
    />
  );
};

export default ReCaptcha;
