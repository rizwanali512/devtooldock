/**
 * Feature flags for auth, pricing, and homepage sections.
 * Set to true when ready to show these features in the UI and navigation.
 */
export const features = {
  authEnabled: false,
  pricingEnabled: false,
  /** "Developer tools at your fingertips" tools-tab section on homepage */
  homepageToolsTabEnabled: false,
} as const;
