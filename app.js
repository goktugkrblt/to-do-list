document.addEventListener('DOMContentLoaded', (event) => {

  var dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.1';
    this.style.border = '3px dashed #c4cad3';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  }

  function handleDragEnter(e) {
    this.classList.add('task-hover');
  }

  function handleDragLeave(e) {
    this.classList.remove('task-hover');
  }

  function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    if (dragSrcEl != this) {
      dragSrcEl.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  }

  function handleDragEnd(e) {
    this.style.opacity = '1';
    this.style.border = 0;

    items.forEach(function (item) {
      item.classList.remove('task-hover');
    });
  }


  let items = document.querySelectorAll('.task');
  items.forEach(function (item) {
    item.addEventListener('dragstart', handleDragStart, false);
    item.addEventListener('dragenter', handleDragEnter, false);
    item.addEventListener('dragover', handleDragOver, false);
    item.addEventListener('dragleave', handleDragLeave, false);
    item.addEventListener('drop', handleDrop, false);
    item.addEventListener('dragend', handleDragEnd, false);
  });
});









/** Add Task Modal **/

let taskModals = document.querySelectorAll(".modal");
let modalButtons = document.querySelectorAll(".ico-btn")

editModalButtons = [...modalButtons];


editModalButtons.forEach(button => {
  
  button.addEventListener("click", (element) => {
      var visibleTaskModal = button.parentElement.querySelector(".edit-modal.visible");
   
    taskModals.forEach(taskModal =>  taskModal.classList.remove("visible"));
    button.parentElement.querySelector(".modal").classList.toggle("visible");  
    
    if(visibleTaskModal.parentElement == button.parentElement){
      visibleTaskModal.classList.remove("visible"); 
    }
  })

modalButtons.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  modalButtons.classList.toggle('is-active');
})
})


document.addEventListener('keydown', function (event) {
  if (event.key === "Escape") {
    taskModals.classList.remove("visible");
  }
});




/** Task Edit Menu */
let dropdownModals = document.querySelectorAll(".edit-modal");
var editButtons = document.querySelectorAll(".task-edit-btn");

editButtons = [...editButtons];

editButtons.forEach(button => {
  
  button.addEventListener("click", (element) => {
    var visibleModal = button.parentElement.querySelector(".edit-modal.visible");
   
    dropdownModals.forEach(dropdownModal =>  dropdownModal.classList.remove("visible"));
    button.parentElement.querySelector(".edit-modal").classList.toggle("visible");  
    
    if(visibleModal.parentElement == button.parentElement){
      visibleModal.classList.remove("visible"); 
    }
  })
})


/** */


window.onclick = function (event) {
  if (!event.target.matches('.task-edit-btn') && !event.target.matches('i')) {
    var modals = document.querySelectorAll(".edit-modal");
    [...modals].forEach(dropdown => {
      if (dropdown.classList.contains('visible')) {
          dropdown.classList.remove('visible');
      }
    });
  }

  if (!event.target.matches('.ico-btn') && !event.target.matches('span')) {
    var modals = document.querySelectorAll(".modal");
    [...modals].forEach(dropdown => {
      if (dropdown.classList.contains('visible')) {
          dropdown.classList.remove('visible');
      }
    });
  }
}
