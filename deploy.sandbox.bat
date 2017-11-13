SET PWD=%cd%

rmdir %PWD%\PublishOutput /s /q

dotnet publish %PWD%\AureliaUiPoc.csproj --configuration Release --output %PWD%\PublishOutput\AureliaUiPoc

cd  %PWD%

cf target -s rubicon-sandbox

cf push -p PublishOutput\AureliaUiPoc -f manifest.sandbox.yml