(function () {
  let template = document.createElement("template");
  template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
	`;

  class ColoredBox extends HTMLElement {
    constructor() {
	 console.log("constructor fn is triggered");
      super();
      let shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener("click", (event) => {
        var event = new Event("onClick");
	console.log("event"+event);
        this.dispatchEvent(event);
      });
      this._props = {};
    }

    onCustomWidgetBeforeUpdate(changedProperties) {
	    console.log("BeforeUpdate Changed Properties:", changedProperties);
      this._props = { ...this._props, ...changedProperties };
    }

    onCustomWidgetAfterUpdate(changedProperties) {
	    console.log("AfterUpdate Changed Properties:", changedProperties);
      if ("color" in changedProperties) {
        this.style["background-color"] = changedProperties["color"];
      }
      if ("opacity" in changedProperties) {
        this.style["opacity"] = changedProperties["opacity"];
      }
    }
  }

  customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();
