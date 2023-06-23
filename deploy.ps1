npm run build

$sourceFilePath = ".\build\index.html"
$destinationFilePath = ".\build\404.html"
Copy-Item -Path $sourceFilePath -Destination $destinationFilePath
Write-Host "FILE COPY PASTED." -ForegroundColor Green

npm run deploy

$completionMessage = @"
 --------------------------------------------------------------------------
  _____    ______   _____    _         ____   __     __  ______   _____  
 |  __ \  |  ____| |  __ \  | |       / __ \  \ \   / / |  ____| |  __ \ 
 | |  | | | |__    | |__) | | |      | |  | |  \ \_/ /  | |__    | |  | |
 | |  | | |  __|   |  ___/  | |      | |  | |   \   /   |  __|   | |  | |
 | |__| | | |____  | |      | |____  | |__| |    | |    | |____  | |__| |
 |_____/  |______| |_|      |______|  \____/     |_|    |______| |_____/ 
                                                                        
 --------------------------------------------------------------------------

"@
Write-Host $completionMessage -ForegroundColor Green


pause