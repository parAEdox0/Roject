// Initialize CodeMirror for HTML textarea
let htmlEditor = CodeMirror.fromTextArea(document.querySelector("#html-code"), {
    mode: "xml",
    theme: "material-darker",
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },

});

htmlEditor.setSize("100%", "100%");



// Initialize CodeMirror for CSS textarea
let cssEditor = CodeMirror.fromTextArea(document.querySelector("#css-code"), {
    mode: "css",
    theme: "material-darker",
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,

    extraKeys: { "Ctrl-Space": "autocomplete" },

});

cssEditor.setSize("100%", "100%");

// Initialize CodeMirror for JavaScript textarea
let jsEditor = CodeMirror.fromTextArea(document.querySelector("#js-code"), {
    mode: "javascript",
    theme: "material-darker",
    lineNumbers: true,
    lineWrapping: true,
    autoCloseTags: true,
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },

});

jsEditor.setSize("100%", "100%");

// Get the output element
let output = document.querySelector(".output");

// Function to generate output
function generateOutput() {
    // Get the values from the CodeMirror instances
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    // Construct the output HTML
    output.innerHTML = `
        <style>${cssCode}</style>
        ${htmlCode}
        <script>${jsCode}</script>
    `;

    // Execute the JavaScript code in the global scope
    try {
        eval(jsCode);
    } catch (error) {
        console.error(error);
    }
}

// Load code from localStorage on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('html-code')) {
        htmlEditor.setValue(localStorage.getItem('html-code'));
    }
    if (localStorage.getItem('css-code')) {
        cssEditor.setValue(localStorage.getItem('css-code'));
    }
    if (localStorage.getItem('js-code')) {
        jsEditor.setValue(localStorage.getItem('js-code'));
    }
    generateOutput(); // Update output initially
});

// Event listeners for change events on CodeMirror instances
htmlEditor.on("change", () => {
    generateOutput();
    // Save HTML code to localStorage
    localStorage.setItem('html-code', htmlEditor.getValue());
});

cssEditor.on("change", () => {
    generateOutput();
    // Save CSS code to localStorage
    localStorage.setItem('css-code', cssEditor.getValue());
});

jsEditor.on("change", () => {
    // Save JS code to localStorage
    localStorage.setItem('js-code', jsEditor.getValue());
});

// Initial output generation
generateOutput();
