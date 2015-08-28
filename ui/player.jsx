/**
 * This displays all the cards for a single player.
 */
const React = require('react');

const specialCards = require('../data/specialCards');

const imageRoot = 'assets/img/';

const PlayerView = React.createClass({
    propTypes: {
        player: React.PropTypes.object
    },

    render() {
        const {player} = this.props;
        const passwords = player.passwords;
        const extraCards = passwords
            .map((passwordCard) => passwordCard.image);

        if (player.isRat) {
            extraCards.push(specialCards.rat.image);
        }

        if (player.hasWhiskey) {
            extraCards.push(specialCards.whiskeyShipment.image);
        }

        for (let n = 0; n < player.points; n++) {
            extraCards.push(specialCards.point.image);
        }

        const extraCardMarkup = extraCards
            .map((url) => <img className='extraCard' src={imageRoot + url} />);

        return (
            <div className='playerContainer'>
                <div className='playerName'>{player.name}</div>
                <img className='playerCard' src={imageRoot + player.image}/>
                {extraCardMarkup}
            </div>
        );
    }
});

module.exports = PlayerView;