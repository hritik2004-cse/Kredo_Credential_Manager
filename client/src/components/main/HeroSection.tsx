import React from "react";
import { HiOutlineSparkles } from "react-icons/hi2";
import LinkButton from "../utility/LinkButton";
import MaskedHeading from "../MaskedHeading";
import CredentialVisual from "./CredentialVisual";

const HeroSection = () => {
  return (
    <section className="flex-1 w-full flex items-center justify-between">
      <div className="h-full w-full md:w-[50%] flex flex-col items-start justify-center gap-4 md:gap-8 z-10">
        <span className="inline-flex items-center justify-center gap-2 py-1.5 px-4 rounded-full border border-border bg-surface/50 backdrop-blur-sm w-fit shadow-sm shadow-accent/10">
          <HiOutlineSparkles className="text-lg text-accent" />
          <p className="text-xs md:text-sm font-semibold tracking-wider text-font-secondary uppercase">
            Your digital space
          </p>
        </span>
        <MaskedHeading
          text="Your credentials.
One organized space."
          mediaType="video"
          style={{}}
          src="/hero.mp4"
          fillScale={1.25}
          parallax={26}
          reveal="wipe"
          trigger="view"
          drift={18}
          brightness={1}
          saturation={1}
          grayscale={false}
          duration={1.1}
          stagger={0.09}
          align="left"
          weight={700}
          tracking={-0.03}
          lineHeight={1.06}
          textScale={0.115}
        />
        <p className="text-font-secondary text-base md:text-lg leading-relaxed max-w-[90%] md:max-w-[80%] font-medium">
          Store your account credentials, social links, and important
          information in one place — and access them whenever you need.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-start gap-4 mt-2 w-full">
          <div className="w-full md:flex-1 lg:flex-none lg:w-auto lg:min-w-48">
            <LinkButton variant="primary" href="/signup" className="w-full shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-shadow">
              get started
            </LinkButton>
          </div>
          <div className="w-full md:flex-1 lg:flex-none lg:w-auto lg:min-w-48">
            <LinkButton variant="secondary" href="/features" className="w-full bg-surface/30 hover:bg-hover transition-colors">
              explore kredo
            </LinkButton>
          </div>
        </div>
      </div>
      <div className="h-full hidden md:flex md:w-[50%] items-center justify-center">
        <CredentialVisual />
      </div>
    </section>
  );
};

export default HeroSection;
