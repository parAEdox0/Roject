document.addEventListener('DOMContentLoaded', function () {
    const codeEditor = document.getElementById('code-editor');
    const outputContainer = document.getElementById('output-container');
    const runButton = document.getElementById('run-button');

    // Function to auto-indent code
    codeEditor.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cursorPosition = codeEditor.selectionStart;
            const lines = codeEditor.value.split('\n');
            const currentLine = lines[codeEditor.value.substr(0, cursorPosition).split('\n').length - 1];
            const indentation = currentLine.match(/^\s*/)[0];
            const indent = '\n' + indentation;

            document.execCommand('insertText', false, indent);
        }
    });

    // Function to execute C++ code
    runButton.addEventListener('click', function () {
        const code = codeEditor.value;

        // Send code to backend for execution
        fetch('/run-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: code })
        })
            .then(response => response.json())
            .then(data => {
                outputContainer.textContent = data.output;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
