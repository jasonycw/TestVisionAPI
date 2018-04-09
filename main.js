// consume
var alreadySetEnvVarForDevice = process.env.NOBLE_HCI_DEVICE_ID

// set
process.env['GOOGLE_APPLICATION_CREDENTIALS'] = './Testing Vision API.json';

function detectFulltext(fileName) {
    // [START vision_fulltext_detection]

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    const path = require('path');
    const fse = require('fs-extra');

    const gm = require('gm');
    var image = gm(fileName);
    image.fill("none");

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    var options = {
        imageContext: {
          languageHints: ["zh"],
        }
      };

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Read a local image as a text document
    client
        .documentTextDetection(fileName, options)
        .then(results => {
            var now = Date.now();
            var rawResult = "./result/" + path.basename(fileName) + '-' + now + ".raw.json";
            var outputImg = "./result/" + path.basename(fileName) + '-' + now + ".jpg";
            var resultFile = "./result/" + path.basename(fileName) + '-' + now + ".txt";

            fse.outputFile(rawResult, JSON.stringify(results))
                .then(() => console.log('Write raw to ' + rawResult + '!'))
                .catch(err => console.error(err));

            const fullTextAnnotation = results[0].fullTextAnnotation;
            console.log(`Full text: ${fullTextAnnotation.text}`);

            
            var result = `Full text:\n\n${fullTextAnnotation.text}\n\n`;
            fullTextAnnotation.pages.forEach(page => {
                page.blocks.forEach(block => {
                    result += `\tBlock confidence: ${block.confidence}\n`;
                    block.paragraphs.forEach(paragraph => {
                        result += `\t\tParagraph confidence: ${paragraph.confidence}\n`;
                        paragraph.words.forEach(word => {
                            const wordText = word.symbols.map(s => s.text).join('');
                            result += `\t\t\tWord text: ${wordText}\n`;
                            result += `\t\t\tWord confidence: ${word.confidence}\n`;
                            word.symbols.forEach(symbol => {
                                result += `\t\t\t\tSymbol text: ${symbol.text}\n`;
                                result += `\t\t\t\tSymbol confidence: ${symbol.confidence}\n`;
                            });

                            var wordVertices = word.boundingBox.vertices;
                            image.stroke("red").drawPolygon(
                                    [wordVertices[0].x, wordVertices[0].y], 
                                    [wordVertices[1].x, wordVertices[1].y], 
                                    [wordVertices[2].x, wordVertices[2].y], 
                                    [wordVertices[3].x, wordVertices[3].y]
                                );
                        });
                        var paragraphVertices = paragraph.boundingBox.vertices;
                        image.stroke("green").drawPolygon(
                            [paragraphVertices[0].x, paragraphVertices[0].y], 
                            [paragraphVertices[1].x, paragraphVertices[1].y], 
                            [paragraphVertices[2].x, paragraphVertices[2].y], 
                            [paragraphVertices[3].x, paragraphVertices[3].y]
                        );
                    });
                    var blockVertices = block.boundingBox.vertices;
                    image.stroke("blue").drawPolygon(
                        [blockVertices[0].x, blockVertices[0].y], 
                        [blockVertices[1].x, blockVertices[1].y], 
                        [blockVertices[2].x, blockVertices[2].y], 
                        [blockVertices[3].x, blockVertices[3].y]
                    );
                });
            });

            
            fse.outputFile(resultFile, result)
                .then(() => console.log('Write result to ' + resultFile + '!'))
                .catch(err => console.error(err));
            image.write(outputImg, function(err) {
                if(err)
                    console.error('ERROR:', err);
            });
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
    // [END vision_fulltext_detection]
}

function drawPolygon(fileName)
{
    var now = Date.now();
    const path = require('path');
    var outputImg = "./result/" + path.basename(fileName) + '-' + now + ".jpg";
    const gm = require('gm');
    var image = gm(fileName);
    image
    .fill("none")
    .stroke("red")
    .drawPolygon(
        [100, 200], 
        [300, 205], 
        [300, 300], 
        [100, 300]
    )
    .drawPolygon(
        [300, 400], 
        [400, 505], 
        [500, 100], 
        [600, 700]
    );
    image.write(outputImg, function(err) {
        if(err)
            console.error('ERROR:', err);
    });
}
//drawPolygon('./resources/test-menu2.jpg');
//detectFulltext('./resources/test-menu.jpg');
detectFulltext('./resources/test-menu2.jpg');
//detectFulltext('./resources/test-menu3.jpg');
//detectFulltext('./resources/test-menu4.jpg');