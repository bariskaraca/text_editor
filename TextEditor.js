function TextEditor(target, options) {
    this.target = target;
    this.options = {
        iconColor: "#000000",
        activeIconColor: "#01447b",
        editorBgColor: "#ffffff",
        fontFamily: [{"Calibri":"Calibri"}, {"Comic Sans MS":"Comic Sans MS"}],
        fontSize:[8,9,20,40]
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
                    {type: "text", placeholder: "Link", value: "https://", name: "url"},
                    {type: "text", placeholder: "Title", value: "", name: "title"},
                    {type: "text", placeholder: "Text", value: "", name: "text"},
                    {type: "button", value: "submit", event: (e)=> {
                            document.querySelector(".insertLink-popup").style.display = "none";
                            let url = document.querySelector("input[name='url']").value;
                            let title = document.querySelector("input[name='title']").value;
                            let _text = document.querySelector("input[name='text']").value;
                            let text = _text ? _text : url,html;
                            html = '<a href="' + url + '" target="' + target + '" id="inserted_a" title="'+title+'">' + text.toString() + '</a>';
                            that.range.deleteContents();
                            let el = document.createElement("div");
                            el.innerHTML = html;
                            let frag = document.createDocumentFragment(), node, lastNode;
                            while ((node = el.firstChild)) {
                                lastNode = frag.appendChild(node);
                            }
                            that.range.insertNode(frag);
                            if(that.a_selected) {
                                that.a_selected.parentNode.appendChild(that.a_selected.querySelector("a.btn"));
                                that.a_selected.remove();
                                that.a_selected = false;
                            }
                            document.getElementById("inserted_a").removeAttribute("id");
                        }
                    }
                ]},
    ];
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
    this.execFontSize = function (size, unit) {
        var sel, range, node;
        if (window.getSelection) {
            for(let el of this.target.querySelectorAll("span:empty"))
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
                    for(let el of this.target.querySelectorAll("span:empty"))
                        el.remove();
                else{
                    for(let p of this.target.querySelectorAll("span:empty")) {
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
    const that = this;
    this.on_keyup = function (e) {
        let _top = 0;
        if(that.target.getBoundingClientRect().top > that.target.getBoundingClientRect().bottom)
            _top = that.target.getBoundingClientRect().top - that.editor.getBoundingClientRect().height;
        else
            _top = that.target.getBoundingClientRect().bottom;
        if(_top !== top)
            that.editor.style.top = _top + "px";

    };
    this.getActiveDiv =function () {
        var activeDiv = window.getSelection().anchorNode;
        while (!( activeDiv instanceof Element ))
            activeDiv = activeDiv.parentElement;
        while (!activeDiv.getAttribute("contenteditable"))
            activeDiv = activeDiv.parentElement;
        return activeDiv;
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
    this.editor = this.create_editor();
}
TextEditor.prototype = {
    create_editor: function () {
        const that = this;
        let editor = document.createElement("div");
        editor.style.position = "fixed";
        editor.style.background = this.options.editorBgColor;
        editor.style.display = "none";
        editor.style.flexWrap = "wrap";
        editor.style.border = "1px solid #495057";
        document.body.appendChild(editor);
        this.fontStyles.map(function(obj, index) {
            if(obj.action === "seperator")
                editor.appendChild(that.create_seperator());
            else
                editor.appendChild(that.create_icon(obj))
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
        document.addEventListener("click", function (e) {
            if(!that.getClosest(e.target, ".w-dropdown"))
                for(let el of document.querySelectorAll(".editor-dropdown"))
                    el.style.display = "none";
        });
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
    create_icon: function (obj) {
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
            that.create_dropdown(obj.dropdown, action, a);
        }
        else if(obj.popup){
            that.create_popup(obj.popup, action, a);
        }
        else{
            a.addEventListener("click", function (e) {
                e.preventDefault();
                if(that.getActiveDiv() === that.target) {
                    document.execCommand(action, false );
                    if(document.queryCommandState(action) && !this.classList.contains("active"))
                        this.classList.add("active");
                    else if(!document.queryCommandState(action) && this.classList.contains("active"))
                        this.classList.remove("active");
                    if(!window.getSelection().toString().length)
                        that.target.focus();
                }
            });
        }
        return a
    },
    create_dropdown: function (dropdownItems, action, a) {
        const that = this;
        let dropdown = document.createElement("div");
        dropdown.style.display = "none";
        dropdown.style.position = "fixed";
        dropdown.style.padding = "5px";
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
        dropdownItems.forEach(function (_dropdownItem) {
            for(let key in _dropdownItem){
                let dropdownItem = document.createElement("li");
                dropdownList.appendChild(dropdownItem);
                let item = document.createElement("button");
                item.style.width = "max-content";
                let itemText = document.createElement((action==="formatBlock") ? key : "span");
                itemText.innerHTML = _dropdownItem[key];
                item.appendChild(itemText);
                dropdownItem.appendChild(item);
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    dropdown.style.display = "none";
                    if(that.getActiveDiv() === that.target) {
                        if(action==="fontSize")
                            that.execFontSize(key, "px");
                        else if(action==="align") {
                            document.execCommand(key, false);
                            a.innerHTML = _dropdownItem[key];
                        }
                        else
                            document.execCommand(action, false, key);
                        if(!window.getSelection().toString().length)
                            that.target.focus();
                        that.on_keyup(e);
                        dropdown.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
                    }
                });

            }
        });
        a.addEventListener("click", function (e) {
            e.preventDefault();
            for(let el of document.querySelectorAll(".editor-dropdown"))
                el.style.display= "none";
            dropdown.style.display = dropdown.style.display ==="block" ? "none" : "block";
            dropdown.style.width = "max-content";
            // dropdown.style.width = (dropdown.getBoundingClientRect().width+17)+"px";
            dropdown.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            dropdown.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                that.target.focus();
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
            input.setAttribute("placeholder", " ");
            input.setAttribute("class", "tesodev-control");
            input.setAttribute("required", "required");
            let span = document.createElement("span");
            span.setAttribute("class", "tesodev-floating-label");
            span.textContent = obj.placeholder;
            div.appendChild(input);
            div.appendChild(span);
        }
        return div
    },
    create_popup: function (inputs, action, a) {
        const that = this;
        let popup = document.createElement("div");
        popup.style.display = "none";
        popup.style.position = "fixed";
        popup.style.flexDirection = "column";
        popup.style.padding = "5px";
        popup.style.maxHeight = "250px";
        popup.style.overflowY = "scroll";
        popup.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 2px 2px 1px rgba(0,0,0,0.14)";
        popup.setAttribute("class", "editor-popup "+action+"-popup");
        document.body.appendChild(popup);

        inputs.forEach(function (obj) {
            popup.appendChild(that.create_input(obj));
        });
        a.addEventListener("click", function (e) {
            e.preventDefault();
            for(let el of document.querySelectorAll(".editor-popup"))
                el.style.display= "none";
            popup.style.display = popup.style.display ==="flex" ? "none" : "flex";
            popup.style.width = "max-content";
            // dropdown.style.width = (dropdown.getBoundingClientRect().width+17)+"px";
            popup.style.top = (a.getBoundingClientRect().top + a.getBoundingClientRect().height) + "px";
            popup.style.left = a.getBoundingClientRect().left + "px";
            if(!window.getSelection().toString().length)
                that.target.focus();
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
    show: function () {
        const that = this;
        this.target.focus();
        this.editor.style.display = "flex";
        let top = 0;
        if(this.target.getBoundingClientRect().top > this.target.getBoundingClientRect().bottom)
            top = this.target.getBoundingClientRect().top - this.editor.getBoundingClientRect().height;
        else
            top = this.target.getBoundingClientRect().bottom;
        this.editor.style.width = this.target.getBoundingClientRect().width + "px";
        this.editor.style.left = this.target.getBoundingClientRect().left + "px";
        this.editor.style.top = top + "px";
        // this.target.style.outline = "1px solid #495057";
        // this.target.style.borderTop = "1px solid #495057";
        // this.target.style.borderRight = "1px solid #495057";

        this.target.addEventListener("keydown", that.on_keyup);
        this.target.addEventListener("keyup", that.on_keyup);
        this.target.addEventListener("mouseup", that.on_mouseup);

    },
    hide: function () {
        const that = this;
        this.editor.style.display = "none";
        this.target.removeEventListener("keydown", that.on_keyup);
        this.target.removeEventListener("keyup", that.on_keyup);
        this.target.removeEventListener("mouseup", that.on_mouseup);
    }
};