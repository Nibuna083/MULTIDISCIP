# Stop any running Node.js processes on port 3000

Write-Host "Checking for processes on port 3000..." -ForegroundColor Cyan

try {
    $processes = Get-Process -Id (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess -ErrorAction SilentlyContinue
    
    if ($processes) {
        Write-Host "Found processes on port 3000:" -ForegroundColor Yellow
        $processes | Select-Object Id, ProcessName | Format-Table
        
        foreach ($proc in $processes) {
            if ($proc.ProcessName -eq "node") {
                Write-Host "Stopping Node.js process (ID: $($proc.Id))..." -ForegroundColor Yellow
                Stop-Process -Id $proc.Id -Force
                Write-Host "✅ Stopped process $($proc.Id)" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "✅ No processes found on port 3000" -ForegroundColor Green
    }
} catch {
    Write-Host "✅ Port 3000 is free" -ForegroundColor Green
}

Write-Host ""
Write-Host "You can now start the server:" -ForegroundColor Cyan
Write-Host "  .\start-server.ps1" -ForegroundColor White
