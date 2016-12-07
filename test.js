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
    <scene width = { 1023 } height = { 768 } />

    <recording.start filePath = "videos/video" />

    <browser    id = "sentry"
                title = "Sentry"
                contentURL = "http://www.dev.getsentry.net:8000/default/"
                contentRect = { { origin: { x: "center", y: "center" }, size: { width: 1023, height: 700 } } } />

    <using window = "sentry">
        <wait delay = { 1000 } />
        <click selector = "input#id_username[type=text]" />
        <type>meredith@getsentry.com</type>
        <click selector = "input#id_password[type=password]" />
        <paste>manassas</paste>
        <wait delay = { 300 } />
        <window.scroll selector = "input#id_password[type=password]" />
        <click selector = "button[type=submit]" />
        <wait delay = { 3000 } />
        <wait.visible selector = "ul.nav.nav-stacked:nth-child(2)" />
        <click selector = "ul.nav.nav-stacked:nth-child(2)" />
        <wait delay = { 3000 } />
        {/* <wait.visible selector = 'a[href="/default/earth/"]' /> */}
        <click selector = 'span.project-name' />
        <wait delay = { 1000 } />
    </using>

    <hide />

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
