import { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

import './stylesheets/results.css';
import './stylesheets/input.css';

import InputView from './ui/input.jsx';
import ResultsView from './ui/results.jsx';

import randomizer from './util/randomizer.js';

function MainApp() {
    const [results, setResults] = useState(null);
    const [lastOptions, setLastOptions] = useState(null);

    const generateResults = useCallback((options) => {
        setLastOptions(options);
        setResults(randomizer(options));
    }, []);

    const regenerate = useCallback(() => {
        if (lastOptions) setResults(randomizer(lastOptions));
    }, [lastOptions]);

    const clearResults = useCallback(() => setResults(null), []);

    if (results) {
        return (
            <div>
                <button onClick={regenerate}>Regenerate</button>
                <button onClick={clearResults}>Clear Results</button>
                <br />
                <ResultsView results={results} />
            </div>
        );
    }
    return <InputView generateResults={generateResults} />;
}

createRoot(document.getElementById('app')).render(<MainApp />);
