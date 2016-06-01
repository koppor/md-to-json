md-to-json
==========

A plugin to transform simple Markdown files into JSON files.

## Usage
First install the plugin

Then, add it to your gulpfile.js
```javascript
var md2json = require('md-to-json');
```

Use it:
```javascript
gulp.task('md2json_task', function() {
  return gulp.src('./file.md')
  .pipe(md2json.parse())
  .pipe(gulp.dest('.'));
})
```

## Example
Input: test.md
```markdown
# Name
My name

# Attributes
- Color Vision
- Hair on Head

# MDCode
      My name __is__ md:
      - A
      - B
      - C

# End Tag
Text

# Empty
```
Output: test.json
```json
{
  "Name": "My name",
  "Attributes": [
    "Color Vision",
    "Hair on Head"
  ],
  "MDCode": "My name __is__ md:\n- A\n - B\n- C",
  "End_Tag": "Text",
  "Empty": ""
}
```
