function TextEditor(selector, options) {
    const that = this;
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
    this.saveSelection = function() {
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                return sel.getRangeAt(0);
            }
        } else if (document.selection && document.selection.createRange) {
            return document.selection.createRange();
        }
        return null;
    };
    this.restoreSelection = function(range) {
        if (range) {
            if (window.getSelection) {
                sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (document.selection && range.select) {
                range.select();
            }
        }
    };
    this.saveRangePosition = function(bE){
        function getNodeIndex(n){var i=0;while(n=n.previousSibling)i++;return i}
        var range=window.getSelection().getRangeAt(0);
        var sC=range.startContainer,eC=range.endContainer;

        A=[];while(sC!==bE){A.push(getNodeIndex(sC));sC=sC.parentNode}
        B=[];while(eC!==bE){B.push(getNodeIndex(eC));eC=eC.parentNode}

        return {"sC":A,"sO":range.startOffset,"eC":B,"eO":range.endOffset};
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
                '</svg>', title: "strikeThrough"},
        {action: "subscript", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,21.03H16.97V20.03L17.86,19.23C18.62,18.58 19.18,18.04 19.56,17.6C19.93,17.16 20.12,16.75 20.13,16.36C20.14,16.08 20.05,15.85 19.86,15.66C19.68,15.5 19.39,15.38 19,15.38C18.69,15.38 18.42,15.44 18.16,15.56L17.5,15.94L17.05,14.77C17.32,14.56 17.64,14.38 18.03,14.24C18.42,14.1 18.85,14 19.32,14C20.1,14.04 20.7,14.25 21.1,14.66C21.5,15.07 21.72,15.59 21.72,16.23C21.71,16.79 21.53,17.31 21.18,17.78C20.84,18.25 20.42,18.7 19.91,19.14L19.27,19.66V19.68H21.85V21.03Z" />\n' +
                '</svg>', title: "subscript"},
        {action: "superscript", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M16,7.41L11.41,12L16,16.59L14.59,18L10,13.41L5.41,18L4,16.59L8.59,12L4,7.41L5.41,6L10,10.59L14.59,6L16,7.41M21.85,9H16.97V8L17.86,7.18C18.62,6.54 19.18,6 19.56,5.55C19.93,5.11 20.12,4.7 20.13,4.32C20.14,4.04 20.05,3.8 19.86,3.62C19.68,3.43 19.39,3.34 19,3.33C18.69,3.34 18.42,3.4 18.16,3.5L17.5,3.89L17.05,2.72C17.32,2.5 17.64,2.33 18.03,2.19C18.42,2.05 18.85,2 19.32,2C20.1,2 20.7,2.2 21.1,2.61C21.5,3 21.72,3.54 21.72,4.18C21.71,4.74 21.53,5.26 21.18,5.73C20.84,6.21 20.42,6.66 19.91,7.09L19.27,7.61V7.63H21.85V9Z" />\n' +
                '</svg>', title: "superscript"},
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
                {type: "text", placeholder: "Link", value: "https://", name: "url", title: "url"},
                {type: "text", placeholder: "Title", value: "", name: "title", title: "Title"},
                {type: "text", placeholder: "Text", value: "", name: "text", title: "Text"},
                {type: "select", options:[
                    {value: "_blank", text: "blank"},
                    {value: "_self", text: "self"}
                    ]},
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
                '</svg>', title: "Insert font-awesome-icon"},
        {action: "insertTable", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
                '    <path fill="' + this.options.iconColor + '" d="M18,14H20V17H23V19H20V22H18V19H15V17H18V14M4,3H18A2,2 0 0,1 20,5V12.08C18.45,11.82 16.92,12.18 15.68,13H12V17H13.08C12.97,17.68 12.97,18.35 13.08,19H4A2,2 0 0,1 2,17V5A2,2 0 0,1 4,3M4,7V11H10V7H4M12,7V11H18V7H12M4,13V17H10V13H4Z" />\n' +
                '</svg>', title: "Insert font-awesome-icon"},
    ];
    this.activeTarget = false;
    that.editor = this.create_editor();
    for(let el of that.targets){
        let id = that.uuid();
        el.setAttribute("target-id", id);
        el.addEventListener("focus", function (e) {
            that.activeTarget = el.getAttribute("target-id");
            that.editor.setAttribute("editor-id", that.activeTarget);
            that.show(that.editor, el);
            if(that.iconSelect)
                that.iconSelect.updatePos();
        });
    }
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
    Element.prototype.removeAll = function (selector) {
        for(let el of this.querySelectorAll(selector))
            el.remove();
    };
}
TextEditor.prototype = {
    create_editor: function (id) {
        const that = this;
        let editor = document.createElement("div");
        editor.style.position = "fixed";
        editor.setAttribute("class", "editor");
        editor.style.background = this.options.editorBgColor;
        editor.style.display = "none";
        editor.style.flexWrap = "wrap";
        editor.style.zIndex = 50;
        editor.style.border = "1px solid #495057";
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
        a.setAttribute("data-content", title);
        a.innerHTML = icon;
        let tooltip = document.createElement("span");
        tooltip.textContent = title;
        a.appendChild(tooltip);
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
            let classes = [
                "fab fa-500px",
                "fab fa-accessible-icon",
                "fab fa-accusoft",
                "fas fa-address-book", "far fa-address-book",
                "fas fa-address-card", "far fa-address-card",
                "fas fa-adjust",
                "fab fa-adn",
                "fab fa-adversal",
                "fab fa-affiliatetheme",
                "fab fa-algolia",
                "fas fa-align-center",
                "fas fa-align-justify",
                "fas fa-align-left",
                "fas fa-align-right",
                "fab fa-amazon",
                "fas fa-ambulance",
                "fas fa-american-sign-language-interpreting",
                "fab fa-amilia",
                "fas fa-anchor",
                "fab fa-android",
                "fab fa-angellist",
                "fas fa-angle-double-down",
                "fas fa-angle-double-left",
                "fas fa-angle-double-right",
                "fas fa-angle-double-up",
                "fas fa-angle-down",
                "fas fa-angle-left",
                "fas fa-angle-right",
                "fas fa-angle-up",
                "fab fa-angrycreative",
                "fab fa-angular",
                "fab fa-app-store",
                "fab fa-app-store-ios",
                "fab fa-apper",
                "fab fa-apple",
                "fab fa-apple-pay",
                "fas fa-archive",
                "fas fa-arrow-alt-circle-down", "far fa-arrow-alt-circle-down",
                "fas fa-arrow-alt-circle-left", "far fa-arrow-alt-circle-left",
                "fas fa-arrow-alt-circle-right", "far fa-arrow-alt-circle-right",
                "fas fa-arrow-alt-circle-up", "far fa-arrow-alt-circle-up",
                "fas fa-arrow-circle-down",
                "fas fa-arrow-circle-left",
                "fas fa-arrow-circle-right",
                "fas fa-arrow-circle-up",
                "fas fa-arrow-down",
                "fas fa-arrow-left",
                "fas fa-arrow-right",
                "fas fa-arrow-up",
                "fas fa-arrows-alt",
                "fas fa-arrows-alt-h",
                "fas fa-arrows-alt-v",
                "fas fa-assistive-listening-systems",
                "fas fa-asterisk",
                "fab fa-asymmetrik",
                "fas fa-at",
                "fab fa-audible",
                "fas fa-audio-description",
                "fab fa-autoprefixer",
                "fab fa-avianex",
                "fab fa-aviato",
                "fab fa-aws",
                "fas fa-backward",
                "fas fa-balance-scale",
                "fas fa-ban",
                "fab fa-bandcamp",
                "fas fa-barcode",
                "fas fa-bars",
                "fas fa-bath",
                "fas fa-battery-empty",
                "fas fa-battery-full",
                "fas fa-battery-half",
                "fas fa-battery-quarter",
                "fas fa-battery-three-quarters",
                "fas fa-bed",
                "fas fa-beer",
                "fab fa-behance",
                "fab fa-behance-square",
                "fas fa-bell", "far fa-bell",
                "fas fa-bell-slash", "far fa-bell-slash",
                "fas fa-bicycle",
                "fab fa-bimobject",
                "fas fa-binoculars",
                "fas fa-birthday-cake",
                "fab fa-bitbucket",
                "fab fa-bitcoin",
                "fab fa-bity",
                "fab fa-black-tie",
                "fab fa-blackberry",
                "fas fa-blind",
                "fab fa-blogger",
                "fab fa-blogger-b",
                "fab fa-bluetooth",
                "fab fa-bluetooth-b",
                "fas fa-bold",
                "fas fa-bolt",
                "fas fa-bomb",
                "fas fa-book",
                "fas fa-bookmark", "far fa-bookmark",
                "fas fa-braille",
                "fas fa-briefcase",
                "fab fa-btc",
                "fas fa-bug",
                "fas fa-building", "far fa-building",
                "fas fa-bullhorn",
                "fas fa-bullseye",
                "fab fa-buromobelexperte",
                "fas fa-bus",
                "fab fa-buysellads",
                "fas fa-calculator",
                "fas fa-calendar", "far fa-calendar",
                "fas fa-calendar-alt", "far fa-calendar-alt",
                "fas fa-calendar-check", "far fa-calendar-check",
                "fas fa-calendar-minus", "far fa-calendar-minus",
                "fas fa-calendar-plus", "far fa-calendar-plus",
                "fas fa-calendar-times", "far fa-calendar-times",
                "fas fa-camera",
                "fas fa-camera-retro",
                "fas fa-car",
                "fas fa-caret-down",
                "fas fa-caret-left",
                "fas fa-caret-right",
                "fas fa-caret-square-down", "far fa-caret-square-down",
                "fas fa-caret-square-left", "far fa-caret-square-left",
                "fas fa-caret-square-right", "far fa-caret-square-right",
                "fas fa-caret-square-up", "far fa-caret-square-up",
                "fas fa-caret-up",
                "fas fa-cart-arrow-down",
                "fas fa-cart-plus",
                "fab fa-cc-amex",
                "fab fa-cc-apple-pay",
                "fab fa-cc-diners-club",
                "fab fa-cc-discover",
                "fab fa-cc-jcb",
                "fab fa-cc-mastercard",
                "fab fa-cc-paypal",
                "fab fa-cc-stripe",
                "fab fa-cc-visa",
                "fab fa-centercode",
                "fas fa-certificate",
                "fas fa-chart-area",
                "fas fa-chart-bar", "far fa-chart-bar",
                "fas fa-chart-line",
                "fas fa-chart-pie",
                "fas fa-check",
                "fas fa-check-circle", "far fa-check-circle",
                "fas fa-check-square", "far fa-check-square",
                "fas fa-chevron-circle-down",
                "fas fa-chevron-circle-left",
                "fas fa-chevron-circle-right",
                "fas fa-chevron-circle-up",
                "fas fa-chevron-down",
                "fas fa-chevron-left",
                "fas fa-chevron-right",
                "fas fa-chevron-up",
                "fas fa-child",
                "fab fa-chrome",
                "fas fa-circle", "far fa-circle",
                "fas fa-circle-notch",
                "fas fa-clipboard", "far fa-clipboard",
                "fas fa-clock", "far fa-clock",
                "fas fa-clone", "far fa-clone",
                "fas fa-closed-captioning", "far fa-closed-captioning",
                "fas fa-cloud",
                "fas fa-cloud-download-alt",
                "fas fa-cloud-upload-alt",
                "fab fa-cloudscale",
                "fab fa-cloudsmith",
                "fab fa-cloudversify",
                "fas fa-code",
                "fas fa-code-branch",
                "fab fa-codepen",
                "fab fa-codiepie",
                "fas fa-coffee",
                "fas fa-cog",
                "fas fa-cogs",
                "fas fa-columns",
                "fas fa-comment", "far fa-comment",
                "fas fa-comment-alt", "far fa-comment-alt",
                "fas fa-comments", "far fa-comments",
                "fas fa-compass", "far fa-compass",
                "fas fa-compress",
                "fab fa-connectdevelop",
                "fab fa-contao",
                "fas fa-copy", "far fa-copy",
                "fas fa-copyright", "far fa-copyright",
                "fab fa-cpanel",
                "fab fa-creative-commons",
                "fas fa-credit-card", "far fa-credit-card",
                "fas fa-crop",
                "fas fa-crosshairs",
                "fab fa-css3",
                "fab fa-css3-alt",
                "fas fa-cube",
                "fas fa-cubes",
                "fas fa-cut",
                "fab fa-cuttlefish",
                "fab fa-d-and-d",
                "fab fa-dashcube",
                "fas fa-database",
                "fas fa-deaf",
                "fab fa-delicious",
                "fab fa-deploydog",
                "fab fa-deskpro",
                "fas fa-desktop",
                "fab fa-deviantart",
                "fab fa-digg",
                "fab fa-digital-ocean",
                "fab fa-discord",
                "fab fa-discourse",
                "fab fa-dochub",
                "fab fa-docker",
                "fas fa-dollar-sign",
                "fas fa-dot-circle", "far fa-dot-circle",
                "fas fa-download",
                "fab fa-draft2digital",
                "fab fa-dribbble",
                "fab fa-dribbble-square",
                "fab fa-dropbox",
                "fab fa-drupal",
                "fab fa-dyalog",
                "fab fa-earlybirds",
                "fab fa-edge",
                "fas fa-edit", "far fa-edit",
                "fas fa-eject",
                "fas fa-ellipsis-h",
                "fas fa-ellipsis-v",
                "fab fa-ember",
                "fab fa-empire",
                "fas fa-envelope", "far fa-envelope",
                "fas fa-envelope-open", "far fa-envelope-open",
                "fas fa-envelope-square",
                "fab fa-envira",
                "fas fa-eraser",
                "fab fa-erlang",
                "fab fa-etsy",
                "fas fa-euro-sign",
                "fas fa-exchange-alt",
                "fas fa-exclamation",
                "fas fa-exclamation-circle",
                "fas fa-exclamation-triangle",
                "fas fa-expand",
                "fas fa-expand-arrows-alt",
                "fab fa-expeditedssl",
                "fas fa-external-link-alt",
                "fas fa-external-link-square-alt",
                "fas fa-eye",
                "fas fa-eye-dropper",
                "fas fa-eye-slash", "far fa-eye-slash",
                "fab fa-facebook",
                "fab fa-facebook-f",
                "fab fa-facebook-messenger",
                "fab fa-facebook-square",
                "fas fa-fast-backward",
                "fas fa-fast-forward",
                "fas fa-fax",
                "fas fa-female",
                "fas fa-fighter-jet",
                "fas fa-file", "far fa-file",
                "fas fa-file-alt", "far fa-file-alt",
                "fas fa-file-archive", "far fa-file-archive",
                "fas fa-file-audio", "far fa-file-audio",
                "fas fa-file-code", "far fa-file-code",
                "fas fa-file-excel", "far fa-file-excel",
                "fas fa-file-image", "far fa-file-image",
                "fas fa-file-pdf", "far fa-file-pdf",
                "fas fa-file-powerpoint", "far fa-file-powerpoint",
                "fas fa-file-video", "far fa-file-video",
                "fas fa-file-word", "far fa-file-word",
                "fas fa-film",
                "fas fa-filter",
                "fas fa-fire",
                "fas fa-fire-extinguisher",
                "fab fa-firefox",
                "fab fa-first-order",
                "fab fa-firstdraft",
                "fas fa-flag", "far fa-flag",
                "fas fa-flag-checkered",
                "fas fa-flask",
                "fab fa-flickr",
                "fab fa-fly",
                "fas fa-folder", "far fa-folder",
                "fas fa-folder-open", "far fa-folder-open",
                "fas fa-font",
                "fab fa-font-awesome",
                "fab fa-font-awesome-alt",
                "fab fa-font-awesome-flag",
                "fab fa-fonticons",
                "fab fa-fonticons-fi",
                "fab fa-fort-awesome",
                "fab fa-fort-awesome-alt",
                "fab fa-forumbee",
                "fas fa-forward",
                "fab fa-foursquare",
                "fab fa-free-code-camp",
                "fab fa-freebsd",
                "fas fa-frown", "far fa-frown",
                "fas fa-futbol", "far fa-futbol",
                "fas fa-gamepad",
                "fas fa-gavel",
                "fas fa-gem", "far fa-gem",
                "fas fa-genderless",
                "fab fa-get-pocket",
                "fab fa-gg",
                "fab fa-gg-circle",
                "fas fa-gift",
                "fab fa-git",
                "fab fa-git-square",
                "fab fa-github",
                "fab fa-github-alt",
                "fab fa-github-square",
                "fab fa-gitkraken",
                "fab fa-gitlab",
                "fab fa-gitter",
                "fas fa-glass-martini",
                "fab fa-glide",
                "fab fa-glide-g",
                "fas fa-globe",
                "fab fa-gofore",
                "fab fa-goodreads",
                "fab fa-goodreads-g",
                "fab fa-google",
                "fab fa-google-drive",
                "fab fa-google-play",
                "fab fa-google-plus",
                "fab fa-google-plus-g",
                "fab fa-google-plus-square",
                "fab fa-google-wallet",
                "fas fa-graduation-cap",
                "fab fa-gratipay",
                "fab fa-grav",
                "fab fa-gripfire",
                "fab fa-grunt",
                "fab fa-gulp",
                "fas fa-h-square",
                "fab fa-hacker-news",
                "fab fa-hacker-news-square",
                "fas fa-hand-lizard", "far fa-hand-lizard",
                "fas fa-hand-paper", "far fa-hand-paper",
                "fas fa-hand-peace", "far fa-hand-peace",
                "fas fa-hand-point-down", "far fa-hand-point-down",
                "fas fa-hand-point-left", "far fa-hand-point-left",
                "fas fa-hand-point-right", "far fa-hand-point-right",
                "fas fa-hand-point-up", "far fa-hand-point-up",
                "fas fa-hand-pointer", "far fa-hand-pointer",
                "fas fa-hand-rock", "far fa-hand-rock",
                "fas fa-hand-scissors", "far fa-hand-scissors",
                "fas fa-hand-spock", "far fa-hand-spock",
                "fas fa-handshake", "far fa-handshake",
                "fas fa-hashtag",
                "fas fa-hdd", "far fa-hdd",
                "fas fa-heading",
                "fas fa-headphones",
                "fas fa-heart", "far fa-heart",
                "fas fa-heartbeat",
                "fab fa-hire-a-helper",
                "fas fa-history",
                "fas fa-home",
                "fab fa-hooli",
                "fas fa-hospital", "far fa-hospital",
                "fab fa-hotjar",
                "fas fa-hourglass", "far fa-hourglass",
                "fas fa-hourglass-end",
                "fas fa-hourglass-half",
                "fas fa-hourglass-start",
                "fab fa-houzz",
                "fab fa-html5",
                "fab fa-hubspot",
                "fas fa-i-cursor",
                "fas fa-id-badge", "far fa-id-badge",
                "fas fa-id-card", "far fa-id-card",
                "fas fa-image", "far fa-image",
                "fas fa-images", "far fa-images",
                "fab fa-imdb",
                "fas fa-inbox",
                "fas fa-indent",
                "fas fa-industry",
                "fas fa-info",
                "fas fa-info-circle",
                "fab fa-instagram",
                "fab fa-internet-explorer",
                "fab fa-ioxhost",
                "fas fa-italic",
                "fab fa-itunes",
                "fab fa-itunes-note",
                "fab fa-jenkins",
                "fab fa-joget",
                "fab fa-joomla",
                "fab fa-js",
                "fab fa-js-square",
                "fab fa-jsfiddle",
                "fas fa-key",
                "fas fa-keyboard", "far fa-keyboard",
                "fab fa-keycdn",
                "fab fa-kickstarter",
                "fab fa-kickstarter-k",
                "fas fa-language",
                "fas fa-laptop",
                "fab fa-laravel",
                "fab fa-lastfm",
                "fab fa-lastfm-square",
                "fas fa-leaf",
                "fab fa-leanpub",
                "fas fa-lemon", "far fa-lemon",
                "fab fa-less",
                "fas fa-level-down-alt",
                "fas fa-level-up-alt",
                "fas fa-life-ring", "far fa-life-ring",
                "fas fa-lightbulb", "far fa-lightbulb",
                "fab fa-line",
                "fas fa-link",
                "fab fa-linkedin",
                "fab fa-linkedin-in",
                "fab fa-linode",
                "fab fa-linux",
                "fas fa-lira-sign",
                "fas fa-list",
                "fas fa-list-alt", "far fa-list-alt",
                "fas fa-list-ol",
                "fas fa-list-ul",
                "fas fa-location-arrow",
                "fas fa-lock",
                "fas fa-lock-open",
                "fas fa-long-arrow-alt-down",
                "fas fa-long-arrow-alt-left",
                "fas fa-long-arrow-alt-right",
                "fas fa-long-arrow-alt-up",
                "fas fa-low-vision",
                "fab fa-lyft",
                "fab fa-magento",
                "fas fa-magic",
                "fas fa-magnet",
                "fas fa-male",
                "fas fa-map", "far fa-map",
                "fas fa-map-marker",
                "fas fa-map-marker-alt",
                "fas fa-map-pin",
                "fas fa-map-signs",
                "fas fa-mars",
                "fas fa-mars-double",
                "fas fa-mars-stroke",
                "fas fa-mars-stroke-h",
                "fas fa-mars-stroke-v",
                "fab fa-maxcdn",
                "fab fa-medapps",
                "fab fa-medium",
                "fab fa-medium-m",
                "fas fa-medkit",
                "fab fa-medrt",
                "fab fa-meetup",
                "fas fa-meh", "far fa-meh",
                "fas fa-mercury",
                "fas fa-microchip",
                "fas fa-microphone",
                "fas fa-microphone-slash",
                "fab fa-microsoft",
                "fas fa-minus",
                "fas fa-minus-circle",
                "fas fa-minus-square", "far fa-minus-square",
                "fab fa-mix",
                "fab fa-mixcloud",
                "fab fa-mizuni",
                "fas fa-mobile",
                "fas fa-mobile-alt",
                "fab fa-modx",
                "fab fa-monero",
                "fas fa-money-bill-alt", "far fa-money-bill-alt",
                "fas fa-moon", "far fa-moon",
                "fas fa-motorcycle",
                "fas fa-mouse-pointer",
                "fas fa-music",
                "fab fa-napster",
                "fas fa-neuter",
                "fas fa-newspaper", "far fa-newspaper",
                "fab fa-nintendo-switch",
                "fab fa-node",
                "fab fa-node-js",
                "fab fa-npm",
                "fab fa-ns8",
                "fab fa-nutritionix",
                "fas fa-object-group", "far fa-object-group",
                "fas fa-object-ungroup", "far fa-object-ungroup",
                "fab fa-odnoklassniki",
                "fab fa-odnoklassniki-square",
                "fab fa-opencart",
                "fab fa-openid",
                "fab fa-opera",
                "fab fa-optin-monster",
                "fab fa-osi",
                "fas fa-outdent",
                "fab fa-page4",
                "fab fa-pagelines",
                "fas fa-paint-brush",
                "fab fa-palfed",
                "fas fa-paper-plane", "far fa-paper-plane",
                "fas fa-paperclip",
                "fas fa-paragraph",
                "fas fa-paste",
                "fab fa-patreon",
                "fas fa-pause",
                "fas fa-pause-circle", "far fa-pause-circle",
                "fas fa-paw",
                "fab fa-paypal",
                "fas fa-pen-square",
                "fas fa-pencil-alt",
                "fas fa-percent",
                "fab fa-periscope",
                "fab fa-phabricator",
                "fab fa-phoenix-framework",
                "fas fa-phone",
                "fas fa-phone-square",
                "fas fa-phone-volume",
                "fab fa-pied-piper",
                "fab fa-pied-piper-alt",
                "fab fa-pied-piper-pp",
                "fab fa-pinterest",
                "fab fa-pinterest-p",
                "fab fa-pinterest-square",
                "fas fa-plane",
                "fas fa-play",
                "fas fa-play-circle", "far fa-play-circle",
                "fab fa-playstation",
                "fas fa-plug",
                "fas fa-plus",
                "fas fa-plus-circle",
                "fas fa-plus-square", "far fa-plus-square",
                "fas fa-podcast",
                "fas fa-pound-sign",
                "fas fa-power-off",
                "fas fa-print",
                "fab fa-product-hunt",
                "fab fa-pushed",
                "fas fa-puzzle-piece",
                "fab fa-python",
                "fab fa-qq",
                "fas fa-qrcode",
                "fas fa-question",
                "fas fa-question-circle", "far fa-question-circle",
                "fab fa-quora",
                "fas fa-quote-left",
                "fas fa-quote-right",
                "fas fa-random",
                "fab fa-ravelry",
                "fab fa-react",
                "fab fa-rebel",
                "fas fa-recycle",
                "fab fa-red-river",
                "fab fa-reddit",
                "fab fa-reddit-alien",
                "fab fa-reddit-square",
                "fas fa-redo",
                "fas fa-redo-alt",
                "fas fa-registered", "far fa-registered",
                "fab fa-rendact",
                "fab fa-renren",
                "fas fa-reply",
                "fas fa-reply-all",
                "fab fa-replyd",
                "fab fa-resolving",
                "fas fa-retweet",
                "fas fa-road",
                "fas fa-rocket",
                "fab fa-rocketchat",
                "fab fa-rockrms",
                "fas fa-rss",
                "fas fa-rss-square",
                "fas fa-ruble-sign",
                "fas fa-rupee-sign",
                "fab fa-safari",
                "fab fa-sass",
                "fas fa-save", "far fa-save",
                "fab fa-schlix",
                "fab fa-scribd",
                "fas fa-search",
                "fas fa-search-minus",
                "fas fa-search-plus",
                "fab fa-searchengin",
                "fab fa-sellcast",
                "fab fa-sellsy",
                "fas fa-server",
                "fab fa-servicestack",
                "fas fa-share",
                "fas fa-share-alt",
                "fas fa-share-alt-square",
                "fas fa-share-square", "far fa-share-square",
                "fas fa-shekel-sign",
                "fas fa-shield-alt",
                "fas fa-ship",
                "fab fa-shirtsinbulk",
                "fas fa-shopping-bag",
                "fas fa-shopping-basket",
                "fas fa-shopping-cart",
                "fas fa-shower",
                "fas fa-sign-in-alt",
                "fas fa-sign-language",
                "fas fa-sign-out-alt",
                "fas fa-signal",
                "fab fa-simplybuilt",
                "fab fa-sistrix",
                "fas fa-sitemap",
                "fab fa-skyatlas",
                "fab fa-skype",
                "fab fa-slack",
                "fab fa-slack-hash",
                "fas fa-sliders-h",
                "fab fa-slideshare",
                "fas fa-smile", "far fa-smile",
                "fab fa-snapchat",
                "fab fa-snapchat-ghost",
                "fab fa-snapchat-square",
                "fas fa-snowflake", "far fa-snowflake",
                "fas fa-sort",
                "fas fa-sort-alpha-down",
                "fas fa-sort-alpha-up",
                "fas fa-sort-amount-down",
                "fas fa-sort-amount-up",
                "fas fa-sort-down",
                "fas fa-sort-numeric-down",
                "fas fa-sort-numeric-up",
                "fas fa-sort-up",
                "fab fa-soundcloud",
                "fas fa-space-shuttle",
                "fab fa-speakap",
                "fas fa-spinner",
                "fab fa-spotify",
                "fas fa-square", "far fa-square",
                "fab fa-stack-exchange",
                "fab fa-stack-overflow",
                "fas fa-star", "far fa-star",
                "fas fa-star-half", "far fa-star-half",
                "fab fa-staylinked",
                "fab fa-steam",
                "fab fa-steam-square",
                "fab fa-steam-symbol",
                "fas fa-step-backward",
                "fas fa-step-forward",
                "fas fa-stethoscope",
                "fab fa-sticker-mule",
                "fas fa-sticky-note", "far fa-sticky-note",
                "fas fa-stop",
                "fas fa-stop-circle", "far fa-stop-circle",
                "fab fa-strava",
                "fas fa-street-view",
                "fas fa-strikethrough",
                "fab fa-stripe",
                "fab fa-stripe-s",
                "fab fa-studiovinari",
                "fab fa-stumbleupon",
                "fab fa-stumbleupon-circle",
                "fas fa-subscript",
                "fas fa-subway",
                "fas fa-suitcase",
                "fas fa-sun", "far fa-sun",
                "fab fa-superpowers",
                "fas fa-superscript",
                "fab fa-supple",
                "fas fa-sync",
                "fas fa-sync-alt",
                "fas fa-table",
                "fas fa-tablet",
                "fas fa-tablet-alt",
                "fas fa-tachometer-alt",
                "fas fa-tag",
                "fas fa-tags",
                "fas fa-tasks",
                "fas fa-taxi",
                "fab fa-telegram",
                "fab fa-telegram-plane",
                "fab fa-tencent-weibo",
                "fas fa-terminal",
                "fas fa-text-height",
                "fas fa-text-width",
                "fas fa-th",
                "fas fa-th-large",
                "fas fa-th-list",
                "fab fa-themeisle",
                "fas fa-thermometer-empty",
                "fas fa-thermometer-full",
                "fas fa-thermometer-half",
                "fas fa-thermometer-quarter",
                "fas fa-thermometer-three-quarters",
                "fas fa-thumbs-down", "far fa-thumbs-down",
                "fas fa-thumbs-up", "far fa-thumbs-up",
                "fas fa-thumbtack",
                "fas fa-ticket-alt",
                "fas fa-times",
                "fas fa-times-circle", "far fa-times-circle",
                "fas fa-tint",
                "fas fa-toggle-off",
                "fas fa-toggle-on",
                "fas fa-trademark",
                "fas fa-train",
                "fas fa-transgender",
                "fas fa-transgender-alt",
                "fas fa-trash",
                "fas fa-trash-alt", "far fa-trash-alt",
                "fas fa-tree",
                "fab fa-trello",
                "fab fa-tripadvisor",
                "fas fa-trophy",
                "fas fa-truck",
                "fas fa-tty",
                "fab fa-tumblr",
                "fab fa-tumblr-square",
                "fas fa-tv",
                "fab fa-twitch",
                "fab fa-twitter",
                "fab fa-twitter-square",
                "fab fa-typo3",
                "fab fa-uber",
                "fab fa-uikit",
                "fas fa-umbrella",
                "fas fa-underline",
                "fas fa-undo",
                "fas fa-undo-alt",
                "fab fa-uniregistry",
                "fas fa-universal-access",
                "fas fa-university",
                "fas fa-unlink",
                "fas fa-unlock",
                "fas fa-unlock-alt",
                "fab fa-untappd",
                "fas fa-upload",
                "fab fa-usb",
                "fas fa-user", "far fa-user",
                "fas fa-user-circle", "far fa-user-circle",
                "fas fa-user-md",
                "fas fa-user-plus",
                "fas fa-user-secret",
                "fas fa-user-times",
                "fas fa-users",
                "fab fa-ussunnah",
                "fas fa-utensil-spoon",
                "fas fa-utensils",
                "fab fa-vaadin",
                "fas fa-venus",
                "fas fa-venus-double",
                "fas fa-venus-mars",
                "fab fa-viacoin",
                "fab fa-viadeo",
                "fab fa-viadeo-square",
                "fab fa-viber",
                "fas fa-video",
                "fab fa-vimeo",
                "fab fa-vimeo-square",
                "fab fa-vimeo-v",
                "fab fa-vine",
                "fab fa-vk",
                "fab fa-vnv",
                "fas fa-volume-down",
                "fas fa-volume-off",
                "fas fa-volume-up",
                "fab fa-vuejs",
                "fab fa-weibo",
                "fab fa-weixin",
                "fab fa-whatsapp",
                "fab fa-whatsapp-square",
                "fas fa-wheelchair",
                "fab fa-whmcs",
                "fas fa-wifi",
                "fab fa-wikipedia-w",
                "fas fa-window-close", "far fa-window-close",
                "fas fa-window-maximize", "far fa-window-maximize",
                "fas fa-window-minimize",
                "fas fa-window-restore", "far fa-window-restore",
                "fab fa-windows",
                "fas fa-won-sign",
                "fab fa-wordpress",
                "fab fa-wordpress-simple",
                "fab fa-wpbeginner",
                "fab fa-wpexplorer",
                "fab fa-wpforms",
                "fas fa-wrench",
                "fab fa-xbox",
                "fab fa-xing",
                "fab fa-xing-square",
                "fab fa-y-combinator",
                "fab fa-yahoo",
                "fab fa-yandex",
                "fab fa-yandex-international",
                "fab fa-yelp",
                "fas fa-yen-sign",
                "fab fa-yoast",
                "fab fa-youtube"
            ];
            let icons = [];
            let i = 0;
            for(let c of classes){
                icons.push({iconValue: c, data: i++, class: c});
            }
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
        dropdown.style.position = "fixed";
        dropdown.style.backgroundColor = "#ffffff";
        dropdown.style.padding = "5px";
        dropdown.style.zIndex = 500;
        dropdown.style.maxHeight = "150px";
        dropdown.style.overflowY = "scroll";
        dropdown.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 2px 2px 1px rgba(0,0,0,0.14)";
        dropdown.setAttribute("class", "editor-dropdown "+action+"-dropdown");
        document.body.appendChild(dropdown);
        let dropdownList = document.createElement("ul");
        dropdownList.style.padding = "0";
        dropdownList.style.margin = "0";
        dropdownList.style.listStyle = "none";
        dropdown.appendChild(dropdownList);
        dropdownItems.forEach(function (listItem) {
            for(let key in listItem){
                let dropdownItem = document.createElement("li");
                dropdownList.appendChild(dropdownItem);
                let item = document.createElement("button");
                item.style.width = "max-content";
                let itemText = document.createElement((action==="formatBlock") ? key : "span");
                itemText.innerHTML = listItem[key];
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
            dropdown.style.width = "max-content";
            // dropdown.style.width = (dropdown.getBoundingClientRect().width+17)+"px";
            dropdown.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            dropdown.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                target.focus();
        });
        return a
    },
    create_input: function(obj){
        let div = document.createElement("div");
        div.style.display = "flex";
        div.style.position = "relative";
        if(obj.type === "button") {
            let button = document.createElement("button");
            button.textContent = obj.value;
            button.addEventListener("click", obj.event);
            div.appendChild(button);
        }
        else {
            let input = document.createElement("input");
            input.setAttribute("type", obj.type);
            input.setAttribute("value", obj.value);
            input.setAttribute("name", obj.name);
            input.setAttribute("placeholder", obj.placeholder);
            input.setAttribute("class", "tesodev-control");
            input.setAttribute("required", "required");
            let span = document.createElement("span");
            span.setAttribute("class", "tesodev-floating-label");
            span.textContent = obj.title;
            div.appendChild(input);
            div.appendChild(span);
        }
        return div
    },
    create_select: function(options){
        let select = document.createElement("select");
        for(let opt of options){
            let option = document.createElement("option");
            option.textContent = opt.text;
            option.setAttribute("value", opt.value);
            select.appendChild(option);
        }
        return select
    },
    create_popup: function (inputs, action, a, editor) {
        const that = this;
        let popup = document.createElement("div");
        popup.style.display = "none";
        popup.style.position = "fixed";
        popup.style.backgroundColor = "#ffffff";
        popup.style.flexDirection = "column";
        popup.style.padding = "5px";
        popup.style.zIndex = 500;
        popup.style.maxHeight = "250px";
        popup.style.overflowY = "scroll";
        popup.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 2px 2px 1px rgba(0,0,0,0.14)";
        popup.setAttribute("class", "editor-popup "+action+"-popup");
        document.body.appendChild(popup);

        inputs.forEach(function (obj) {
            if(obj.type === "select")
                popup.appendChild(that.create_select(obj.options));
            else
                popup.appendChild(that.create_input(obj));
        });
        a.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector("[target-id='"+editor.getAttribute("editor-id")+"']");
            for(let el of document.querySelectorAll(".editor-popup"))
                el.style.display= "none";
            popup.style.display = popup.style.display ==="flex" ? "none" : "flex";
            popup.style.width = "max-content";
            // dropdown.style.width = (dropdown.getBoundingClientRect().width+17)+"px";
            popup.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            popup.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                target.focus();
            that.rp = that.saveRangePosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
            if (window.getSelection) {
                that.sel = window.getSelection();
                if(that.sel.baseNode.parentNode.tagName.toLowerCase()==="a")
                    that.a_selected=that.sel.baseNode.parentNode;
                if (that.sel && that.sel.getRangeAt && that.sel.rangeCount) {
                    that.range = window.getSelection().getRangeAt(0);
                }
                that.sel= that.sel.toString();
                document.querySelector(".insertLink-popup input[name='text']").value=that.sel;
            }
        });
        return a
    },
    create_tablePopup: function (a, editor) {
        const that = this;
        let popup = document.createElement("div");
        popup.style.display = "none";
        popup.style.position = "fixed";
        popup.style.backgroundColor = "#ffffff";
        popup.style.flexDirection = "column";
        popup.style.padding = "5px";
        popup.style.zIndex = 500;
        popup.style.maxWidth = "160px";
        popup.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 2px 2px 1px rgba(0,0,0,0.14)";
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
                    for(let _r=0; _r<r; _r++) {
                        let tr = document.createElement("tr");
                        table.appendChild(tr);
                        for (let _c = 0; _c < c; _c++) {
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
            popup.style.width = "max-content";
            // dropdown.style.width = (dropdown.getBoundingClientRect().width+17)+"px";
            popup.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            popup.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                target.focus();
            that.rp = that.saveRangePosition(document.querySelector("[target-id='"+that.activeTarget+"']"));
            if (window.getSelection) {
                that.sel = window.getSelection();
                if(that.sel.baseNode.parentNode.tagName.toLowerCase()==="a")
                    that.a_selected=that.sel.baseNode.parentNode;
                if (that.sel && that.sel.getRangeAt && that.sel.rangeCount) {
                    that.range = window.getSelection().getRangeAt(0);
                }
                that.sel= that.sel.toString();
                document.querySelector(".insertLink-popup input[name='text']").value=that.sel;
            }
        });
        return a
    },
    show: function (editor, target) {
        const that = this;
        target.focus();
        editor.style.display = "flex";
        let top = 0;
        if(target.getBoundingClientRect().top > target.getBoundingClientRect().bottom)
            top = target.getBoundingClientRect().top - editor.getBoundingClientRect().height;
        else
            top = target.getBoundingClientRect().bottom;
        editor.style.width = target.getBoundingClientRect().width + "px";
        editor.style.left = target.getBoundingClientRect().left + "px";
        editor.style.top = top + "px";
        // target.style.outline = "1px solid #495057";

        target.addEventListener("keydown", that.on_keyup);
        target.addEventListener("keyup", that.on_keyup);
        target.addEventListener("mouseup", that.on_mouseup);

    },
    hide: function (editor, target) {
        const that = this;
        editor.style.display = "none";
        target.removeEventListener("keydown", that.on_keyup);
        target.removeEventListener("keyup", that.on_keyup);
        target.removeEventListener("mouseup", that.on_mouseup);
    },
    destroy: function () {
        for(let el of document.querySelectorAll(".editor-dropdown, .editor-popup, .editor"))
            el.remove();
    }
};