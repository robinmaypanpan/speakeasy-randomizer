export default function StatsBlock({ stats }) {
    const { deception, knowledge, action } = stats;
    return (
        <div className="statsBlock">
            <div className="stat">Deception: {deception / 2}</div>
            <div className="stat">Knowledge: {knowledge / 2}</div>
            <div className="stat">Action: {action / 2}</div>
        </div>
    );
}
