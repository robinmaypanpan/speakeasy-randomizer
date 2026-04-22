export function getRole(name, roles) {
    return roles.find((role) => role.name === name);
}

export function getKey(role) {
    if (role.name) {
        return role.name;
    }
    return role.mob.name + '/' + role.fed.name;
}

export function getSidedRole(role, side) {
    const sidedRole = {};
    for (const propName in role) {
        if (propName !== 'mob' && propName !== 'fed') {
            sidedRole[propName] = role[propName];
        }
    }
    if (role[side]) {
        for (const propName in role[side]) {
            sidedRole[propName] = role[side][propName];
        }
    }
    return sidedRole;
}
