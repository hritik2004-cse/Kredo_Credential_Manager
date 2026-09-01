"use client";

import api from "@/lib/axios";
import { isAxiosError } from "axios";
import env from "@/config/env.config";
import { toast } from "react-toastify";
import React, { Suspense } from "react";
import Logo from "@/components/utility/Logo";
import Button from "@/components/utility/Button";
import GradientWaves from "@/components/GradientWaves";
import { useRouter, useSearchParams } from "next/navigation";

type VerificationStates = "verifying" | "success" | "error" | "invalid";

const VerifyEmailContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [status, setStatus] =
    React.useState<VerificationStates>("verifying");

  const handleVerification = async () => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    try {
      setStatus("verifying");

      await api.post(`${env.serverUrl}/api/auth/verify-email`, {
        token,
      });

      setStatus("success");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      setStatus("error");

      const message = isAxiosError(error)
        ? error.response?.data?.message
        : "Unable to verify your email.";

      toast.error(message);
    }
  };

  React.useEffect(() => {
    handleVerification();
  }, [token]);

  return (
    <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-6 sm:px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#A78BFA"
          crestColor="#F4F7FB"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>

      {/* Verification Card */}
      <div className="relative z-10 flex w-full max-w-110 flex-col items-center gap-3 rounded-2xl border border-border/50 bg-surface/75 px-5 py-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl transition-all duration-300 sm:px-8 sm:py-7 sm:hover:border-border/70 sm:hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
        {/* Logo */}
        <Logo varient="sm" />

        {/* Verifying */}
        {status === "verifying" && (
          <>
            <img
              src="/status/loading.gif"
              alt="Verifying email"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-xl font-bold text-font-primary sm:text-2xl">
                Verifying your email
              </h1>

              <p className="max-w-sm text-center text-sm leading-6 text-font-secondary sm:text-base">
                Please wait while we verify your email address.
              </p>
            </div>
          </>
        )}

        {/* Success */}
        {status === "success" && (
          <>
            <img
              src="/status/success.gif"
              alt="Email verified successfully"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-xl font-bold text-font-primary sm:text-2xl">
                Email verified!
              </h1>

              <p className="max-w-sm text-center text-sm leading-6 text-font-secondary sm:text-base">
                Your email has been successfully verified. Redirecting you
                to login...
              </p>
            </div>
          </>
        )}

        {/* Error */}
        {status === "error" && (
          <>
            <img
              src="/status/error.gif"
              alt="Email verification failed"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-xl font-bold text-font-primary sm:text-2xl">
                Verification failed
              </h1>

              <p className="max-w-sm text-center text-sm leading-6 text-font-secondary sm:text-base">
                We couldn't verify your email. The verification link may be
                invalid or expired.
              </p>
            </div>

            <div className="mt-2 flex w-full flex-col gap-2">
              <Button
                variant="primary"
                onClick={handleVerification}
              >
                Try again
              </Button>

              <Button
                variant="secondary"
                onClick={() => router.push("/signup")}
              >
                Back to signup
              </Button>
            </div>
          </>
        )}

        {/* Invalid */}
        {status === "invalid" && (
          <>
            <img
              src="/status/error.gif"
              alt="Invalid verification link"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <div className="flex flex-col items-center gap-1">
              <h1 className="text-center text-xl font-bold text-font-primary sm:text-2xl">
                Invalid verification link
              </h1>

              <p className="max-w-sm text-center text-sm leading-6 text-font-secondary sm:text-base">
                This verification link is missing or invalid. Please request
                a new verification email.
              </p>
            </div>

            <div className="mt-2 w-full">
              <Button
                variant="primary"
                onClick={() => router.push("/signup")}
              >
                Back to signup
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const VerifyEmailPage = () => {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-dvh w-full items-center justify-center bg-background px-4">
          <div className="flex flex-col items-center gap-3">
            <Logo varient="sm" />

            <img
              src="/status/loading.gif"
              alt="Loading verification"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <p className="text-center text-sm text-font-secondary">
              Preparing verification...
            </p>
          </div>
        </section>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmailPage;