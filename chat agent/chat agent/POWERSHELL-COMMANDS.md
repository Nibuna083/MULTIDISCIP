# PowerShell Testing Commands

Since PowerShell's `curl` is different from Unix curl, use these commands instead:

## Test Health Endpoint
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
```

## Test Chat Endpoint
```powershell
$body = @{
    user_message = "What services do you offer?"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
```

## Test Chat with Session ID
```powershell
$body = @{
    user_message = "How much does it cost?"
    session_id = "test-123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
```

## Alternative: Use Invoke-WebRequest for Full Response
```powershell
$body = @{
    user_message = "What services do you offer?"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:3000/chat" -Method Post -Body $body -ContentType "application/json"
$response.Content | ConvertFrom-Json
```

## Kill Process on Port (if needed)
```powershell
# Find process using port 3000
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess

# Kill the process (replace PID with actual process ID)
Stop-Process -Id <PID> -Force
```
