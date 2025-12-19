window.PaywallStripe = {
  goIndividual() {
    window.location.href = window.PaywallConfig.stripe.individualPlanUrl;
  },
  goAgency() {
    window.location.href = window.PaywallConfig.stripe.agencyPlanUrl;
  }
};

if (window.location.search.includes(window.PaywallConfig.stripe.successParam)) {
  localStorage.setItem(
    window.PaywallConfig.access.storageKey,
    "true"
  );
}
