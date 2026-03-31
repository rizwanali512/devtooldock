import { getCurrentYear } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

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
                <Link
                  href="/"
                  className="flex items-center gap-2.5 whitespace-nowrap transition-opacity hover:opacity-90 mb-5"
                >
                  <Image
                    src="/images/logo.png"
                    alt=""
                    aria-hidden="true"
                    width={32}
                    height={32}
                    className="h-8 w-auto shrink-0"
                  />
                  <span className="text-lg font-semibold tracking-tight text-white">
                    DevTool<span className="text-primary-400">Dock</span>
                  </span>
                </Link>
                <p className="block text-sm text-gray-400 mb-9 leading-6">
                  Free Online Developer Tools for Code Formatting, JSON Processing, Data
                  Conversion, and Efficient Development Tasks
                </p>
              </div>
            </div>
            <div className="lg:col-span-9 xl:col-span-8">
              <div className="grid sm:grid-cols-3 gap-7">
                <div>
                  <span className="block mb-6 text-sm text-gray-400">Tools</span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/json-formatter"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      JSON Formatter
                    </Link>
                    <Link
                      href="/password-generator"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Password Generator
                    </Link>
                    <Link
                      href="/image-compressor"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Image Compressor
                    </Link>
                    <Link
                      href="/word-counter"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Word Counter
                    </Link>
                    <Link
                      href="/all-tools"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      All Tools
                    </Link>
                  </nav>
                </div>

                <div>
                  <span className="block mb-6 text-sm text-gray-400">Resources</span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/blog"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/blog"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Guides / Tutorials
                    </Link>
                    <Link
                      href="/faqs"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      FAQs
                    </Link>
                    <Link
                      href="/about"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      About Us
                    </Link>
                  </nav>
                </div>

                <div>
                  <span className="block mb-6 text-sm text-gray-400">Customer Support</span>
                  <nav className="flex flex-col space-y-3">
                    <Link
                      href="/contact"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/privacy-policy"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href="/terms"
                      className="text-sm font-normal text-gray-400 transition hover:text-white"
                    >
                      Terms and Conditions
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container relative z-10 px-5 mx-auto sm:px-7">
          <div className="py-5 text-center">
            <p className="text-sm text-gray-400">
              &copy; {getCurrentYear()} DevToolDock. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
