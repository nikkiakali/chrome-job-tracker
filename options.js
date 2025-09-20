const $ = s => document.querySelector(s);

(async function init(){
  const cfg = await chrome.storage.sync.get({ webhook:"", resumes:["General"] });
  $("#webhook").value = cfg.webhook;
  $("#resumes").value = (cfg.resumes || []).join("\n");
})();

$("#save").addEventListener("click", async () => {
  const webhook = $("#webhook").value.trim();
  const resumes = $("#resumes").value.split("\n").map(s=>s.trim()).filter(Boolean);
  await chrome.storage.sync.set({ webhook, resumes });
  $("#status").textContent = "Saved ✓";
  setTimeout(()=>$("#status").textContent="", 1500);
});