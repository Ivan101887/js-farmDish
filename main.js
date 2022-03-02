let data = [],
	totalLen = 0,
	perPage = 10,
	btnNum = 0;

onLoad();
function onLoad() {
	getData();
}

function getData() {
	document.querySelector('#Loading').classList.remove('js-hidden');
	fetch('./data.json')
		.then(res => res.json())
		.then(json => {
			document.querySelector('#Loading').classList.add('js-hidden');
			let i = 0;
			totalLen = json.length;
			data = json;
			setbtn()
			changeTable(i);
			switchPage();
		})
}

function changeTable(v) {
	let str = '';
	const Tbody = document.querySelector('#Tbody');
	if (perPage >= totalLen) {
		str = setInfo(v, totalLen)
	}
	else {
		str = setInfo(v, v + perPage)
	}
	Tbody.innerHTML = str;
}

function setInfo(v, len) {
	let str = '';
	for (let i = v; i < len; i++) {
		if (data[i]) {
			str += `<tr>
			<td>${i + 1}</td>
			<td>${data[i].City}</td>
			<td>
			<div class="img__small">
				<img class="img-resp" src=${data[i].PicURL} width="91" height="54">
				<div class="img__big">
				<img class="img-resp" src=${data[i].PicURL} width="348" height="237">
				</div>
			</div>
			</td>
			${isHas(i)}
			<td>${data[i].HostWords.substring(0, 50)}...</td>
			</tr>`
		}
	}
	return str;
}

function isHas(x) {
	if (data[x].Url === '') {
		return `<td>${data[x].Name}</td>`;
	} else {
		return `<td>
		<a href=${data[x].Url} target="_blank">
		${data[x].Name}
		</a>
		</td>`;
	}
}

function setbtn() {
	let str = '',
		len = Math.ceil(totalLen / perPage);
	const page = document.querySelector('#Page'),
		btn = page.children;
	for (let i = 0; i < len; i++) {
		str += `<button class="btn" data-i="${i * perPage}">${i + 1}</button>`
	}
	page.innerHTML = str;
	btn[btnNum].classList.add('js-btn');
	switchPage();
}
//監聽換頁事件
function switchPage() {
	const btn = document.querySelectorAll('#Page .btn');
	for (let i = 0; i < btn.length; i++) {
		btn[i].addEventListener('click', function () {
			if (btnNum === i) return;
			let key = parseInt(this.dataset.i);
			changeTable(key);
			this.classList.add('js-btn');
			btn[btnNum].classList.remove('js-btn');
			btnNum = i;
		}, false);
	}
}