"use strict";
exports.__esModule = true;
exports.getUseToggleEventsApi = exports.getUseTogglePropsApi = void 0;
function getUseTogglePropsApi(statusName) {
    return [
        {
            name: "<code>" + statusName + "</code>",
            description: 'Toggle status, can be used by parent component to trigger updates',
            type: 'Boolean',
            values: '-',
            "default": '<code>false</code>',
            required: 'false'
        },
        {
            name: '<code>hasPopup</code>',
            description: 'Used to set <code>aria-haspopup</code> attribute',
            type: 'Boolean',
            values: '-',
            "default": '<code>false</code>',
            required: 'false'
        }
    ];
}
exports.getUseTogglePropsApi = getUseTogglePropsApi;
function getUseToggleEventsApi(statusName) {
    return [
        {
            name: '<code>toggle</code>',
            description: 'Toggle event',
            parameters: '<code>status: boolean</code>'
        },
        {
            name: '<code>setOn</code>',
            description: "<code>" + statusName + "</code> set to <code>true</code>",
            parameters: '-'
        },
        {
            name: '<code>setOff</code>',
            description: "<code>" + statusName + "</code> set to <code>false</code>",
            parameters: '-'
        }
    ];
}
exports.getUseToggleEventsApi = getUseToggleEventsApi;
