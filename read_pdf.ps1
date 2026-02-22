$pdfPath = 'c:\Users\smart\Downloads\web-update-main\web-update-main\S_Rahul_Resume_10-Feb.pdf'
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$enc = [System.Text.Encoding]::Latin1
$str = $enc.GetString($bytes)
$matchResults = [regex]::Matches($str, '[\x20-\x7E]{8,}')
$lines = @()
foreach ($m in $matchResults) {
    $val = $m.Value.Trim()
    if ($val.Length -gt 12 -and $val -match '[A-Za-z]') {
        $lines += $val
    }
}
$lines | Select-Object -First 400 | Out-File -FilePath 'c:\Users\smart\Downloads\web-update-main\web-update-main\resume_text.txt' -Encoding UTF8
Write-Output "Done. Lines extracted: $($lines.Count)"
