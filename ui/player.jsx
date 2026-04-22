import specialCards from '../data/specialCards.js';
import ZoomableImage from './zoomableImage.jsx';

const imageRoot = '/img/';

export default function PlayerView({ player }) {
    const passwords = player.passwords;
    const extraCards = [];

    if (passwords && passwords.length > 0) {
        passwords.forEach((passwordCard) => extraCards.push(passwordCard.image));
    }

    if (player.isRat) {
        extraCards.push(specialCards.rat.image);
    }

    if (player.hasWhiskey) {
        extraCards.push(specialCards.whiskeyShipment.image);
    }

    for (let n = 0; n < player.points; n++) {
        extraCards.push(specialCards.point.image);
    }

    const extraCardMarkup = extraCards.map((url, idx) => (
        <ZoomableImage key={idx} className='extraCard' src={imageRoot + url} />
    ));

    return (
        <div className='playerContainer'>
            <ZoomableImage className='playerCard playerData' src={imageRoot + player.image} />
            <div className='extraCards playerData'>
                {extraCardMarkup}
            </div>
        </div>
    );
}
