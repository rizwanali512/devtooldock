import { getCurrentYear } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { features } from "@/config/features";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gray-900">
      <span className="absolute top-0 -translate-x-1/2 left-1/2">
        <svg
          width="1260"
          height="457"
          viewBox="0 0 1260 457"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_11105_867)">
            <circle cx="630" cy="-173.299" r="230" fill="#3B2EFF" />
          </g>
          <defs>
            <filter
              id="filter0_f_11105_867"
              x="0"
              y="-803.299"
              width="1260"
              height="1260"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="200"
                result="effect1_foregroundBlur_11105_867"
              />
            </filter>
          </defs>
        </svg>
      </span>
      <div className="relative z-10 py-16 xl:py-24">
        <div className="container px-5 mx-auto sm:px-7">
          <div className="grid gap-y-8 gap-x-6 lg:grid-cols-12">
            <div className="lg:col-span-3 xl:col-span-4">
              <div>
                <Link href="/" className="block mb-6">
                  <Image
                    src="/images/logo-white.svg"
                    alt="DevToolDock - Free Developer Tools & AI Utilities"
                    width={128}
                    height={32}
                  />
                </Link>
                <p className="block text-sm text-gray-400 mb-9">
                  Free Developer Tools & AI Utilities
                </p>
              </div>
            </div>
            <div className="lg:col-span-6 xl:col-span-5">
              <div className="grid sm:grid-cols-3 gap-7">
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Product
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Tools
                    </Link>
                    <Link
                      href="/ai-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      AI Tools
                    </Link>
                    <Link
                      href="/categories"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/legal-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Legal Tools
                    </Link>
                    <Link
                      href="/free-developer-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Free Developer Tools
                    </Link>
                    <Link
                      href="/json-tools-online"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      JSON Tools Online
                    </Link>
                    <Link
                      href="/regex-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Regex Tools
                    </Link>
                    <Link
                      href="/encoding-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Encoding Tools
                    </Link>
                    <Link
                      href="/developer-utilities"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Developer Utilities
                    </Link>
                  </nav>
                </div>
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Company
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/about"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      About
                    </Link>
                    <Link
                      href="/contact"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Contact
                    </Link>
                    {features.pricingEnabled && (
                      <Link
                        href="/pricing"
                        className="text-sm font-normal text-gray-400 transition hover:text-white"
                      >
                        Pricing
                      </Link>
                    )}
                  </nav>
                </div>
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Legal
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/terms"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Terms &amp; Conditions
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
            {features.authEnabled && (
              <div className="lg:col-span-3">
                <div>
                  <span className="block mb-6 text-sm text-gray-400">
                    Account
                  </span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/signin"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/signup"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Sign up
                    </Link>
                    <Link
                      href="/reset-password"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Reset password
                    </Link>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container relative z-10 px-5 mx-auto sm:px-7">
          <div className="py-5 text-center">
            <p className="text-sm text-gray-500">
              &copy; {getCurrentYear()} DevToolDock. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
