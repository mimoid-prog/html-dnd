const dragSources = document.getElementsByClassName("dragSources");
const dropTarget = document.getElementById("dropTarget");

window.addEventListener("DOMContentLoaded", run);

function handleDragStart(e: DragEvent) {
  if (!e.dataTransfer) throw new Error("No data transfer");
  if (!(e.target instanceof Element)) throw new Error("Invalid target");

  e.target.classList.add("dragging");

  //Set some data for current drag operation
  e.dataTransfer.setData("text/plain", e.target.id);

  console.log("Dragged element's ID: ", e.dataTransfer.getData("text/plain"));

  //Replace default drag preview with custom image
  let img = new Image();
  img.src = "preview.png";
  e.dataTransfer.setDragImage(img, 10, 10);
}

function handleDragOver(e: DragEvent) {
  //To treat this element as droppable
  e.preventDefault();

  if (!e.dataTransfer) throw new Error("No data transfer");

  console.log("dragover");
}

function handleDrop(e: DragEvent) {
  e.preventDefault();

  if (!dropTarget) throw new Error("No drop target");
  if (!e.dataTransfer) throw new Error("No data transfer");

  const dragSourceId = e.dataTransfer.getData("text/plain");
  const dragSource = document.getElementById(dragSourceId);

  if (!dragSource) throw new Error("No drag source");

  dragSource.classList.remove("dragging");
  dropTarget.appendChild(dragSource);
}

function run() {
  if (!dragSources || !dropTarget) return;

  Array.from(dragSources).forEach((dragSource) => {
    (dragSource as HTMLElement).addEventListener("dragstart", handleDragStart);
  });

  dropTarget.addEventListener("dragover", handleDragOver);
  dropTarget.addEventListener("drop", handleDrop);
}
