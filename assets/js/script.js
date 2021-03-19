/*---------------------------- Index Page Modal Popup ----------------------------*/

const open = document.getElementById('open')
const modal_container_ins = document.getElementById('modal_container_ins')
const close = document.getElementById('close')

open.addEventListener('click', () => {
    modal_container_ins.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container_ins.classList.remove('show');
});