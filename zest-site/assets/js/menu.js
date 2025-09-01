function fmtPrice(x){
	if (x === undefined || x === null || x === "") return "";
	// keep as string, normalize comma → dot, show 2 decimals
	const num = Number(String(x).replace(',', '.'));
	return isFinite(num) ? num.toFixed(2) : String(x);
  }
  function fmtGrams(x){
	if (x === undefined || x === null || x === "") return "";
	const n = Number(x);
	return isFinite(n) ? `${n}g` : String(x);
  }
  
  async function loadMenu(){
	const panel = document.getElementById('menu-panel');
	try{
	  const data = await fetch('/data/menu.json').then(r=>r.json());
	  panel.innerHTML = '';
  
	  data.categories.forEach(cat => {
		const section = document.createElement('div');
		section.className = 'section';
		section.innerHTML = `<div class="container">
		  <h2 style="font-size:28px;margin-bottom:14px">${cat.name}</h2>
		  <div class="list"></div>
		</div>`;
		panel.appendChild(section);
  
		const list = section.querySelector('.list');
  
		(cat.items || []).forEach(it => {
		  const priceSmall = fmtPrice(it.price_small);
		  const priceLarge = fmtPrice(it.price_large);
		  const gramsSmall = fmtGrams(it.grams_small);
		  const gramsLarge = fmtGrams(it.grams_large);
  
		  // Right-side summary: price + grams
		  const priceStr = (priceSmall && priceLarge) ? `RON ${priceSmall}/${priceLarge}` :
						   priceSmall ? `RON ${priceSmall}` :
						   priceLarge ? `RON ${priceLarge}` : '';
		  const gramsStr = (gramsSmall || gramsLarge)
			? `${gramsSmall || ''}${(gramsSmall && gramsLarge) ? ' / ' : ''}${gramsLarge || ''}`
			: '';
  
		  const hasImg = Boolean(it.image);
		  const el = document.createElement('div');
		  el.className = 'item' + (hasImg ? '' : ' no-thumb');
		  el.setAttribute('role','button');
		  el.setAttribute('tabindex','0');
		  el.setAttribute('aria-expanded','false');
  
		  const tags = (it.tags || []).map(t => `<span class='badge'>${t}</span>`).join(' ');
		  const thumb = hasImg ? `<img loading="lazy" src="${it.image}" alt="${it.name}">` : '';
  
		  // Build ingredients list with both sizes
		  let detailsHTML = '';
		  if (Array.isArray(it.ingredients) && it.ingredients.length){
			const rows = it.ingredients.map(ing => {
			  const gs = fmtGrams(ing.grams_small);
			  const gl = fmtGrams(ing.grams_large);
			  const both = gs || gl ? `<span class="grams">${gs || ''}${(gs && gl) ? ' / ' : ''}${gl || ''}</span>` : '';
			  return `<li><span>${ing.name}</span>${both}</li>`;
			}).join('');
			const totalLine = (gramsSmall || gramsLarge)
			  ? `<div class="total-row"><strong>Greutate:</strong> <span>${gramsSmall || ''}${(gramsSmall && gramsLarge)?' / ':''}${gramsLarge || ''}</span></div>`
			  : '';
			detailsHTML = `
			  ${totalLine}
			  <ul class="ing-list">${rows}</ul>
			`;
		  }
  
		  el.innerHTML = `
			${thumb}
			<div class="meta">
			  <strong>${it.name} ${tags}</strong>
			  <small>${it.description || ''}</small>
			  <div class="details">
				${detailsHTML}
			  </div>
			</div>
			<div class="badge-time">
			  ${priceStr}${(priceStr && gramsStr) ? ' • ' : ''}${gramsStr}
			</div>
		  `;
  
		  // Toggle expand
		  el.addEventListener('click', () => {
			const open = el.classList.toggle('open');
			el.setAttribute('aria-expanded', open);
		  });
		  el.addEventListener('keydown', (e) => {
			if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
		  });
  
		  list.appendChild(el);
		});
	  });
	}catch(e){
	  panel.innerHTML = '<div class="container"><p class="muted">Nu s-a putut încărca meniul. Verifică data/menu.json</p></div>';
	  console.error(e);
	}
  }
  document.addEventListener('DOMContentLoaded', loadMenu);
  