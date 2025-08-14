sequenceDiagram
	participant browser
	participant server
browser->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
server-->>browser: Server responds with a 302 to get the browser to perform a new GET request
deactivate server
browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
activate server
server-->>browser: HTML document
deactivate server
browser->>server: GET main.css
activate server
server-->>browser: 304, main.css is unchanged. No need to send it again.
deactivate server
browser->>server: GET main.js
activate server
server-->>browser: 304, main.js is unchanged. No need to send it again.
deactivate server
Note right of browser: as in opening the page, Browser starts executing the JS and requests JSON data

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
activate server
server-->>browser: JSON data
deactivate server
Note right of browser: browser renders JSON-data with new note