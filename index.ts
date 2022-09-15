const dragSources = document.getElementsByClassName(
  "dragSources"
) as HTMLCollectionOf<HTMLElement>;

const dropTarget = document.getElementById("dropTarget");

if (!dragSources || !dropTarget) {
  throw new Error("No drag sources or drop target");
}

function handleDrag(e: DragEvent) {
  if (!(e.target instanceof Element)) throw new Error("Invalid");

  e.target.classList.add("dragging");

  e.dataTransfer?.setData("text/plain", e.target.id);

  let img = new Image();
  img.src = "preview.png";
  e.dataTransfer?.setDragImage(img, 10, 10);
}

function handleDrop(e: DragEvent) {
  e.preventDefault();

  const dragSourceId = e.dataTransfer?.getData("text/plain");
  if (!dragSourceId) throw new Error("no id");
  console.log(dragSourceId);

  const dragSource = document.getElementById(dragSourceId);

  if (!dragSource) throw new Error("no drag source");

  dragSource.classList.remove("dragging");
  dropTarget?.appendChild(dragSource);
}

Array.from(dragSources).forEach((dragSource) => {
  dragSource.addEventListener("dragstart", handleDrag);
});

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  console.log("dragover");
}

dropTarget.addEventListener("dragover", handleDragOver);
dropTarget.addEventListener("drop", handleDrop);
