let timeline = document.querySelector('.dynamic');
let item = document.querySelectorAll('.dynamic .item');

/* Labels */

let up_text = document.querySelector('.label-top');
let down_text = document.querySelector('.label-bottom');
up_text.onclick =function(){
	timeline.classList.add('up-text');
	timeline.classList.remove('down-text');
}
down_text.onclick =function(){
	timeline.classList.add('down-text');
	timeline.classList.remove('up-text');
}

/* View */

let points = document.querySelector('.points');
let lines = document.querySelector('.lines');
points.onclick =function(){
	timeline.classList.add('point-view');
	timeline.classList.remove('line-view');
}
lines.onclick =function(){
	timeline.classList.add('line-view');
	timeline.classList.remove('point-view');
}

/* Steps */

let all_step = document.querySelector('.all-step');
all_step.onclick =function(){
	for (let i = item.length - 1; i >= 0; i--) {
		item[i].className='item done';
	}
}
let none_step = document.querySelector('.none-step');
none_step.onclick =function(){
	for (let i = item.length - 1; i >= 0; i--) {
		item[i].className='item default';
	}
}

let count = item.length;
let quantity = count;


let plus_step = document.querySelector('.plus-step');
plus_step.onclick =function(){


    let myClone = item[count-1].cloneNode(true);
    timeline.appendChild(myClone);
    quantity_new = document.querySelectorAll('.dynamic .item');
    quantity_new[count].className='item default';
    item = quantity_new;
    quantity = quantity_new.length;
    count = count + 1;

	let label = document.querySelectorAll('.dynamic .item__text');

	label[count-1].innerHTML='Step '+count+'';


}

let minus_step = document.querySelector('.minus-step');
minus_step.onclick =function(){
	if(quantity > 1){
		item[quantity - 1].remove();
		quantity = quantity - 1;
		count = quantity;
	} 
	if(quantity == 1){
		timeline.classList.add('line-view');
		timeline.classList.remove('point-view');
	}
}