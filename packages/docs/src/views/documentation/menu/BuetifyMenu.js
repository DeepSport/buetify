"use strict";
exports.__esModule = true;
var BMenu_1 = require("buetify/lib/components/menu/BMenu");
var BMenuGroup_1 = require("buetify/lib/components/menu/BMenuGroup");
var BMenuLabel_1 = require("buetify/lib/components/menu/BMenuLabel");
var BMenuListItem_1 = require("buetify/lib/components/menu/BMenuListItem");
var function_1 = require("fp-ts/lib/function");
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var menu_1 = require("../menu");
var BuetifyMenuGroup = vue_1.defineComponent({
    name: 'buetify-menu-navigation-group',
    props: {
        group: {
            type: Object,
            required: true
        }
    },
    setup: function (props) {
        return function () {
            return vue_1.h(BMenuGroup_1["default"], { isExpanded: true }, {
                'menu-label': function () { return vue_1.h(BMenuLabel_1["default"], function () { return props.group.label; }); },
                "default": function () { return props.group.items.map(function (item) { return vue_1.h(BuetifyMenuItem, { key: item.label, item: item }); }); } // eslint-disable-line
            });
        };
    }
});
var BuetifyMenuLink = vue_1.defineComponent({
    name: 'buetify-menu-navigation-link',
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    setup: function (props) {
        var link = vue_router_1.useLink({
            to: vue_1.computed(function () { return props.link.fullPath; })
        });
        return function () {
            return vue_1.h(BMenuListItem_1["default"], function () {
                return vue_1.h('a', {
                    href: link.href.value,
                    "class": {
                        'is-active': link.isActive.value
                    },
                    onClick: link.navigate
                }, props.link.label);
            });
        };
    }
});
function BuetifyMenuItem(props) {
    return props.item._tag === 'group'
        ? vue_1.h(BuetifyMenuGroup, { group: props.item })
        : vue_1.h(BuetifyMenuLink, { link: props.item });
}
var groups = function_1.constant(menu_1.menu.map(function (item) { return vue_1.h(BuetifyMenuItem, { item: item }); }));
var staticMenu = vue_1.h(BMenu_1["default"], { "class": 'padding-top-size-3 padding-bottom-size-3 padding-left-size-2 padding-right-size-2' }, groups);
function BuetifyMenu() {
    return staticMenu;
}
exports["default"] = BuetifyMenu;
