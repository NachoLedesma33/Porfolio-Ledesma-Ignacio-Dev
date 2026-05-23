param (
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "=== Git Automated Commit & Push ===" -ForegroundColor Cyan

# Check git status
$status = git status --porcelain
if ([string]::IsNullOrEmpty($status)) {
    Write-Host "No hay cambios para hacer commit." -ForegroundColor Yellow
    exit 0
}

# Stage all files
Write-Host "Agregando cambios al área de preparación..." -ForegroundColor Gray
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al agregar archivos con 'git add'." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Perform the commit
Write-Host "Realizando commit con el mensaje: '$Message'..." -ForegroundColor Gray
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al realizar el commit." -ForegroundColor Red
    exit $LASTEXITCODE
}

# Push to remote
Write-Host "Subiendo cambios al repositorio remoto..." -ForegroundColor Gray
git push
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al subir cambios con 'git push'." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "¡Cambios confirmados y subidos con éxito!" -ForegroundColor Green
