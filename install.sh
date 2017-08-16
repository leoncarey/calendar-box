#! /bin/bash
cd "$(dirname "$0")"

############# INSTALL OF BASIC DEVELOPMENT TOOLS ###############
echo # newline
echo ---- OSX TOOLS INSTALLER
echo # newline

#################
if ! hash npm > /dev/null; then
	echo # newline
	echo Installing node.js...
	echo # newline

	brew install node
else
	echo Node.js [OK]
fi

#################
if ! hash bower > /dev/null; then
	echo # newline
	echo Installing Bower...
	echo # newline

	npm install -g bower
else
	echo Bower [OK]
fi

#################
if ! hash json-server > /dev/null; then
	echo # newline
	echo Installing Json-server...
	echo # newline

	npm install -g json-server
else
	echo Bower [OK]
fi

#
echo Instalando pacotes npm...
echo # newline
#
npm cache clear
npm install
#
echo Instalando pacotes bower...
echo # newline
bower update
#
echo Finalizado.