@echo off
REM Test rapide avant déploiement

cd "C:/Users/probook 640 G3/Desktop/DSI31/ecomerce/MERN-Ecommerce"

REM Tuer les ports
taskkill /F /IM node.exe >nul 2>&1

REM Attendre un peu
timeout /t 2 /nobreak

REM Lancer le backend
echo ====== LANCEMENT BACKEND ======
start "Backend" cmd /k "cd backend && npm start"

timeout /t 5 /nobreak

REM Lancer le frontend
echo ====== LANCEMENT FRONTEND ======
start "Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak

REM Lancer l'admin
echo ====== LANCEMENT ADMIN ======
start "Admin" cmd /k "cd admin && npm run dev"

echo.
echo ✅ TOUS LES SERVICES LANCÉS!
echo.
echo Accès:
echo - Frontend: http://localhost:5173
echo - Admin: http://localhost:5174
echo - Backend: http://localhost:4000
echo.
echo Admin Login: admin@example.com / admin123
echo.
pause
