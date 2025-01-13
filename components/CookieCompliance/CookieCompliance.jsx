const ReactCookieBot = require("react-cookiebot");

const CookieCompliance = (props) => {
  return (
    <ReactCookieBot
      domainGroupId={process.env.NEXT_PUBLIC_COOKIEBOT_DOMAINGROUPID}
    />
  );
};

export { CookieCompliance };
