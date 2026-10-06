Add-Type -AssemblyName System.Drawing

$size = 340
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::White)

# Draw what createTextMask renders for "74"
$font = New-Object System.Drawing.Font("Arial", 110, [System.Drawing.FontStyle]::Bold)
$brushWhite = [System.Drawing.Brushes]::White
$brushBlack = [System.Drawing.Brushes]::Black

# Mask bitmap
$maskBmp = New-Object System.Drawing.Bitmap($size, $size)
$maskG = [System.Drawing.Graphics]::FromImage($maskBmp)
$maskG.Clear([System.Drawing.Color]::Black)
$maskG.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

# Measure and draw 7 and 4 with spacing
$format = New-Object System.Drawing.StringFormat
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center

$cy = $size / 2 + 5
$maskG.DrawString("7", $font, $brushWhite, ($size/2 - 52), $cy, $format)
$maskG.DrawString("4", $font, $brushWhite, ($size/2 + 52), $cy, $format)

$maskBmp.Save('C:\Users\sandeepaj\.gemini\antigravity\scratch\color-vision-traitcompass\rendered_mask.png')
$maskG.Dispose()
$maskBmp.Dispose()
$g.Dispose()
$bmp.Dispose()
Write-Host "Saved rendered_mask.png"
