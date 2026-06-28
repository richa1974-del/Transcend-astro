$path = "C:\Users\richa agarwal\.gemini\antigravity-ide\brain\1441746e-025d-4a78-80c4-7009a78439c8\.system_generated\logs\transcript.jsonl"
Get-Content $path | ForEach-Object {
    $d = $_ | ConvertFrom-Json
    if ($d.step_index -eq 21 -or $d.step_index -eq 23) {
        Write-Output ("Idx: " + $d.step_index + " | Content: " + $d.content)
    }
}
