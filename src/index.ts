declare interface ElementEvent extends Event {
  currentTarget: HTMLElement;
  target: HTMLElement;
}

function init() {}

document.addEventListener('DOMContentLoaded', init);
