const { demo, group, wait, using } = require("demokit");
const { key, type, paste, br } = require("demokit/keyboard");
const scene = require("demokit/scene");
const recording = require("demokit/recording");
const browser = require("demokit/window/browser");
const { click, hide } = require("demokit/mouse");
const terminal = require("demokit/window/terminal");
const editor = require("demokit/window/code-editor");
const window = require("demokit/window");
const fs = require("fs");

module.exports =
<demo>
    <scene width = { 1024 } height = { 1000 } />

    <recording.start filePath = "videos/video" />

    <browser    id = "sentry"
                title = "Sentry"
                contentURL = "http://www.dev.getsentry.net:8000/for/flask/"
                contentRect = { { origin: { x: "center", y: "center" }, size: { width: 1000, height: 600 } } } />

    <using window = "sentry">
        <click selector = ".hero .platform-header a.cta" />

        <wait delay = { 1000 } />
        <click selector = "input#id_name[type=text]" />
        <wait delay = { 300 } />
        <type>Eric Feng</type>
        <click selector = "input#id_username[type=text]" />
        <type>eric.feng@sentry.io</type>
        <click selector = "input#id_password[type=password]" />
        <paste>asdf1234</paste>
        <wait delay = { 300 } />
        <window.scroll selector = "input#id_password[type=password]" />
        <click selector = "input#id_organization_name[type=text]" />
        <type>Eric & Co </type>
        <click selector = "input[type=checkbox]" />
        <click selector = "button[type=submit]" />
        <wait delay = { 3000 } />
        <wait.visible selector = ".create-flow input#id_name[type=text]" />
        <click selector = ".create-flow input#id_name[type=text]" />
        <type>Webserver</type>
        <click selector = ".create-flow button[type=submit]" />

        <wait delay = { 1000 } />
        <wait.visible selector = ".client-platform-list:nth-of-type(2)" />
        <window.scroll selector = ".client-platform-list:nth-of-type(2)" />
        <click selector = ".python-flask" />

        <wait delay = { 1000 } />
        <wait.visible selector = "#installation" />
        <window.scroll selector = "#installation" />
        <wait delay = { 1000 } />
    </using>

    <hide />
    <terminal   id = "terminal"
            contentRect = { { origin: { x: "center", y: 500 }, size: { width: 500, height: 500  } } } />

    <using window = "terminal">
        <type>pip install raven</type>
        <wait delay = { 1000 } />
        <type><br /></type>
        <paste>Collecting raven</paste>
        <wait delay = { 1000 } />
        <type><br /></type>
        <paste>Installing collected packages: raven</paste>
        <wait delay = { 500 } />
        <type><br /></type>
        <paste>Successfully installed raven-5.29.0</paste>
        <type><br /><paste>$ </paste></type>
        <wait delay = { 1000 } />
        <type>open app.py</type>
        <type><br /><paste>$ </paste></type>
        <wait delay = { 300 } />
    </using>

    <editor id = "editor"
        title = "app.py"
        source = { fs.readFileSync(require.resolve("./flask.py"), "utf8") }
        contentRect = { { origin: { x: "center", y: 100 }, size: { width: 700, height: 500  } } }
        firstLineNumber = { 1 } />

    <using window = "editor">
        <click selector = ".CodeMirror-line" nth = { 0 } effect = { false } />
        <hide />
        <type><br/></type>
        <type>from raven.contrib.flask import Sentry<br /></type>
        <wait delay = { 1000 } />
        <key code = "Down" />
        <wait delay = { 300 } />
        <key code = "Down" />
        <type>sentry = Sentry(app, dsn='your dsn')<br /></type>
        <wait delay = { 1000 } />
    </using>

    <window.style id = "editor" opacity = { 0 } />

    <using window = "terminal">
        <type>python app.py<br /></type>
        <wait delay = { 800 } />
        <paste> * Running on http:\/\/127.0.0.1:5000/ (Press CTRL+C to quit)</paste>
    </using>

    <recording.stop />

</demo>
