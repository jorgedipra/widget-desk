@echo off
:: Desactiva la opción de ocultar automáticamente la barra de tareas en modo escritorio

reg add "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\StuckRects3" /v Settings /t REG_BINARY /d 3000000000000000feffffff3f0000000200000002000000 /f

:: Reiniciar el explorador de Windows para aplicar los cambios
taskkill /f /im explorer.exe
start explorer.exe

exit