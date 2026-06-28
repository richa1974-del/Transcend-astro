$path = "C:\Users\richa agarwal\.gemini\antigravity-ide\brain\1441746e-025d-4a78-80c4-7009a78439c8\.system_generated\logs\transcript.jsonl"
Get-Content $path | ForEach-Object {
    $d = $_ | ConvertFrom-Json
    if ($d.step_index -ge 190) {
        $shortContent = ""
        if ($d.content) {
            $shortContent = $d.content.Substring(0, [Math]::Min($d.content.Length, 200)).Replace("`r`n", " ").Replace("`n", " ")
        }
        Write-Output ("Idx: " + $d.step_index + " | Src: " + $d.source + " | Typ: " + $d.type + " | Content: " + $shortContent)
    }
}
