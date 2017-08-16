:: Install node
@echo Off
@echo node version:
call node.exe -v || (
  SET "FILENAME=%~dp0\.tmp\node.msi"
  bitsadmin.exe /transfer "node.js" http://nodejs.org/dist/latest/node-v4.1.0-x64.msi "%FILENAME%"
  @echo Install nodejs...
  msiexec.exe /i "%FILENAME%" /quiet /qn /norestart
)

:: Install bower
@echo bower version:
call bower --version || (
  npm install -g bower
)
:: Install json-server
@echo Install json-server
@echo Off
cmd /c npm install -g json-server

@echo All requeriments installed

@echo Install npm...
@echo Off
cmd /c npm cache clear
cmd /c npm install

@echo Install bower...
@echo Off
cmd /c bower update

@echo OK
pause