export const portIn = {
    position: {
        name: 'left'
    },
    attrs: {
        portBody: {
            magnet: true,
            r: 4,
            fill: 'darkBlue'
        }
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
};

export const portOut = {
    position: {
        name: 'right'
    },
    attrs: {
        portBody: {
            magnet: true,
            r: 4,
            fill: 'darkRed',
        }
    },
    markup: [{
        tagName: 'circle',
        selector: 'portBody'
    }]
};

export const portsConfig = {
    groups: {
        'in': portIn,
        'out': portOut
    },
    items: [
        {group: 'in'},
        {group: 'in'},
        {group: 'out'}
    ]
}
