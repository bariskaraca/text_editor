Element.prototype.removeAll = function (selector) {
    for(let el of this.querySelectorAll(selector))
        el.remove();
};
Element.prototype.trigger = function(eventName){
    // Make sure we use the ownerDocument from the provided node to avoid cross-window problems
    var doc;
    var node  = this;
    if (node.ownerDocument) {
        doc = node.ownerDocument;
    } else if (node.nodeType == 9){
        // the node may be the document itself, nodeType 9 = DOCUMENT_NODE
        doc = node;
    } else {
        throw new Error("Invalid node passed to fireEvent: " + node.id);
    }

    if (node.dispatchEvent) {
        // Gecko-style approach (now the standard) takes more work
        var eventClass = "";

        // Different events have different event classes.
        // If this switch statement can't map an eventName to an eventClass,
        // the event firing is going to fail.
        switch (eventName) {
            case "click": // Dispatching of 'click' appears to not work correctly in Safari. Use 'mousedown' or 'mouseup' instead.
            case "mousedown":
            case "mouseup":
                eventClass = "MouseEvents";
                break;

            case "focus":
            case "change":
            case "blur":
            case "select":
                eventClass = "HTMLEvents";
                break;

            default:
                throw "fireEvent: Couldn't find an event class for event '" + eventName + "'.";
                break;
        }
        var event = doc.createEvent(eventClass);
        event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

        event.synthetic = true; // allow detection of synthetic events
        // The second parameter says go ahead with the default action
        node.dispatchEvent(event, true);
    } else  if (node.fireEvent) {
        // IE-old school style, you can drop this if you don't need to support IE8 and lower
        var event = doc.createEventObject();
        event.synthetic = true; // allow detection of synthetic events
        node.fireEvent("on" + eventName, event);
    }

};
var icons = [
    {
        "iconValue": "fab fa-500px",
        "data": 0,
        "class": "fab fa-500px"
    },
    {
        "iconValue": "fab fa-accessible-icon",
        "data": 1,
        "class": "fab fa-accessible-icon"
    },
    {
        "iconValue": "fab fa-accusoft",
        "data": 2,
        "class": "fab fa-accusoft"
    },
    {
        "iconValue": "fas fa-address-book",
        "data": 3,
        "class": "fas fa-address-book"
    },
    {
        "iconValue": "far fa-address-book",
        "data": 4,
        "class": "far fa-address-book"
    },
    {
        "iconValue": "fas fa-address-card",
        "data": 5,
        "class": "fas fa-address-card"
    },
    {
        "iconValue": "far fa-address-card",
        "data": 6,
        "class": "far fa-address-card"
    },
    {
        "iconValue": "fas fa-adjust",
        "data": 7,
        "class": "fas fa-adjust"
    },
    {
        "iconValue": "fab fa-adn",
        "data": 8,
        "class": "fab fa-adn"
    },
    {
        "iconValue": "fab fa-adversal",
        "data": 9,
        "class": "fab fa-adversal"
    },
    {
        "iconValue": "fab fa-affiliatetheme",
        "data": 10,
        "class": "fab fa-affiliatetheme"
    },
    {
        "iconValue": "fab fa-algolia",
        "data": 11,
        "class": "fab fa-algolia"
    },
    {
        "iconValue": "fas fa-align-center",
        "data": 12,
        "class": "fas fa-align-center"
    },
    {
        "iconValue": "fas fa-align-justify",
        "data": 13,
        "class": "fas fa-align-justify"
    },
    {
        "iconValue": "fas fa-align-left",
        "data": 14,
        "class": "fas fa-align-left"
    },
    {
        "iconValue": "fas fa-align-right",
        "data": 15,
        "class": "fas fa-align-right"
    },
    {
        "iconValue": "fab fa-amazon",
        "data": 16,
        "class": "fab fa-amazon"
    },
    {
        "iconValue": "fas fa-ambulance",
        "data": 17,
        "class": "fas fa-ambulance"
    },
    {
        "iconValue": "fas fa-american-sign-language-interpreting",
        "data": 18,
        "class": "fas fa-american-sign-language-interpreting"
    },
    {
        "iconValue": "fab fa-amilia",
        "data": 19,
        "class": "fab fa-amilia"
    },
    {
        "iconValue": "fas fa-anchor",
        "data": 20,
        "class": "fas fa-anchor"
    },
    {
        "iconValue": "fab fa-android",
        "data": 21,
        "class": "fab fa-android"
    },
    {
        "iconValue": "fab fa-angellist",
        "data": 22,
        "class": "fab fa-angellist"
    },
    {
        "iconValue": "fas fa-angle-double-down",
        "data": 23,
        "class": "fas fa-angle-double-down"
    },
    {
        "iconValue": "fas fa-angle-double-left",
        "data": 24,
        "class": "fas fa-angle-double-left"
    },
    {
        "iconValue": "fas fa-angle-double-right",
        "data": 25,
        "class": "fas fa-angle-double-right"
    },
    {
        "iconValue": "fas fa-angle-double-up",
        "data": 26,
        "class": "fas fa-angle-double-up"
    },
    {
        "iconValue": "fas fa-angle-down",
        "data": 27,
        "class": "fas fa-angle-down"
    },
    {
        "iconValue": "fas fa-angle-left",
        "data": 28,
        "class": "fas fa-angle-left"
    },
    {
        "iconValue": "fas fa-angle-right",
        "data": 29,
        "class": "fas fa-angle-right"
    },
    {
        "iconValue": "fas fa-angle-up",
        "data": 30,
        "class": "fas fa-angle-up"
    },
    {
        "iconValue": "fab fa-angrycreative",
        "data": 31,
        "class": "fab fa-angrycreative"
    },
    {
        "iconValue": "fab fa-angular",
        "data": 32,
        "class": "fab fa-angular"
    },
    {
        "iconValue": "fab fa-app-store",
        "data": 33,
        "class": "fab fa-app-store"
    },
    {
        "iconValue": "fab fa-app-store-ios",
        "data": 34,
        "class": "fab fa-app-store-ios"
    },
    {
        "iconValue": "fab fa-apper",
        "data": 35,
        "class": "fab fa-apper"
    },
    {
        "iconValue": "fab fa-apple",
        "data": 36,
        "class": "fab fa-apple"
    },
    {
        "iconValue": "fab fa-apple-pay",
        "data": 37,
        "class": "fab fa-apple-pay"
    },
    {
        "iconValue": "fas fa-archive",
        "data": 38,
        "class": "fas fa-archive"
    },
    {
        "iconValue": "fas fa-arrow-alt-circle-down",
        "data": 39,
        "class": "fas fa-arrow-alt-circle-down"
    },
    {
        "iconValue": "far fa-arrow-alt-circle-down",
        "data": 40,
        "class": "far fa-arrow-alt-circle-down"
    },
    {
        "iconValue": "fas fa-arrow-alt-circle-left",
        "data": 41,
        "class": "fas fa-arrow-alt-circle-left"
    },
    {
        "iconValue": "far fa-arrow-alt-circle-left",
        "data": 42,
        "class": "far fa-arrow-alt-circle-left"
    },
    {
        "iconValue": "fas fa-arrow-alt-circle-right",
        "data": 43,
        "class": "fas fa-arrow-alt-circle-right"
    },
    {
        "iconValue": "far fa-arrow-alt-circle-right",
        "data": 44,
        "class": "far fa-arrow-alt-circle-right"
    },
    {
        "iconValue": "fas fa-arrow-alt-circle-up",
        "data": 45,
        "class": "fas fa-arrow-alt-circle-up"
    },
    {
        "iconValue": "far fa-arrow-alt-circle-up",
        "data": 46,
        "class": "far fa-arrow-alt-circle-up"
    },
    {
        "iconValue": "fas fa-arrow-circle-down",
        "data": 47,
        "class": "fas fa-arrow-circle-down"
    },
    {
        "iconValue": "fas fa-arrow-circle-left",
        "data": 48,
        "class": "fas fa-arrow-circle-left"
    },
    {
        "iconValue": "fas fa-arrow-circle-right",
        "data": 49,
        "class": "fas fa-arrow-circle-right"
    },
    {
        "iconValue": "fas fa-arrow-circle-up",
        "data": 50,
        "class": "fas fa-arrow-circle-up"
    },
    {
        "iconValue": "fas fa-arrow-down",
        "data": 51,
        "class": "fas fa-arrow-down"
    },
    {
        "iconValue": "fas fa-arrow-left",
        "data": 52,
        "class": "fas fa-arrow-left"
    },
    {
        "iconValue": "fas fa-arrow-right",
        "data": 53,
        "class": "fas fa-arrow-right"
    },
    {
        "iconValue": "fas fa-arrow-up",
        "data": 54,
        "class": "fas fa-arrow-up"
    },
    {
        "iconValue": "fas fa-arrows-alt",
        "data": 55,
        "class": "fas fa-arrows-alt"
    },
    {
        "iconValue": "fas fa-arrows-alt-h",
        "data": 56,
        "class": "fas fa-arrows-alt-h"
    },
    {
        "iconValue": "fas fa-arrows-alt-v",
        "data": 57,
        "class": "fas fa-arrows-alt-v"
    },
    {
        "iconValue": "fas fa-assistive-listening-systems",
        "data": 58,
        "class": "fas fa-assistive-listening-systems"
    },
    {
        "iconValue": "fas fa-asterisk",
        "data": 59,
        "class": "fas fa-asterisk"
    },
    {
        "iconValue": "fab fa-asymmetrik",
        "data": 60,
        "class": "fab fa-asymmetrik"
    },
    {
        "iconValue": "fas fa-at",
        "data": 61,
        "class": "fas fa-at"
    },
    {
        "iconValue": "fab fa-audible",
        "data": 62,
        "class": "fab fa-audible"
    },
    {
        "iconValue": "fas fa-audio-description",
        "data": 63,
        "class": "fas fa-audio-description"
    },
    {
        "iconValue": "fab fa-autoprefixer",
        "data": 64,
        "class": "fab fa-autoprefixer"
    },
    {
        "iconValue": "fab fa-avianex",
        "data": 65,
        "class": "fab fa-avianex"
    },
    {
        "iconValue": "fab fa-aviato",
        "data": 66,
        "class": "fab fa-aviato"
    },
    {
        "iconValue": "fab fa-aws",
        "data": 67,
        "class": "fab fa-aws"
    },
    {
        "iconValue": "fas fa-backward",
        "data": 68,
        "class": "fas fa-backward"
    },
    {
        "iconValue": "fas fa-balance-scale",
        "data": 69,
        "class": "fas fa-balance-scale"
    },
    {
        "iconValue": "fas fa-ban",
        "data": 70,
        "class": "fas fa-ban"
    },
    {
        "iconValue": "fab fa-bandcamp",
        "data": 71,
        "class": "fab fa-bandcamp"
    },
    {
        "iconValue": "fas fa-barcode",
        "data": 72,
        "class": "fas fa-barcode"
    },
    {
        "iconValue": "fas fa-bars",
        "data": 73,
        "class": "fas fa-bars"
    },
    {
        "iconValue": "fas fa-bath",
        "data": 74,
        "class": "fas fa-bath"
    },
    {
        "iconValue": "fas fa-battery-empty",
        "data": 75,
        "class": "fas fa-battery-empty"
    },
    {
        "iconValue": "fas fa-battery-full",
        "data": 76,
        "class": "fas fa-battery-full"
    },
    {
        "iconValue": "fas fa-battery-half",
        "data": 77,
        "class": "fas fa-battery-half"
    },
    {
        "iconValue": "fas fa-battery-quarter",
        "data": 78,
        "class": "fas fa-battery-quarter"
    },
    {
        "iconValue": "fas fa-battery-three-quarters",
        "data": 79,
        "class": "fas fa-battery-three-quarters"
    },
    {
        "iconValue": "fas fa-bed",
        "data": 80,
        "class": "fas fa-bed"
    },
    {
        "iconValue": "fas fa-beer",
        "data": 81,
        "class": "fas fa-beer"
    },
    {
        "iconValue": "fab fa-behance",
        "data": 82,
        "class": "fab fa-behance"
    },
    {
        "iconValue": "fab fa-behance-square",
        "data": 83,
        "class": "fab fa-behance-square"
    },
    {
        "iconValue": "fas fa-bell",
        "data": 84,
        "class": "fas fa-bell"
    },
    {
        "iconValue": "far fa-bell",
        "data": 85,
        "class": "far fa-bell"
    },
    {
        "iconValue": "fas fa-bell-slash",
        "data": 86,
        "class": "fas fa-bell-slash"
    },
    {
        "iconValue": "far fa-bell-slash",
        "data": 87,
        "class": "far fa-bell-slash"
    },
    {
        "iconValue": "fas fa-bicycle",
        "data": 88,
        "class": "fas fa-bicycle"
    },
    {
        "iconValue": "fab fa-bimobject",
        "data": 89,
        "class": "fab fa-bimobject"
    },
    {
        "iconValue": "fas fa-binoculars",
        "data": 90,
        "class": "fas fa-binoculars"
    },
    {
        "iconValue": "fas fa-birthday-cake",
        "data": 91,
        "class": "fas fa-birthday-cake"
    },
    {
        "iconValue": "fab fa-bitbucket",
        "data": 92,
        "class": "fab fa-bitbucket"
    },
    {
        "iconValue": "fab fa-bitcoin",
        "data": 93,
        "class": "fab fa-bitcoin"
    },
    {
        "iconValue": "fab fa-bity",
        "data": 94,
        "class": "fab fa-bity"
    },
    {
        "iconValue": "fab fa-black-tie",
        "data": 95,
        "class": "fab fa-black-tie"
    },
    {
        "iconValue": "fab fa-blackberry",
        "data": 96,
        "class": "fab fa-blackberry"
    },
    {
        "iconValue": "fas fa-blind",
        "data": 97,
        "class": "fas fa-blind"
    },
    {
        "iconValue": "fab fa-blogger",
        "data": 98,
        "class": "fab fa-blogger"
    },
    {
        "iconValue": "fab fa-blogger-b",
        "data": 99,
        "class": "fab fa-blogger-b"
    },
    {
        "iconValue": "fab fa-bluetooth",
        "data": 100,
        "class": "fab fa-bluetooth"
    },
    {
        "iconValue": "fab fa-bluetooth-b",
        "data": 101,
        "class": "fab fa-bluetooth-b"
    },
    {
        "iconValue": "fas fa-bold",
        "data": 102,
        "class": "fas fa-bold"
    },
    {
        "iconValue": "fas fa-bolt",
        "data": 103,
        "class": "fas fa-bolt"
    },
    {
        "iconValue": "fas fa-bomb",
        "data": 104,
        "class": "fas fa-bomb"
    },
    {
        "iconValue": "fas fa-book",
        "data": 105,
        "class": "fas fa-book"
    },
    {
        "iconValue": "fas fa-bookmark",
        "data": 106,
        "class": "fas fa-bookmark"
    },
    {
        "iconValue": "far fa-bookmark",
        "data": 107,
        "class": "far fa-bookmark"
    },
    {
        "iconValue": "fas fa-braille",
        "data": 108,
        "class": "fas fa-braille"
    },
    {
        "iconValue": "fas fa-briefcase",
        "data": 109,
        "class": "fas fa-briefcase"
    },
    {
        "iconValue": "fab fa-btc",
        "data": 110,
        "class": "fab fa-btc"
    },
    {
        "iconValue": "fas fa-bug",
        "data": 111,
        "class": "fas fa-bug"
    },
    {
        "iconValue": "fas fa-building",
        "data": 112,
        "class": "fas fa-building"
    },
    {
        "iconValue": "far fa-building",
        "data": 113,
        "class": "far fa-building"
    },
    {
        "iconValue": "fas fa-bullhorn",
        "data": 114,
        "class": "fas fa-bullhorn"
    },
    {
        "iconValue": "fas fa-bullseye",
        "data": 115,
        "class": "fas fa-bullseye"
    },
    {
        "iconValue": "fab fa-buromobelexperte",
        "data": 116,
        "class": "fab fa-buromobelexperte"
    },
    {
        "iconValue": "fas fa-bus",
        "data": 117,
        "class": "fas fa-bus"
    },
    {
        "iconValue": "fab fa-buysellads",
        "data": 118,
        "class": "fab fa-buysellads"
    },
    {
        "iconValue": "fas fa-calculator",
        "data": 119,
        "class": "fas fa-calculator"
    },
    {
        "iconValue": "fas fa-calendar",
        "data": 120,
        "class": "fas fa-calendar"
    },
    {
        "iconValue": "far fa-calendar",
        "data": 121,
        "class": "far fa-calendar"
    },
    {
        "iconValue": "fas fa-calendar-alt",
        "data": 122,
        "class": "fas fa-calendar-alt"
    },
    {
        "iconValue": "far fa-calendar-alt",
        "data": 123,
        "class": "far fa-calendar-alt"
    },
    {
        "iconValue": "fas fa-calendar-check",
        "data": 124,
        "class": "fas fa-calendar-check"
    },
    {
        "iconValue": "far fa-calendar-check",
        "data": 125,
        "class": "far fa-calendar-check"
    },
    {
        "iconValue": "fas fa-calendar-minus",
        "data": 126,
        "class": "fas fa-calendar-minus"
    },
    {
        "iconValue": "far fa-calendar-minus",
        "data": 127,
        "class": "far fa-calendar-minus"
    },
    {
        "iconValue": "fas fa-calendar-plus",
        "data": 128,
        "class": "fas fa-calendar-plus"
    },
    {
        "iconValue": "far fa-calendar-plus",
        "data": 129,
        "class": "far fa-calendar-plus"
    },
    {
        "iconValue": "fas fa-calendar-times",
        "data": 130,
        "class": "fas fa-calendar-times"
    },
    {
        "iconValue": "far fa-calendar-times",
        "data": 131,
        "class": "far fa-calendar-times"
    },
    {
        "iconValue": "fas fa-camera",
        "data": 132,
        "class": "fas fa-camera"
    },
    {
        "iconValue": "fas fa-camera-retro",
        "data": 133,
        "class": "fas fa-camera-retro"
    },
    {
        "iconValue": "fas fa-car",
        "data": 134,
        "class": "fas fa-car"
    },
    {
        "iconValue": "fas fa-caret-down",
        "data": 135,
        "class": "fas fa-caret-down"
    },
    {
        "iconValue": "fas fa-caret-left",
        "data": 136,
        "class": "fas fa-caret-left"
    },
    {
        "iconValue": "fas fa-caret-right",
        "data": 137,
        "class": "fas fa-caret-right"
    },
    {
        "iconValue": "fas fa-caret-square-down",
        "data": 138,
        "class": "fas fa-caret-square-down"
    },
    {
        "iconValue": "far fa-caret-square-down",
        "data": 139,
        "class": "far fa-caret-square-down"
    },
    {
        "iconValue": "fas fa-caret-square-left",
        "data": 140,
        "class": "fas fa-caret-square-left"
    },
    {
        "iconValue": "far fa-caret-square-left",
        "data": 141,
        "class": "far fa-caret-square-left"
    },
    {
        "iconValue": "fas fa-caret-square-right",
        "data": 142,
        "class": "fas fa-caret-square-right"
    },
    {
        "iconValue": "far fa-caret-square-right",
        "data": 143,
        "class": "far fa-caret-square-right"
    },
    {
        "iconValue": "fas fa-caret-square-up",
        "data": 144,
        "class": "fas fa-caret-square-up"
    },
    {
        "iconValue": "far fa-caret-square-up",
        "data": 145,
        "class": "far fa-caret-square-up"
    },
    {
        "iconValue": "fas fa-caret-up",
        "data": 146,
        "class": "fas fa-caret-up"
    },
    {
        "iconValue": "fas fa-cart-arrow-down",
        "data": 147,
        "class": "fas fa-cart-arrow-down"
    },
    {
        "iconValue": "fas fa-cart-plus",
        "data": 148,
        "class": "fas fa-cart-plus"
    },
    {
        "iconValue": "fab fa-cc-amex",
        "data": 149,
        "class": "fab fa-cc-amex"
    },
    {
        "iconValue": "fab fa-cc-apple-pay",
        "data": 150,
        "class": "fab fa-cc-apple-pay"
    },
    {
        "iconValue": "fab fa-cc-diners-club",
        "data": 151,
        "class": "fab fa-cc-diners-club"
    },
    {
        "iconValue": "fab fa-cc-discover",
        "data": 152,
        "class": "fab fa-cc-discover"
    },
    {
        "iconValue": "fab fa-cc-jcb",
        "data": 153,
        "class": "fab fa-cc-jcb"
    },
    {
        "iconValue": "fab fa-cc-mastercard",
        "data": 154,
        "class": "fab fa-cc-mastercard"
    },
    {
        "iconValue": "fab fa-cc-paypal",
        "data": 155,
        "class": "fab fa-cc-paypal"
    },
    {
        "iconValue": "fab fa-cc-stripe",
        "data": 156,
        "class": "fab fa-cc-stripe"
    },
    {
        "iconValue": "fab fa-cc-visa",
        "data": 157,
        "class": "fab fa-cc-visa"
    },
    {
        "iconValue": "fab fa-centercode",
        "data": 158,
        "class": "fab fa-centercode"
    },
    {
        "iconValue": "fas fa-certificate",
        "data": 159,
        "class": "fas fa-certificate"
    },
    {
        "iconValue": "fas fa-chart-area",
        "data": 160,
        "class": "fas fa-chart-area"
    },
    {
        "iconValue": "fas fa-chart-bar",
        "data": 161,
        "class": "fas fa-chart-bar"
    },
    {
        "iconValue": "far fa-chart-bar",
        "data": 162,
        "class": "far fa-chart-bar"
    },
    {
        "iconValue": "fas fa-chart-line",
        "data": 163,
        "class": "fas fa-chart-line"
    },
    {
        "iconValue": "fas fa-chart-pie",
        "data": 164,
        "class": "fas fa-chart-pie"
    },
    {
        "iconValue": "fas fa-check",
        "data": 165,
        "class": "fas fa-check"
    },
    {
        "iconValue": "fas fa-check-circle",
        "data": 166,
        "class": "fas fa-check-circle"
    },
    {
        "iconValue": "far fa-check-circle",
        "data": 167,
        "class": "far fa-check-circle"
    },
    {
        "iconValue": "fas fa-check-square",
        "data": 168,
        "class": "fas fa-check-square"
    },
    {
        "iconValue": "far fa-check-square",
        "data": 169,
        "class": "far fa-check-square"
    },
    {
        "iconValue": "fas fa-chevron-circle-down",
        "data": 170,
        "class": "fas fa-chevron-circle-down"
    },
    {
        "iconValue": "fas fa-chevron-circle-left",
        "data": 171,
        "class": "fas fa-chevron-circle-left"
    },
    {
        "iconValue": "fas fa-chevron-circle-right",
        "data": 172,
        "class": "fas fa-chevron-circle-right"
    },
    {
        "iconValue": "fas fa-chevron-circle-up",
        "data": 173,
        "class": "fas fa-chevron-circle-up"
    },
    {
        "iconValue": "fas fa-chevron-down",
        "data": 174,
        "class": "fas fa-chevron-down"
    },
    {
        "iconValue": "fas fa-chevron-left",
        "data": 175,
        "class": "fas fa-chevron-left"
    },
    {
        "iconValue": "fas fa-chevron-right",
        "data": 176,
        "class": "fas fa-chevron-right"
    },
    {
        "iconValue": "fas fa-chevron-up",
        "data": 177,
        "class": "fas fa-chevron-up"
    },
    {
        "iconValue": "fas fa-child",
        "data": 178,
        "class": "fas fa-child"
    },
    {
        "iconValue": "fab fa-chrome",
        "data": 179,
        "class": "fab fa-chrome"
    },
    {
        "iconValue": "fas fa-circle",
        "data": 180,
        "class": "fas fa-circle"
    },
    {
        "iconValue": "far fa-circle",
        "data": 181,
        "class": "far fa-circle"
    },
    {
        "iconValue": "fas fa-circle-notch",
        "data": 182,
        "class": "fas fa-circle-notch"
    },
    {
        "iconValue": "fas fa-clipboard",
        "data": 183,
        "class": "fas fa-clipboard"
    },
    {
        "iconValue": "far fa-clipboard",
        "data": 184,
        "class": "far fa-clipboard"
    },
    {
        "iconValue": "fas fa-clock",
        "data": 185,
        "class": "fas fa-clock"
    },
    {
        "iconValue": "far fa-clock",
        "data": 186,
        "class": "far fa-clock"
    },
    {
        "iconValue": "fas fa-clone",
        "data": 187,
        "class": "fas fa-clone"
    },
    {
        "iconValue": "far fa-clone",
        "data": 188,
        "class": "far fa-clone"
    },
    {
        "iconValue": "fas fa-closed-captioning",
        "data": 189,
        "class": "fas fa-closed-captioning"
    },
    {
        "iconValue": "far fa-closed-captioning",
        "data": 190,
        "class": "far fa-closed-captioning"
    },
    {
        "iconValue": "fas fa-cloud",
        "data": 191,
        "class": "fas fa-cloud"
    },
    {
        "iconValue": "fas fa-cloud-download-alt",
        "data": 192,
        "class": "fas fa-cloud-download-alt"
    },
    {
        "iconValue": "fas fa-cloud-upload-alt",
        "data": 193,
        "class": "fas fa-cloud-upload-alt"
    },
    {
        "iconValue": "fab fa-cloudscale",
        "data": 194,
        "class": "fab fa-cloudscale"
    },
    {
        "iconValue": "fab fa-cloudsmith",
        "data": 195,
        "class": "fab fa-cloudsmith"
    },
    {
        "iconValue": "fab fa-cloudversify",
        "data": 196,
        "class": "fab fa-cloudversify"
    },
    {
        "iconValue": "fas fa-code",
        "data": 197,
        "class": "fas fa-code"
    },
    {
        "iconValue": "fas fa-code-branch",
        "data": 198,
        "class": "fas fa-code-branch"
    },
    {
        "iconValue": "fab fa-codepen",
        "data": 199,
        "class": "fab fa-codepen"
    },
    {
        "iconValue": "fab fa-codiepie",
        "data": 200,
        "class": "fab fa-codiepie"
    },
    {
        "iconValue": "fas fa-coffee",
        "data": 201,
        "class": "fas fa-coffee"
    },
    {
        "iconValue": "fas fa-cog",
        "data": 202,
        "class": "fas fa-cog"
    },
    {
        "iconValue": "fas fa-cogs",
        "data": 203,
        "class": "fas fa-cogs"
    },
    {
        "iconValue": "fas fa-columns",
        "data": 204,
        "class": "fas fa-columns"
    },
    {
        "iconValue": "fas fa-comment",
        "data": 205,
        "class": "fas fa-comment"
    },
    {
        "iconValue": "far fa-comment",
        "data": 206,
        "class": "far fa-comment"
    },
    {
        "iconValue": "fas fa-comment-alt",
        "data": 207,
        "class": "fas fa-comment-alt"
    },
    {
        "iconValue": "far fa-comment-alt",
        "data": 208,
        "class": "far fa-comment-alt"
    },
    {
        "iconValue": "fas fa-comments",
        "data": 209,
        "class": "fas fa-comments"
    },
    {
        "iconValue": "far fa-comments",
        "data": 210,
        "class": "far fa-comments"
    },
    {
        "iconValue": "fas fa-compass",
        "data": 211,
        "class": "fas fa-compass"
    },
    {
        "iconValue": "far fa-compass",
        "data": 212,
        "class": "far fa-compass"
    },
    {
        "iconValue": "fas fa-compress",
        "data": 213,
        "class": "fas fa-compress"
    },
    {
        "iconValue": "fab fa-connectdevelop",
        "data": 214,
        "class": "fab fa-connectdevelop"
    },
    {
        "iconValue": "fab fa-contao",
        "data": 215,
        "class": "fab fa-contao"
    },
    {
        "iconValue": "fas fa-copy",
        "data": 216,
        "class": "fas fa-copy"
    },
    {
        "iconValue": "far fa-copy",
        "data": 217,
        "class": "far fa-copy"
    },
    {
        "iconValue": "fas fa-copyright",
        "data": 218,
        "class": "fas fa-copyright"
    },
    {
        "iconValue": "far fa-copyright",
        "data": 219,
        "class": "far fa-copyright"
    },
    {
        "iconValue": "fab fa-cpanel",
        "data": 220,
        "class": "fab fa-cpanel"
    },
    {
        "iconValue": "fab fa-creative-commons",
        "data": 221,
        "class": "fab fa-creative-commons"
    },
    {
        "iconValue": "fas fa-credit-card",
        "data": 222,
        "class": "fas fa-credit-card"
    },
    {
        "iconValue": "far fa-credit-card",
        "data": 223,
        "class": "far fa-credit-card"
    },
    {
        "iconValue": "fas fa-crop",
        "data": 224,
        "class": "fas fa-crop"
    },
    {
        "iconValue": "fas fa-crosshairs",
        "data": 225,
        "class": "fas fa-crosshairs"
    },
    {
        "iconValue": "fab fa-css3",
        "data": 226,
        "class": "fab fa-css3"
    },
    {
        "iconValue": "fab fa-css3-alt",
        "data": 227,
        "class": "fab fa-css3-alt"
    },
    {
        "iconValue": "fas fa-cube",
        "data": 228,
        "class": "fas fa-cube"
    },
    {
        "iconValue": "fas fa-cubes",
        "data": 229,
        "class": "fas fa-cubes"
    },
    {
        "iconValue": "fas fa-cut",
        "data": 230,
        "class": "fas fa-cut"
    },
    {
        "iconValue": "fab fa-cuttlefish",
        "data": 231,
        "class": "fab fa-cuttlefish"
    },
    {
        "iconValue": "fab fa-d-and-d",
        "data": 232,
        "class": "fab fa-d-and-d"
    },
    {
        "iconValue": "fab fa-dashcube",
        "data": 233,
        "class": "fab fa-dashcube"
    },
    {
        "iconValue": "fas fa-database",
        "data": 234,
        "class": "fas fa-database"
    },
    {
        "iconValue": "fas fa-deaf",
        "data": 235,
        "class": "fas fa-deaf"
    },
    {
        "iconValue": "fab fa-delicious",
        "data": 236,
        "class": "fab fa-delicious"
    },
    {
        "iconValue": "fab fa-deploydog",
        "data": 237,
        "class": "fab fa-deploydog"
    },
    {
        "iconValue": "fab fa-deskpro",
        "data": 238,
        "class": "fab fa-deskpro"
    },
    {
        "iconValue": "fas fa-desktop",
        "data": 239,
        "class": "fas fa-desktop"
    },
    {
        "iconValue": "fab fa-deviantart",
        "data": 240,
        "class": "fab fa-deviantart"
    },
    {
        "iconValue": "fab fa-digg",
        "data": 241,
        "class": "fab fa-digg"
    },
    {
        "iconValue": "fab fa-digital-ocean",
        "data": 242,
        "class": "fab fa-digital-ocean"
    },
    {
        "iconValue": "fab fa-discord",
        "data": 243,
        "class": "fab fa-discord"
    },
    {
        "iconValue": "fab fa-discourse",
        "data": 244,
        "class": "fab fa-discourse"
    },
    {
        "iconValue": "fab fa-dochub",
        "data": 245,
        "class": "fab fa-dochub"
    },
    {
        "iconValue": "fab fa-docker",
        "data": 246,
        "class": "fab fa-docker"
    },
    {
        "iconValue": "fas fa-dollar-sign",
        "data": 247,
        "class": "fas fa-dollar-sign"
    },
    {
        "iconValue": "fas fa-dot-circle",
        "data": 248,
        "class": "fas fa-dot-circle"
    },
    {
        "iconValue": "far fa-dot-circle",
        "data": 249,
        "class": "far fa-dot-circle"
    },
    {
        "iconValue": "fas fa-download",
        "data": 250,
        "class": "fas fa-download"
    },
    {
        "iconValue": "fab fa-draft2digital",
        "data": 251,
        "class": "fab fa-draft2digital"
    },
    {
        "iconValue": "fab fa-dribbble",
        "data": 252,
        "class": "fab fa-dribbble"
    },
    {
        "iconValue": "fab fa-dribbble-square",
        "data": 253,
        "class": "fab fa-dribbble-square"
    },
    {
        "iconValue": "fab fa-dropbox",
        "data": 254,
        "class": "fab fa-dropbox"
    },
    {
        "iconValue": "fab fa-drupal",
        "data": 255,
        "class": "fab fa-drupal"
    },
    {
        "iconValue": "fab fa-dyalog",
        "data": 256,
        "class": "fab fa-dyalog"
    },
    {
        "iconValue": "fab fa-earlybirds",
        "data": 257,
        "class": "fab fa-earlybirds"
    },
    {
        "iconValue": "fab fa-edge",
        "data": 258,
        "class": "fab fa-edge"
    },
    {
        "iconValue": "fas fa-edit",
        "data": 259,
        "class": "fas fa-edit"
    },
    {
        "iconValue": "far fa-edit",
        "data": 260,
        "class": "far fa-edit"
    },
    {
        "iconValue": "fas fa-eject",
        "data": 261,
        "class": "fas fa-eject"
    },
    {
        "iconValue": "fas fa-ellipsis-h",
        "data": 262,
        "class": "fas fa-ellipsis-h"
    },
    {
        "iconValue": "fas fa-ellipsis-v",
        "data": 263,
        "class": "fas fa-ellipsis-v"
    },
    {
        "iconValue": "fab fa-ember",
        "data": 264,
        "class": "fab fa-ember"
    },
    {
        "iconValue": "fab fa-empire",
        "data": 265,
        "class": "fab fa-empire"
    },
    {
        "iconValue": "fas fa-envelope",
        "data": 266,
        "class": "fas fa-envelope"
    },
    {
        "iconValue": "far fa-envelope",
        "data": 267,
        "class": "far fa-envelope"
    },
    {
        "iconValue": "fas fa-envelope-open",
        "data": 268,
        "class": "fas fa-envelope-open"
    },
    {
        "iconValue": "far fa-envelope-open",
        "data": 269,
        "class": "far fa-envelope-open"
    },
    {
        "iconValue": "fas fa-envelope-square",
        "data": 270,
        "class": "fas fa-envelope-square"
    },
    {
        "iconValue": "fab fa-envira",
        "data": 271,
        "class": "fab fa-envira"
    },
    {
        "iconValue": "fas fa-eraser",
        "data": 272,
        "class": "fas fa-eraser"
    },
    {
        "iconValue": "fab fa-erlang",
        "data": 273,
        "class": "fab fa-erlang"
    },
    {
        "iconValue": "fab fa-etsy",
        "data": 274,
        "class": "fab fa-etsy"
    },
    {
        "iconValue": "fas fa-euro-sign",
        "data": 275,
        "class": "fas fa-euro-sign"
    },
    {
        "iconValue": "fas fa-exchange-alt",
        "data": 276,
        "class": "fas fa-exchange-alt"
    },
    {
        "iconValue": "fas fa-exclamation",
        "data": 277,
        "class": "fas fa-exclamation"
    },
    {
        "iconValue": "fas fa-exclamation-circle",
        "data": 278,
        "class": "fas fa-exclamation-circle"
    },
    {
        "iconValue": "fas fa-exclamation-triangle",
        "data": 279,
        "class": "fas fa-exclamation-triangle"
    },
    {
        "iconValue": "fas fa-expand",
        "data": 280,
        "class": "fas fa-expand"
    },
    {
        "iconValue": "fas fa-expand-arrows-alt",
        "data": 281,
        "class": "fas fa-expand-arrows-alt"
    },
    {
        "iconValue": "fab fa-expeditedssl",
        "data": 282,
        "class": "fab fa-expeditedssl"
    },
    {
        "iconValue": "fas fa-external-link-alt",
        "data": 283,
        "class": "fas fa-external-link-alt"
    },
    {
        "iconValue": "fas fa-external-link-square-alt",
        "data": 284,
        "class": "fas fa-external-link-square-alt"
    },
    {
        "iconValue": "fas fa-eye",
        "data": 285,
        "class": "fas fa-eye"
    },
    {
        "iconValue": "fas fa-eye-dropper",
        "data": 286,
        "class": "fas fa-eye-dropper"
    },
    {
        "iconValue": "fas fa-eye-slash",
        "data": 287,
        "class": "fas fa-eye-slash"
    },
    {
        "iconValue": "far fa-eye-slash",
        "data": 288,
        "class": "far fa-eye-slash"
    },
    {
        "iconValue": "fab fa-facebook",
        "data": 289,
        "class": "fab fa-facebook"
    },
    {
        "iconValue": "fab fa-facebook-f",
        "data": 290,
        "class": "fab fa-facebook-f"
    },
    {
        "iconValue": "fab fa-facebook-messenger",
        "data": 291,
        "class": "fab fa-facebook-messenger"
    },
    {
        "iconValue": "fab fa-facebook-square",
        "data": 292,
        "class": "fab fa-facebook-square"
    },
    {
        "iconValue": "fas fa-fast-backward",
        "data": 293,
        "class": "fas fa-fast-backward"
    },
    {
        "iconValue": "fas fa-fast-forward",
        "data": 294,
        "class": "fas fa-fast-forward"
    },
    {
        "iconValue": "fas fa-fax",
        "data": 295,
        "class": "fas fa-fax"
    },
    {
        "iconValue": "fas fa-female",
        "data": 296,
        "class": "fas fa-female"
    },
    {
        "iconValue": "fas fa-fighter-jet",
        "data": 297,
        "class": "fas fa-fighter-jet"
    },
    {
        "iconValue": "fas fa-file",
        "data": 298,
        "class": "fas fa-file"
    },
    {
        "iconValue": "far fa-file",
        "data": 299,
        "class": "far fa-file"
    },
    {
        "iconValue": "fas fa-file-alt",
        "data": 300,
        "class": "fas fa-file-alt"
    },
    {
        "iconValue": "far fa-file-alt",
        "data": 301,
        "class": "far fa-file-alt"
    },
    {
        "iconValue": "fas fa-file-archive",
        "data": 302,
        "class": "fas fa-file-archive"
    },
    {
        "iconValue": "far fa-file-archive",
        "data": 303,
        "class": "far fa-file-archive"
    },
    {
        "iconValue": "fas fa-file-audio",
        "data": 304,
        "class": "fas fa-file-audio"
    },
    {
        "iconValue": "far fa-file-audio",
        "data": 305,
        "class": "far fa-file-audio"
    },
    {
        "iconValue": "fas fa-file-code",
        "data": 306,
        "class": "fas fa-file-code"
    },
    {
        "iconValue": "far fa-file-code",
        "data": 307,
        "class": "far fa-file-code"
    },
    {
        "iconValue": "fas fa-file-excel",
        "data": 308,
        "class": "fas fa-file-excel"
    },
    {
        "iconValue": "far fa-file-excel",
        "data": 309,
        "class": "far fa-file-excel"
    },
    {
        "iconValue": "fas fa-file-image",
        "data": 310,
        "class": "fas fa-file-image"
    },
    {
        "iconValue": "far fa-file-image",
        "data": 311,
        "class": "far fa-file-image"
    },
    {
        "iconValue": "fas fa-file-pdf",
        "data": 312,
        "class": "fas fa-file-pdf"
    },
    {
        "iconValue": "far fa-file-pdf",
        "data": 313,
        "class": "far fa-file-pdf"
    },
    {
        "iconValue": "fas fa-file-powerpoint",
        "data": 314,
        "class": "fas fa-file-powerpoint"
    },
    {
        "iconValue": "far fa-file-powerpoint",
        "data": 315,
        "class": "far fa-file-powerpoint"
    },
    {
        "iconValue": "fas fa-file-video",
        "data": 316,
        "class": "fas fa-file-video"
    },
    {
        "iconValue": "far fa-file-video",
        "data": 317,
        "class": "far fa-file-video"
    },
    {
        "iconValue": "fas fa-file-word",
        "data": 318,
        "class": "fas fa-file-word"
    },
    {
        "iconValue": "far fa-file-word",
        "data": 319,
        "class": "far fa-file-word"
    },
    {
        "iconValue": "fas fa-film",
        "data": 320,
        "class": "fas fa-film"
    },
    {
        "iconValue": "fas fa-filter",
        "data": 321,
        "class": "fas fa-filter"
    },
    {
        "iconValue": "fas fa-fire",
        "data": 322,
        "class": "fas fa-fire"
    },
    {
        "iconValue": "fas fa-fire-extinguisher",
        "data": 323,
        "class": "fas fa-fire-extinguisher"
    },
    {
        "iconValue": "fab fa-firefox",
        "data": 324,
        "class": "fab fa-firefox"
    },
    {
        "iconValue": "fab fa-first-order",
        "data": 325,
        "class": "fab fa-first-order"
    },
    {
        "iconValue": "fab fa-firstdraft",
        "data": 326,
        "class": "fab fa-firstdraft"
    },
    {
        "iconValue": "fas fa-flag",
        "data": 327,
        "class": "fas fa-flag"
    },
    {
        "iconValue": "far fa-flag",
        "data": 328,
        "class": "far fa-flag"
    },
    {
        "iconValue": "fas fa-flag-checkered",
        "data": 329,
        "class": "fas fa-flag-checkered"
    },
    {
        "iconValue": "fas fa-flask",
        "data": 330,
        "class": "fas fa-flask"
    },
    {
        "iconValue": "fab fa-flickr",
        "data": 331,
        "class": "fab fa-flickr"
    },
    {
        "iconValue": "fab fa-fly",
        "data": 332,
        "class": "fab fa-fly"
    },
    {
        "iconValue": "fas fa-folder",
        "data": 333,
        "class": "fas fa-folder"
    },
    {
        "iconValue": "far fa-folder",
        "data": 334,
        "class": "far fa-folder"
    },
    {
        "iconValue": "fas fa-folder-open",
        "data": 335,
        "class": "fas fa-folder-open"
    },
    {
        "iconValue": "far fa-folder-open",
        "data": 336,
        "class": "far fa-folder-open"
    },
    {
        "iconValue": "fas fa-font",
        "data": 337,
        "class": "fas fa-font"
    },
    {
        "iconValue": "fab fa-font-awesome",
        "data": 338,
        "class": "fab fa-font-awesome"
    },
    {
        "iconValue": "fab fa-font-awesome-alt",
        "data": 339,
        "class": "fab fa-font-awesome-alt"
    },
    {
        "iconValue": "fab fa-font-awesome-flag",
        "data": 340,
        "class": "fab fa-font-awesome-flag"
    },
    {
        "iconValue": "fab fa-fonticons",
        "data": 341,
        "class": "fab fa-fonticons"
    },
    {
        "iconValue": "fab fa-fonticons-fi",
        "data": 342,
        "class": "fab fa-fonticons-fi"
    },
    {
        "iconValue": "fab fa-fort-awesome",
        "data": 343,
        "class": "fab fa-fort-awesome"
    },
    {
        "iconValue": "fab fa-fort-awesome-alt",
        "data": 344,
        "class": "fab fa-fort-awesome-alt"
    },
    {
        "iconValue": "fab fa-forumbee",
        "data": 345,
        "class": "fab fa-forumbee"
    },
    {
        "iconValue": "fas fa-forward",
        "data": 346,
        "class": "fas fa-forward"
    },
    {
        "iconValue": "fab fa-foursquare",
        "data": 347,
        "class": "fab fa-foursquare"
    },
    {
        "iconValue": "fab fa-free-code-camp",
        "data": 348,
        "class": "fab fa-free-code-camp"
    },
    {
        "iconValue": "fab fa-freebsd",
        "data": 349,
        "class": "fab fa-freebsd"
    },
    {
        "iconValue": "fas fa-frown",
        "data": 350,
        "class": "fas fa-frown"
    },
    {
        "iconValue": "far fa-frown",
        "data": 351,
        "class": "far fa-frown"
    },
    {
        "iconValue": "fas fa-futbol",
        "data": 352,
        "class": "fas fa-futbol"
    },
    {
        "iconValue": "far fa-futbol",
        "data": 353,
        "class": "far fa-futbol"
    },
    {
        "iconValue": "fas fa-gamepad",
        "data": 354,
        "class": "fas fa-gamepad"
    },
    {
        "iconValue": "fas fa-gavel",
        "data": 355,
        "class": "fas fa-gavel"
    },
    {
        "iconValue": "fas fa-gem",
        "data": 356,
        "class": "fas fa-gem"
    },
    {
        "iconValue": "far fa-gem",
        "data": 357,
        "class": "far fa-gem"
    },
    {
        "iconValue": "fas fa-genderless",
        "data": 358,
        "class": "fas fa-genderless"
    },
    {
        "iconValue": "fab fa-get-pocket",
        "data": 359,
        "class": "fab fa-get-pocket"
    },
    {
        "iconValue": "fab fa-gg",
        "data": 360,
        "class": "fab fa-gg"
    },
    {
        "iconValue": "fab fa-gg-circle",
        "data": 361,
        "class": "fab fa-gg-circle"
    },
    {
        "iconValue": "fas fa-gift",
        "data": 362,
        "class": "fas fa-gift"
    },
    {
        "iconValue": "fab fa-git",
        "data": 363,
        "class": "fab fa-git"
    },
    {
        "iconValue": "fab fa-git-square",
        "data": 364,
        "class": "fab fa-git-square"
    },
    {
        "iconValue": "fab fa-github",
        "data": 365,
        "class": "fab fa-github"
    },
    {
        "iconValue": "fab fa-github-alt",
        "data": 366,
        "class": "fab fa-github-alt"
    },
    {
        "iconValue": "fab fa-github-square",
        "data": 367,
        "class": "fab fa-github-square"
    },
    {
        "iconValue": "fab fa-gitkraken",
        "data": 368,
        "class": "fab fa-gitkraken"
    },
    {
        "iconValue": "fab fa-gitlab",
        "data": 369,
        "class": "fab fa-gitlab"
    },
    {
        "iconValue": "fab fa-gitter",
        "data": 370,
        "class": "fab fa-gitter"
    },
    {
        "iconValue": "fas fa-glass-martini",
        "data": 371,
        "class": "fas fa-glass-martini"
    },
    {
        "iconValue": "fab fa-glide",
        "data": 372,
        "class": "fab fa-glide"
    },
    {
        "iconValue": "fab fa-glide-g",
        "data": 373,
        "class": "fab fa-glide-g"
    },
    {
        "iconValue": "fas fa-globe",
        "data": 374,
        "class": "fas fa-globe"
    },
    {
        "iconValue": "fab fa-gofore",
        "data": 375,
        "class": "fab fa-gofore"
    },
    {
        "iconValue": "fab fa-goodreads",
        "data": 376,
        "class": "fab fa-goodreads"
    },
    {
        "iconValue": "fab fa-goodreads-g",
        "data": 377,
        "class": "fab fa-goodreads-g"
    },
    {
        "iconValue": "fab fa-google",
        "data": 378,
        "class": "fab fa-google"
    },
    {
        "iconValue": "fab fa-google-drive",
        "data": 379,
        "class": "fab fa-google-drive"
    },
    {
        "iconValue": "fab fa-google-play",
        "data": 380,
        "class": "fab fa-google-play"
    },
    {
        "iconValue": "fab fa-google-plus",
        "data": 381,
        "class": "fab fa-google-plus"
    },
    {
        "iconValue": "fab fa-google-plus-g",
        "data": 382,
        "class": "fab fa-google-plus-g"
    },
    {
        "iconValue": "fab fa-google-plus-square",
        "data": 383,
        "class": "fab fa-google-plus-square"
    },
    {
        "iconValue": "fab fa-google-wallet",
        "data": 384,
        "class": "fab fa-google-wallet"
    },
    {
        "iconValue": "fas fa-graduation-cap",
        "data": 385,
        "class": "fas fa-graduation-cap"
    },
    {
        "iconValue": "fab fa-gratipay",
        "data": 386,
        "class": "fab fa-gratipay"
    },
    {
        "iconValue": "fab fa-grav",
        "data": 387,
        "class": "fab fa-grav"
    },
    {
        "iconValue": "fab fa-gripfire",
        "data": 388,
        "class": "fab fa-gripfire"
    },
    {
        "iconValue": "fab fa-grunt",
        "data": 389,
        "class": "fab fa-grunt"
    },
    {
        "iconValue": "fab fa-gulp",
        "data": 390,
        "class": "fab fa-gulp"
    },
    {
        "iconValue": "fas fa-h-square",
        "data": 391,
        "class": "fas fa-h-square"
    },
    {
        "iconValue": "fab fa-hacker-news",
        "data": 392,
        "class": "fab fa-hacker-news"
    },
    {
        "iconValue": "fab fa-hacker-news-square",
        "data": 393,
        "class": "fab fa-hacker-news-square"
    },
    {
        "iconValue": "fas fa-hand-lizard",
        "data": 394,
        "class": "fas fa-hand-lizard"
    },
    {
        "iconValue": "far fa-hand-lizard",
        "data": 395,
        "class": "far fa-hand-lizard"
    },
    {
        "iconValue": "fas fa-hand-paper",
        "data": 396,
        "class": "fas fa-hand-paper"
    },
    {
        "iconValue": "far fa-hand-paper",
        "data": 397,
        "class": "far fa-hand-paper"
    },
    {
        "iconValue": "fas fa-hand-peace",
        "data": 398,
        "class": "fas fa-hand-peace"
    },
    {
        "iconValue": "far fa-hand-peace",
        "data": 399,
        "class": "far fa-hand-peace"
    },
    {
        "iconValue": "fas fa-hand-point-down",
        "data": 400,
        "class": "fas fa-hand-point-down"
    },
    {
        "iconValue": "far fa-hand-point-down",
        "data": 401,
        "class": "far fa-hand-point-down"
    },
    {
        "iconValue": "fas fa-hand-point-left",
        "data": 402,
        "class": "fas fa-hand-point-left"
    },
    {
        "iconValue": "far fa-hand-point-left",
        "data": 403,
        "class": "far fa-hand-point-left"
    },
    {
        "iconValue": "fas fa-hand-point-right",
        "data": 404,
        "class": "fas fa-hand-point-right"
    },
    {
        "iconValue": "far fa-hand-point-right",
        "data": 405,
        "class": "far fa-hand-point-right"
    },
    {
        "iconValue": "fas fa-hand-point-up",
        "data": 406,
        "class": "fas fa-hand-point-up"
    },
    {
        "iconValue": "far fa-hand-point-up",
        "data": 407,
        "class": "far fa-hand-point-up"
    },
    {
        "iconValue": "fas fa-hand-pointer",
        "data": 408,
        "class": "fas fa-hand-pointer"
    },
    {
        "iconValue": "far fa-hand-pointer",
        "data": 409,
        "class": "far fa-hand-pointer"
    },
    {
        "iconValue": "fas fa-hand-rock",
        "data": 410,
        "class": "fas fa-hand-rock"
    },
    {
        "iconValue": "far fa-hand-rock",
        "data": 411,
        "class": "far fa-hand-rock"
    },
    {
        "iconValue": "fas fa-hand-scissors",
        "data": 412,
        "class": "fas fa-hand-scissors"
    },
    {
        "iconValue": "far fa-hand-scissors",
        "data": 413,
        "class": "far fa-hand-scissors"
    },
    {
        "iconValue": "fas fa-hand-spock",
        "data": 414,
        "class": "fas fa-hand-spock"
    },
    {
        "iconValue": "far fa-hand-spock",
        "data": 415,
        "class": "far fa-hand-spock"
    },
    {
        "iconValue": "fas fa-handshake",
        "data": 416,
        "class": "fas fa-handshake"
    },
    {
        "iconValue": "far fa-handshake",
        "data": 417,
        "class": "far fa-handshake"
    },
    {
        "iconValue": "fas fa-hashtag",
        "data": 418,
        "class": "fas fa-hashtag"
    },
    {
        "iconValue": "fas fa-hdd",
        "data": 419,
        "class": "fas fa-hdd"
    },
    {
        "iconValue": "far fa-hdd",
        "data": 420,
        "class": "far fa-hdd"
    },
    {
        "iconValue": "fas fa-heading",
        "data": 421,
        "class": "fas fa-heading"
    },
    {
        "iconValue": "fas fa-headphones",
        "data": 422,
        "class": "fas fa-headphones"
    },
    {
        "iconValue": "fas fa-heart",
        "data": 423,
        "class": "fas fa-heart"
    },
    {
        "iconValue": "far fa-heart",
        "data": 424,
        "class": "far fa-heart"
    },
    {
        "iconValue": "fas fa-heartbeat",
        "data": 425,
        "class": "fas fa-heartbeat"
    },
    {
        "iconValue": "fab fa-hire-a-helper",
        "data": 426,
        "class": "fab fa-hire-a-helper"
    },
    {
        "iconValue": "fas fa-history",
        "data": 427,
        "class": "fas fa-history"
    },
    {
        "iconValue": "fas fa-home",
        "data": 428,
        "class": "fas fa-home"
    },
    {
        "iconValue": "fab fa-hooli",
        "data": 429,
        "class": "fab fa-hooli"
    },
    {
        "iconValue": "fas fa-hospital",
        "data": 430,
        "class": "fas fa-hospital"
    },
    {
        "iconValue": "far fa-hospital",
        "data": 431,
        "class": "far fa-hospital"
    },
    {
        "iconValue": "fab fa-hotjar",
        "data": 432,
        "class": "fab fa-hotjar"
    },
    {
        "iconValue": "fas fa-hourglass",
        "data": 433,
        "class": "fas fa-hourglass"
    },
    {
        "iconValue": "far fa-hourglass",
        "data": 434,
        "class": "far fa-hourglass"
    },
    {
        "iconValue": "fas fa-hourglass-end",
        "data": 435,
        "class": "fas fa-hourglass-end"
    },
    {
        "iconValue": "fas fa-hourglass-half",
        "data": 436,
        "class": "fas fa-hourglass-half"
    },
    {
        "iconValue": "fas fa-hourglass-start",
        "data": 437,
        "class": "fas fa-hourglass-start"
    },
    {
        "iconValue": "fab fa-houzz",
        "data": 438,
        "class": "fab fa-houzz"
    },
    {
        "iconValue": "fab fa-html5",
        "data": 439,
        "class": "fab fa-html5"
    },
    {
        "iconValue": "fab fa-hubspot",
        "data": 440,
        "class": "fab fa-hubspot"
    },
    {
        "iconValue": "fas fa-i-cursor",
        "data": 441,
        "class": "fas fa-i-cursor"
    },
    {
        "iconValue": "fas fa-id-badge",
        "data": 442,
        "class": "fas fa-id-badge"
    },
    {
        "iconValue": "far fa-id-badge",
        "data": 443,
        "class": "far fa-id-badge"
    },
    {
        "iconValue": "fas fa-id-card",
        "data": 444,
        "class": "fas fa-id-card"
    },
    {
        "iconValue": "far fa-id-card",
        "data": 445,
        "class": "far fa-id-card"
    },
    {
        "iconValue": "fas fa-image",
        "data": 446,
        "class": "fas fa-image"
    },
    {
        "iconValue": "far fa-image",
        "data": 447,
        "class": "far fa-image"
    },
    {
        "iconValue": "fas fa-images",
        "data": 448,
        "class": "fas fa-images"
    },
    {
        "iconValue": "far fa-images",
        "data": 449,
        "class": "far fa-images"
    },
    {
        "iconValue": "fab fa-imdb",
        "data": 450,
        "class": "fab fa-imdb"
    },
    {
        "iconValue": "fas fa-inbox",
        "data": 451,
        "class": "fas fa-inbox"
    },
    {
        "iconValue": "fas fa-indent",
        "data": 452,
        "class": "fas fa-indent"
    },
    {
        "iconValue": "fas fa-industry",
        "data": 453,
        "class": "fas fa-industry"
    },
    {
        "iconValue": "fas fa-info",
        "data": 454,
        "class": "fas fa-info"
    },
    {
        "iconValue": "fas fa-info-circle",
        "data": 455,
        "class": "fas fa-info-circle"
    },
    {
        "iconValue": "fab fa-instagram",
        "data": 456,
        "class": "fab fa-instagram"
    },
    {
        "iconValue": "fab fa-internet-explorer",
        "data": 457,
        "class": "fab fa-internet-explorer"
    },
    {
        "iconValue": "fab fa-ioxhost",
        "data": 458,
        "class": "fab fa-ioxhost"
    },
    {
        "iconValue": "fas fa-italic",
        "data": 459,
        "class": "fas fa-italic"
    },
    {
        "iconValue": "fab fa-itunes",
        "data": 460,
        "class": "fab fa-itunes"
    },
    {
        "iconValue": "fab fa-itunes-note",
        "data": 461,
        "class": "fab fa-itunes-note"
    },
    {
        "iconValue": "fab fa-jenkins",
        "data": 462,
        "class": "fab fa-jenkins"
    },
    {
        "iconValue": "fab fa-joget",
        "data": 463,
        "class": "fab fa-joget"
    },
    {
        "iconValue": "fab fa-joomla",
        "data": 464,
        "class": "fab fa-joomla"
    },
    {
        "iconValue": "fab fa-js",
        "data": 465,
        "class": "fab fa-js"
    },
    {
        "iconValue": "fab fa-js-square",
        "data": 466,
        "class": "fab fa-js-square"
    },
    {
        "iconValue": "fab fa-jsfiddle",
        "data": 467,
        "class": "fab fa-jsfiddle"
    },
    {
        "iconValue": "fas fa-key",
        "data": 468,
        "class": "fas fa-key"
    },
    {
        "iconValue": "fas fa-keyboard",
        "data": 469,
        "class": "fas fa-keyboard"
    },
    {
        "iconValue": "far fa-keyboard",
        "data": 470,
        "class": "far fa-keyboard"
    },
    {
        "iconValue": "fab fa-keycdn",
        "data": 471,
        "class": "fab fa-keycdn"
    },
    {
        "iconValue": "fab fa-kickstarter",
        "data": 472,
        "class": "fab fa-kickstarter"
    },
    {
        "iconValue": "fab fa-kickstarter-k",
        "data": 473,
        "class": "fab fa-kickstarter-k"
    },
    {
        "iconValue": "fas fa-language",
        "data": 474,
        "class": "fas fa-language"
    },
    {
        "iconValue": "fas fa-laptop",
        "data": 475,
        "class": "fas fa-laptop"
    },
    {
        "iconValue": "fab fa-laravel",
        "data": 476,
        "class": "fab fa-laravel"
    },
    {
        "iconValue": "fab fa-lastfm",
        "data": 477,
        "class": "fab fa-lastfm"
    },
    {
        "iconValue": "fab fa-lastfm-square",
        "data": 478,
        "class": "fab fa-lastfm-square"
    },
    {
        "iconValue": "fas fa-leaf",
        "data": 479,
        "class": "fas fa-leaf"
    },
    {
        "iconValue": "fab fa-leanpub",
        "data": 480,
        "class": "fab fa-leanpub"
    },
    {
        "iconValue": "fas fa-lemon",
        "data": 481,
        "class": "fas fa-lemon"
    },
    {
        "iconValue": "far fa-lemon",
        "data": 482,
        "class": "far fa-lemon"
    },
    {
        "iconValue": "fab fa-less",
        "data": 483,
        "class": "fab fa-less"
    },
    {
        "iconValue": "fas fa-level-down-alt",
        "data": 484,
        "class": "fas fa-level-down-alt"
    },
    {
        "iconValue": "fas fa-level-up-alt",
        "data": 485,
        "class": "fas fa-level-up-alt"
    },
    {
        "iconValue": "fas fa-life-ring",
        "data": 486,
        "class": "fas fa-life-ring"
    },
    {
        "iconValue": "far fa-life-ring",
        "data": 487,
        "class": "far fa-life-ring"
    },
    {
        "iconValue": "fas fa-lightbulb",
        "data": 488,
        "class": "fas fa-lightbulb"
    },
    {
        "iconValue": "far fa-lightbulb",
        "data": 489,
        "class": "far fa-lightbulb"
    },
    {
        "iconValue": "fab fa-line",
        "data": 490,
        "class": "fab fa-line"
    },
    {
        "iconValue": "fas fa-link",
        "data": 491,
        "class": "fas fa-link"
    },
    {
        "iconValue": "fab fa-linkedin",
        "data": 492,
        "class": "fab fa-linkedin"
    },
    {
        "iconValue": "fab fa-linkedin-in",
        "data": 493,
        "class": "fab fa-linkedin-in"
    },
    {
        "iconValue": "fab fa-linode",
        "data": 494,
        "class": "fab fa-linode"
    },
    {
        "iconValue": "fab fa-linux",
        "data": 495,
        "class": "fab fa-linux"
    },
    {
        "iconValue": "fas fa-lira-sign",
        "data": 496,
        "class": "fas fa-lira-sign"
    },
    {
        "iconValue": "fas fa-list",
        "data": 497,
        "class": "fas fa-list"
    },
    {
        "iconValue": "fas fa-list-alt",
        "data": 498,
        "class": "fas fa-list-alt"
    },
    {
        "iconValue": "far fa-list-alt",
        "data": 499,
        "class": "far fa-list-alt"
    },
    {
        "iconValue": "fas fa-list-ol",
        "data": 500,
        "class": "fas fa-list-ol"
    },
    {
        "iconValue": "fas fa-list-ul",
        "data": 501,
        "class": "fas fa-list-ul"
    },
    {
        "iconValue": "fas fa-location-arrow",
        "data": 502,
        "class": "fas fa-location-arrow"
    },
    {
        "iconValue": "fas fa-lock",
        "data": 503,
        "class": "fas fa-lock"
    },
    {
        "iconValue": "fas fa-lock-open",
        "data": 504,
        "class": "fas fa-lock-open"
    },
    {
        "iconValue": "fas fa-long-arrow-alt-down",
        "data": 505,
        "class": "fas fa-long-arrow-alt-down"
    },
    {
        "iconValue": "fas fa-long-arrow-alt-left",
        "data": 506,
        "class": "fas fa-long-arrow-alt-left"
    },
    {
        "iconValue": "fas fa-long-arrow-alt-right",
        "data": 507,
        "class": "fas fa-long-arrow-alt-right"
    },
    {
        "iconValue": "fas fa-long-arrow-alt-up",
        "data": 508,
        "class": "fas fa-long-arrow-alt-up"
    },
    {
        "iconValue": "fas fa-low-vision",
        "data": 509,
        "class": "fas fa-low-vision"
    },
    {
        "iconValue": "fab fa-lyft",
        "data": 510,
        "class": "fab fa-lyft"
    },
    {
        "iconValue": "fab fa-magento",
        "data": 511,
        "class": "fab fa-magento"
    },
    {
        "iconValue": "fas fa-magic",
        "data": 512,
        "class": "fas fa-magic"
    },
    {
        "iconValue": "fas fa-magnet",
        "data": 513,
        "class": "fas fa-magnet"
    },
    {
        "iconValue": "fas fa-male",
        "data": 514,
        "class": "fas fa-male"
    },
    {
        "iconValue": "fas fa-map",
        "data": 515,
        "class": "fas fa-map"
    },
    {
        "iconValue": "far fa-map",
        "data": 516,
        "class": "far fa-map"
    },
    {
        "iconValue": "fas fa-map-marker",
        "data": 517,
        "class": "fas fa-map-marker"
    },
    {
        "iconValue": "fas fa-map-marker-alt",
        "data": 518,
        "class": "fas fa-map-marker-alt"
    },
    {
        "iconValue": "fas fa-map-pin",
        "data": 519,
        "class": "fas fa-map-pin"
    },
    {
        "iconValue": "fas fa-map-signs",
        "data": 520,
        "class": "fas fa-map-signs"
    },
    {
        "iconValue": "fas fa-mars",
        "data": 521,
        "class": "fas fa-mars"
    },
    {
        "iconValue": "fas fa-mars-double",
        "data": 522,
        "class": "fas fa-mars-double"
    },
    {
        "iconValue": "fas fa-mars-stroke",
        "data": 523,
        "class": "fas fa-mars-stroke"
    },
    {
        "iconValue": "fas fa-mars-stroke-h",
        "data": 524,
        "class": "fas fa-mars-stroke-h"
    },
    {
        "iconValue": "fas fa-mars-stroke-v",
        "data": 525,
        "class": "fas fa-mars-stroke-v"
    },
    {
        "iconValue": "fab fa-maxcdn",
        "data": 526,
        "class": "fab fa-maxcdn"
    },
    {
        "iconValue": "fab fa-medapps",
        "data": 527,
        "class": "fab fa-medapps"
    },
    {
        "iconValue": "fab fa-medium",
        "data": 528,
        "class": "fab fa-medium"
    },
    {
        "iconValue": "fab fa-medium-m",
        "data": 529,
        "class": "fab fa-medium-m"
    },
    {
        "iconValue": "fas fa-medkit",
        "data": 530,
        "class": "fas fa-medkit"
    },
    {
        "iconValue": "fab fa-medrt",
        "data": 531,
        "class": "fab fa-medrt"
    },
    {
        "iconValue": "fab fa-meetup",
        "data": 532,
        "class": "fab fa-meetup"
    },
    {
        "iconValue": "fas fa-meh",
        "data": 533,
        "class": "fas fa-meh"
    },
    {
        "iconValue": "far fa-meh",
        "data": 534,
        "class": "far fa-meh"
    },
    {
        "iconValue": "fas fa-mercury",
        "data": 535,
        "class": "fas fa-mercury"
    },
    {
        "iconValue": "fas fa-microchip",
        "data": 536,
        "class": "fas fa-microchip"
    },
    {
        "iconValue": "fas fa-microphone",
        "data": 537,
        "class": "fas fa-microphone"
    },
    {
        "iconValue": "fas fa-microphone-slash",
        "data": 538,
        "class": "fas fa-microphone-slash"
    },
    {
        "iconValue": "fab fa-microsoft",
        "data": 539,
        "class": "fab fa-microsoft"
    },
    {
        "iconValue": "fas fa-minus",
        "data": 540,
        "class": "fas fa-minus"
    },
    {
        "iconValue": "fas fa-minus-circle",
        "data": 541,
        "class": "fas fa-minus-circle"
    },
    {
        "iconValue": "fas fa-minus-square",
        "data": 542,
        "class": "fas fa-minus-square"
    },
    {
        "iconValue": "far fa-minus-square",
        "data": 543,
        "class": "far fa-minus-square"
    },
    {
        "iconValue": "fab fa-mix",
        "data": 544,
        "class": "fab fa-mix"
    },
    {
        "iconValue": "fab fa-mixcloud",
        "data": 545,
        "class": "fab fa-mixcloud"
    },
    {
        "iconValue": "fab fa-mizuni",
        "data": 546,
        "class": "fab fa-mizuni"
    },
    {
        "iconValue": "fas fa-mobile",
        "data": 547,
        "class": "fas fa-mobile"
    },
    {
        "iconValue": "fas fa-mobile-alt",
        "data": 548,
        "class": "fas fa-mobile-alt"
    },
    {
        "iconValue": "fab fa-modx",
        "data": 549,
        "class": "fab fa-modx"
    },
    {
        "iconValue": "fab fa-monero",
        "data": 550,
        "class": "fab fa-monero"
    },
    {
        "iconValue": "fas fa-money-bill-alt",
        "data": 551,
        "class": "fas fa-money-bill-alt"
    },
    {
        "iconValue": "far fa-money-bill-alt",
        "data": 552,
        "class": "far fa-money-bill-alt"
    },
    {
        "iconValue": "fas fa-moon",
        "data": 553,
        "class": "fas fa-moon"
    },
    {
        "iconValue": "far fa-moon",
        "data": 554,
        "class": "far fa-moon"
    },
    {
        "iconValue": "fas fa-motorcycle",
        "data": 555,
        "class": "fas fa-motorcycle"
    },
    {
        "iconValue": "fas fa-mouse-pointer",
        "data": 556,
        "class": "fas fa-mouse-pointer"
    },
    {
        "iconValue": "fas fa-music",
        "data": 557,
        "class": "fas fa-music"
    },
    {
        "iconValue": "fab fa-napster",
        "data": 558,
        "class": "fab fa-napster"
    },
    {
        "iconValue": "fas fa-neuter",
        "data": 559,
        "class": "fas fa-neuter"
    },
    {
        "iconValue": "fas fa-newspaper",
        "data": 560,
        "class": "fas fa-newspaper"
    },
    {
        "iconValue": "far fa-newspaper",
        "data": 561,
        "class": "far fa-newspaper"
    },
    {
        "iconValue": "fab fa-nintendo-switch",
        "data": 562,
        "class": "fab fa-nintendo-switch"
    },
    {
        "iconValue": "fab fa-node",
        "data": 563,
        "class": "fab fa-node"
    },
    {
        "iconValue": "fab fa-node-js",
        "data": 564,
        "class": "fab fa-node-js"
    },
    {
        "iconValue": "fab fa-npm",
        "data": 565,
        "class": "fab fa-npm"
    },
    {
        "iconValue": "fab fa-ns8",
        "data": 566,
        "class": "fab fa-ns8"
    },
    {
        "iconValue": "fab fa-nutritionix",
        "data": 567,
        "class": "fab fa-nutritionix"
    },
    {
        "iconValue": "fas fa-object-group",
        "data": 568,
        "class": "fas fa-object-group"
    },
    {
        "iconValue": "far fa-object-group",
        "data": 569,
        "class": "far fa-object-group"
    },
    {
        "iconValue": "fas fa-object-ungroup",
        "data": 570,
        "class": "fas fa-object-ungroup"
    },
    {
        "iconValue": "far fa-object-ungroup",
        "data": 571,
        "class": "far fa-object-ungroup"
    },
    {
        "iconValue": "fab fa-odnoklassniki",
        "data": 572,
        "class": "fab fa-odnoklassniki"
    },
    {
        "iconValue": "fab fa-odnoklassniki-square",
        "data": 573,
        "class": "fab fa-odnoklassniki-square"
    },
    {
        "iconValue": "fab fa-opencart",
        "data": 574,
        "class": "fab fa-opencart"
    },
    {
        "iconValue": "fab fa-openid",
        "data": 575,
        "class": "fab fa-openid"
    },
    {
        "iconValue": "fab fa-opera",
        "data": 576,
        "class": "fab fa-opera"
    },
    {
        "iconValue": "fab fa-optin-monster",
        "data": 577,
        "class": "fab fa-optin-monster"
    },
    {
        "iconValue": "fab fa-osi",
        "data": 578,
        "class": "fab fa-osi"
    },
    {
        "iconValue": "fas fa-outdent",
        "data": 579,
        "class": "fas fa-outdent"
    },
    {
        "iconValue": "fab fa-page4",
        "data": 580,
        "class": "fab fa-page4"
    },
    {
        "iconValue": "fab fa-pagelines",
        "data": 581,
        "class": "fab fa-pagelines"
    },
    {
        "iconValue": "fas fa-paint-brush",
        "data": 582,
        "class": "fas fa-paint-brush"
    },
    {
        "iconValue": "fab fa-palfed",
        "data": 583,
        "class": "fab fa-palfed"
    },
    {
        "iconValue": "fas fa-paper-plane",
        "data": 584,
        "class": "fas fa-paper-plane"
    },
    {
        "iconValue": "far fa-paper-plane",
        "data": 585,
        "class": "far fa-paper-plane"
    },
    {
        "iconValue": "fas fa-paperclip",
        "data": 586,
        "class": "fas fa-paperclip"
    },
    {
        "iconValue": "fas fa-paragraph",
        "data": 587,
        "class": "fas fa-paragraph"
    },
    {
        "iconValue": "fas fa-paste",
        "data": 588,
        "class": "fas fa-paste"
    },
    {
        "iconValue": "fab fa-patreon",
        "data": 589,
        "class": "fab fa-patreon"
    },
    {
        "iconValue": "fas fa-pause",
        "data": 590,
        "class": "fas fa-pause"
    },
    {
        "iconValue": "fas fa-pause-circle",
        "data": 591,
        "class": "fas fa-pause-circle"
    },
    {
        "iconValue": "far fa-pause-circle",
        "data": 592,
        "class": "far fa-pause-circle"
    },
    {
        "iconValue": "fas fa-paw",
        "data": 593,
        "class": "fas fa-paw"
    },
    {
        "iconValue": "fab fa-paypal",
        "data": 594,
        "class": "fab fa-paypal"
    },
    {
        "iconValue": "fas fa-pen-square",
        "data": 595,
        "class": "fas fa-pen-square"
    },
    {
        "iconValue": "fas fa-pencil-alt",
        "data": 596,
        "class": "fas fa-pencil-alt"
    },
    {
        "iconValue": "fas fa-percent",
        "data": 597,
        "class": "fas fa-percent"
    },
    {
        "iconValue": "fab fa-periscope",
        "data": 598,
        "class": "fab fa-periscope"
    },
    {
        "iconValue": "fab fa-phabricator",
        "data": 599,
        "class": "fab fa-phabricator"
    },
    {
        "iconValue": "fab fa-phoenix-framework",
        "data": 600,
        "class": "fab fa-phoenix-framework"
    },
    {
        "iconValue": "fas fa-phone",
        "data": 601,
        "class": "fas fa-phone"
    },
    {
        "iconValue": "fas fa-phone-square",
        "data": 602,
        "class": "fas fa-phone-square"
    },
    {
        "iconValue": "fas fa-phone-volume",
        "data": 603,
        "class": "fas fa-phone-volume"
    },
    {
        "iconValue": "fab fa-pied-piper",
        "data": 604,
        "class": "fab fa-pied-piper"
    },
    {
        "iconValue": "fab fa-pied-piper-alt",
        "data": 605,
        "class": "fab fa-pied-piper-alt"
    },
    {
        "iconValue": "fab fa-pied-piper-pp",
        "data": 606,
        "class": "fab fa-pied-piper-pp"
    },
    {
        "iconValue": "fab fa-pinterest",
        "data": 607,
        "class": "fab fa-pinterest"
    },
    {
        "iconValue": "fab fa-pinterest-p",
        "data": 608,
        "class": "fab fa-pinterest-p"
    },
    {
        "iconValue": "fab fa-pinterest-square",
        "data": 609,
        "class": "fab fa-pinterest-square"
    },
    {
        "iconValue": "fas fa-plane",
        "data": 610,
        "class": "fas fa-plane"
    },
    {
        "iconValue": "fas fa-play",
        "data": 611,
        "class": "fas fa-play"
    },
    {
        "iconValue": "fas fa-play-circle",
        "data": 612,
        "class": "fas fa-play-circle"
    },
    {
        "iconValue": "far fa-play-circle",
        "data": 613,
        "class": "far fa-play-circle"
    },
    {
        "iconValue": "fab fa-playstation",
        "data": 614,
        "class": "fab fa-playstation"
    },
    {
        "iconValue": "fas fa-plug",
        "data": 615,
        "class": "fas fa-plug"
    },
    {
        "iconValue": "fas fa-plus",
        "data": 616,
        "class": "fas fa-plus"
    },
    {
        "iconValue": "fas fa-plus-circle",
        "data": 617,
        "class": "fas fa-plus-circle"
    },
    {
        "iconValue": "fas fa-plus-square",
        "data": 618,
        "class": "fas fa-plus-square"
    },
    {
        "iconValue": "far fa-plus-square",
        "data": 619,
        "class": "far fa-plus-square"
    },
    {
        "iconValue": "fas fa-podcast",
        "data": 620,
        "class": "fas fa-podcast"
    },
    {
        "iconValue": "fas fa-pound-sign",
        "data": 621,
        "class": "fas fa-pound-sign"
    },
    {
        "iconValue": "fas fa-power-off",
        "data": 622,
        "class": "fas fa-power-off"
    },
    {
        "iconValue": "fas fa-print",
        "data": 623,
        "class": "fas fa-print"
    },
    {
        "iconValue": "fab fa-product-hunt",
        "data": 624,
        "class": "fab fa-product-hunt"
    },
    {
        "iconValue": "fab fa-pushed",
        "data": 625,
        "class": "fab fa-pushed"
    },
    {
        "iconValue": "fas fa-puzzle-piece",
        "data": 626,
        "class": "fas fa-puzzle-piece"
    },
    {
        "iconValue": "fab fa-python",
        "data": 627,
        "class": "fab fa-python"
    },
    {
        "iconValue": "fab fa-qq",
        "data": 628,
        "class": "fab fa-qq"
    },
    {
        "iconValue": "fas fa-qrcode",
        "data": 629,
        "class": "fas fa-qrcode"
    },
    {
        "iconValue": "fas fa-question",
        "data": 630,
        "class": "fas fa-question"
    },
    {
        "iconValue": "fas fa-question-circle",
        "data": 631,
        "class": "fas fa-question-circle"
    },
    {
        "iconValue": "far fa-question-circle",
        "data": 632,
        "class": "far fa-question-circle"
    },
    {
        "iconValue": "fab fa-quora",
        "data": 633,
        "class": "fab fa-quora"
    },
    {
        "iconValue": "fas fa-quote-left",
        "data": 634,
        "class": "fas fa-quote-left"
    },
    {
        "iconValue": "fas fa-quote-right",
        "data": 635,
        "class": "fas fa-quote-right"
    },
    {
        "iconValue": "fas fa-random",
        "data": 636,
        "class": "fas fa-random"
    },
    {
        "iconValue": "fab fa-ravelry",
        "data": 637,
        "class": "fab fa-ravelry"
    },
    {
        "iconValue": "fab fa-react",
        "data": 638,
        "class": "fab fa-react"
    },
    {
        "iconValue": "fab fa-rebel",
        "data": 639,
        "class": "fab fa-rebel"
    },
    {
        "iconValue": "fas fa-recycle",
        "data": 640,
        "class": "fas fa-recycle"
    },
    {
        "iconValue": "fab fa-red-river",
        "data": 641,
        "class": "fab fa-red-river"
    },
    {
        "iconValue": "fab fa-reddit",
        "data": 642,
        "class": "fab fa-reddit"
    },
    {
        "iconValue": "fab fa-reddit-alien",
        "data": 643,
        "class": "fab fa-reddit-alien"
    },
    {
        "iconValue": "fab fa-reddit-square",
        "data": 644,
        "class": "fab fa-reddit-square"
    },
    {
        "iconValue": "fas fa-redo",
        "data": 645,
        "class": "fas fa-redo"
    },
    {
        "iconValue": "fas fa-redo-alt",
        "data": 646,
        "class": "fas fa-redo-alt"
    },
    {
        "iconValue": "fas fa-registered",
        "data": 647,
        "class": "fas fa-registered"
    },
    {
        "iconValue": "far fa-registered",
        "data": 648,
        "class": "far fa-registered"
    },
    {
        "iconValue": "fab fa-rendact",
        "data": 649,
        "class": "fab fa-rendact"
    },
    {
        "iconValue": "fab fa-renren",
        "data": 650,
        "class": "fab fa-renren"
    },
    {
        "iconValue": "fas fa-reply",
        "data": 651,
        "class": "fas fa-reply"
    },
    {
        "iconValue": "fas fa-reply-all",
        "data": 652,
        "class": "fas fa-reply-all"
    },
    {
        "iconValue": "fab fa-replyd",
        "data": 653,
        "class": "fab fa-replyd"
    },
    {
        "iconValue": "fab fa-resolving",
        "data": 654,
        "class": "fab fa-resolving"
    },
    {
        "iconValue": "fas fa-retweet",
        "data": 655,
        "class": "fas fa-retweet"
    },
    {
        "iconValue": "fas fa-road",
        "data": 656,
        "class": "fas fa-road"
    },
    {
        "iconValue": "fas fa-rocket",
        "data": 657,
        "class": "fas fa-rocket"
    },
    {
        "iconValue": "fab fa-rocketchat",
        "data": 658,
        "class": "fab fa-rocketchat"
    },
    {
        "iconValue": "fab fa-rockrms",
        "data": 659,
        "class": "fab fa-rockrms"
    },
    {
        "iconValue": "fas fa-rss",
        "data": 660,
        "class": "fas fa-rss"
    },
    {
        "iconValue": "fas fa-rss-square",
        "data": 661,
        "class": "fas fa-rss-square"
    },
    {
        "iconValue": "fas fa-ruble-sign",
        "data": 662,
        "class": "fas fa-ruble-sign"
    },
    {
        "iconValue": "fas fa-rupee-sign",
        "data": 663,
        "class": "fas fa-rupee-sign"
    },
    {
        "iconValue": "fab fa-safari",
        "data": 664,
        "class": "fab fa-safari"
    },
    {
        "iconValue": "fab fa-sass",
        "data": 665,
        "class": "fab fa-sass"
    },
    {
        "iconValue": "fas fa-save",
        "data": 666,
        "class": "fas fa-save"
    },
    {
        "iconValue": "far fa-save",
        "data": 667,
        "class": "far fa-save"
    },
    {
        "iconValue": "fab fa-schlix",
        "data": 668,
        "class": "fab fa-schlix"
    },
    {
        "iconValue": "fab fa-scribd",
        "data": 669,
        "class": "fab fa-scribd"
    },
    {
        "iconValue": "fas fa-search",
        "data": 670,
        "class": "fas fa-search"
    },
    {
        "iconValue": "fas fa-search-minus",
        "data": 671,
        "class": "fas fa-search-minus"
    },
    {
        "iconValue": "fas fa-search-plus",
        "data": 672,
        "class": "fas fa-search-plus"
    },
    {
        "iconValue": "fab fa-searchengin",
        "data": 673,
        "class": "fab fa-searchengin"
    },
    {
        "iconValue": "fab fa-sellcast",
        "data": 674,
        "class": "fab fa-sellcast"
    },
    {
        "iconValue": "fab fa-sellsy",
        "data": 675,
        "class": "fab fa-sellsy"
    },
    {
        "iconValue": "fas fa-server",
        "data": 676,
        "class": "fas fa-server"
    },
    {
        "iconValue": "fab fa-servicestack",
        "data": 677,
        "class": "fab fa-servicestack"
    },
    {
        "iconValue": "fas fa-share",
        "data": 678,
        "class": "fas fa-share"
    },
    {
        "iconValue": "fas fa-share-alt",
        "data": 679,
        "class": "fas fa-share-alt"
    },
    {
        "iconValue": "fas fa-share-alt-square",
        "data": 680,
        "class": "fas fa-share-alt-square"
    },
    {
        "iconValue": "fas fa-share-square",
        "data": 681,
        "class": "fas fa-share-square"
    },
    {
        "iconValue": "far fa-share-square",
        "data": 682,
        "class": "far fa-share-square"
    },
    {
        "iconValue": "fas fa-shekel-sign",
        "data": 683,
        "class": "fas fa-shekel-sign"
    },
    {
        "iconValue": "fas fa-shield-alt",
        "data": 684,
        "class": "fas fa-shield-alt"
    },
    {
        "iconValue": "fas fa-ship",
        "data": 685,
        "class": "fas fa-ship"
    },
    {
        "iconValue": "fab fa-shirtsinbulk",
        "data": 686,
        "class": "fab fa-shirtsinbulk"
    },
    {
        "iconValue": "fas fa-shopping-bag",
        "data": 687,
        "class": "fas fa-shopping-bag"
    },
    {
        "iconValue": "fas fa-shopping-basket",
        "data": 688,
        "class": "fas fa-shopping-basket"
    },
    {
        "iconValue": "fas fa-shopping-cart",
        "data": 689,
        "class": "fas fa-shopping-cart"
    },
    {
        "iconValue": "fas fa-shower",
        "data": 690,
        "class": "fas fa-shower"
    },
    {
        "iconValue": "fas fa-sign-in-alt",
        "data": 691,
        "class": "fas fa-sign-in-alt"
    },
    {
        "iconValue": "fas fa-sign-language",
        "data": 692,
        "class": "fas fa-sign-language"
    },
    {
        "iconValue": "fas fa-sign-out-alt",
        "data": 693,
        "class": "fas fa-sign-out-alt"
    },
    {
        "iconValue": "fas fa-signal",
        "data": 694,
        "class": "fas fa-signal"
    },
    {
        "iconValue": "fab fa-simplybuilt",
        "data": 695,
        "class": "fab fa-simplybuilt"
    },
    {
        "iconValue": "fab fa-sistrix",
        "data": 696,
        "class": "fab fa-sistrix"
    },
    {
        "iconValue": "fas fa-sitemap",
        "data": 697,
        "class": "fas fa-sitemap"
    },
    {
        "iconValue": "fab fa-skyatlas",
        "data": 698,
        "class": "fab fa-skyatlas"
    },
    {
        "iconValue": "fab fa-skype",
        "data": 699,
        "class": "fab fa-skype"
    },
    {
        "iconValue": "fab fa-slack",
        "data": 700,
        "class": "fab fa-slack"
    },
    {
        "iconValue": "fab fa-slack-hash",
        "data": 701,
        "class": "fab fa-slack-hash"
    },
    {
        "iconValue": "fas fa-sliders-h",
        "data": 702,
        "class": "fas fa-sliders-h"
    },
    {
        "iconValue": "fab fa-slideshare",
        "data": 703,
        "class": "fab fa-slideshare"
    },
    {
        "iconValue": "fas fa-smile",
        "data": 704,
        "class": "fas fa-smile"
    },
    {
        "iconValue": "far fa-smile",
        "data": 705,
        "class": "far fa-smile"
    },
    {
        "iconValue": "fab fa-snapchat",
        "data": 706,
        "class": "fab fa-snapchat"
    },
    {
        "iconValue": "fab fa-snapchat-ghost",
        "data": 707,
        "class": "fab fa-snapchat-ghost"
    },
    {
        "iconValue": "fab fa-snapchat-square",
        "data": 708,
        "class": "fab fa-snapchat-square"
    },
    {
        "iconValue": "fas fa-snowflake",
        "data": 709,
        "class": "fas fa-snowflake"
    },
    {
        "iconValue": "far fa-snowflake",
        "data": 710,
        "class": "far fa-snowflake"
    },
    {
        "iconValue": "fas fa-sort",
        "data": 711,
        "class": "fas fa-sort"
    },
    {
        "iconValue": "fas fa-sort-alpha-down",
        "data": 712,
        "class": "fas fa-sort-alpha-down"
    },
    {
        "iconValue": "fas fa-sort-alpha-up",
        "data": 713,
        "class": "fas fa-sort-alpha-up"
    },
    {
        "iconValue": "fas fa-sort-amount-down",
        "data": 714,
        "class": "fas fa-sort-amount-down"
    },
    {
        "iconValue": "fas fa-sort-amount-up",
        "data": 715,
        "class": "fas fa-sort-amount-up"
    },
    {
        "iconValue": "fas fa-sort-down",
        "data": 716,
        "class": "fas fa-sort-down"
    },
    {
        "iconValue": "fas fa-sort-numeric-down",
        "data": 717,
        "class": "fas fa-sort-numeric-down"
    },
    {
        "iconValue": "fas fa-sort-numeric-up",
        "data": 718,
        "class": "fas fa-sort-numeric-up"
    },
    {
        "iconValue": "fas fa-sort-up",
        "data": 719,
        "class": "fas fa-sort-up"
    },
    {
        "iconValue": "fab fa-soundcloud",
        "data": 720,
        "class": "fab fa-soundcloud"
    },
    {
        "iconValue": "fas fa-space-shuttle",
        "data": 721,
        "class": "fas fa-space-shuttle"
    },
    {
        "iconValue": "fab fa-speakap",
        "data": 722,
        "class": "fab fa-speakap"
    },
    {
        "iconValue": "fas fa-spinner",
        "data": 723,
        "class": "fas fa-spinner"
    },
    {
        "iconValue": "fab fa-spotify",
        "data": 724,
        "class": "fab fa-spotify"
    },
    {
        "iconValue": "fas fa-square",
        "data": 725,
        "class": "fas fa-square"
    },
    {
        "iconValue": "far fa-square",
        "data": 726,
        "class": "far fa-square"
    },
    {
        "iconValue": "fab fa-stack-exchange",
        "data": 727,
        "class": "fab fa-stack-exchange"
    },
    {
        "iconValue": "fab fa-stack-overflow",
        "data": 728,
        "class": "fab fa-stack-overflow"
    },
    {
        "iconValue": "fas fa-star",
        "data": 729,
        "class": "fas fa-star"
    },
    {
        "iconValue": "far fa-star",
        "data": 730,
        "class": "far fa-star"
    },
    {
        "iconValue": "fas fa-star-half",
        "data": 731,
        "class": "fas fa-star-half"
    },
    {
        "iconValue": "far fa-star-half",
        "data": 732,
        "class": "far fa-star-half"
    },
    {
        "iconValue": "fab fa-staylinked",
        "data": 733,
        "class": "fab fa-staylinked"
    },
    {
        "iconValue": "fab fa-steam",
        "data": 734,
        "class": "fab fa-steam"
    },
    {
        "iconValue": "fab fa-steam-square",
        "data": 735,
        "class": "fab fa-steam-square"
    },
    {
        "iconValue": "fab fa-steam-symbol",
        "data": 736,
        "class": "fab fa-steam-symbol"
    },
    {
        "iconValue": "fas fa-step-backward",
        "data": 737,
        "class": "fas fa-step-backward"
    },
    {
        "iconValue": "fas fa-step-forward",
        "data": 738,
        "class": "fas fa-step-forward"
    },
    {
        "iconValue": "fas fa-stethoscope",
        "data": 739,
        "class": "fas fa-stethoscope"
    },
    {
        "iconValue": "fab fa-sticker-mule",
        "data": 740,
        "class": "fab fa-sticker-mule"
    },
    {
        "iconValue": "fas fa-sticky-note",
        "data": 741,
        "class": "fas fa-sticky-note"
    },
    {
        "iconValue": "far fa-sticky-note",
        "data": 742,
        "class": "far fa-sticky-note"
    },
    {
        "iconValue": "fas fa-stop",
        "data": 743,
        "class": "fas fa-stop"
    },
    {
        "iconValue": "fas fa-stop-circle",
        "data": 744,
        "class": "fas fa-stop-circle"
    },
    {
        "iconValue": "far fa-stop-circle",
        "data": 745,
        "class": "far fa-stop-circle"
    },
    {
        "iconValue": "fab fa-strava",
        "data": 746,
        "class": "fab fa-strava"
    },
    {
        "iconValue": "fas fa-street-view",
        "data": 747,
        "class": "fas fa-street-view"
    },
    {
        "iconValue": "fas fa-strikethrough",
        "data": 748,
        "class": "fas fa-strikethrough"
    },
    {
        "iconValue": "fab fa-stripe",
        "data": 749,
        "class": "fab fa-stripe"
    },
    {
        "iconValue": "fab fa-stripe-s",
        "data": 750,
        "class": "fab fa-stripe-s"
    },
    {
        "iconValue": "fab fa-studiovinari",
        "data": 751,
        "class": "fab fa-studiovinari"
    },
    {
        "iconValue": "fab fa-stumbleupon",
        "data": 752,
        "class": "fab fa-stumbleupon"
    },
    {
        "iconValue": "fab fa-stumbleupon-circle",
        "data": 753,
        "class": "fab fa-stumbleupon-circle"
    },
    {
        "iconValue": "fas fa-subscript",
        "data": 754,
        "class": "fas fa-subscript"
    },
    {
        "iconValue": "fas fa-subway",
        "data": 755,
        "class": "fas fa-subway"
    },
    {
        "iconValue": "fas fa-suitcase",
        "data": 756,
        "class": "fas fa-suitcase"
    },
    {
        "iconValue": "fas fa-sun",
        "data": 757,
        "class": "fas fa-sun"
    },
    {
        "iconValue": "far fa-sun",
        "data": 758,
        "class": "far fa-sun"
    },
    {
        "iconValue": "fab fa-superpowers",
        "data": 759,
        "class": "fab fa-superpowers"
    },
    {
        "iconValue": "fas fa-superscript",
        "data": 760,
        "class": "fas fa-superscript"
    },
    {
        "iconValue": "fab fa-supple",
        "data": 761,
        "class": "fab fa-supple"
    },
    {
        "iconValue": "fas fa-sync",
        "data": 762,
        "class": "fas fa-sync"
    },
    {
        "iconValue": "fas fa-sync-alt",
        "data": 763,
        "class": "fas fa-sync-alt"
    },
    {
        "iconValue": "fas fa-table",
        "data": 764,
        "class": "fas fa-table"
    },
    {
        "iconValue": "fas fa-tablet",
        "data": 765,
        "class": "fas fa-tablet"
    },
    {
        "iconValue": "fas fa-tablet-alt",
        "data": 766,
        "class": "fas fa-tablet-alt"
    },
    {
        "iconValue": "fas fa-tachometer-alt",
        "data": 767,
        "class": "fas fa-tachometer-alt"
    },
    {
        "iconValue": "fas fa-tag",
        "data": 768,
        "class": "fas fa-tag"
    },
    {
        "iconValue": "fas fa-tags",
        "data": 769,
        "class": "fas fa-tags"
    },
    {
        "iconValue": "fas fa-tasks",
        "data": 770,
        "class": "fas fa-tasks"
    },
    {
        "iconValue": "fas fa-taxi",
        "data": 771,
        "class": "fas fa-taxi"
    },
    {
        "iconValue": "fab fa-telegram",
        "data": 772,
        "class": "fab fa-telegram"
    },
    {
        "iconValue": "fab fa-telegram-plane",
        "data": 773,
        "class": "fab fa-telegram-plane"
    },
    {
        "iconValue": "fab fa-tencent-weibo",
        "data": 774,
        "class": "fab fa-tencent-weibo"
    },
    {
        "iconValue": "fas fa-terminal",
        "data": 775,
        "class": "fas fa-terminal"
    },
    {
        "iconValue": "fas fa-text-height",
        "data": 776,
        "class": "fas fa-text-height"
    },
    {
        "iconValue": "fas fa-text-width",
        "data": 777,
        "class": "fas fa-text-width"
    },
    {
        "iconValue": "fas fa-th",
        "data": 778,
        "class": "fas fa-th"
    },
    {
        "iconValue": "fas fa-th-large",
        "data": 779,
        "class": "fas fa-th-large"
    },
    {
        "iconValue": "fas fa-th-list",
        "data": 780,
        "class": "fas fa-th-list"
    },
    {
        "iconValue": "fab fa-themeisle",
        "data": 781,
        "class": "fab fa-themeisle"
    },
    {
        "iconValue": "fas fa-thermometer-empty",
        "data": 782,
        "class": "fas fa-thermometer-empty"
    },
    {
        "iconValue": "fas fa-thermometer-full",
        "data": 783,
        "class": "fas fa-thermometer-full"
    },
    {
        "iconValue": "fas fa-thermometer-half",
        "data": 784,
        "class": "fas fa-thermometer-half"
    },
    {
        "iconValue": "fas fa-thermometer-quarter",
        "data": 785,
        "class": "fas fa-thermometer-quarter"
    },
    {
        "iconValue": "fas fa-thermometer-three-quarters",
        "data": 786,
        "class": "fas fa-thermometer-three-quarters"
    },
    {
        "iconValue": "fas fa-thumbs-down",
        "data": 787,
        "class": "fas fa-thumbs-down"
    },
    {
        "iconValue": "far fa-thumbs-down",
        "data": 788,
        "class": "far fa-thumbs-down"
    },
    {
        "iconValue": "fas fa-thumbs-up",
        "data": 789,
        "class": "fas fa-thumbs-up"
    },
    {
        "iconValue": "far fa-thumbs-up",
        "data": 790,
        "class": "far fa-thumbs-up"
    },
    {
        "iconValue": "fas fa-thumbtack",
        "data": 791,
        "class": "fas fa-thumbtack"
    },
    {
        "iconValue": "fas fa-ticket-alt",
        "data": 792,
        "class": "fas fa-ticket-alt"
    },
    {
        "iconValue": "fas fa-times",
        "data": 793,
        "class": "fas fa-times"
    },
    {
        "iconValue": "fas fa-times-circle",
        "data": 794,
        "class": "fas fa-times-circle"
    },
    {
        "iconValue": "far fa-times-circle",
        "data": 795,
        "class": "far fa-times-circle"
    },
    {
        "iconValue": "fas fa-tint",
        "data": 796,
        "class": "fas fa-tint"
    },
    {
        "iconValue": "fas fa-toggle-off",
        "data": 797,
        "class": "fas fa-toggle-off"
    },
    {
        "iconValue": "fas fa-toggle-on",
        "data": 798,
        "class": "fas fa-toggle-on"
    },
    {
        "iconValue": "fas fa-trademark",
        "data": 799,
        "class": "fas fa-trademark"
    },
    {
        "iconValue": "fas fa-train",
        "data": 800,
        "class": "fas fa-train"
    },
    {
        "iconValue": "fas fa-transgender",
        "data": 801,
        "class": "fas fa-transgender"
    },
    {
        "iconValue": "fas fa-transgender-alt",
        "data": 802,
        "class": "fas fa-transgender-alt"
    },
    {
        "iconValue": "fas fa-trash",
        "data": 803,
        "class": "fas fa-trash"
    },
    {
        "iconValue": "fas fa-trash-alt",
        "data": 804,
        "class": "fas fa-trash-alt"
    },
    {
        "iconValue": "far fa-trash-alt",
        "data": 805,
        "class": "far fa-trash-alt"
    },
    {
        "iconValue": "fas fa-tree",
        "data": 806,
        "class": "fas fa-tree"
    },
    {
        "iconValue": "fab fa-trello",
        "data": 807,
        "class": "fab fa-trello"
    },
    {
        "iconValue": "fab fa-tripadvisor",
        "data": 808,
        "class": "fab fa-tripadvisor"
    },
    {
        "iconValue": "fas fa-trophy",
        "data": 809,
        "class": "fas fa-trophy"
    },
    {
        "iconValue": "fas fa-truck",
        "data": 810,
        "class": "fas fa-truck"
    },
    {
        "iconValue": "fas fa-tty",
        "data": 811,
        "class": "fas fa-tty"
    },
    {
        "iconValue": "fab fa-tumblr",
        "data": 812,
        "class": "fab fa-tumblr"
    },
    {
        "iconValue": "fab fa-tumblr-square",
        "data": 813,
        "class": "fab fa-tumblr-square"
    },
    {
        "iconValue": "fas fa-tv",
        "data": 814,
        "class": "fas fa-tv"
    },
    {
        "iconValue": "fab fa-twitch",
        "data": 815,
        "class": "fab fa-twitch"
    },
    {
        "iconValue": "fab fa-twitter",
        "data": 816,
        "class": "fab fa-twitter"
    },
    {
        "iconValue": "fab fa-twitter-square",
        "data": 817,
        "class": "fab fa-twitter-square"
    },
    {
        "iconValue": "fab fa-typo3",
        "data": 818,
        "class": "fab fa-typo3"
    },
    {
        "iconValue": "fab fa-uber",
        "data": 819,
        "class": "fab fa-uber"
    },
    {
        "iconValue": "fab fa-uikit",
        "data": 820,
        "class": "fab fa-uikit"
    },
    {
        "iconValue": "fas fa-umbrella",
        "data": 821,
        "class": "fas fa-umbrella"
    },
    {
        "iconValue": "fas fa-underline",
        "data": 822,
        "class": "fas fa-underline"
    },
    {
        "iconValue": "fas fa-undo",
        "data": 823,
        "class": "fas fa-undo"
    },
    {
        "iconValue": "fas fa-undo-alt",
        "data": 824,
        "class": "fas fa-undo-alt"
    },
    {
        "iconValue": "fab fa-uniregistry",
        "data": 825,
        "class": "fab fa-uniregistry"
    },
    {
        "iconValue": "fas fa-universal-access",
        "data": 826,
        "class": "fas fa-universal-access"
    },
    {
        "iconValue": "fas fa-university",
        "data": 827,
        "class": "fas fa-university"
    },
    {
        "iconValue": "fas fa-unlink",
        "data": 828,
        "class": "fas fa-unlink"
    },
    {
        "iconValue": "fas fa-unlock",
        "data": 829,
        "class": "fas fa-unlock"
    },
    {
        "iconValue": "fas fa-unlock-alt",
        "data": 830,
        "class": "fas fa-unlock-alt"
    },
    {
        "iconValue": "fab fa-untappd",
        "data": 831,
        "class": "fab fa-untappd"
    },
    {
        "iconValue": "fas fa-upload",
        "data": 832,
        "class": "fas fa-upload"
    },
    {
        "iconValue": "fab fa-usb",
        "data": 833,
        "class": "fab fa-usb"
    },
    {
        "iconValue": "fas fa-user",
        "data": 834,
        "class": "fas fa-user"
    },
    {
        "iconValue": "far fa-user",
        "data": 835,
        "class": "far fa-user"
    },
    {
        "iconValue": "fas fa-user-circle",
        "data": 836,
        "class": "fas fa-user-circle"
    },
    {
        "iconValue": "far fa-user-circle",
        "data": 837,
        "class": "far fa-user-circle"
    },
    {
        "iconValue": "fas fa-user-md",
        "data": 838,
        "class": "fas fa-user-md"
    },
    {
        "iconValue": "fas fa-user-plus",
        "data": 839,
        "class": "fas fa-user-plus"
    },
    {
        "iconValue": "fas fa-user-secret",
        "data": 840,
        "class": "fas fa-user-secret"
    },
    {
        "iconValue": "fas fa-user-times",
        "data": 841,
        "class": "fas fa-user-times"
    },
    {
        "iconValue": "fas fa-users",
        "data": 842,
        "class": "fas fa-users"
    },
    {
        "iconValue": "fab fa-ussunnah",
        "data": 843,
        "class": "fab fa-ussunnah"
    },
    {
        "iconValue": "fas fa-utensil-spoon",
        "data": 844,
        "class": "fas fa-utensil-spoon"
    },
    {
        "iconValue": "fas fa-utensils",
        "data": 845,
        "class": "fas fa-utensils"
    },
    {
        "iconValue": "fab fa-vaadin",
        "data": 846,
        "class": "fab fa-vaadin"
    },
    {
        "iconValue": "fas fa-venus",
        "data": 847,
        "class": "fas fa-venus"
    },
    {
        "iconValue": "fas fa-venus-double",
        "data": 848,
        "class": "fas fa-venus-double"
    },
    {
        "iconValue": "fas fa-venus-mars",
        "data": 849,
        "class": "fas fa-venus-mars"
    },
    {
        "iconValue": "fab fa-viacoin",
        "data": 850,
        "class": "fab fa-viacoin"
    },
    {
        "iconValue": "fab fa-viadeo",
        "data": 851,
        "class": "fab fa-viadeo"
    },
    {
        "iconValue": "fab fa-viadeo-square",
        "data": 852,
        "class": "fab fa-viadeo-square"
    },
    {
        "iconValue": "fab fa-viber",
        "data": 853,
        "class": "fab fa-viber"
    },
    {
        "iconValue": "fas fa-video",
        "data": 854,
        "class": "fas fa-video"
    },
    {
        "iconValue": "fab fa-vimeo",
        "data": 855,
        "class": "fab fa-vimeo"
    },
    {
        "iconValue": "fab fa-vimeo-square",
        "data": 856,
        "class": "fab fa-vimeo-square"
    },
    {
        "iconValue": "fab fa-vimeo-v",
        "data": 857,
        "class": "fab fa-vimeo-v"
    },
    {
        "iconValue": "fab fa-vine",
        "data": 858,
        "class": "fab fa-vine"
    },
    {
        "iconValue": "fab fa-vk",
        "data": 859,
        "class": "fab fa-vk"
    },
    {
        "iconValue": "fab fa-vnv",
        "data": 860,
        "class": "fab fa-vnv"
    },
    {
        "iconValue": "fas fa-volume-down",
        "data": 861,
        "class": "fas fa-volume-down"
    },
    {
        "iconValue": "fas fa-volume-off",
        "data": 862,
        "class": "fas fa-volume-off"
    },
    {
        "iconValue": "fas fa-volume-up",
        "data": 863,
        "class": "fas fa-volume-up"
    },
    {
        "iconValue": "fab fa-vuejs",
        "data": 864,
        "class": "fab fa-vuejs"
    },
    {
        "iconValue": "fab fa-weibo",
        "data": 865,
        "class": "fab fa-weibo"
    },
    {
        "iconValue": "fab fa-weixin",
        "data": 866,
        "class": "fab fa-weixin"
    },
    {
        "iconValue": "fab fa-whatsapp",
        "data": 867,
        "class": "fab fa-whatsapp"
    },
    {
        "iconValue": "fab fa-whatsapp-square",
        "data": 868,
        "class": "fab fa-whatsapp-square"
    },
    {
        "iconValue": "fas fa-wheelchair",
        "data": 869,
        "class": "fas fa-wheelchair"
    },
    {
        "iconValue": "fab fa-whmcs",
        "data": 870,
        "class": "fab fa-whmcs"
    },
    {
        "iconValue": "fas fa-wifi",
        "data": 871,
        "class": "fas fa-wifi"
    },
    {
        "iconValue": "fab fa-wikipedia-w",
        "data": 872,
        "class": "fab fa-wikipedia-w"
    },
    {
        "iconValue": "fas fa-window-close",
        "data": 873,
        "class": "fas fa-window-close"
    },
    {
        "iconValue": "far fa-window-close",
        "data": 874,
        "class": "far fa-window-close"
    },
    {
        "iconValue": "fas fa-window-maximize",
        "data": 875,
        "class": "fas fa-window-maximize"
    },
    {
        "iconValue": "far fa-window-maximize",
        "data": 876,
        "class": "far fa-window-maximize"
    },
    {
        "iconValue": "fas fa-window-minimize",
        "data": 877,
        "class": "fas fa-window-minimize"
    },
    {
        "iconValue": "fas fa-window-restore",
        "data": 878,
        "class": "fas fa-window-restore"
    },
    {
        "iconValue": "far fa-window-restore",
        "data": 879,
        "class": "far fa-window-restore"
    },
    {
        "iconValue": "fab fa-windows",
        "data": 880,
        "class": "fab fa-windows"
    },
    {
        "iconValue": "fas fa-won-sign",
        "data": 881,
        "class": "fas fa-won-sign"
    },
    {
        "iconValue": "fab fa-wordpress",
        "data": 882,
        "class": "fab fa-wordpress"
    },
    {
        "iconValue": "fab fa-wordpress-simple",
        "data": 883,
        "class": "fab fa-wordpress-simple"
    },
    {
        "iconValue": "fab fa-wpbeginner",
        "data": 884,
        "class": "fab fa-wpbeginner"
    },
    {
        "iconValue": "fab fa-wpexplorer",
        "data": 885,
        "class": "fab fa-wpexplorer"
    },
    {
        "iconValue": "fab fa-wpforms",
        "data": 886,
        "class": "fab fa-wpforms"
    },
    {
        "iconValue": "fas fa-wrench",
        "data": 887,
        "class": "fas fa-wrench"
    },
    {
        "iconValue": "fab fa-xbox",
        "data": 888,
        "class": "fab fa-xbox"
    },
    {
        "iconValue": "fab fa-xing",
        "data": 889,
        "class": "fab fa-xing"
    },
    {
        "iconValue": "fab fa-xing-square",
        "data": 890,
        "class": "fab fa-xing-square"
    },
    {
        "iconValue": "fab fa-y-combinator",
        "data": 891,
        "class": "fab fa-y-combinator"
    },
    {
        "iconValue": "fab fa-yahoo",
        "data": 892,
        "class": "fab fa-yahoo"
    },
    {
        "iconValue": "fab fa-yandex",
        "data": 893,
        "class": "fab fa-yandex"
    },
    {
        "iconValue": "fab fa-yandex-international",
        "data": 894,
        "class": "fab fa-yandex-international"
    },
    {
        "iconValue": "fab fa-yelp",
        "data": 895,
        "class": "fab fa-yelp"
    },
    {
        "iconValue": "fas fa-yen-sign",
        "data": 896,
        "class": "fas fa-yen-sign"
    },
    {
        "iconValue": "fab fa-yoast",
        "data": 897,
        "class": "fab fa-yoast"
    },
    {
        "iconValue": "fab fa-youtube",
        "data": 898,
        "class": "fab fa-youtube"
    }
];
function TextEditor(selector, options) {
    const that = this;
    this.selector = selector;
    this.targets = document.querySelectorAll(selector);
    this.options = {
        iconColor: "#000000",
        activeIconColor: "#01447b",
        editorBgColor: "#ffffff",
        fontFamily: [{"Calibri":"Calibri"}, {"Comic Sans MS":"Comic Sans MS"}],
        fontSize:[8,9,20,40]
    };
    this.uuid = function() {
        return '_' + Math.random().toString(36).substr(2, 9);
    };
    this.getClosest = function (elem, selector) {
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            if ( elem.matches( selector ) ) return elem;
        }
        return null;

    };
    this.getParents = function ( elem, selector ) {

        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                Element.prototype.oMatchesSelector ||
                Element.prototype.webkitMatchesSelector ||
                function(s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {}
                    return i > -1;
                };
        }

        // Setup parents array
        var parents = [];

        // Get matching parent elements
        for ( ; elem && elem !== document; elem = elem.parentNode ) {

            // Add matching parents to array
            if ( selector ) {
                if ( elem.matches( selector ) ) {
                    parents.push( elem );
                }
            } else {
                parents.push( elem );
            }

        }

        return parents;

    };
    this.replaceSelectionWithHtml = function(html) {
        var range;
        if (window.getSelection && window.getSelection().getRangeAt) {
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            var div = document.createElement("div");
            div.innerHTML = html;
            var frag = document.createDocumentFragment(), child;
            while ( (child = div.firstChild) ) {
                frag.appendChild(child);
            }
            range.insertNode(frag);
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            range.pasteHTML(html);
        }
    };
    this.execFontSize = function (size, unit, target) {
        var sel, range, node;
        if (window.getSelection) {
            for(let el of target.querySelectorAll("span:empty"))
                el.remove();
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = window.getSelection().getRangeAt(0);

                var html = '<span style="font-size:'+size+unit+';">' + range + '</span>';
                range.deleteContents();

                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                if(sel.toString().length>0)
                    for(let el of target.querySelectorAll("span:empty"))
                        el.remove();
                else{
                    for(let p of target.querySelectorAll("span:empty")) {
                        var s = window.getSelection(),
                            r = document.createRange();
                        p.innerHTML = '\u00a0';
                        r.selectNodeContents(p);
                        s.removeAllRanges();
                        s.addRange(r);
                        document.execCommand('delete', false, null);
                    }
                }

            }
        }
    };
    this.getActiveDiv =function () {
        var activeDiv = window.getSelection().anchorNode;
        while (!( activeDiv instanceof Element ))
            activeDiv = activeDiv.parentElement;
        while (!activeDiv.getAttribute("contenteditable"))
            activeDiv = activeDiv.parentElement;
        return activeDiv;
    };
    this.on_keyup = function (e) {
        if(that.iconSelect)
            that.iconSelect.updatePos();
        let _top = 0;
        let target = document.querySelector("[target-id ='"+that.activeTarget+"']");
        if(target.getBoundingClientRect().top > target.getBoundingClientRect().bottom)
            _top = target.getBoundingClientRect().top - target.getBoundingClientRect().height;
        else
            _top = target.getBoundingClientRect().bottom;
        if(_top !== top)
            document.querySelector("[editor-id='"+that.activeTarget+"']").style.top = _top + "px";


    };
    this.on_mouseup = function (e) {
        that.fontStyles.map(function(obj, index) {
            let el = document.querySelector(".editor-element[data-action='" + obj.action + "']");
            if(obj.dropdown){
                obj.dropdown.forEach(function (dropdownItems) {
                    for(let dropdownItem in dropdownItems){
                        if(document.queryCommandState(dropdownItem)){
                            el.innerHTML = dropdownItems[dropdownItem];
                        }
                    }
                });
            }
            else {
                if (el) {
                    if (document.queryCommandState(obj.action) && !el.classList.contains("active"))
                        el.classList.add("active");
                    else if (!document.queryCommandState(obj.action) && el.classList.contains("active"))
                        el.classList.remove("active");
                }
            }
        });
    };
    this.focusEnd = function(el) {
        el.focus();
        let span = document.createElement("span");
        span.setAttribute("id", "temp_span_editor");
        let tmp = el.appendChild(span),
            node = document.getElementById("temp_span_editor"),
            range = null,
            sel = null;

        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
        tmp.remove();
        return this;
    };
    this.saveRangePosition = function(bE){
        function getNodeIndex(n){var i=0;while(n=n.previousSibling)i++;return i}
        bE.focus();
        if(bE === document.activeElement) {
            var range = window.getSelection().getRangeAt(0);
            var sC = range.startContainer, eC = range.endContainer;

            A = [];
            while (sC !== bE) {
                A.push(getNodeIndex(sC));
                sC = sC.parentNode
            }
            B = [];
            while (eC !== bE) {
                B.push(getNodeIndex(eC));
                eC = eC.parentNode
            }

            return {"sC": A, "sO": range.startOffset, "eC": B, "eO": range.endOffset};
        }
        else return false
    };
    this.restoreRangePosition = function(rp, bE){
        bE.focus();
        var sel=window.getSelection(),range=sel.getRangeAt(0);
        var x,C,sC=bE,eC=bE;
        C=rp.sC;x=C.length;while(x--)sC=sC.childNodes[C[x]];
        C=rp.eC;x=C.length;while(x--)eC=eC.childNodes[C[x]];

        range.setStart(sC,rp.sO);
        range.setEnd(eC,rp.eO);
        sel.removeAllRanges();
        sel.addRange(range)
    };
    this.focus = function (e) {
        let el = this;
        if(el.getAttribute("contenteditable")=="true") {
            that.activeTarget = el.getAttribute("target-id");
            that.editor.setAttribute("editor-id", that.activeTarget);
            that.setEditorPosition(el);
            if (that.iconSelect)
                that.iconSelect.updatePos();
        }
    };
    Object.assign(this.options, options);
    let fontSize = [];
    this.options.fontSize.map(function(item) {
        let obj = {};
        obj[item]=item;
        fontSize.push(obj);
    });
    this.options.fontSize = fontSize;
    this.fontStyles = [
        {action: "bold", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />\n' +
                '</svg>', title: "Bold"},
        {action: "italic", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />\n' +
                '</svg>', title: "Italic"},
        {action: "underline", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z" />\n' +
                '</svg>', title: "Underline"},
        {action: "strikeThrough", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M23,12V14H18.61C19.61,16.14 19.56,22 12.38,22C4.05,22.05 4.37,15.5 4.37,15.5L8.34,15.55C8.37,18.92 11.5,18.92 12.12,18.88C12.76,18.83 15.15,18.84 15.34,16.5C15.42,15.41 14.32,14.58 13.12,14H1V12H23M19.41,7.89L15.43,7.86C15.43,7.86 15.6,5.09 12.15,5.08C8.7,5.06 9,7.28 9,7.56C9.04,7.84 9.34,9.22 12,9.88H5.71C5.71,9.88 2.22,3.15 10.74,2C19.45,0.8 19.43,7.91 19.41,7.89Z" />\n' +
                '</svg>', title: "Strike Through"},
        {action: "subscript", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,21.03H16.97V20.03L17.86,19.23C18.62,18.58 19.18,18.04 19.56,17.6C19.93,17.16 20.12,16.75 20.13,16.36C20.14,16.08 20.05,15.85 19.86,15.66C19.68,15.5 19.39,15.38 19,15.38C18.69,15.38 18.42,15.44 18.16,15.56L17.5,15.94L17.05,14.77C17.32,14.56 17.64,14.38 18.03,14.24C18.42,14.1 18.85,14 19.32,14C20.1,14.04 20.7,14.25 21.1,14.66C21.5,15.07 21.72,15.59 21.72,16.23C21.71,16.79 21.53,17.31 21.18,17.78C20.84,18.25 20.42,18.7 19.91,19.14L19.27,19.66V19.68H21.85V21.03Z" />\n' +
                '</svg>', title: "Subscript"},
        {action: "superscript", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" />\n' +
                '</svg>', title: "Superscript"},
        {action: "seperator"},
        {action: "fontSize", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="'+this.options.iconColor+'" d="M3,12H6V19H9V12H12V9H3M9,4V7H14V19H17V7H22V4H9Z" />\n' +
                '</svg>', title: "Font Size", dropdown: this.options.fontSize},
        {action: "fontName", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '"  d="M9.6,14L12,7.7L14.4,14M11,5L5.5,19H7.7L8.8,16H15L16.1,19H18.3L13,5H11Z" />\n' +
                '</svg>', title: "Font Family", dropdown: this.options.fontFamily},
        {action: "formatBlock", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="'+this.options.iconColor+'" d="M10,11A4,4 0 0,1 6,7A4,4 0 0,1 10,3H18V5H16V21H14V5H12V21H10V11Z" />\n' +
                '</svg>', title: "Format Block", dropdown: [
                {h1: "h1"},
                {h2: "h2"},
                {h3: "h3"},
                {h4: "h4"},
                {h5: "h5"},
                {h6: "h6"},
                {div: "div"},
                {p: "p"},
                {pre: "pre"}
            ]},
        {action: "seperator"},
        {action: "outdent", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '"  d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M3,21H21V19H3M3,12L7,16V8M11,17H21V15H11V17Z" />\n' +
                '</svg>', title: "Outdent"},
        {action: "indent", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '"  d="M11,13H21V11H11M11,9H21V7H11M3,3V5H21V3M11,17H21V15H11M3,8V16L7,12M3,21H21V19H3V21Z" />\n' +
                '</svg>', title: "Indent"},
        {action: "align", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" />\n' +
                '</svg>', title: "Align", dropdown: [
                {justifyCenter: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                        '    <path fill="' + this.options.iconColor + '" d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z" />\n' +
                        '</svg>'},
                {justifyFull: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                        '    <path fill="' + this.options.iconColor + '" d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" />\n' +
                        '</svg>'},
                {justifyLeft: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                        '    <path fill="' + this.options.iconColor + '" d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" />\n' +
                        '</svg>'},
                {justifyRight: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                        '    <path fill="' + this.options.iconColor + '" d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z" />\n' +
                        '</svg>'}
            ]},
        {action: "seperator"},
        {action: "insertLink", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '"  d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />\n' +
                '</svg>', title: "Insert Link", popup: [
                {type: "text", placeholder: "Link", value: "https://", name: "url", title: "URL"},
                {type: "text", placeholder: "Title", value: "", name: "title", title: "Title"},
                {type: "text", placeholder: "Text", value: "", name: "text", title: "Text"},
                {type: "select", options:[
                        {value: "_blank", text: "blank"},
                        {value: "_self", text: "self"}
                    ], value: "", name: "target", title: "Target"},
                {type: "button", value: "submit", event: (e)=> {
                        document.querySelector(".insertLink-popup").style.display = "none";
                        that.restoreRangePosition(that.rp, document.querySelector("[target-id='"+that.activeTarget+"']"));
                        let url = document.querySelector("input[name='url']").value;
                        let title = document.querySelector("input[name='title']").value;
                        let textValue = document.querySelector("input[name='text']").value;
                        let target = document.querySelector("select").value;
                        let text = textValue ? textValue : url,html;
                        that.replaceSelectionWithHtml('<a href="' + url + '" target="' + target + '" title="'+title+'">' + text.toString() + '</a>');
                    }
                }
            ]},
        {action: "orderedList", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" />\n' +
                '</svg>', title: "Ordered List", dropdown: [
                {default: 'default'},
                {lowerAlpha: 'lowerAlpha'},
                {lowerGreek: 'lowerGreek'},
                {lowerRoman: 'lowerRoman'},
                {upperAlpha: 'upperAlpha'},
                {upperRoman: 'upperRoman'},
                {lowerLatin: 'lowerLatin'},
                {upperLatin: 'upperLatin'}
            ]},
        {action: "unorderedList", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />\n' +
                '</svg>', title: "Unordered List", dropdown: [
                {default: 'default'},
                {lowerAlpha: 'circle'},
                {lowerGreek: 'disk'},
                {lowerRoman: 'square'}
            ]},
        {action: "seperator"},
        {action: "insertHr", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M19,13H5V11H19V13Z" />\n' +
                '</svg>', title: "Horizontal line"},
        {action: "insertHtml", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z" />\n' +
                '</svg>', title: "Insert HTML", popup: [
                {type: "text", placeholder: "<span>some text</span>", title: "HTML", value: "", name: "html"},
                {type: "button", value: "submit", event: (e)=> {
                        document.querySelector(".insertHtml-popup").style.display = "none";
                        that.restoreRangePosition(that.rp, document.querySelector("[target-id='"+that.activeTarget+"']"));
                        that.replaceSelectionWithHtml(document.querySelector("input[name='html']").value);
                    }
                }
            ]},
        {action: "seperator"},
        {action: "faIcon", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M6,3A2.5,2.5 0 0,1 8.5,5.5C8.5,6.53 7.88,7.41 7,7.79V8.66C8.11,8.36 9.72,8 11,8C12.15,8 12.89,8.22 13.54,8.42C14.13,8.6 14.65,8.75 15.5,8.75C17.13,8.75 18.4,8.18 18.54,8.11C18.68,8.04 18.84,8 19,8A1,1 0 0,1 20,9V17C20,17.38 19.79,17.72 19.45,17.89C19.38,17.93 17.71,18.75 15.5,18.75C14.39,18.75 13.45,18.55 12.54,18.35C11.69,18.17 10.89,18 10,18C8.85,18 7.67,18.39 7,18.66V22H5V7.79C4.12,7.41 3.5,6.53 3.5,5.5A2.5,2.5 0 0,1 6,3Z" />\n' +
                '</svg>', title: "Insert font awesome icon"},
        {action: "insertTable", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M18,14H20V17H23V19H20V22H18V19H15V17H18V14M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" />\n' +
                '</svg>', title: "Insert table"},
    ];
    this.activeTarget = false;
    that.editor = this.create_editor();
    that.reInit_items();
    document.addEventListener("mouseup", function (e) {
        let hideEditor = that.getParents(e.target, ".editor, .editor-dropdown, .editor-popup,[target-id = '"+that.activeTarget+"']").length===0;
        if(e.target.getAttribute("[target-id]") && e.target.getAttribute("[target-id]") === that.activeTarget)
            hideEditor = false;
        for(let c of ["editor", "editor-dropdown", "editor-popup"]){
            if(e.target.classList.contains(c))
                hideEditor = false
        }
        if(hideEditor && that.activeTarget) {
            that.hide(
                document.querySelector("[editor-id = '" + that.activeTarget + "']"),
                document.querySelector("[target-id = '" + that.activeTarget + "']")
            );
            that.activeTarget = false;
        }
    });
    document.addEventListener("scroll", function (e) {
        if(that.activeTarget){
            that.setEditorPosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
        }
    });
}
TextEditor.prototype = {
    reInit_items: function(){
        const that = this;
        this.targets = document.querySelectorAll(this.selector);
        for(let el of that.targets){
            let id = that.uuid();
            if(!el.getAttribute("target-id"))
                el.setAttribute("target-id", id);
            el.removeEventListener("focusin", that.focus);
            el.removeEventListener("focus", that.focus);
            el.addEventListener("focusin", that.focus);
            el.addEventListener("focus", that.focus);
        }
    },
    create_editor: function (id) {
        const that = this;
        let editor = document.createElement("div");
        editor.style.position = "fixed";
        editor.setAttribute("class", "editor");
        editor.style.background = this.options.editorBgColor;
        editor.style.display = "none";
        editor.style.flexWrap = "wrap";
        editor.style.zIndex = 50;
        document.body.appendChild(editor);
        this.fontStyles.map(function(obj, index) {
            if(obj.action === "seperator")
                editor.appendChild(that.create_seperator());
            else
                editor.appendChild(that.create_icon(obj, editor))
        });
        /** editor styles **/
        {
            let style = document.createElement("style");
            style.setAttribute("class", "text-editor-styles");
            style.innerHTML = "" +
                ".editor-element.active path{" +
                "fill: "+ that.options.activeIconColor +";"+
                "}";
            document.head.appendChild(style);
        }
        document.addEventListener("mouseup", function (e) {
            if(!that.getClosest(e.target, ".editor-dropdown"))
                for(let el of document.querySelectorAll(".editor-dropdown"))
                    el.style.display = "none";
            if(!that.getClosest(e.target, ".editor-popup"))
                for(let el of document.querySelectorAll(".editor-popup"))
                    el.style.display = "none";
        });
        // editor.setAttribute("editor-id", id);
        return editor
    },
    create_seperator: function(){
        let seperator = document.createElement("div");
        seperator.style.height = "20px";
        seperator.style.width = "1px";
        seperator.style.margin = "2px";
        seperator.style.backgroundColor = "#ebebeb";
        return seperator
    },
    create_icon: function (obj,editor) {
        const that = this;
        let action = obj.action;
        let icon = obj.icon;
        let title = obj.title;
        let a = document.createElement("button");
        a.setAttribute("data-action", action);
        a.setAttribute("class", "editor-element w-dropdown");
        a.setAttribute("tooltip", title);
        a.setAttribute("tooltip-position", "bottom");
        a.innerHTML = icon;
        if(obj.dropdown){
            that.create_dropdown(obj.dropdown, action, a, editor);
        }
        else if(obj.popup){
            that.create_popup(obj.popup, action, a, editor);
        }
        else if(obj.action === "insertTable"){
            that.create_tablePopup(a, editor);
        }
        else if(obj.action === "faIcon") {
            that.iconSelect = new IconSelect(a,{
                onSelect: function (iconElement, fa_class) {
                    let disp = document.querySelector(".icon-select").style.display;
                    document.querySelector(".icon-select").style.display = disp === "flex" ? "none" : "flex";
                    that.restoreRangePosition(that.rp, document.querySelector("[target-id='"+that.activeTarget+"']"));
                    that.replaceSelectionWithHtml(iconElement);
                    that.on_keyup();
                    that.focusEnd(document.querySelector("[target-id='"+that.activeTarget+"']"));
                }
            });
            that.iconSelect.setIcons(icons);
            document.querySelector(".icon-select").classList.add("editor-popup");
            document.querySelector(".icon-select").style.display = "none";
            a.addEventListener("click", function (e) {
                let disp = document.querySelector(".icon-select").style.display;
                document.querySelector(".icon-select").style.display = disp === "flex" ? "none" : "flex";
                that.rp=that.saveRangePosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
            })
        }
        else{
            a.addEventListener("click", function (e) {
                e.preventDefault();
                if(action === "insertHr"){
                    that.replaceSelectionWithHtml("<hr>");
                    that.on_keyup();
                    that.focusEnd(document.querySelector("[target-id = '"+that.activeTarget+"']"));
                }
                else{
                    let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
                    if(that.getActiveDiv() === target) {
                        document.execCommand(action, false );
                        if(document.queryCommandState(action) && !this.classList.contains("active"))
                            this.classList.add("active");
                        else if(!document.queryCommandState(action) && this.classList.contains("active"))
                            this.classList.remove("active");
                        if(!window.getSelection().toString().length)
                            target.focus();
                    }
                }
            });
        }
        return a
    },
    create_dropdown: function (dropdownItems, action, a, editor) {
        const that = this;
        let dropdown = document.createElement("div");
        dropdown.style.display = "none";
        dropdown.setAttribute("class", "editor-dropdown "+action+"-dropdown");
        document.body.appendChild(dropdown);
        let dropdownList = document.createElement("ul");
        dropdown.appendChild(dropdownList);
        dropdownItems.forEach(function (listItem) {
            for(let key in listItem){
                let dropdownItem = document.createElement("li");
                dropdownList.appendChild(dropdownItem);
                let item = document.createElement("button");
                let itemText = document.createElement((action==="formatBlock") ? key : "span");
                itemText.innerHTML = listItem[key];
                itemText.setAttribute("tooltip", key);
                itemText.setAttribute("tooltip-position", "left");
                item.appendChild(itemText);
                dropdownItem.appendChild(item);
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
                    dropdown.style.display = "none";
                    if(that.getActiveDiv() === target) {
                        if(action==="fontSize") {
                            // that.execFontSize(key, "px", target);
                            that.replaceSelectionWithHtml("<span id='inserted_span' style='font-size: "+key+"px'>"+window.getSelection().toString()+"&nbsp;</span>");
                            target.removeAll("span:empty:not(#inserted_span)");
                            that.focusEnd(document.getElementById("inserted_span"));
                            document.getElementById("inserted_span").removeAttribute("id");
                        }
                        else if(action==="orderedList") {
                            that.replaceSelectionWithHtml("<ol id='inserted_list' class='editor_ordered_list_"+key+"'><li>&nbsp;</li></ol>");
                            target.removeAll("span:empty:not(#inserted_list)");
                            that.focusEnd(document.getElementById("inserted_list").querySelector("li"));
                            document.getElementById("inserted_list").removeAttribute("id");
                        }
                        else if(action==="unorderedList") {
                            that.replaceSelectionWithHtml("<ul id='inserted_list' class='editor_unordered_list_"+key+"'><li>&nbsp;</li></ul>");
                            target.removeAll("span:empty:not(#inserted_list)");
                            that.focusEnd(document.getElementById("inserted_list").querySelector("li"));
                            document.getElementById("inserted_list").removeAttribute("id");
                        }
                        else if(action==="align") {
                            document.execCommand(key, false);
                            a.innerHTML = listItem[key];
                        }
                        else
                            document.execCommand(action, false, key);
                        that.on_keyup(e);
                        dropdown.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
                    }
                });

            }
        });
        a.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
            for(let el of document.querySelectorAll(".editor-dropdown"))
                el.style.display= "none";
            dropdown.style.display = dropdown.style.display ==="block" ? "none" : "block";
            that.setPopupPosition({x: a.getBoundingClientRect().left, y: a.getBoundingClientRect().top+a.getBoundingClientRect().height}, dropdown);
            if(!window.getSelection().toString().length)
                target.focus();
        });
        return a
    },
    create_input: function(obj){
        let div = document.createElement("div");
        if(obj.type === "button") {
            let button = document.createElement("button");
            button.textContent = obj.value;
            button.addEventListener("click", obj.event);
            div.appendChild(button);
        }
        else if(obj.type === "select") {
            let select = document.createElement("select");
            for(let opt of obj.options){
                let option = document.createElement("option");
                option.textContent = opt.text;
                option.setAttribute("value", opt.value);
                select.appendChild(option);
            }
            let label = document.createElement("label");
            label.textContent = obj.title;
            div.appendChild(label);
            div.appendChild(select);
        }
        else {
            let input = document.createElement("input");
            input.setAttribute("type", obj.type);
            input.setAttribute("value", obj.value);
            input.setAttribute("name", obj.name);
            input.setAttribute("placeholder", obj.placeholder);
            input.setAttribute("class", "tesodev-control");
            input.setAttribute("required", "required");
            let label = document.createElement("label");
            label.textContent = obj.title;
            div.appendChild(label);
            div.appendChild(input);
        }
        return div
    },
    create_popup: function (inputs, action, a, editor) {
        const that = this;
        let popup = document.createElement("div");
        popup.style.display = "none";
        popup.setAttribute("class", "editor-popup "+action+"-popup");
        document.body.appendChild(popup);

        inputs.forEach(function (obj) {
            popup.appendChild(that.create_input(obj));
        });
        a.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
            for(let el of document.querySelectorAll(".editor-popup"))
                el.style.display= "none";
            popup.style.display = popup.style.display ==="flex" ? "none" : "flex";
            that.setPopupPosition({x: a.getBoundingClientRect().left, y: a.getBoundingClientRect().top+a.getBoundingClientRect().height}, popup);
            if(!window.getSelection().toString().length)
                target.focus();
            that.rp = that.saveRangePosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
            if (window.getSelection) {
                document.querySelector(".insertLink-popup input[name='text']").value=window.getSelection().toString();
            }
        });
        return a
    },
    create_tablePopup: function (a, editor) {
        const that = this;
        let popup = document.createElement("div");
        popup.style.display = "none";
        popup.setAttribute("class", "editor-popup insertTable-popup");
        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.flexWrap = "wrap";
        div.style.flexDirection = "row";
        div.style.backgroundColor = "#ffffff";
        let table_counts = document.createElement("div");
        table_counts.style.width = "100%";
        table_counts.innerHTML = "1 x 1";
        div.appendChild(table_counts);
        for(let r=0; r<10; r++){
            for(let c=0; c<10; c++){
                let cellParent = document.createElement("div");
                cellParent.style.height = "12px";
                cellParent.style.width = "12px";
                cellParent.style.margin = "2px";
                cellParent.classList.add("table_cell");
                let cell = document.createElement("div");
                cell.style.border = "1px solid rgba(0,0,0,0.14)";
                cell.style.height = "10px";
                cell.style.width = "10px";
                cell.classList.add("table_cell");
                cell.setAttribute("table-col", c);
                cell.setAttribute("table-row", r);
                cell.addEventListener("mouseover",function () {
                    for(let c of div.querySelectorAll(".table_cell"))
                        c.classList.remove("hover");
                    let c = this.getAttribute("table-col");
                    let r = this.getAttribute("table-row");
                    table_counts.innerHTML = (parseInt(r)+1) + " x " + (parseInt(c)+1);
                    for(let r_=0; r_<=r; r_++) {
                        for (let c_ = 0; c_ <= c; c_++) {
                            div.querySelector(".table_cell[table-col='" + c_ + "'][table-row='" + r_ + "']").classList.add("hover");
                        }
                    }

                });
                cell.addEventListener("click",function () {
                    that.restoreRangePosition(that.rp, document.querySelector("[target-id='"+that.activeTarget+"']"));
                    let c = this.getAttribute("table-col");
                    let r = this.getAttribute("table-row");
                    let table = document.createElement("table");
                    for(let _r=0; _r<=r; _r++) {
                        let tr = document.createElement("tr");
                        table.appendChild(tr);
                        for (let _c = 0; _c <= c; _c++) {
                            let td = document.createElement("td");
                            tr.appendChild(td);
                        }
                    }
                    that.replaceSelectionWithHtml(table.outerHTML);
                    popup.style.display = "none";
                    that.on_keyup();
                    var tdElm;
                    var startOffset;

                    Array.prototype.forEach.call(
                        document.querySelectorAll("table td"),
                        function (td) {
                            td.addEventListener("mousedown", function (e) {
                                let mouseX = e.pageX - td.getBoundingClientRect().left;
                                if(td.getBoundingClientRect().width - mouseX < 5) {
                                    tdElm = td;
                                    startOffset = td.getBoundingClientRect().width - e.pageX;
                                    td.style.cursor = "col-resize";
                                }
                            });
                            td.addEventListener("mousemove", function (e) {
                                let mouseX = e.pageX - td.getBoundingClientRect().left;
                                if(td.getBoundingClientRect().width - mouseX < 5) {
                                    td.style.cursor = "col-resize";
                                }
                                else{
                                    td.style.cursor = "auto";
                                }
                            });
                        }
                    );

                    document.addEventListener('mousemove', function (e) {
                        if (tdElm) {
                            tdElm.style.cursor = "col-resize";
                            tdElm.style.width = startOffset + e.pageX + 'px';
                        }
                    });

                    document.addEventListener('mouseup', function () {
                        if (tdElm) {
                            tdElm.style.cursor = "auto";
                            tdElm = undefined;
                        }
                    });
                    that.focusEnd(document.querySelector("[target-id='"+that.activeTarget+"'] table"));
                });
                cellParent.appendChild(cell);
                div.appendChild(cellParent);
            }
        }
        popup.appendChild(div);
        document.body.appendChild(popup);
        div.querySelector(".table_cell[table-col='0'][table-row='0']").classList.add("hover");

        a.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
            for(let el of document.querySelectorAll(".editor-popup"))
                el.style.display= "none";
            popup.style.display = popup.style.display ==="flex" ? "none" : "flex";
            popup.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            popup.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                target.focus();
            that.rp = that.saveRangePosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
            if (window.getSelection) {
                document.querySelector(".insertLink-popup input[name='text']").value=window.getSelection().toString();
            }
        });
        return a
    },
    show: function (target) {
        target.trigger("focus");
        this.focusEnd(target);
    },
    hide: function (editor, target) {
        const that = this;
        editor.style.display = "none";
        target.removeEventListener("keydown", that.on_keyup);
        target.removeEventListener("keyup", that.on_keyup);
        target.removeEventListener("mouseup", that.on_mouseup);
        if(that.options.onHide)
            that.options.onHide(target);
    },
    setEditorPosition: function(target){
        const that = this;
        that.editor.style.display = "flex";
        that.editor.style.borderBottom = "";
        that.editor.style.borderTop = "";
        let top = 0;
        if(target.getBoundingClientRect().top>window.innerHeight/2) {
            top = target.getBoundingClientRect().top - that.editor.getBoundingClientRect().height;
            that.editor.style.borderBottom = "3px solid #4d5659";
        }
        else{
            top = target.getBoundingClientRect().bottom;
            that.editor.style.borderTop = "3px solid #4d5659";
        }
        that.editor.style.width = target.getBoundingClientRect().width + "px";
        that.editor.style.left = target.getBoundingClientRect().left + "px";
        that.editor.style.top = top + "px";

        target.addEventListener("keydown", that.on_keyup);
        target.addEventListener("keyup", that.on_keyup);
        target.addEventListener("mouseup", that.on_mouseup);
    },
    setPopupPosition: function(pos, popup){
        var windowHeight = window.innerHeight/2;
        var windowWidth = window.innerWidth/2;
        if(pos.y > windowHeight && pos.x <= windowWidth) {
            popup.style.left = pos.x+"px";
            popup.style.bottom = ((windowHeight*2)-pos.y)+"px";
            popup.style.right = "auto";
            popup.style.top = "auto";
        } else if(pos.y > windowHeight && pos.x > windowWidth) {
            popup.style.right =((windowWidth*2)-pos.x)+"px";
            popup.style.bottom =((windowHeight*2)-pos.y)+"px";
            popup.style.left = "auto";
            popup.style.top = "auto";
        } else if(pos.y <= windowHeight && pos.x <= windowWidth) {
            popup.style.left = pos.x+"px";
            popup.style.top = pos.y+"px";
            popup.style.right = "auto";
            popup.style.bottom = "auto";
        } else {
            popup.style.right = ((windowWidth*2)-pos.x)+"px";
            popup.style.top = pos.y+"px";
            popup.style.left = "auto";
            popup.style.bottom = "auto";
        }
    },
    destroy: function () {
        for(let el of document.querySelectorAll(".editor-dropdown, .editor-popup, .editor"))
            el.remove();
    }
};