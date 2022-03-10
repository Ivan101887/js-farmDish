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
	render();
	setEvent();
}

async function getData() {
	const url = './data/data.json'
	try {
		const res = await fetch(url);
		const json = await res.json();
		data = await json;
		totalLen = data.length
		data = setData(data);
		setData();
	} catch (e) {
		console.log('資料擷取失敗')
	}
}

function setData() {
	let arr = [];
	data.forEach((item, index) => {
		if (index % 10 === 0) {
			arr.push([]);
			_index = Math.floor(index / perPage);
		}
		arr[_index].push(item);
	})
	return arr;
}

function render() {
	elemSpotTableTbody.innerHTML = makeTableStr(0)
	elemPage.innerHTML = makeBtnStr();
	elemBtn[0].classList.add('js-btn');
}

function makeTableStr(i,str = '') {
	data[i].forEach((item, index) => {
		const desc = item.HostWords;
		str += `
		${index % 2 !== 0 ? `<tr class="spotTable__tr js-bg__grey">` : `<tr class="spotTable__tr">`}
			<td class="text-center text-grey spotTable__td">${perPage * btnNum + index + 1}</td>
			<td class="spotTable__td  text-nowrap">${item.City}</td>
			<td class="spotTable__td">
				<div class="spotTable__smBox">
					<img class="spotTable__img" alt=${item.Name} src=${item.PicURL} width="91" height="54">
				</div>
			</td>
			<td class="spotTable__td">
				${item.Url === '' ? `${item.Name}` : `<a class="spotTable__link" href=${item.Url} target="_blank">${item.Name}</a>`}
			</td>
			<td class="spotTable__td">
				${desc.length > 50 ? `${desc.substring(0, 50)}...` : `${desc}`}
			</td>
		</tr>`
	})
	return str;
}

function makeBtnStr(str = '') {
	const len = Math.ceil(totalLen / perPage);
	for (let i = 0; i < len; i++) {
		str += `<button type="button" class="page__btn" data-index="${i}">${i + 1}</button>`
	}
	return str;
}
function atClick(e) {
	const self = e.target;
	const btnIndex = parseInt(self.dataset.index, 10);
	if (self.nodeName !== 'BUTTON' || btnNum === btnIndex) return;
	elemBtn[btnNum].classList.remove('js-btn');
	self.classList.add('js-btn');
	btnNum = btnIndex;
	elemSpotTableTbody.innerHTML = makeTableStr(btnNum);
}

function onHovered(e) {
	const self = e.target;
	const type = e.type;
	if (self.nodeName !== 'IMG' || !self.classList.contains('spotTable__img')) return;
	if (type === 'mouseenter') {
		const str = `<div class="spotTable__lgBox">
			<img class="spotTable__img" src=${self.src} alt= ${self.alt} width="348" height="237">
		</div>`
		self.parentNode.insertAdjacentHTML('beforeend', str);
		return;
	}
	elemSpotTableTbody.querySelector('.spotTable__lgBox').remove();
}

function setEvent() {
	elemPage.addEventListener('click', atClick);
	elemSpotTableTbody.addEventListener('mouseenter', onHovered, true);
	elemSpotTableTbody.addEventListener('mouseleave', onHovered, true);
}