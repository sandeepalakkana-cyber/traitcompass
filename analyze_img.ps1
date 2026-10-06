Add-Type -AssemblyName System.Drawing
$path = 'C:\Users\sandeepaj\.gemini\antigravity\brain\f30aa745-8607-435f-a184-4c7315e79486\.user_uploaded\media_1790909861978.png'
$bmp = New-Object System.Drawing.Bitmap($path)

$colorMap = @{}
for ($y = 0; $y -lt $bmp.Height; $y += 5) {
    for ($x = 0; $x -lt $bmp.Width; $x += 5) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 200 -and ($p.R -lt 250 -or $p.G -lt 250 -or $p.B -lt 250)) {
            $hex = "#{0:X2}{1:X2}{2:X2}" -f $p.R, $p.G, $p.B
            # classify into Orange vs Berry
            $isOrange = ($p.R -gt 200 -and $p.G -gt 50 -and $p.B -lt 100)
            $isBerry = ($p.R -gt 80 -and $p.B -gt 50 -and $p.G -lt 60)
            # count
        }
    }
}
Write-Host "Sampled colors in image."
$bmp.Dispose()
