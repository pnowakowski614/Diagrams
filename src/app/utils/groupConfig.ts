import { StencilGroups } from "../types/enums";

export const groupConfig = {
    [StencilGroups.Analytics]: {
        label: 'Analytics',
        index: 1
    },
    [StencilGroups.AppIntegration]: {
        label: 'App Integration',
        index: 2,
        closed: true
    },
    [StencilGroups.Compute]: {
        label: 'Compute',
        index: 3,
        closed: true,
    },
    [StencilGroups.Containers]: {
        label: 'Containers',
        index: 4,
        closed: true,
    },
    [StencilGroups.Database]: {
        label: "Database",
        index: 5,
        closed: true,
    },
    [StencilGroups.EndUser]: {
        label: "End User Computing",
        index: 6,
        closed: true
    },
    [StencilGroups.Groups]: {
        label: "Groups",
        index: 7,
        closed: true
    },
    [StencilGroups.Management]: {
        label: "Management",
        index: 8,
        closed: true
    },
    [StencilGroups.Networking]: {
        label: "Networking",
        index: 9,
        closed: true
    },
    [StencilGroups.Security]: {
        label: "Security",
        index: 10,
        closed: true
    },
    [StencilGroups.Storage]: {
        label: "Storage",
        index: 11,
        closed: true
    }
}