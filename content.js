(function () {
  const ogTitle = document.querySelector('meta[property="og:title"]')?.content;
  const ogSite = document.querySelector('meta[property="og:site_name"]')?.content;
  const h1 = document.querySelector('h1')?.innerText?.trim();
  const company =
    document.querySelector('[data-company], .company, [data-qa="posting-company-name"], a[href*="company"]')?.innerText?.trim()
    || ogSite || "";

  window.__JOB_TRACKER__ = {
    title: ogTitle || h1 || document.title,
    company,
    url: location.href,
    source: ogSite || location.hostname.replace(/^www\./,"")
  };
})();