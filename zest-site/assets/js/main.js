document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.burger');
	const drawer = document.querySelector('.drawer');
	if(burger && drawer){
	  burger.addEventListener('click', ()=> drawer.classList.toggle('open'));
	  document.addEventListener('click', (e)=>{
		if(!drawer.contains(e.target) && !burger.contains(e.target)){
		  drawer.classList.remove('open');
		}
	  });
	}
  });
  