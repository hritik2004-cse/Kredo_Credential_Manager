"use client";

import Link from "next/link";
import api from "@/lib/axios";
import { isAxiosError } from "axios";
import env from "@/config/env.config";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import Logo from "@/components/utility/Logo";
import Label from "@/components/utility/Label";
import Field from "@/components/utility/Field";
import { IoIosArrowBack } from "react-icons/io";
import Button from "@/components/utility/Button";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { Checkbox } from "@/components/ui/checkbox";
import FormInput from "@/components/utility/FormInput";
import GradientWaves from "@/components/GradientWaves";
import { FaHeart, FaUser, FaLock } from "react-icons/fa";
import LinkButton from "@/components/utility/LinkButton";
import { type SignupFormCredentials } from "@/types/form.types";
import {
  useState,
  useEffect,
  type SubmitEventHandler,
  ChangeEvent,
} from "react";
import Image from "next/image";

// types

type VerificationEmailSentProps = {
  email: string;
  onBackToSignup: () => void;
};

type SignupFormProps = {
  onSignupSuccess: (email: string) => void;
};

// verification mail sent sub component
const VerificationEmailSent = ({
  email,
  onBackToSignup,
}: VerificationEmailSentProps) => {
  type EmailStatus = "sending" | "success" | "error";
  const [cooldown, setCooldown] = useState<number>(0);
  const [status, setStatus] = useState<EmailStatus>("success");

  const statusConfig = {
    success: {
      title: "Check your email",
      gif: "/status/success.gif",

      message: (
        <>
          <p className="text-sm sm:text-base text-font-secondary leading-6">
            We've sent a verification link to
          </p>

          <span className="mt-2 inline-block max-w-full rounded-lg border border-border/60 bg-background/50 px-4 py-2 text-sm sm:text-base font-medium text-font-primary break-all">
            {email}
          </span>

          <span className="mt-3 text-sm sm:text-base text-font-secondary leading-6">
            Click the link in your email to verify your account. If you don't
            see the email, check your{" "}
            <span className="font-medium text-font-primary">
              Spam, Junk, or Promotions
            </span>{" "}
            folder. If it's still not there, you can resend the verification
            email.
          </span>
        </>
      ),
    },

    sending: {
      title: "Sending email",
      gif: "/status/loading.gif",

      message: (
        <>
          <p className="text-sm sm:text-base text-font-secondary leading-6">
            We're sending a new verification link to
          </p>

          <span
            className="
            mt-2 inline-block max-w-full
            rounded-lg border border-accent/20
            bg-accent/5 px-4 py-2
            text-sm sm:text-base font-medium
            text-font-primary break-all
          "
          >
            {email}
          </span>

          <p className="mt-3 text-sm sm:text-base text-font-secondary leading-6">
            This may take a few seconds. Please don't close this page.
          </p>
        </>
      ),
    },

    error: {
      title: "We couldn't send the email",
      gif: "/status/error.gif",

      message: (
        <>
          <p className="text-sm sm:text-base text-font-secondary leading-6">
            We couldn't send a verification email to
          </p>

          <span
            className="
            mt-2 inline-block max-w-full
            rounded-lg border border-error/30
            bg-error/5 px-4 py-2
            text-sm sm:text-base font-medium
            text-font-primary break-all
          "
          >
            {email}
          </span>

          <p className="mt-3 text-sm sm:text-base text-font-secondary leading-6">
            This may be caused by a temporary email service or network problem.
            Please wait a moment and try again.
          </p>
        </>
      ),
    },
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const resendEmailHandler = async () => {
    try {
      setStatus("sending");
      await api.post(`${env.serverUrl}/api/auth/resend-verification`, {
        email,
      });
      setStatus("success");
      setCooldown(120);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="w-[92%] max-w-110 h-auto backdrop-blur-2xl bg-surface/75 border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl px-6 py-6 sm:px-8 sm:py-7 flex flex-col gap-2 relative z-10 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-border/70">
      {/* Brand + heading */}
      <div className="flex flex-col items-center justify-center gap-1.5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-font-primary tracking-tight mt-1">
          {statusConfig[status].title}
        </h1>
      </div>
      <figure className="w-full flex items-center justify-center">
        <Image
          src={statusConfig[status].gif}
          height={100}
          width={100}
          loading="lazy"
          alt=""
        />
      </figure>
      <div className="flex flex-col items-center">
        {statusConfig[status].message}
      </div>
      <hr className="border border-border my-2" />
      <div className="flex items-center justify-center gap-1">
        <p className="text-font-secondary text-sm font-medium text-center">
          Didn&apos;t receive it?
        </p>
        <button
          onClick={resendEmailHandler}
          disabled={status === "sending" || cooldown > 0}
          className="text-sm text-accent font-medium cursor-pointer hover:text-accent/70 transition-colors duration-200"
        >
          {status === "sending"
            ? "Sending..."
            : status === "error"
              ? cooldown > 0
                ? `Try again in ${cooldown}s`
                : "Try again"
              : cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend email"}
        </button>
      </div>

      {/* Back to signup
      <button
        type="button"
        onClick={onBackToSignup}
        className="flex items-center justify-center gap-1.5 text-font-secondary text-sm font-medium hover:text-font-primary transition-colors duration-200 mt-1"
      >
        <IoIosArrowBack className="text-base" />
        Back to signup
      </button> */}
    </section>
  );
};

const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [signupFormData, setSignupFormData] = useState<SignupFormCredentials>({
    userName: "",
    email: "",
    password: "",
  });

  const formSubmitHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!termsAccepted) {
      toast.error("Please accept the terms & conditions");
      return;
    }

    try {
      setLoading(true);

      const normalizedEmail = signupFormData.email.trim().toLowerCase();
      const normalizedUsername = signupFormData.userName.trim().toLowerCase();

      const response = await api.post(`${env.serverUrl}/api/auth/signup`, {
        userName: normalizedUsername,
        email: normalizedEmail,
        password: signupFormData.password,
      });

      sessionStorage.setItem("verificationMail", normalizedEmail);

      setSignupFormData({
        userName: "",
        email: "",
        password: "",
      });

      toast.success(response?.data?.message);
      onSignupSuccess(normalizedEmail);
    } catch (error) {
      const message = isAxiosError(error)
        ? error?.response?.data?.message
        : "Unable to signup";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSignupFormData((prev) => ({
      ...prev,
      [e.target.name as keyof SignupFormCredentials]: e.target.value,
    }));
  };

  return (
    <form
      className="w-[92%] max-w-110 h-auto backdrop-blur-2xl bg-surface/75 border border-border/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-2xl px-6 py-5 sm:px-8 sm:py-6 flex flex-col gap-3.5 relative z-10 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] hover:border-border/70"
      onSubmit={formSubmitHandler}
    >
      <div className="flex flex-col items-center justify-center gap-1">
        <Logo varient="sm" />
        <h1 className="text-xl sm:text-2xl font-extrabold text-font-primary tracking-tight mt-1">
          Create an account
        </h1>
        <p className="text-xs sm:text-sm text-font-secondary text-center">
          Start organizing your digital space securely.
        </p>
      </div>
      <Field dir="col" className="gap-1">
        <Label htmlFor="userName">Username</Label>
        <FormInput
          type="text"
          id="userName"
          Icon={FaUser}
          minLength={5}
          name="userName"
          placeholder="jhon3568"
          autoComplete="username"
          onChange={formChangeHandler}
          value={signupFormData.userName}
          pattern="^(?=.*\d)[a-zA-Z0-9_-]{5,}$"
          title="Username must be at least 5 characters long, contain at least one number, and only include letters, numbers, underscores, and hyphens."
        />
      </Field>
      <Field dir="col" className="gap-1">
        <Label htmlFor="email">Email address</Label>
        <FormInput
          id="email"
          type="email"
          name="email"
          Icon={MdEmail}
          autoComplete="email"
          value={signupFormData.email}
          onChange={formChangeHandler}
          placeholder="jhon@example.com"
        />
      </Field>
      <Field dir="col" className="gap-1">
        <Label htmlFor="password">Password</Label>
        <div className="w-full h-full flex items-center justify-center relative group">
          <FormInput
            Icon={FaLock}
            minLength={8}
            maxLength={40}
            id="password"
            name="password"
            placeholder="********"
            autoComplete="new-password"
            onChange={formChangeHandler}
            value={signupFormData.password}
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            aria-pressed={showPassword}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-xl text-font-secondary hover:text-accent transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <LuEyeClosed /> : <LuEye />}
          </button>
        </div>
      </Field>
      <Field dir="row" className="items-center justify-start gap-2 px-1">
        <Checkbox
          id="term-checkbox"
          name="term-checkbox"
          checked={termsAccepted}
          onCheckedChange={(check) => setTermsAccepted(check === true)}
        />
        <Label
          htmlFor="term-checkbox"
          className="font-normal cursor-pointer select-none"
        >
          <span className="text-sm text-font-secondary">
            I agree to the{" "}
            <Link
              href="/"
              className="text-accent hover:text-accent/80 hover:underline transition-colors"
            >
              terms &amp; conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/"
              className="text-accent hover:text-accent/80 hover:underline transition-colors"
            >
              privacy policy
            </Link>
          </span>
        </Label>
      </Field>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? "Creating account..." : "Create account"}
      </Button>
      <div className="flex items-center justify-center gap-1.5 text-sm text-font-secondary">
        <p>Already have an account?</p>
        <Link
          href="/login"
          className="text-accent font-medium hover:underline hover:text-accent/80 transition-colors"
        >
          Log in
        </Link>
      </div>
    </form>
  );
};

const SignupPage = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [verificationEmail, setVerificationEmail] = useState<string>("");

  const handleBackToSignup = () => {
    sessionStorage.removeItem("verificationMail");
    setEmailSent(false);
  };

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationMail");

    if (storedEmail) {
      setVerificationEmail(storedEmail);
    }
  }, []);

  return (
    <main className="h-dvh w-full bg-background relative flex items-center justify-center overflow-hidden">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0px",
        }}
      >
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
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <LinkButton
          href="/"
          className="gap-2 text-sm md:text-base shadow-lg hover:shadow-xl transition-all"
          variant="glassMorph"
        >
          <IoIosArrowBack className="text-lg md:text-xl" /> Back to website
        </LinkButton>
      </div>

      {emailSent ? (
        <VerificationEmailSent
          email={verificationEmail}
          onBackToSignup={handleBackToSignup}
        />
      ) : (
        <SignupForm
          onSignupSuccess={(email) => {
            setVerificationEmail(email);
            setEmailSent(true);
          }}
        />
      )}

      <span className="absolute bottom-4 flex items-center justify-center gap-1.5 text-font-secondary text-xs z-10 backdrop-blur-sm bg-surface/30 px-3 py-1 rounded-full border border-border/30 shadow-xl">
        Built with <FaHeart className="text-error text-sm animate-pulse" /> by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-font-primary underline"
          href="https://www.linkedin.com/in/hritik-sharma-oct04/"
        >
          Hritik Sharma
        </a>
      </span>
    </main>
  );
};

export default SignupPage;
