var gutil = require('gulp-util');
var marked = require('marked');
var jsontransform = require('gulp-json-transform');

function Renderer(options){
  this.options = options || {};
  this.firstHeader = true;
}

Renderer.prototype.code = function(code,lang,escaped){
  return JSON.stringify(code);
},

Renderer.prototype.blockquote = function(quote){
  return quote;
},

Renderer.prototype.heading = function(text,level,raw){
  if (this.firstHeader){
    this.firstHeader = false;
    return text.replace(/\s/g, '_') + ':';
  } else {
    return ',' + text.replace(/\s/g, '_') + ':';
  }
},

Renderer.prototype.hr = function(){
  return "";
},

Renderer.prototype.list = function(body, ordered){
  return "[" + body.replace(/,\s*$/, "").replace(/\n/g, "") + "]";
},

Renderer.prototype.listitem = function(text){
  return text+",";
},

Renderer.prototype.paragraph = function(text){
  return text;
},

Renderer.prototype.table = function(header, body){
  return;
},

Renderer.prototype.tablerow = function(content){
  return text;
},

Renderer.prototype.tablecell = function(content, flags){
  return text;
},

Renderer.prototype.strong = function(text){
  return text;
},

Renderer.prototype.em = function(text){
  return text;
},

Renderer.prototype.codespan = function(text){
  return text;
},

Renderer.prototype.br = function(text){
  return text;
},

Renderer.prototype.del = function(text){
  return text;
},

Renderer.prototype.link = function(href, title, text){
  return '"' + text + '"';
},

Renderer.prototype.image = function(href, title, text){
  return text;
},

Renderer.prototype.text = function(text){
  return '"' + text + '"';
},

marked.setOptions({
  renderer: new Renderer()
});

function parse( file ){
  if( !file.isBuffer() ) return;

  var path = file.relative.split('.').shift(/\//g, '.');
  var json = this.parseText(parse.body);

  file.path = gutil.replaceExtension(file.path, '.json');
  file.contents = new Buffer( markup );

  return file;
}

function parseText( text ){
  var mk = '{' + marked(text) + '}';
  mk = JSON.parse(mk);
  return JSON.stringify(mk, null, 2);
}

this.parse = parse;
this.parseText = parseText;
