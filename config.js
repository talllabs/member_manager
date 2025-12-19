/* ========= config.js ========= */
/* Global config for Sigmund RFP Hub auth + paywall */

window.APP_CONFIG = {
  site: {
    gatedPath: "/travel-tourism-rfp-hub-beta",
    authDurationDays: 30
  },

  email: {
    serviceId: "service_hkrpkig",
    templateId: "template_hyzipwp",
    publicKey: "cznDvyzV31jcctQEA"
  },

  stripe: {
    individualCheckout:
      "https://buy.stripe.com/14AbJ22hI9r6dom5OX4AU01",
    agencyCheckout:
      "https://buy.stripe.com/7sY8wQ3lM9r63NM1yH4AU00"
  }
};
