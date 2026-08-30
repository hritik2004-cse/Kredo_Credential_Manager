import React from "react";
import { IconType } from "react-icons";
import { MdLockOutline } from "react-icons/md";
import { FaLink, FaShieldAlt } from "react-icons/fa";

type SupportingFeatures = {
  id: number;
  icon: IconType;
  heading: string;
  para: string;
};

const supportingFeatures: SupportingFeatures[] = [
  {
    id: 1,
    icon: FaLink,
    heading: "Social Links",
    para: "Keep your social profiles and important links organized alongside your other digital information.",
  },
  {
    id: 2,
    icon: FaShieldAlt,
    heading: "Secure Access",
    para: "Authentication, email verification, protected sessions, and secure credential handling work together to protect your account.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-accent">
            Features
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-font-primary md:text-5xl">
            Everything you need to manage your digital space.
          </h2>

          <p className="mt-5 text-base leading-7 text-font-secondary md:text-lg">
            Keep your credentials, social links, and important account
            information organized in one place.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Main feature */}
          <div className="min-h-90 md:min-h-105 rounded-2xl md:rounded-3xl border border-border bg-surface p-5 md:p-8 flex flex-col">
            <MdLockOutline className="text-3xl text-accent" />

            <h3 className="mt-3 md:mt-6 text-xl md:text-2xl font-semibold text-font-primary">
              Credentials
            </h3>

            <p className="mt-3 text-sm md:text-base max-w-md leading-5 md:leading-7 text-font-secondary">
              Store and organize your account credentials so you can find what
              you need without searching through scattered notes and apps.
            </p>

            {/* Visual placeholder */}
            <div className="mt-5 md:mt-10 flex h-48 items-center justify-center rounded-xl border border-border bg-background">
              <span className="text-sm text-font-secondary">
                Credential preview
              </span>
            </div>
          </div>

          {/* Supporting features */}
          <div className="grid gap-5">
            {supportingFeatures.map((feature) => (
              <div
                className="rounded-2xl md:rounded-3xl border border-border bg-surface p-5 md:p-8 flex flex-col"
                key={feature.id}
              >
                <feature.icon className="text-2xl text-accent" />

                <h3 className="mt-3 md:mt-6 text-xl md:text-2xl font-semibold text-font-primary">
                  {feature.heading}
                </h3>

                <p className="mt-3 text-sm md:text-base max-w-md leading-5 md:leading-7 text-font-secondary">
                  {feature.para}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
