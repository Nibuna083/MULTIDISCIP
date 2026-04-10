# Test lead capture functionality
$body = @{
    user_message = "How much does it cost to build a mobile app?"
    session_id = "test-session-123"
} | ConvertTo-Json

Write-Host "Testing lead capture (pricing inquiry)..." -ForegroundColor Cyan
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host ""
    Write-Host "AI Response:" -ForegroundColor Yellow
    Write-Host $response.response -ForegroundColor White
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
