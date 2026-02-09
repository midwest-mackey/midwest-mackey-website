echo deploy documentation to server

@echo deploying to %1
set server=%1
set dest=%server%%bamboo_server_destination%
set dir=%bamboo_build_working_directory%\dist\ux-team-site

@echo off
net use %server% /user:"%bamboo_server_user%" "%bamboo_server_password%"
@echo on

echo clean directory
rd %dest% /s /q

echo copy files to server
xcopy "%dir%" "%dest%" /s /e /i /y /f

net use /delete %server%
