"use strict";
const dragSources = document.getElementsByClassName("dragSources");
const dropTarget = document.getElementById("dropTarget");
if (!dragSources || !dropTarget) {
    throw new Error("No drag sources or drop target");
}
function handleDrag(e) {
    var _a, _b;
    if (!(e.target instanceof Element))
        throw new Error("Invalid");
    e.target.classList.add("dragging");
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", e.target.id);
    let img = new Image();
    img.src = "preview.png";
    (_b = e.dataTransfer) === null || _b === void 0 ? void 0 : _b.setDragImage(img, 10, 10);
}
function handleDrop(e) {
    var _a;
    e.preventDefault();
    const dragSourceId = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain");
    if (!dragSourceId)
        throw new Error("no id");
    console.log(dragSourceId);
    const dragSource = document.getElementById(dragSourceId);
    if (!dragSource)
        throw new Error("no drag source");
    dragSource.classList.remove("dragging");
    dropTarget === null || dropTarget === void 0 ? void 0 : dropTarget.appendChild(dragSource);
}
Array.from(dragSources).forEach((dragSource) => {
    dragSource.addEventListener("dragstart", handleDrag);
});
function handleDragOver(e) {
    e.preventDefault();
    console.log("dragover");
}
dropTarget.addEventListener("dragover", handleDragOver);
dropTarget.addEventListener("drop", handleDrop);
