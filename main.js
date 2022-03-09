const elemSpotTableTbody = document.querySelector('#SpotTableTbody');
const elemPage = document.querySelector('#Page');
const elemBtn = elemPage.children;
let data = [];
let totalLen = 0;
let perPage = 10;
let btnNum = 0;

setInit();
async function setInit() {
	await getData();
	document.querySelector('#Loading').classList.add('js-hidden');
	render(0);
	setEvent();
}

async function getData() {
	const url = './data/data.json'
	const res = await fetch(url);
	const json = await res.json();
	data = await json;
	totalLen = data.length
}

function render(v) {
	perPage >= totalLen ? elemSpotTableTbody.innerHTML = makeTableStr(v, totalLen) : elemSpotTableTbody.innerHTML = makeTableStr(v, v + perPage);
	elemPage.innerHTML = makeBtnStr();
	elemBtn[btnNum].classList.add('js-btn');
}

function makeTableStr(v, len, str='') {
	for (let i = v; i < len; i++) {
		if (data[i]) {
			const desc = data[i].HostWords
			str += `
			${i % 2 !== 0 ? `<tr class="bg-grey spotTable__tr">`
			:`<tr class="spotTable__tr">`}
			<td class="text-center text-grey spotTable__td">${i + 1}</td>
			<td class="spotTable__td  text-nowrap">${data[i].City}</td>
			<td class="spotTable__td">
				<div class="spotTable__smBox">
					<img class="spotTable__img" src=${data[i].PicURL} width="91" height="54">
					<div class="spotTable__lgBox">
						<img class="spotTable__img" src=${data[i].PicURL} width="348" height="237">
					</div>
				</div>
			</td>
			<td class="spotTable__td">
			${data[i].Url === '' ? `${data[i].Name}` :
			`<a class="spotTable__link" href=${data[i].Url} target="_blank">${data[i].Name}</a>`}
			</td>
			<td class="spotTable__td">
			${desc.length > 50 ? `${desc.substring(0, 50)}...`
			: `${desc}`}
			</td>
			</tr>`
		}
	}
	return str;
}

function makeBtnStr(str='') {
	const len = Math.ceil(totalLen / perPage);
	for (let i = 0; i < len; i++) {
		str += `<button type="button" class="page__btn" data-i="${i * perPage}">${i + 1}</button>`
	}
	return str;
}
function atClick(e) {
const self = e.target;
	const btnIndex = parseInt(self.dataset.i, 10);
	if (self.nodeName !== 'BUTTON' || btnNum === self.dataset.i) return;
	elemSpotTableTbody.innerHTML = makeTableStr(btnIndex, btnIndex + perPage);
	self.classList.add('js-btn');
	elemBtn[btnNum].classList.remove('js-btn');
	btnNum = btnIndex / 10;
	
}

function setEvent(e) {
	elemPage.addEventListener('click', atClick);
}