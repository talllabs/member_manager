window.PaywallConfig = {
  siteName: "The Sigmund Project",
  cookieDomain: "thesigmundproject.org",

  stripe: {
    individualPlanUrl: "https://buy.stripe.com/YOUR_INDIVIDUAL_LINK",
    agencyPlanUrl: "https://buy.stripe.com/YOUR_AGENCY_LINK",
    successParam: "paywall=success"
  },

  access: {
    storageKey: "sigmund_paywall_access",
    allowlistEmails: [
      // paste existing MemberSpace subscriber emails here
      "user@example.com"
    ]
  }
};
