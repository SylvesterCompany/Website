import handler from "./handler.js";

export default function onClickOutside(element, callback) {
    const outsideClickListener = event => {
        if (!element.contains(event.target)) {
            handler.emit('clickedoutside');
            callback();
            removeClickListener();
        }
    }
    const removeClickListener = () => {
        document.removeEventListener('click', outsideClickListener);
    }
    document.addEventListener('click', outsideClickListener);
}