# Start the AI Agent Backend Server
# This opens a new PowerShell window to keep the server running

Write-Host "Starting AI Agent Backend in a new window..." -ForegroundColor Cyan
Write-Host "The server will run in a separate window." -ForegroundColor Yellow
Write-Host "Close that window when you want to stop the server." -ForegroundColor Yellow
Write-Host ""

# Start the server in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm start"

Write-Host "✅ Server started in new window!" -ForegroundColor Green
Write-Host ""
Write-Host "Now you can test the API:" -ForegroundColor Cyan
Write-Host "  .\test.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Or visit in browser:" -ForegroundColor Cyan
Write-Host "  http://localhost:3000/health" -ForegroundColor White
