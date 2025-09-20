chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-job",
    title: "Save job to tracker",
    contexts: ["page", "selection", "link"]
  });
});

async function getAll(){ return (await chrome.storage.sync.get({jobs:[]})).jobs; }
async function setAll(jobs){ await chrome.storage.sync.set({jobs}); }

async function getConfig(){
  const {webhook="", resumes=["General"]} = await chrome.storage.sync.get({webhook:"", resumes:["General"]});
  return {webhook, resumes};
}

async function fetchTabData(tabId){
  const [res] = await chrome.scripting.executeScript({
    target: { tabId }, func: () => window.__JOB_TRACKER__ || {
      title: document.title, company:"", url: location.href, source: location.hostname.replace(/^www\./,"")
    }
  });
  return res?.result || {};
}

async function postToWebhook(webhook, payload){
  if(!webhook) return {ok:false, skip:true};
  try{
    const r = await fetch(webhook, {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    return {ok:r.ok};
  }catch(e){
    console.warn("Webhook error", e);
    return {ok:false, error:String(e)};
  }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "save-job" || !tab?.id) return;
  const {webhook} = await getConfig();
  const auto = await fetchTabData(tab.id);
  const job = {
    id: crypto.randomUUID(),
    title: auto.title || tab.title || "",
    company: auto.company || "",
    url: auto.url || tab.url || "",
    source: auto.source || new URL(auto.url || tab.url).hostname,
    location: "",
    status: "Applied",
    appliedAt: new Date().toISOString().slice(0,10),
    deadline: "",
    resumeUsed: "", // set in popup typically
    notes: info.selectionText ? `From selection: ${info.selectionText}` : ""
  };

  const jobs = await getAll();
  jobs.unshift(job);
  await setAll(jobs);
  await postToWebhook(webhook, job);

  chrome.notifications?.create({
    type: "basic", iconUrl: "icon128.png",
    title: "Job saved", message: `${job.title} @ ${job.company || job.source}`
  });
});