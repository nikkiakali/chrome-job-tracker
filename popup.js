const $ = s => document.querySelector(s);

async function getConfig(){
  return await chrome.storage.sync.get({webhook:"", resumes:["General"]});
}
async function getAll(){ return (await chrome.storage.sync.get({jobs:[]})).jobs; }
async function setAll(jobs){ await chrome.storage.sync.set({jobs}); }

async function getTabData() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [res] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.__JOB_TRACKER__ || {
      title: document.title, company:"", url: location.href, source: location.hostname.replace(/^www\./,"")
    }
  });
  return res?.result;
}

function toCSV(rows){
  if(!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const esc = v => `"${String(v??"").replace(/"/g,'""')}"`;
  return [headers.join(","), ...rows.map(r=>headers.map(h=>esc(r[h])).join(","))].join("\n");
}

function renderList(list){
  const ul = $("#list");
  ul.innerHTML = "";
  list.forEach(j=>{
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${j.title}</strong> — ${j.company || j.source}<br>
      <small class="mono">${j.url}</small><br>
      <small>Status: ${j.status} | Applied: ${j.appliedAt || "-"} | Resume: ${j.resumeUsed||"-"}</small>
      <div style="margin-top:6px;">
        <button data-action="open" data-id="${j.id}">Open</button>
        <button data-action="del" data-id="${j.id}">Delete</button>
      </div>`;
    ul.appendChild(li);
  });
  ul.onclick = async e=>{
    const btn = e.target.closest("button"); if(!btn) return;
    const id = btn.dataset.id;
    const jobs = await getAll();
    const idx = jobs.findIndex(x=>x.id===id); if(idx<0) return;
    if(btn.dataset.action==="open") chrome.tabs.create({url: jobs[idx].url});
    if(btn.dataset.action==="del"){ jobs.splice(idx,1); await setAll(jobs); renderList(await getAll()); }
  };
}

async function postToWebhook(webhook, payload){
  if(!webhook) return {ok:false, skip:true};
  try{
    const r = await fetch(webhook, {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(payload)});
    return {ok:r.ok};
  }catch(e){ console.warn("Webhook error", e); return {ok:false, error:String(e)}; }
}

document.addEventListener("DOMContentLoaded", async ()=>{
  const cfg = await getConfig();
  const auto = await getTabData();
  $("#title").value = auto?.title || "";
  $("#company").value = auto?.company || "";
  $("#url").value = auto?.url || "";
  $("#appliedAt").valueAsDate = new Date();

  // Populate resume variants
  const resumeSel = $("#resumeUsed");
  (cfg.resumes || ["General"]).forEach(name=>{
    const opt = document.createElement("option"); opt.textContent = name; opt.value = name; resumeSel.appendChild(opt);
  });

  $("#job-form").addEventListener("submit", async (e)=>{
    e.preventDefault();
    const jobs = await getAll();
    const job = {
      id: crypto.randomUUID(),
      title: $("#title").value.trim(),
      company: $("#company").value.trim(),
      url: $("#url").value.trim(),
      source: (auto?.source || new URL($("#url").value).hostname).replace(/^www\./,""),
      location: $("#location").value.trim(),
      status: $("#status").value,
      appliedAt: $("#appliedAt").value,
      deadline: "",
      resumeUsed: $("#resumeUsed").value,
      notes: $("#notes").value.trim()
    };
    jobs.unshift(job);
    await setAll(jobs);
    renderList(jobs);
    $("#job-form").reset();
    $("#appliedAt").valueAsDate = new Date();

    const {webhook} = await getConfig();
    await postToWebhook(webhook, job);
  });

  $("#view-list").addEventListener("click", async ()=> renderList(await getAll()));
  $("#export-csv").addEventListener("click", async ()=>{
    const csv = toCSV(await getAll());
    const blob = new Blob([csv], {type:"text/csv"});
    const url = URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {href:url, download:"jobs.csv"});
    a.click(); URL.revokeObjectURL(url);
  });
  $("#open-options").addEventListener("click", ()=> chrome.runtime.openOptionsPage());
});