/**
 * Randomizes the cards.
 */

import roles from '../data/roles.js';
import passwords from '../data/passwords.js';
import * as roleTools from './roleTools.js';

const clamp = (value, min, max) => Math.max(min, Math.min(value, max));

const numRoles = roles.length;

const passwordTable = {
    5: 2,
    6: 2,
    7: 2,
    8: 3,
    9: 3,
    10: 3,
    11: 4,
    12: 4,
    13: 4,
    14: 5,
    15: 5,
    16: 5,
    17: 6,
    18: 6,
    19: 6,
    20: 6
};

function selectPasswords(numberOfPlayers) {
    const teamSize = Math.floor(numberOfPlayers / 2);

    let totalPasswordsNeeded = passwordTable[teamSize] * 2;

    const passwordsSelected = [];
    const passwordMemory = {};

    while (totalPasswordsNeeded > 0) {
        const passwordIndex = Math.floor(Math.random() * passwords.length);
        const card = passwords[passwordIndex];
        const cardKey = card.blue + '/' + card.white;
        if (!passwordMemory[cardKey]) {
            passwordMemory[cardKey] = true;
            passwordsSelected.push({ ...card });
            totalPasswordsNeeded--;
        }
    }

    return passwordsSelected;
}

/**
 * Select the mix of roles that will be used for this game.
 */
function selectRoles({numberOfPlayers, avoidDuplicates}) {
    const rolesSelected = {};

    // set up our roles remaining.
    let rolesRemaining = clamp(numberOfPlayers, 10, 40);

    // Set up our duplicate tracker
    let maxDuplicates = 99999999;
    if (avoidDuplicates) {
        maxDuplicates = Math.max(0, rolesRemaining - roles.length);
    }
    let numDuplicates = 0;

    // Now to select all of our roles, 2 at a time.
    const femmeFatale = "Femme Fatale";

    // At the player-count cap, reserve a femme fatale pair.
    if (rolesRemaining === 40) {
        rolesSelected[femmeFatale] = {
            role: roleTools.getRole(femmeFatale, roles),
            number: 1
        };
        rolesRemaining = rolesRemaining - 2;
    }

    while(rolesRemaining > 1) {
        const roleIndex = Math.floor(Math.random() * numRoles);
        const newRole = roles[roleIndex];
        const roleKey = roleTools.getKey(newRole);

        // The femme fatale is only ever added at the end, for odd player counts.
        if (roleKey === femmeFatale) {
            continue;
        }

        if (!rolesSelected[roleKey]) {
            rolesSelected[roleKey] = {
                role: newRole,
                number: 1
            };
            rolesRemaining = rolesRemaining - 2;
        } else if (rolesSelected[roleKey].number < newRole.maxPair
                && numDuplicates < maxDuplicates) {
            rolesSelected[roleKey].number++;
            numDuplicates++;
            rolesRemaining = rolesRemaining - 2;
        }
    }

    // Our last role is always the femme fatale, if odd numbered.
    if (rolesRemaining === 1) {
        rolesSelected[femmeFatale] = {
            role: roleTools.getRole(femmeFatale, roles),
            number: 0.5
        };
    }

    return rolesSelected;
}

/**
 * With the selected roles, now build a specific side
 */
function buildSide(roleSelections, side, numRats, sidePasswords) {
    // First we organize our roles.
    const thisSide = [];
    for (let roleKey in roleSelections) {
        const roleSpec = roleSelections[roleKey];
        if (roleSpec.role.name !== 'Femme Fatale') {
            for (let num = 0; num < roleSpec.number; num++) {
                const sidedRole = roleTools.getSidedRole(roleSpec.role, side);
                thisSide.push(sidedRole);
            }
        }
    }

    // Now select our rats
    const numRoles = thisSide.length;
    while(numRats > 0) {
        const roleIndex = Math.floor(Math.random() * numRoles);
        const role = thisSide[roleIndex];
        if (!role.isRat && !role.disableRat) {
            role.isRat = true;
            numRats--;
        }
    }

    // Give everybody passwords
    const averagePasswords = Math.floor(numRoles / sidePasswords.length);
    const passwordsAssigned = sidePasswords.map(() => 0);
    let currentPassword = 0;
    const lastPassword = sidePasswords.length - 1;
    thisSide.forEach(function(role) {
        if (role.getsAllPasswords) {
            role.passwords = sidePasswords.map((password) => password);
        } else {
            role.passwords = [sidePasswords[currentPassword]];
        }
        passwordsAssigned[currentPassword]++;
        if (currentPassword !== lastPassword &&
                passwordsAssigned[currentPassword] >= averagePasswords) {
            currentPassword++;
        }
    });

    return thisSide;
}

function randomize({numberOfPlayers, avoidDuplicates}) {
    const passwordsSelected = selectPasswords(numberOfPlayers);
    const roleSelections = selectRoles({numberOfPlayers, avoidDuplicates});

    let numRats = 1;
    if (numberOfPlayers > 30) {
        numRats = 2;
    }

    const numPasswordsPerTeam = passwordsSelected.length / 2;

    const mob = buildSide(roleSelections, 'mob', numRats, passwordsSelected.slice(0, numPasswordsPerTeam));
    const fed = buildSide(roleSelections, 'fed', numRats, passwordsSelected.slice(numPasswordsPerTeam));

    const femmeFatales = [];
    const femmeFataleSpec = roleSelections['Femme Fatale'];
    const numFemmeFatales = femmeFataleSpec ? femmeFataleSpec.number * 2 : 0;

    for (let n = 0; n < numFemmeFatales; n++) {
        const sidedFemme = roleTools.getSidedRole(femmeFataleSpec.role, 'none');
        femmeFatales.push(sidedFemme);
    }

    return {
        femmeFatales,
        mob,
        fed
    }
}

export default randomize;