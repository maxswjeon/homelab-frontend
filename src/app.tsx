import { useEffect, useState } from "preact/hooks";
import reachTest, {
  ReachExplanation,
  defaultExplanation,
  explainResult,
} from "./reach";

const ExplanationTypeStyles = {
  success: "text-green-500",
  failure: "text-red-500",
  neutral: "text-black",
};

export function App() {
  const publicDomain = import.meta.env.VITE_REACHABILITY_SERVER_PUBLIC_DOMAIN;
  const privateDomain = import.meta.env.VITE_REACHABILITY_SERVER_PRIVATE_DOMAIN;
  const port = import.meta.env.VITE_REACHABILITY_SERVER_PORT || 443;
  const path = import.meta.env.VITE_REACHABILITY_SERVER_PATH || "/";
  const timeout = import.meta.env.VITE_REACHABILITY_SERVER_TIMEOUT || 5000;

  const [result, setResult] = useState<ReachExplanation>(
    defaultExplanation(!!privateDomain)
  );

  useEffect(() => {
    const publicURL = publicDomain && `https://${publicDomain}:${port}${path}`;
    const privateURL =
      privateDomain && `https://${privateDomain}:${port}${path}`;

    (async () =>
      setResult(
        explainResult(
          await reachTest(timeout, publicURL, privateURL),
          !!privateDomain
        )
      ))();
  }, []);

  return (
    <div className="container flex flex-col">
      <div className="grid grid-cols-[max-content_minmax(max-content,200px)] mx-auto">
        <p className="text-right mr-2 font-bold">Reachability Test:</p>
        <p className={`text-left ${ExplanationTypeStyles[result.reach.type]}`}>
          {result.reach.message}
        </p>
        <p className="text-right mr-2 font-bold">DNS Test:</p>
        <p className={`text-left ${ExplanationTypeStyles[result.dns.type]}`}>
          {result.dns.message}
        </p>
      </div>
      {result.global && (
        <p className={ExplanationTypeStyles[result.global.type]}>
          {result.global.message}
        </p>
      )}
    </div>
  );
}
