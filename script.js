const nav=document.querySelector('.nav');document.querySelector('.menu-toggle')?.addEventListener('click',()=>nav.classList.toggle('open'));
document.getElementById('year').textContent=new Date().getFullYear();

function loadProjects(){
  const grid=document.getElementById('projectGrid'), empty=document.getElementById('emptyProjects');
  let projects=[]; try{projects=JSON.parse(localStorage.getItem('aatech_projects')||'[]')}catch(e){}
  grid.innerHTML='';
  if(!projects.length){empty.classList.remove('hidden');return} empty.classList.add('hidden');
  projects.forEach(p=>{
    const el=document.createElement('article'); el.className='project';
    const image=p.image?`<img src="${p.image}" alt="${escapeHtml(p.title)}">`:`<div class="project-placeholder">AA</div>`;
    el.innerHTML=`<div class="project-image">${image}</div><div class="project-body"><div class="tag">${escapeHtml(p.category||'Project')}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description||'Completed technology project by AATECH Integrated Solutions Ltd.')}</p><div class="project-location">${escapeHtml(p.location||'')}${p.date?' • '+escapeHtml(p.date):''}</div></div>`;
    grid.appendChild(el);
  });
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
loadProjects();

/* Project Request Form: sends a formatted request to AATECH via WhatsApp or email.
   It also stores a copy in localStorage for future admin/backend integration. */
const requestForm = document.getElementById('projectRequestForm');
const requestStatus = document.getElementById('requestStatus');
if(requestForm){
  requestForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(requestForm);
    const request = {
      id: Date.now().toString(),
      name: data.get('name'),
      phone: data.get('phone'),
      email: data.get('email'),
      location: data.get('location'),
      service: data.get('service'),
      title: data.get('title'),
      details: data.get('details'),
      preferredDate: data.get('preferredDate'),
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    const saved = JSON.parse(localStorage.getItem('aatech_project_requests') || '[]');
    saved.unshift(request);
    localStorage.setItem('aatech_project_requests', JSON.stringify(saved));

    const message =
`AATECH INTEGRATED SOLUTIONS LTD — NEW PROJECT REQUEST

Name: ${request.name}
Phone: ${request.phone}
Email: ${request.email || 'Not provided'}
Location: ${request.location}
Service: ${request.service}
Project: ${request.title}
Preferred Date: ${request.preferredDate || 'Not specified'}

Project Details:
${request.details}`;

    // Open WhatsApp with the completed request. The user can press Send.
    const whatsappUrl = 'https://wa.me/2349035673722?text=' + encodeURIComponent(message);
    window.open(whatsappUrl, '_blank', 'noopener');

    // Prepare an email as a second option in the same request flow.
    const mailto = 'mailto:aatechsolutionltd@gmail.com?subject=' +
      encodeURIComponent('New Project Request - ' + request.title) +
      '&body=' + encodeURIComponent(message);

    requestStatus.innerHTML =
      'Request prepared. <a href="' + mailto + '">Tap here to send by email</a> if you prefer email.';
    requestStatus.style.color = '#0b70e0';
    requestForm.reset();
  });
}
