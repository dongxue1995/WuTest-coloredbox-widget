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
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot
        .getElementById("form")
        .addEventListener("submit", this._submit.bind(this));
    }

    _submit(e) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              opacity: this.opacity,
            },
          },
        })
      );
    }

    set opacity(newOpacity) {
      this._shadowRoot.getElementById("builder_opacity").value = newOpacity;
    }

    get opacity() {
      return this._shadowRoot.getElementById("builder_opacity").value;
    }
  }

  customElements.define(
    "com-sap-sample-coloredbox-builder",
    ColoredBoxBuilderPanel
  );
  class ColoredBoxStylingPanel extends HTMLElement {
    // template for JavaScript objects.
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this._shadowRoot
        .getElementById("form")
        .addEventListener("submit", this._submit.bind(this));
    }

    _submit(e) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("propertiesChanged", {
          detail: {
            properties: {
              color: this.color,
            },
          },
        })
      );
    }

    set color(newColor) {
      this._shadowRoot.getElementById("styling_color").value = newColor;
    }

    get color() {
      return this._shadowRoot.getElementById("styling_color").value;
    }
  }

  customElements.define(
    // defines a custom HTML element
    "com-sap-sample-coloredbox-styling",
    ColoredBoxStylingPanel
  );
})();
