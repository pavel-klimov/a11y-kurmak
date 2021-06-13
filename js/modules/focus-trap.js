const FocusTrap = class {
  constructor(elementNode) {
    this._root = elementNode;
    this.onKeydownControl = this.onKeydownControl.bind(this);
  }

  static findCornerFocusableNode(node) {
    const focusable = node.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]');
    if (focusable.length === 0) {
      return [null, null];
    }
    const focusableAndVisible = [];
    focusable.forEach((element) => {
      if (element.offsetParent !== null) {
        focusableAndVisible.push(element);
      }
    });
    return (focusableAndVisible.length === 0) ? [null, null] : [focusableAndVisible[0], focusableAndVisible[focusableAndVisible.length - 1]];
  }

  onKeydownControl(evt) {
    if (evt.keyCode === 9) {
      const [firstFocusableElements, lastFocusableElements] = FocusTrap.findCornerFocusableNode(this._root);
      if (evt.shiftKey && document.activeElement === firstFocusableElements) {
        evt.preventDefault();
        lastFocusableElements.focus();
      } else if (!evt.shiftKey && document.activeElement === lastFocusableElements) {
        evt.preventDefault();
        firstFocusableElements.focus();
      }
    } else if (evt.keyCode === 27) {
      this.onEscCallback(evt);
    }
  }

  onEscCallback() {}
}

export default FocusTrap;
