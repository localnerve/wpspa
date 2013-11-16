#A Collection of Development HowTo's Until I Get More Organized

##How to debug the server side code or Gruntfile
Reference: [node-inspector](https://github.com/node-inspector/node-inspector)

1) install node-inspector globally (if you haven't)
2) Make sure all existing instances of node-inspector are killed (pgrep -l node)
3) Run 'node-inspector --web-port=8090 &'
4) Run 'node --debug-brk `which grunt` express:dev'
5) Open chrome and navigate to 'http://127.0.0.1:8090/debug?port=5858'
6) Set a breakpoint in wpspa/app.js or in wpspa/Gruntfile.js
7) F8 to the breakpoint

##How to debug html/css/js on stock android browser
Reference: [Weinre](http://people.apache.org/~pmuellr/weinre/docs/latest/)

0) Clone and build weinre or get from npm
1) Fire up weinre server: "<somepath>/cordova-weinre/weinre.server$ ./weinre --boundHost -all- --httpPort 8000"
2) Navigate (on desktop) to <external ip>:8000
3) Fire up "debug client user interface" in new window
4) Navigate phone to <external ip>:8000
  * Copy the injector script to clipboard
5) Navigate phone to the target app to debug
  * Paste the inject script into the address bar, click enter
6) Goto (on desktop) the "debug client user interface" window, confirm the connected target device and page
7) Use elements/timeline/resources/network/console to debug the app