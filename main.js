let data = [],
	totalLen = 0,
	perPage = 10,
	btnNum = 0;

onLoad();
function onLoad() {
	getData();
}

function getData() {
	fetch('../data/data.json')
		.then(res => res.json())
		.then(json => {
			document.querySelector('#Loading').classList.add('js-hidden');
			let i = 0;
			totalLen = json.length;
			data = json;
			setbtn()
			render(i);
			switchPage();
		})
}

function render(v, str='') {
	const elemSpotTableTbody = document.querySelector('#SpotTableTbody');
	perPage >= totalLen ? str = setInfo(v, totalLen) : str = setInfo(v, v + perPage);
	elemSpotTableTbody.innerHTML = str;
}

function setInfo(v, len, str='') {
	for (let i = v; i < len; i++) {
		if (data[i]) {
			let desc = data[i].HostWords
			str += `
			${i % 2 !== 0 ? `<tr class="bg-grey spotTable__tr">`
			:`<tr class="spotTable__tr">`}
			<td class="text-center spotTable__td">${i + 1}</td>
			<td class="spotTable__td">${data[i].City}</td>
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
			${desc.length > 50 ? `${data[i].HostWords.substring(0, 50)}...`
			: `${data[i].HostWords}`}
			</td>
			</tr>`
		}
	}
	return str;
}

function setbtn() {
	let str = '',
		len = Math.ceil(totalLen / perPage);
	const page = document.querySelector('#Page'),
		btn = page.children;
	for (let i = 0; i < len; i++) {
		str += `<button type="button" class="page__btn" data-i="${i * perPage}">${i + 1}</button>`
	}
	page.innerHTML = str;
	btn[btnNum].classList.add('js-btn');
	switchPage();
}
//監聽換頁事件
function switchPage() {
	const elemPageBtn = document.querySelectorAll('#Page .page__btn');
	for (let i = 0; i < elemPageBtn.length; i++) {
		elemPageBtn[i].addEventListener('click', function () {
			if (btnNum === i) return;
			let key = parseInt(this.dataset.i);
			render(key);
			this.classList.add('js-btn');
			elemPageBtn[btnNum].classList.remove('js-btn');
			btnNum = i;
		}, false);
	}
}