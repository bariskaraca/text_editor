function IconSelect(el, options) {
    options = options ? options : {};
    this.options = options;
    this.element = el;
}
IconSelect.prototype = {
    constructor: IconSelect,
    setIcons: function (icons) {
        const that = this;
        var parameters = that.options;
        parameters.iconsWidth                   = (parameters.iconsWidth)                   ? parameters.iconsWidth                   : 32;
        parameters.iconsHeight                  = (parameters.iconsHeight)                  ? parameters.iconsHeight                  : 32;
        that.options = parameters;
        that.parentDiv = document.createElement('div');
        that.parentDiv.style.position="fixed";
        that.updatePos();
        that.parentDiv.style.display="flex";
        that.parentDiv.style.flexDirection="column";
        that.parentDiv.style.alignItems="center";
        that.parentDiv.style.width="150px";
        that.parentDiv.style.maxHeight="300px";
        that.parentDiv.style.overflowY="scroll";
        that.parentDiv.style.boxShadow = "0 3px 6px rgba(0,0,0,0.16), 0 2px 2px 1px rgba(0,0,0,0.14)";
        that.parentDiv.style.padding="10px";
        that.parentDiv.classList.add("icon-select");

        that.searchBar = document.createElement('div');
        that.searchBar.style.display="flex";
        that.searchBar.style.justifyContent="center";
        that.searchBar.style.flexWrap="wrap";
        that.searchBar.style.width="100%";
        that.searchBar.style.height="30px";
        that.searchBar.style.marginBottom="10px";

        that.searchInput = document.createElement('input');
        that.searchInput.style.width="calc(100% - 20px)";
        that.searchInput.setAttribute("type", "text");
        that.searchInput.setAttribute("placeholder", "Search icon");

        that.boxElement = document.createElement('div');
        that.boxElement.style.display="flex";
        that.boxElement.style.flexWrap="wrap";
        that.boxElement.style.justifyContent="center";

        that.searchBar.appendChild(that.searchInput);
        that.parentDiv.appendChild(that.searchBar);
        that.parentDiv.appendChild(that.boxElement);
        document.body.appendChild(that.parentDiv);
        for(var icon of icons){
            var iconElement = document.createElement('div');
            iconElement.setAttribute('class', 'iconElement');
            iconElement.style.display="flex";
            iconElement.style.alignItems="center";
            iconElement.style.justifyContent="center";
            iconElement.style.margin="5px";
            iconElement.style.cursor="pointer";
            iconElement.style.width = parameters.iconsWidth + "px";
            iconElement.style.height = parameters.iconsHeight + "px";
            iconElement.style.marginLeft = parameters.boxIconSpace + "px";
            iconElement.style.marginTop = parameters.boxIconSpace + "px";
            iconElement.style.boxShadow = "0 0 0 1px #ddd";
            var iconImgElement = document.createElement('i');
            iconImgElement.className=icon.class;
            iconImgElement.setAttribute('icon-value', icon.iconValue);
            iconImgElement.setAttribute('title', icon.iconValue);
            iconImgElement.setAttribute('width', parameters.iconsWidth + "px");
            iconImgElement.setAttribute('height', parameters.iconsHeight + "px");
            iconElement.appendChild(iconImgElement);
            for(var prop in icon.data){
                iconElement.dataset[prop] = icons[i].data[prop];
            }
            that.boxElement.appendChild(iconElement);

            iconElement.onclick = function(e){
                that.options.onSelect.call(this, this.querySelector("i").outerHTML, this.querySelector("i").className);
            };
        }

        that.searchInput.addEventListener("keyup",function () {
            let val = this.value.trim();
            for(let icon of document.querySelectorAll(".iconElement")){
                if(icon.querySelector("i").getAttribute("icon-value").includes(val)){
                    icon.style.display = "flex";
                }
                else
                    icon.style.display = "none";
            }
        })
    },
    updatePos: function () {
        this.parentDiv.style.top = (this.element.getBoundingClientRect().top + this.element.getBoundingClientRect().height) + "px";
        this.parentDiv.style.left = this.element.getBoundingClientRect().left + "px";
    }
};