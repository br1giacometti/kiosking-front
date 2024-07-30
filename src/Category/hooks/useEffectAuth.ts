import { useEffect } from "react";
import { TokenHandler } from "@kushitech/auth-module";

interface UseEffectAuthParams {
  states: {
    authenticate: boolean;
  };
  methods: {
    validateToken: (token: string) => Promise<void>;
    navigateToDebtCollector: () => void;
  };
}

const useEffectAuth = (
  { authenticate }: UseEffectAuthParams["states"],
  { validateToken, navigateToDebtCollector }: UseEffectAuthParams["methods"]
) =>
  useEffect(() => {
    if (!authenticate) {
      const token = TokenHandler.getTokenFromCookies();
      validateToken(token ?? "").then(navigateToDebtCollector);
    }
  }, [authenticate, navigateToDebtCollector, validateToken]);

export default useEffectAuth;
