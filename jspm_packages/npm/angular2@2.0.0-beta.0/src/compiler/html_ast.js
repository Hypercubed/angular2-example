/* */ 
'use strict';
var lang_1 = require('../facade/lang');
var HtmlTextAst = (function() {
  function HtmlTextAst(value, sourceSpan) {
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  HtmlTextAst.prototype.visit = function(visitor, context) {
    return visitor.visitText(this, context);
  };
  return HtmlTextAst;
})();
exports.HtmlTextAst = HtmlTextAst;
var HtmlAttrAst = (function() {
  function HtmlAttrAst(name, value, sourceSpan) {
    this.name = name;
    this.value = value;
    this.sourceSpan = sourceSpan;
  }
  HtmlAttrAst.prototype.visit = function(visitor, context) {
    return visitor.visitAttr(this, context);
  };
  return HtmlAttrAst;
})();
exports.HtmlAttrAst = HtmlAttrAst;
var HtmlElementAst = (function() {
  function HtmlElementAst(name, attrs, children, sourceSpan) {
    this.name = name;
    this.attrs = attrs;
    this.children = children;
    this.sourceSpan = sourceSpan;
  }
  HtmlElementAst.prototype.visit = function(visitor, context) {
    return visitor.visitElement(this, context);
  };
  return HtmlElementAst;
})();
exports.HtmlElementAst = HtmlElementAst;
function htmlVisitAll(visitor, asts, context) {
  if (context === void 0) {
    context = null;
  }
  var result = [];
  asts.forEach(function(ast) {
    var astResult = ast.visit(visitor, context);
    if (lang_1.isPresent(astResult)) {
      result.push(astResult);
    }
  });
  return result;
}
exports.htmlVisitAll = htmlVisitAll;
