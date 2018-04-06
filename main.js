function detectFulltext(fileName) {
    // [START vision_fulltext_detection]

    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    /**
     * TODO(developer): Uncomment the following line before running the sample.
     */
    // const fileName = 'Local image file, e.g. /path/to/image.png';

    // Read a local image as a text document
    client
        .documentTextDetection(fileName)
        .then(results => {
        const fullTextAnnotation = results[0].fullTextAnnotation;
        console.log(`Full text: ${fullTextAnnotation.text}`);

        fullTextAnnotation.pages.forEach(page => {
            page.blocks.forEach(block => {
            console.log(`Block confidence: ${block.confidence}`);
            block.paragraphs.forEach(paragraph => {
                console.log(`Paragraph confidence: ${paragraph.confidence}`);
                paragraph.words.forEach(word => {
                const wordText = word.symbols.map(s => s.text).join('');
                console.log(`Word text: ${wordText}`);
                console.log(`Word confidence: ${word.confidence}`);
                word.symbols.forEach(symbol => {
                    console.log(`Symbol text: ${symbol.text}`);
                    console.log(`Symbol confidence: ${symbol.confidence}`);
                });
                });
            });
            });
        });
        })
        .catch(err => {
        console.error('ERROR:', err);
        });
    // [END vision_fulltext_detection]
}

detectFulltext('./resources/test-chinese.jpg');