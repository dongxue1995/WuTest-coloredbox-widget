(function () {
  let template = document.createElement("template");
  template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Opacity</td>
						<td><input id="builder_opacity" type="text" size="5" maxlength="5"></td>
					</tr>
				</table>
        <table>
          <tr>
            <td>Color</td>
            <td><input id="styling_color" type="text" size="40" maxlength="40"></td>
          </tr>
        </table>
        <p>My property value: ${this.myProperty}</p>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

  class ColoredBoxBuilderPanel extends HTMLElement {
    constructor() {
      // element created
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot
        .getElementById("form")
        .addEventListener("submit", this._submit.bind(this));
      this.myProperty = ""; // default value
    }

    _submit(e) {
      // trigger submit when the user submits the form by clicking the submit button
      e.preventDefault();
      this.dispatchEvent(
        //When the propertiesChanged event is dispatched, it will trigger the onCustomWidgetAfterUpdate method of the ColoredBox custom widget,
        new CustomEvent("propertiesChanged", {
          //  passing a new instance of CustomEvent as the argument.  propertiesChanged is the event name,
          detail: {
            properties: {
              opacity: this.opacity,
              color: this.color,
            },
          },
        })
      );
    }
    //---------
    static get observedAttributes() {
      return ["my-preperty"];
    }
    get myProperty() {
      return this.myProperty;
    }
    set myProperty(value) {
      this.myProperty = value;
    }
    attributeChangedCallback(name, oldValue, newValue) {
      console.log(oldValue);
      if (name === "my-property") {
        this.myProperty = newValue;
      }
    }
    //---------
    connectedCallback() {
      this.innerHTML = `<p>My property value: ${this.myProperty}</p>`;
    }

    set opacity(newOpacity) {
      this._shadowRoot.getElementById("builder_opacity").value = newOpacity;
      console.log("setnewOpacity" + newOpacity);
    }

    get opacity() {
      return this._shadowRoot.getElementById("builder_opacity").value;
    }
    set color(newColor) {
      this._shadowRoot.getElementById("styling_color").value = newColor;
    }

    get color() {
      return this._shadowRoot.getElementById("styling_color").value;
    }
  }

  customElements.define(
    //register the element:
    "com-sap-sample-coloredbox-builder",
    ColoredBoxBuilderPanel
  );
  `;'
  `;
})();
