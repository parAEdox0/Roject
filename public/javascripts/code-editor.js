document.addEventListener("DOMContentLoaded", function () {
    var editor = CodeMirror(document.querySelector(".editor"), {
        value: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\" << std::endl;\n    return 0;\n}",
        mode: "javascript", // Set the language mode
        lineNumbers: true, // Enable line numbers
        theme: "material-darker",
        fontSize: "3rem",
        autoCloseBrackets: true, // Enable auto-closing brackets
        autoCloseTags: true // Enable auto-closing HTML tags

    });

    var cmElement = document.querySelector(".CodeMirror");
    cmElement.style.fontSize = "18px";
    cmElement.style.width = "100%";
    cmElement.style.height = "100%";

    var languageModeMap = {
        "js": "javascript",
        "cpp": "text/x-c++src",
        "java": "text/x-java",
        "py": "python",
    };

    // Get the <select> element
    var languageSelect = document.getElementById("language-select");

    languageSelect.addEventListener("change", function () {
        // Get the selected language value
        var selectedLanguage = languageSelect.value;

        // Get the corresponding CodeMirror mode name from the mapping
        var modeName = languageModeMap[selectedLanguage];

        // Set the mode of the editor based on the selected language
        editor.setOption("mode", modeName);

        // Pre-write a simple code snippet in the selected language
        var codeSnippet = getInitialCode(selectedLanguage);
        editor.setValue(codeSnippet);

        // Function to return initial code snippet based on selected language
        function getInitialCode(language) {
            switch (language) {
                case "js":
                    return "console.log('Hello, world!');";
                case "cpp":
                    return "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, world!\" << std::endl;\n    return 0;\n}";
                case "java":
                    return "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, world!\");\n    }\n}";
                case "py":
                    return "print('Hello, world!')";
            }
        }
    });

    let code;
    // let editor = document.querySelector(".editor");
    let input = document.querySelector(".input");
    let output = document.querySelector(".output");
    let run = document.querySelector(".run");

    run.addEventListener("click", async () => {
        code = {
            code: editor.getValue(),
            input: input.value,
            lang: languageSelect.value
        };
        var oData = await fetch("http://localhost:3000/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(code)
        });
        var d = await oData.json();
        output.value = d.output;
    });

});