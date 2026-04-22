import { useState } from 'react';

export default function InputView({ generateResults }) {
    const [numberOfPlayers, setNumberOfPlayers] = useState(10);
    const [avoidDuplicates, setAvoidDuplicates] = useState(true);

    const handleGenerate = () => {
        generateResults({ numberOfPlayers, avoidDuplicates });
    };

    return (
        <div className="inputOptions">
            <div className="inputOption">
                <div className="inputLabel">Number of Players:</div>
                <input className="playerInput" type="text"
                    value={numberOfPlayers}
                    onChange={(e) => setNumberOfPlayers(e.target.value)}
                />
            </div>
            <div className="inputOption">
                <div className="inputLabel">Avoid Duplicate Roles:</div>
                <div className="inputCheck">
                    <input type="checkbox" value="None" id="avoidDuplicates"
                        name="check"
                        checked={avoidDuplicates}
                        onChange={(e) => setAvoidDuplicates(e.target.checked)}
                    />
                    <label htmlFor="avoidDuplicates"></label>
                </div>
            </div>
            <button onClick={handleGenerate}>Generate Roles</button>
        </div>
    );
}
