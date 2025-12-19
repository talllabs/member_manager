window.PaywallConfig = {
  siteName: "The Sigmund Project",
  cookieDomain: "thesigmundproject.org",

  stripe: {
    individualPlanUrl: "https://buy.stripe.com/14AbJ22hI9r6dom5OX4AU01",
    agencyPlanUrl: "https://buy.stripe.com/7sY8wQ3lM9r63NM1yH4AU00",
    successParam: "paywall=success"
  },

  access: {
    storageKey: "sigmund_paywall_access",
    allowlistEmails: []
  }
};
