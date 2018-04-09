# TestVisionAPI
https://cloud.google.com/vision/docs/reference/libraries#client-libraries-install-nodejs

## Dependency
Need to install [ImageMagick](http://www.imagemagick.org/script/download.php) to output the result .jpg that show the boundary
![alt text](https://raw.githubusercontent.com/jasonycw/TestVisionAPI/master/screenshots/sampleOutput.png)


Need to download the Google application credentials JSON file and name it `Testing Vision API.json` in root folder
[![alt text](https://raw.githubusercontent.com/jasonycw/TestVisionAPI/master/screenshots/setupAuthintication.png)](https://cloud.google.com/vision/docs/libraries#client-libraries-install-nodejs)


### Credentials
`Error: Unexpected error while acquiring application default credentials: Could not load the default credentials. Browse to https://developers.google.com/accounts/docs/application-default-credentials for more information.`

Run `set GOOGLE_APPLICATION_CREDENTIALS=[PATH]` in the terminal --Should be obsolete now, included in code

### Enable Vision API
`Cloud Vision API has not been used in project testing-vision-api-123456 before or it is disabled. Enable it by visiting https://console.developers.google.com/apis/api/vision.googleapis.com/overview?project=testing-vision-api-123456 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.`

### Enable billing
`This API method requires billing to be enabled. Please enable billing on project #123456789012 by visiting https://console.developers.google.com/billing/enable?project=123456789012 then retry. If you enabled billing for this project recently, wait a few minutes for the action to propagate to our systems and retry.`


