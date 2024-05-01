const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static("./public"));
app.set("view engine", "ejs");
const compiler = require("compilex");
const options = { stats: true };
compiler.init(options);

app.get('/', function (req, res) {
    res.render("index")
});

app.post("/web-builder", function (req, res) {
    res.render("web-builder")
})

app.post("/code-editor", function (req, res) {
    res.render("code-editor")
})

app.post("/compile", function (req, res) {

    let code = req.body.code;
    let input = req.body.input;
    let lang = req.body.lang;

    try {
        if (lang == "cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
        }
        else if (lang == "java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
        }
        else if (lang == "py") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {

                        res.send(data);
                    }
                    else {
                        res.send({ output: data.error })
                    }
                });
            }
        }
    } catch (error) {
        console.err("error")
    }
})

app.listen(3000)