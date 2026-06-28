$path = "C:\Users\richa agarwal\.gemini\antigravity-ide\brain\1441746e-025d-4a78-80c4-7009a78439c8\.system_generated\logs\transcript.jsonl"
Get-Content $path | ForEach-Object {
    $d = $_ | ConvertFrom-Json
    if ($d.step_index -ge 20 -and $d.step_index -le 25) {
        Write-Output ("Idx: " + $d.step_index + " | Type: " + $d.type + " | ToolCalls: " + ($d.tool_calls | ConvertTo-Json -Depth 5))
    }
}
