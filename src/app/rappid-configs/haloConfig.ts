export const haloConfig =
    [
        {
            name: 'remove',
            events: {
                pointerdown: 'removeElement'
            },
            attrs: {
                '.handle': {
                    'data-tooltip': 'Remove object',
                    'data-tooltip-position': 'bottom',
                }
            }
        },
        {
            name: 'fork',
            events: {
                pointerdown: 'startForking',
                pointermove: 'doFork',
                pointerup: 'stopForking'
            },
            attrs: {
                '.handle': {
                    'data-tooltip': 'Clone and connect to the object',
                    'data-tooltip-position': 'bottom',
                }
            }
        },
        {
            name: 'clone',
            events: {pointerdown: 'startCloning', pointermove: 'doClone', pointerup: 'stopCloning'},
            attrs: {
                '.handle': {
                    'data-tooltip': 'Clone the object',
                    'data-tooltip-position': 'bottom',
                }
            }
        },
        {
            name: 'unlink',
            events: {
                pointerdown: 'unlinkElement'
            },
            attrs: {
                '.handle': {
                    'data-tooltip': 'Remove links to other objects',
                    'data-tooltip-position': 'bottom',
                }
            }
        },
        {
            name: 'rotate',
            events: {
                pointerdown: 'startRotating',
                pointermove: 'doRotate',
                pointerup: 'stopBatch'
            },
            attrs: {
                '.handle': {
                    'data-tooltip': 'Rotate the object',
                    'data-tooltip-position': 'right',
                }
            }
        }
    ];
