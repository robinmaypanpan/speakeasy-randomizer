import PlayerView from './player.jsx';

export default function TeamView({ team, title }) {
    const players = team.map((player, index) => (
        <PlayerView key={player.name + index} player={player} />
    ));

    return (
        <div className='team'>
            <div className='teamTitle'>{title}</div>
            <div className='players'>
                {players}
            </div>
        </div>
    );
}
