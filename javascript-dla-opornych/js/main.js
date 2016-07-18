(function () {

    // catch console output 
    var oldLog = console.log;
    console.log = function (message) {
        outputEditor.selectAll();
        outputEditor.insert("log: " + message);
        oldLog.apply(console, arguments);
    };

    window.addEventListener("error", function (e) {
        outputEditor.selectAll();
        outputEditor.insert("error: " + e.error.message);
        return false;
    });

    // init editors
    var inputEditor = ace.edit("editor");
    var inputSession = inputEditor.getSession();
    inputSession.setMode("ace/mode/javascript");
    inputSession.on("change", function () {
        try {
            eval(inputEditor.getSession().getValue());
            inputEditor.focus();
        } catch (error) {
            outputEditor.selectAll();
            outputEditor.insert("error: " + error.message);
            inputEditor.focus();
        }
    });
    inputEditor.setOptions({
        fontSize: "17pt"
    });


    var outputEditor = ace.edit("editor2");
    outputEditor.getSession().setMode("ace/mode/javascript");
    outputEditor.setOptions({
        fontSize: "17pt"
    });

})();