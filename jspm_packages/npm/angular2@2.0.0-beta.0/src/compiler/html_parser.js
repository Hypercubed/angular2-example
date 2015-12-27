/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var lang_1 = require('../facade/lang');
var collection_1 = require('../facade/collection');
var html_ast_1 = require('./html_ast');
var di_1 = require('../core/di');
var html_lexer_1 = require('./html_lexer');
var parse_util_1 = require('./parse_util');
var html_tags_1 = require('./html_tags');
var HtmlTreeError = (function(_super) {
  __extends(HtmlTreeError, _super);
  function HtmlTreeError(elementName, location, msg) {
    _super.call(this, location, msg);
    this.elementName = elementName;
  }
  HtmlTreeError.create = function(elementName, location, msg) {
    return new HtmlTreeError(elementName, location, msg);
  };
  return HtmlTreeError;
})(parse_util_1.ParseError);
exports.HtmlTreeError = HtmlTreeError;
var HtmlParseTreeResult = (function() {
  function HtmlParseTreeResult(rootNodes, errors) {
    this.rootNodes = rootNodes;
    this.errors = errors;
  }
  return HtmlParseTreeResult;
})();
exports.HtmlParseTreeResult = HtmlParseTreeResult;
var HtmlParser = (function() {
  function HtmlParser() {}
  HtmlParser.prototype.parse = function(sourceContent, sourceUrl) {
    var tokensAndErrors = html_lexer_1.tokenizeHtml(sourceContent, sourceUrl);
    var treeAndErrors = new TreeBuilder(tokensAndErrors.tokens).build();
    return new HtmlParseTreeResult(treeAndErrors.rootNodes, tokensAndErrors.errors.concat(treeAndErrors.errors));
  };
  HtmlParser = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], HtmlParser);
  return HtmlParser;
})();
exports.HtmlParser = HtmlParser;
var TreeBuilder = (function() {
  function TreeBuilder(tokens) {
    this.tokens = tokens;
    this.index = -1;
    this.rootNodes = [];
    this.errors = [];
    this.elementStack = [];
    this._advance();
  }
  TreeBuilder.prototype.build = function() {
    while (this.peek.type !== html_lexer_1.HtmlTokenType.EOF) {
      if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_START) {
        this._consumeStartTag(this._advance());
      } else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_CLOSE) {
        this._consumeEndTag(this._advance());
      } else if (this.peek.type === html_lexer_1.HtmlTokenType.CDATA_START) {
        this._closeVoidElement();
        this._consumeCdata(this._advance());
      } else if (this.peek.type === html_lexer_1.HtmlTokenType.COMMENT_START) {
        this._closeVoidElement();
        this._consumeComment(this._advance());
      } else if (this.peek.type === html_lexer_1.HtmlTokenType.TEXT || this.peek.type === html_lexer_1.HtmlTokenType.RAW_TEXT || this.peek.type === html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT) {
        this._closeVoidElement();
        this._consumeText(this._advance());
      } else {
        this._advance();
      }
    }
    return new HtmlParseTreeResult(this.rootNodes, this.errors);
  };
  TreeBuilder.prototype._advance = function() {
    var prev = this.peek;
    if (this.index < this.tokens.length - 1) {
      this.index++;
    }
    this.peek = this.tokens[this.index];
    return prev;
  };
  TreeBuilder.prototype._advanceIf = function(type) {
    if (this.peek.type === type) {
      return this._advance();
    }
    return null;
  };
  TreeBuilder.prototype._consumeCdata = function(startToken) {
    this._consumeText(this._advance());
    this._advanceIf(html_lexer_1.HtmlTokenType.CDATA_END);
  };
  TreeBuilder.prototype._consumeComment = function(startToken) {
    this._advanceIf(html_lexer_1.HtmlTokenType.RAW_TEXT);
    this._advanceIf(html_lexer_1.HtmlTokenType.COMMENT_END);
  };
  TreeBuilder.prototype._consumeText = function(token) {
    var text = token.parts[0];
    if (text.length > 0 && text[0] == '\n') {
      var parent_1 = this._getParentElement();
      if (lang_1.isPresent(parent_1) && parent_1.children.length == 0 && html_tags_1.getHtmlTagDefinition(parent_1.name).ignoreFirstLf) {
        text = text.substring(1);
      }
    }
    if (text.length > 0) {
      this._addToParent(new html_ast_1.HtmlTextAst(text, token.sourceSpan));
    }
  };
  TreeBuilder.prototype._closeVoidElement = function() {
    if (this.elementStack.length > 0) {
      var el = collection_1.ListWrapper.last(this.elementStack);
      if (html_tags_1.getHtmlTagDefinition(el.name).isVoid) {
        this.elementStack.pop();
      }
    }
  };
  TreeBuilder.prototype._consumeStartTag = function(startTagToken) {
    var prefix = startTagToken.parts[0];
    var name = startTagToken.parts[1];
    var attrs = [];
    while (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_NAME) {
      attrs.push(this._consumeAttr(this._advance()));
    }
    var fullName = getElementFullName(prefix, name, this._getParentElement());
    var selfClosing = false;
    if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END_VOID) {
      this._advance();
      selfClosing = true;
      if (html_tags_1.getNsPrefix(fullName) == null && !html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
        this.errors.push(HtmlTreeError.create(fullName, startTagToken.sourceSpan.start, "Only void and foreign elements can be self closed \"" + startTagToken.parts[1] + "\""));
      }
    } else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END) {
      this._advance();
      selfClosing = false;
    }
    var end = this.peek.sourceSpan.start;
    var el = new html_ast_1.HtmlElementAst(fullName, attrs, [], new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start, end));
    this._pushElement(el);
    if (selfClosing) {
      this._popElement(fullName);
    }
  };
  TreeBuilder.prototype._pushElement = function(el) {
    if (this.elementStack.length > 0) {
      var parentEl = collection_1.ListWrapper.last(this.elementStack);
      if (html_tags_1.getHtmlTagDefinition(parentEl.name).isClosedByChild(el.name)) {
        this.elementStack.pop();
      }
    }
    var tagDef = html_tags_1.getHtmlTagDefinition(el.name);
    var parentEl = this._getParentElement();
    if (tagDef.requireExtraParent(lang_1.isPresent(parentEl) ? parentEl.name : null)) {
      var newParent = new html_ast_1.HtmlElementAst(tagDef.parentToAdd, [], [el], el.sourceSpan);
      this._addToParent(newParent);
      this.elementStack.push(newParent);
      this.elementStack.push(el);
    } else {
      this._addToParent(el);
      this.elementStack.push(el);
    }
  };
  TreeBuilder.prototype._consumeEndTag = function(endTagToken) {
    var fullName = getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
    if (html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
      this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan.start, "Void elements do not have end tags \"" + endTagToken.parts[1] + "\""));
    } else if (!this._popElement(fullName)) {
      this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan.start, "Unexpected closing tag \"" + endTagToken.parts[1] + "\""));
    }
  };
  TreeBuilder.prototype._popElement = function(fullName) {
    for (var stackIndex = this.elementStack.length - 1; stackIndex >= 0; stackIndex--) {
      var el = this.elementStack[stackIndex];
      if (el.name == fullName) {
        collection_1.ListWrapper.splice(this.elementStack, stackIndex, this.elementStack.length - stackIndex);
        return true;
      }
      if (!html_tags_1.getHtmlTagDefinition(el.name).closedByParent) {
        return false;
      }
    }
    return false;
  };
  TreeBuilder.prototype._consumeAttr = function(attrName) {
    var fullName = mergeNsAndName(attrName.parts[0], attrName.parts[1]);
    var end = attrName.sourceSpan.end;
    var value = '';
    if (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_VALUE) {
      var valueToken = this._advance();
      value = valueToken.parts[0];
      end = valueToken.sourceSpan.end;
    }
    return new html_ast_1.HtmlAttrAst(fullName, value, new parse_util_1.ParseSourceSpan(attrName.sourceSpan.start, end));
  };
  TreeBuilder.prototype._getParentElement = function() {
    return this.elementStack.length > 0 ? collection_1.ListWrapper.last(this.elementStack) : null;
  };
  TreeBuilder.prototype._addToParent = function(node) {
    var parent = this._getParentElement();
    if (lang_1.isPresent(parent)) {
      parent.children.push(node);
    } else {
      this.rootNodes.push(node);
    }
  };
  return TreeBuilder;
})();
function mergeNsAndName(prefix, localName) {
  return lang_1.isPresent(prefix) ? "@" + prefix + ":" + localName : localName;
}
function getElementFullName(prefix, localName, parentElement) {
  if (lang_1.isBlank(prefix)) {
    prefix = html_tags_1.getHtmlTagDefinition(localName).implicitNamespacePrefix;
    if (lang_1.isBlank(prefix) && lang_1.isPresent(parentElement)) {
      prefix = html_tags_1.getNsPrefix(parentElement.name);
    }
  }
  return mergeNsAndName(prefix, localName);
}
