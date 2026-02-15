@echo off
echo ========================================
echo Installing Express Landing Page
echo ========================================
echo.

echo Installing Node.js dependencies...
call npm install

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo To start the server:
echo   npm start       (production)
echo   npm run dev     (development with auto-reload)
echo.
echo Server will run on: http://localhost:3000
echo.
pause
