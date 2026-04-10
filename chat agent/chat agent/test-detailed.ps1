# Test with detailed error output
$body = @{
    user_message = "What services do you offer?"
} | ConvertTo-Json

Write-Host "Testing chat endpoint..." -ForegroundColor Cyan
Write-Host "Request body: $body" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
    
    $data = $response.Content | ConvertFrom-Json
    
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Response:" -ForegroundColor Yellow
    $data | ConvertTo-Json -Depth 10
    Write-Host ""
    if ($data.response) {
        Write-Host "AI Message:" -ForegroundColor Cyan
        Write-Host $data.response -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host ""
    
    # Try to get error response body
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Response:" -ForegroundColor Yellow
        Write-Host $errorBody -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Full Error:" -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor Red
}
