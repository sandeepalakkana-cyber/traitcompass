Add-Type -AssemblyName System.Drawing
$path = 'C:\Users\sandeepaj\.gemini\antigravity\brain\f30aa745-8607-435f-a184-4c7315e79486\.user_uploaded\media_1790909861978.png'
$b = [System.Drawing.Image]::FromFile($path)
Write-Host "Image size: $($b.Width) x $($b.Height)"
$b.Dispose()
