# Test the chat endpoint
$body = @{
    user_message = "What services do you offer?"
} | ConvertTo-Json

Write-Host "Testing chat endpoint..." -ForegroundColor Cyan
Write-Host "Request body: $body" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Yellow
    $response | ConvertTo-Json -Depth 10
    Write-Host ""
    Write-Host "AI Message:" -ForegroundColor Cyan
    Write-Host $response.response -ForegroundColor White
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}
