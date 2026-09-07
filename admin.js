const STORAGE='aatech_projects', AUTH='aatech_admin_auth';
/* Demo credentials for this static GitHub/Netlify version:
   username: admin
   password: AATech@2026
   For a public production site, connect this dashboard to real authentication/database. */
const DEFAULT_USER='admin', DEFAULT_PASS='AATech@2026';

const $=id=>document.getElementById(id);
function getProjects(){try{return JSON.parse(localStorage.getItem(STORAGE)||'[]')}catch(e){return[]}}
function saveProjects(p){localStorage.setItem(STORAGE,JSON.stringify(p))}
function isLogged(){return sessionStorage.getItem(AUTH)==='1'}
function showDashboard(){ $('loginScreen').classList.add('hidden');$('dashboard').classList.remove('hidden');render()}
if(isLogged())showDashboard();

$('loginForm').addEventListener('submit',e=>{
 e.preventDefault();
 if($('username').value.trim()===DEFAULT_USER && $('password').value===DEFAULT_PASS){sessionStorage.setItem(AUTH,'1');$('loginError').textContent='';showDashboard()}
 else $('loginError').textContent='Incorrect username or password.';
});
$('logoutBtn').addEventListener('click',()=>{sessionStorage.removeItem(AUTH);location.reload()});
$('newBtn').addEventListener('click',()=>openModal());
$('closeModal').addEventListener('click',closeModal);$('cancelBtn').addEventListener('click',closeModal);
function openModal(project=null){
 $('modal').classList.remove('hidden');$('projectForm').reset();$('editId').value='';
 $('modalTitle').textContent=project?'Edit Project':'Add Project';
 if(project){$('editId').value=project.id;$('title').value=project.title;$('category').value=project.category;$('location').value=project.location;$('date').value=project.date;$('description').value=project.description}
}
function closeModal(){$('modal').classList.add('hidden')}
$('projectForm').addEventListener('submit',e=>{
 e.preventDefault();
 const finish=imageData=>{
  const projects=getProjects(), id=$('editId').value||Date.now().toString();
  const old=projects.find(x=>x.id===id);
  const obj={id,title:$('title').value.trim(),category:$('category').value,location:$('location').value.trim(),date:$('date').value,description:$('description').value.trim(),image:imageData||old?.image||''};
  const idx=projects.findIndex(x=>x.id===id); if(idx>=0)projects[idx]=obj; else projects.unshift(obj);saveProjects(projects);closeModal();render()
 };
 const file=$('image').files[0];
 if(file){const reader=new FileReader();reader.onload=()=>finish(reader.result);reader.readAsDataURL(file)}else finish('');
});
function getRequests(){try{return JSON.parse(localStorage.getItem('aatech_project_requests')||'[]')}catch(e){return[]}}
function saveRequests(r){localStorage.setItem('aatech_project_requests',JSON.stringify(r))}
function renderRequests(){
 const list=$('requestsList'), requests=getRequests(); list.innerHTML='';
 $('noRequests').classList.toggle('hidden',requests.length>0);
 requests.forEach(r=>{
  const row=document.createElement('div'); row.className='request-row';
  row.innerHTML=`<div class="request-top"><div><h3>${esc(r.title)}</h3><div class="request-meta"><b>${esc(r.name)}</b> • ${esc(r.phone)}${r.email?' • '+esc(r.email):''}<br>${esc(r.service)} • ${esc(r.location)}${r.preferredDate?' • Preferred: '+esc(r.preferredDate):''}</div></div><div class="request-meta">${esc(new Date(r.createdAt).toLocaleString())}</div></div><div class="request-details">${esc(r.details)}</div><div class="request-actions"><button onclick="window.open('https://wa.me/${String(r.phone||'').replace(/\D/g,'')}','_blank')">WhatsApp</button><button class="danger" data-request-delete="${r.id}">Delete</button></div>`;
  list.appendChild(row);
 });
 document.querySelectorAll('[data-request-delete]').forEach(b=>b.onclick=()=>{if(confirm('Delete this request?')){saveRequests(getRequests().filter(r=>r.id!==b.dataset.requestDelete));renderRequests()}});
}
function render(){
 renderRequests();
 const list=$('projectsList'), projects=getProjects();list.innerHTML='';
 $('noProjects').classList.toggle('hidden',projects.length>0);
 projects.forEach(p=>{
  const row=document.createElement('div');row.className='project-row';
  row.innerHTML=`<div class="thumb">${p.image?`<img src="${p.image}" alt="">`:'AA'}</div><div class="project-info"><h3>${esc(p.title)}</h3><p>${esc(p.category)}${p.location?' • '+esc(p.location):''}</p></div><div class="actions"><button data-edit="${p.id}">Edit</button><button class="delete" data-delete="${p.id}">Delete</button></div>`;
  list.appendChild(row);
 });
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>openModal(projects.find(p=>p.id===b.dataset.edit)));
 document.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>{if(confirm('Delete this project?')){saveProjects(getProjects().filter(p=>p.id!==b.dataset.delete));render()}});
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
