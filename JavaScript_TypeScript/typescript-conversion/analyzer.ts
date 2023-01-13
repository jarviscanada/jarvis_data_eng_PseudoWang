function analyzeCSS(content: string, cssRegex: RegExp, result: { [key: string]: any }) {
  result["contentType"] = "CSS";
  result["cssTargets"] = {};
  const cssList = content.match(cssRegex);
  if (cssList) {
    cssList.forEach((target) => {
      const cssTargetMatch = target.match(/\w*(?=\s*\{)/i);
      if (cssTargetMatch) {
        // match "xxx" from "xxx {"
        const cssTarget = cssTargetMatch[0];
        if (result["cssTargets"][cssTarget]) {
          result["cssTargets"][cssTarget]++;
        } else {
          result["cssTargets"][cssTarget] = 1;
        }
      }
    });
  }
}

function analyzeHTML(content: string, htmlRegex: RegExp, result: { [key: string]: any }) {
  result["contentType"] = "HTML";
  result["tags"] = {};
  const tagList = content.match(htmlRegex);
  if (tagList) {
    // trying to use `map` here
    tagList.map((tag) => {
      // match "xxx" from "<xxx>"
      const tagNameMatch = tag.match(/(?<=<)\w+(?=>)/i);
      if (tagNameMatch) {
        const tagName = tagNameMatch[0];
        if (result["tags"][tagName]) {
          result["tags"][tagName]++;
        } else {
          result["tags"][tagName] = 1;
        }
      }
    });
  }
}

function analyzeContent(content: string): { [key: string]: any } {
  let result: { [key: string]: any } = {};
  const cssRegex = /\w+\s*\{[\w\s#:;]*\}/gi;
  const htmlRegex = /<\w+>/gi;

  if (cssRegex.test(content)) {
    analyzeCSS(content, cssRegex, result);
  } else if (htmlRegex.test(content)) {
    analyzeHTML(content, htmlRegex, result);
  } else {
    result["contentType"] = "TEXT";
    result["lineNumber"] = content.split("\n").length;
  }
  return result;
}
