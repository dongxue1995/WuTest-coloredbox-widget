(function () {
  // The script starts with an immediately invoked function expression (IIFE) that wraps all the code in the script. This is a common practice to prevent variable and function name conflicts with other code on the page.
  let template = document.createElement("template"); // creates a new HTML 'template' element, the innerHTML property of the template element is set to a string of HTML markup
  template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Colored Box Properties</legend>
				<table>
					<tr>
						<td>Color</td>
						<td><input id="styling_color" type="text" size="40" maxlength="40"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
	`;

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
})(); // add opening and closing parentheses to invoke the function immediately.
