function analyzeCSS(content, cssRegex, result) {
    result["contentType"] = "CSS";
    result["cssTargets"] = {};
    var cssList = content.match(cssRegex);
    if (cssList) {
        cssList.forEach(function (target) {
            var cssTargetMatch = target.match(/\w*(?=\s*\{)/i);
            if (cssTargetMatch) {
                // match "xxx" from "xxx {"
                var cssTarget = cssTargetMatch[0];
                if (result["cssTargets"][cssTarget]) {
                    result["cssTargets"][cssTarget]++;
                }
                else {
                    result["cssTargets"][cssTarget] = 1;
                }
            }
        });
    }
}
function analyzeHTML(content, htmlRegex, result) {
    result["contentType"] = "HTML";
    result["tags"] = {};
    var tagList = content.match(htmlRegex);
    if (tagList) {
        // trying to use `map` here
        tagList.map(function (tag) {
            // match "xxx" from "<xxx>"
            var tagNameMatch = tag.match(/(?<=<)\w+(?=>)/i);
            if (tagNameMatch) {
                var tagName = tagNameMatch[0];
                if (result["tags"][tagName]) {
                    result["tags"][tagName]++;
                }
                else {
                    result["tags"][tagName] = 1;
                }
            }
        });
    }
}
function analyzeContent(content) {
    var result = {};
    var cssRegex = /\w+\s*\{[\w\s#:;]*\}/gi;
    var htmlRegex = /<\w+>/gi;
    if (cssRegex.test(content)) {
        analyzeCSS(content, cssRegex, result);
    }
    else if (htmlRegex.test(content)) {
        analyzeHTML(content, htmlRegex, result);
    }
    else {
        result["contentType"] = "TEXT";
        result["lineNumber"] = content.split("\n").length;
    }
    return result;
}
