@echo off
REM run-local.bat — start a local static server and open the homepage
REM Requires Node.js (npx). If npx is not available, install http-server globally: npm i -g http-server
:: Start http-server in a new command window so this script can continuestart "Static Server" cmd /k "npx http-server -a 0.0.0.0 -p 8000 -c-1 .":: short delay to let the server starttimeout /t 1 > nul:: Open the homepage in the default browserstart "" "http://localhost:8000/this.html"exit /b 0