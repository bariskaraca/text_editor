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
        // {action: "seperator"},
        // {action: "insertLink", icon: '<svg style="width:18px;height:18px" viewBox="0 0 24 24">\n' +
        //         '    <path fill="' + this.options.iconColor + '"  d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />\n' +
        //         '</svg>', title: "Insert Link", popup: [{type: "text", placeholder: "Link", value: "https://"}, {type: "button", value: "submit"}]},
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
        /**
         * <div class="row">
         <input type="email" name="email" class="tesodev-control" placeholder=" " required autofocus>
         <span class="tesodev-floating-label">Email</span>
         </div>
         **/
        let div = document.createElement("div");
        div.style.display = "flex";
        if(obj.type === "button") {
            let button = document.createElement("button");
            button.textContent = obj.value;
            button.onclick = obj.event;
            div.appendChild(button);
        }
        else {
            let input = document.createElement("input");
            input.setAttribute("type", obj.type);
            input.setAttribute("value", obj.value);
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
        popup.style.maxHeight = "150px";
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