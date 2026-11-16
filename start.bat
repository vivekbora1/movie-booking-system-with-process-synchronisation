@echo off
cd /d "%~dp0"
title PVR Pacific - Cinema Ticket Booking Availability Module (XAMPP MySQL Integrated)
color 0E

echo ========================================================
echo    PVR PACIFIC CINEMAS - AVAILABILITY MODULE & PBL LAB
echo    Graphic Era University - DBMS & OS PBL
echo ========================================================
echo.
echo [1] Working directory: %~dp0
echo [2] Connecting to XAMPP MySQL on port 3306...
echo [3] Launching backend server on http://localhost:3000...
echo.
echo * Opening http://localhost:3000 in your browser...
echo * When you enter movies or bookings in the frontend, they will
echo   appear directly in phpMyAdmin at: http://localhost/phpmyadmin
echo ========================================================
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:3000"
node server.js

pause
