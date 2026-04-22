import { useContext } from 'react';

import { ZoomImageContext } from './results.jsx';

export default function ZoomableImage({ src, className }) {
    const setZoomImage = useContext(ZoomImageContext);
    return (
        <img className={className}
            onClick={() => setZoomImage(src)}
            src={src} />
    );
}
