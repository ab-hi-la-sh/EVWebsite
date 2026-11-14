/* /ai-vault/ — use-case carousel (content and logic from the AI Vault v2 design). */
(function(){
 if(!document.getElementById('case-title'))return;
 const cases=[
 {title:'Insurance claims and coverage',summary:'An agent retrieves a policy, claim documents and relevant exclusions to explain coverage to a customer.',vault:'Limits access to approved policy, claim and supporting files.',nopii:'Keeps customer identifiers out of supported model requests.',triplets:'Checks the coverage explanation against current policy language, exclusions and approved evidence.'},
 {title:'Healthcare administration',summary:'An agent reviews patient intake material and drafts an administrative summary for an authorized care team.',vault:'Controls access to the case records and uploaded documents needed for this task.',nopii:'Tokenizes patient identifiers before supported model calls.',triplets:'Checks claims in the summary against submitted records and approved reference material.'},
 {title:'Financial services and payments',summary:'An agent prepares an account-service response and initiates an approved payment workflow.',vault:'Protects card values and account records, using tokens through the payment proxy path.',nopii:'Minimizes exposure of customer identifiers in model context.',triplets:'Checks account-service statements against approved terms and records.'},
 {title:'Legal and enterprise operations',summary:'An agent compares contractual obligations across a controlled set of confidential documents.',vault:'Restricts the document set to the authorized matter or business process.',nopii:'Tokenizes confidential identifiers in supported model interactions.',triplets:'Validates the draft against exact contract provisions and source versions.'}
 ];
 let current=0;const $=id=>document.getElementById(id);
 function show(i){current=(i+cases.length)%cases.length;const c=cases[current];$('case-title').textContent=c.title;$('case-summary').textContent=c.summary;$('case-vault').textContent=c.vault;$('case-nopii').textContent=c.nopii;$('case-triplets').textContent=c.triplets;$('case-count').textContent=String(current+1).padStart(2,'0')+' / 04';document.querySelectorAll('.dot').forEach((d,j)=>{d.classList.toggle('active',j===current);d.setAttribute('aria-pressed',j===current?'true':'false')})}
 $('prev-case').addEventListener('click',()=>show(current-1));$('next-case').addEventListener('click',()=>show(current+1));document.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.case))));
})();
/* The Vault, NoPII and Triplets stack: as the next card slides over, the covered
   card eases back. Runs only where the CSS makes the cards sticky. */
(function(){
  var cards=[].slice.call(document.querySelectorAll('.aiv .aiv-stack'));
  if(cards.length<2)return;
  var mq=matchMedia('(min-width:1024px) and (prefers-reduced-motion:no-preference)');
  var nav=document.querySelector('.hp-nav');
  var root=document.querySelector('.aiv');
  var ticking=false;
  function setTop(){
    var h=nav?nav.getBoundingClientRect().height:72;
    root.style.setProperty('--aiv-stack-top',Math.round(h)+'px');
    // A card taller than the space under the nav sticks by its bottom edge, so all of it is read before the next covers it.
    cards.forEach(function(c){c.style.top=mq.matches?Math.round(Math.min(h,window.innerHeight-c.offsetHeight))+'px':'';});
  }
  function update(){
    ticking=false;
    cards.forEach(function(c,i){
      var inner=c.firstElementChild;
      if(!mq.matches||i===cards.length-1){inner.style.transform='';inner.style.opacity='';return;}
      var r=c.getBoundingClientRect(), nr=cards[i+1].getBoundingClientRect();
      var p=Math.max(0,Math.min(1,(r.bottom-nr.top)/r.height));
      inner.style.transform='scale('+(1-0.06*p).toFixed(4)+')';
      inner.style.opacity=(1-0.65*p).toFixed(3);
    });
  }
  function onScroll(){if(!ticking){ticking=true;requestAnimationFrame(update);}}
  setTop();update();
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',function(){setTop();onScroll();});
})();
