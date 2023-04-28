const $draggable = document.querySelector("#draggable");
const $dropzone = document.querySelector(".dropzone");

const onDrop = (e) => {
  const id = e.dataTransfer.getData("text");
  const $draggable = document.querySelector(`#${id}`);

  $dropzone.appendChild($draggable);

  e.dataTransfer.clearData();
};

const onDragOver = (e) => {
  e.preventDefault();
};

const onDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
  e.currentTarget.style.backgroundColor = "dodgerblue";
};

$draggable.addEventListener("dragstart", onDragStart);
$dropzone.addEventListener("dragover", onDragOver);
$dropzone.addEventListener("drop", onDrop);