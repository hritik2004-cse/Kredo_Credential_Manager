"use client";

import { motion } from "motion/react";
import {
  FaGithub,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { FiLock } from "react-icons/fi";

const credentials = [
  {
    icon: <FaGoogle />,
    name: "Google",
    type: "Personal Account",
  },
  {
    icon: <FaGithub />,
    name: "GitHub",
    type: "Developer Account",
  },
  {
    icon: <FaYoutube />,
    name: "YouTube",
    type: "Social Account",
  },
];

const CredentialVisual = () => {
  return (
    <div className="relative flex h-130 w-full items-center justify-center overflow-visible">
      {/* Ambient glow */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />

      {/* Main floating panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, rotateY: -12 }}
        animate={{
          opacity: 1,
          y: [0, -10, 0],
          rotateY: [-4, 0, -4],
        }}
        transition={{
          opacity: {
            duration: 0.7,
          },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotateY: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 1200,
        }}
        className="relative z-10 w-full max-w-110"
      >
        <div className="rounded-2xl border border-border bg-background/90 p-5 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-font-secondary">
                Your Vault
              </p>

              <h3 className="mt-1 text-xl font-semibold text-font-primary">
                Credentials
              </h3>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-accent/10 text-accent">
              <FiLock className="text-lg" />
            </div>
          </div>

          {/* Credential cards */}
          <div className="space-y-3">
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.5 + index * 0.12,
                  duration: 0.4,
                }}
                className="flex items-center gap-4 rounded-xl border border-border bg-background/70 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  {credential.icon}
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-font-primary">
                    {credential.name}
                  </p>

                  <p className="text-xs text-font-secondary">
                    {credential.type}
                  </p>
                </div>

                <div className="ml-auto h-2 w-2 rounded-full bg-accent" />
              </motion.div>
            ))}
          </div>

          {/* Bottom */}
          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-font-secondary">
              3 credentials stored
            </span>

            <span className="text-xs font-medium text-accent">
              Secured
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating social card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{
          opacity: 1,
          x: [0, 8, 0],
          y: [0, -8, 0],
        }}
        transition={{
          opacity: {
            delay: 0.8,
            duration: 0.5,
          },
          x: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -right-4 top-20 z-20 hidden w-44 rounded-xl border border-border bg-background/90 p-4 shadow-xl backdrop-blur-xl lg:block"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <FaInstagram />
          </div>

          <span className="text-sm font-medium text-font-primary">
            Social Links
          </span>
        </div>

        <p className="truncate text-xs text-font-secondary">
          instagram.com/kredoadmin
        </p>
      </motion.div>

      {/* Floating accent block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: [1, 1.08, 1],
          rotate: [0, 4, 0],
        }}
        transition={{
          opacity: {
            delay: 1,
            duration: 0.5,
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="absolute -bottom-2 -left-2 hidden h-20 w-20 rounded-2xl border border-accent/30 bg-accent/10 backdrop-blur-md lg:block"
      />
    </div>
  );
};

export default CredentialVisual;    