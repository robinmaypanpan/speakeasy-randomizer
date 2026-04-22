import { createContext, useState, useCallback } from 'react';

import TeamView from './team.jsx';
import StatsBlock from './stats.jsx';
import ZoomImage from './ZoomImage.jsx';

export const ZoomImageContext = createContext(() => {});

function calculateStats({ mob, fed, femmeFatales }) {
    let deception = 0;
    let knowledge = 0;
    let action = 0;

    function testRole(role) {
        if (role.increasesKnowledge) {
            knowledge++;
        } else if (role.increasesDeception) {
            deception++;
        } else if (role.increasesAction) {
            action++;
        }
    }

    mob.forEach(testRole);
    fed.forEach(testRole);
    femmeFatales.forEach(testRole);

    return { deception, knowledge, action };
}

export default function ResultsView({ results }) {
    const [showZoomImage, setShowZoomImage] = useState(null);
    const setZoomImage = useCallback((url) => setShowZoomImage(url), []);
    const hideZoomImage = useCallback(() => setShowZoomImage(null), []);

    const { mob, fed, femmeFatales } = results;
    const stats = calculateStats(results);

    const teams = [
        <TeamView key='mob' team={mob} title='The Mob' />,
        <TeamView key='fed' team={fed} title='The Feds' />
    ];

    if (femmeFatales && femmeFatales.length > 0) {
        teams.push(<TeamView key='femmeFatales' team={femmeFatales} title='The Femme Fatales' />);
    }

    return (
        <ZoomImageContext.Provider value={setZoomImage}>
            <div className='results'>
                {showZoomImage && (
                    <ZoomImage onHide={hideZoomImage} src={showZoomImage} />
                )}
                <StatsBlock stats={stats} />
                {teams}
            </div>
        </ZoomImageContext.Provider>
    );
}
