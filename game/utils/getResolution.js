export default function getZoomFactor(canvasHeight) {
    const zoomFactor = Math.floor(window.innerHeight / canvasHeight);

    return zoomFactor || 1;
}