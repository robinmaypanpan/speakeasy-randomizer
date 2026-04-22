import { useState, useEffect } from 'react';

export default function ZoomImage({ src, onHide }) {
    const [view, setView] = useState(() => ({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight
    }));

    useEffect(() => {
        const handler = () => {
            setView({
                scrollX: window.scrollX,
                scrollY: window.scrollY,
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            });
        };
        window.addEventListener('scroll', handler);
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('scroll', handler);
            window.removeEventListener('resize', handler);
        };
    }, []);

    const xCenter = view.windowWidth / 2 - 220;
    const zoomTop = view.scrollY + 25;
    const zoomLeft = view.scrollX + xCenter;

    return (
        <img className='zoomImage'
            style={{ top: zoomTop, left: zoomLeft }}
            onClick={onHide}
            src={src} />
    );
}
