import { useRouter } from "next/router";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import OnboardingPage from "@/templates/Onboarding/Onboarding";

/**
 * It extracts the onboarding ID from the URL query and passes it to the OnboardingPage component, returning the specific page required.
 *
 * @return {JSX.Element} The OnboardingPage component with the onboarding data.
 */
const IndividualOnboardingPage = () => {
  const router = useRouter();
  const { onboardingId } = router.query;

  console.log(router.query);

  const onboardingData = {
    id: Number(onboardingId) || 0,
  };

  return <OnboardingPage onboardingData={onboardingData} />;
};

IndividualOnboardingPage.getLayout = function getLayout(page) {
  return <OnboardingLayout>{page}</OnboardingLayout>;
};

export default IndividualOnboardingPage;
