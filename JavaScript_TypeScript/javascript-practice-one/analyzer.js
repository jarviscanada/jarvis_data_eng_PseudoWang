const analyzeContent = content => {
    let result = {};
    const cssRegex = /\w+\s*\{[\w\s#:;]*\}/gi;
    const htmlRegex = /<\w+>/gi;

    if (cssRegex.test(content)) {
        analyzeCSS(content, cssRegex, result);
    }
    else if (htmlRegex.test(content)) {
        analyzeHTML(content, htmlRegex, result);
    }
    else {
        result.contentType = "TEXT";
        result.lineNumber = content.split("\n").length;
    }
    return result;
};

const analyzeCSS = (content, cssRegex, result) => {
    result.contentType = "CSS";
    result.cssTargets = {};
    const cssList = content.match(cssRegex);
    cssList.forEach(target => {
        const cssTarget = target.match(/\w*(?=\s*\{)/i)[0]; // match "xxx" from "xxx {"
        if (result.cssTargets[cssTarget]) {
            result.cssTargets[cssTarget]++;
        } else {
            result.cssTargets[cssTarget] = 1;
        }
    });
};

const analyzeHTML = (content, htmlRegex, result) => {
    result.contentType = "HTML";
    result.tags = {};
    const tagList = content.match(htmlRegex);
    tagList.forEach(tag => {
        const tagName = tag.match(/(?<=<)\w+(?=>)/i)[0]; // match "xxx" from "<xxx>"
        if (result.tags[tagName]) {
            result.tags[tagName]++;
        } else {
            result.tags[tagName] = 1;
        }
    });
};