"use strict";
exports.__esModule = true;
exports.apis = void 0;
var UseToggleApi_1 = require("../../../shared/UseToggleApi");
exports.apis = [
    {
        title: 'Accordion',
        props: UseToggleApi_1.getUseTogglePropsApi('isExpanded'),
        events: UseToggleApi_1.getUseToggleEventsApi('isExpanded'),
        slots: [
            {
                name: 'default',
                description: 'Content to display inside accordion',
                props: '-'
            },
            {
                name: 'title',
                description: 'Title',
                props: '-'
            },
            {
                name: 'trigger',
                description: 'Accordion open / close button, has default icon',
                props: '<code>isExpanded: boolean</code>'
            }
        ]
    }
];
