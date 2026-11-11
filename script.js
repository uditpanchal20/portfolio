const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const menuBtn=$('#menuBtn'), nav=$('#nav'), themeBtn=$('#themeBtn'), header=$('#header');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
$$('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

themeBtn?.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  themeBtn.textContent=document.body.classList.contains('light')?'☾':'☼';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const glow=$('.cursor-glow');
window.addEventListener('mousemove',e=>{
  if(glow){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'}
  $$('.magnetic').forEach(el=>{
    const r=el.getBoundingClientRect(), x=e.clientX-(r.left+r.width/2), y=e.clientY-(r.top+r.height/2);
    if(Math.abs(x)<100&&Math.abs(y)<70) el.style.transform=`translate(${x*.08}px,${y*.08}px)`;
    else if(!el.matches(':hover')) el.style.transform='';
  });
},{passive:true});

const progress=$('.scroll-progress');
function scrollFX(){
  const max=document.documentElement.scrollHeight-innerHeight;
  if(progress) progress.style.width=(scrollY/Math.max(max,1)*100)+'%';
  header?.classList.toggle('scrolled',scrollY>30);
  $$('.ios-nav a').forEach(a=>{
    const sec=$(a.getAttribute('href'));
    if(sec){
      const r=sec.getBoundingClientRect();
      a.classList.toggle('active',r.top<innerHeight*.45&&r.bottom>innerHeight*.25);
    }
  });
  $$('[data-parallax]').forEach(el=>{
    const speed=parseFloat(el.dataset.parallax)||0;
    el.style.transform=`translate3d(0,${scrollY*speed}px,0)`;
  });
}
addEventListener('scroll',scrollFX,{passive:true}); scrollFX();

$$('.tilt-card').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    if(innerWidth<800)return;
    const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*7}deg) translateY(-4px)`;
  });
  card.addEventListener('pointerleave',()=>card.style.transform='');
});

const portrait=$('#portraitFrame');
portrait?.addEventListener('pointermove',e=>{
  const r=portrait.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  portrait.style.transform=`rotate(0deg) perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) scale(1.02)`;
});
portrait?.addEventListener('pointerleave',()=>portrait.style.transform='');

$$('.float-card').forEach(card=>{
  const dir=parseFloat(card.dataset.float)||1;
  let t=0;
  setInterval(()=>{t+=.035;card.style.marginTop=`${Math.sin(t)*7*dir}px`},30);
});

const hero=$('.hero');
hero?.addEventListener('pointermove',e=>{
  if(innerWidth<800)return;
  const r=hero.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  $('.hero-copy').style.transform=`translate3d(${x*-5}px,${y*-4}px,0)`;
});
hero?.addEventListener('pointerleave',()=>$('.hero-copy').style.transform='');

document.addEventListener('keydown',e=>{
  if(e.key==='Escape')nav.classList.remove('open');
});
