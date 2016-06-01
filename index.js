var gutil = require('gulp-util');
var marked = require('marked');
var through = require('through2');

const PLUGIN_NAME = 'md-to-json';

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
};

var renderer = new Renderer();

marked.setOptions({
  renderer: renderer
});

function parse( text ){
  renderer.firstHeader = true;
  var json = '{' + marked( text ) + '}';
  json = json.replace(/""/g, '').replace(/:,/g, ':"",');
  json = JSON.parse(json);
  json = JSON.stringify(json, null, 2);

  return json;
}

this.parse = parse;

module.exports = function(){
  var stream = through.obj(function( file, enc, callback ){
    if (file.isStream()) {
        return self.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }
    if (file.isBuffer()) {
      var path = file.relative.split('.').shift(/\//g, '.');
      var inputParsed = parse(file.contents.toString(enc));

      file.path = gutil.replaceExtension(file.path, '.json');
      file.contents = new Buffer( inputParsed );
      this.push(file);
      callback();
    }
  });

  return stream;
};
