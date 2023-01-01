import handler from "./handler.js";

export default function onClickOutside(element) {
    const outsideClickListener = event => {
        if (!element.contains(event.target)) {
            handler.emit('clickedoutside');
            removeClickListener();
        }
    }
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }
    document.addEventListener('click', outsideClickListener);
}