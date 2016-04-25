(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WhiteBoard = React.createClass({displayName: "WhiteBoard",
  render: function(){
    return (
      React.createElement("canvas", {ref: "ctx", id: "canvas", width: 325, height: 100})
    )
  },
  componentDidMount: function() {
    var ctx = document.querySelector("canvas").getContext("2d");
    var dashLen = ctx.dashLen = 220;
    var dashOffset = ctx.dashOffset = dashLen;
    var speed = ctx.speed = 5;    
    var txt = ctx.txt = "isPalindrome?";
    var x = 30;
    var i = 0;
    ctx.font = "70px Loved by the King"; 
    ctx.lineWidth = 1;
    ctx.lineJoin = "round"; 
    ctx.globalAlpha = 2/3;
    ctx.strokeStyle = ctx.fillStyle = "#009ACD";
    
    var loop = function() {
      ctx.clearRect(x, 0, 60, 150);
      ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);
      dashOffset -= speed;
      ctx.strokeText(txt[i], x, 90);
      if (dashOffset > 0){
        requestAnimationFrame(loop);
      } else {
        ctx.fillText(txt[i], x, 90);
        dashOffset = dashLen;
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
        ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
        ctx.rotate(Math.random() * 0.005);
        if (i < txt.length) requestAnimationFrame(loop);
      }
    }; loop()
  }
});

var FilterSearch = React.createClass({displayName: "FilterSearch",
  getInitialState: function(){
    return { searchString: '' };
  },

  handleChange: function(event){
    this.setState({searchString:event.target.value});
  },

  render: function() {
    var palindromes = this.props.words;
    var searchString = this.state.searchString.trim().toLowerCase();

    // filter function
    if(searchString.length >= 0){
      palindromes = palindromes.filter(function(palindrome){
        return palindrome.toLowerCase().match(searchString);
      });
    }

    return (
      React.createElement("div", null, 
        React.createElement("h3", null, "Check by Filtered Search:"), 
        React.createElement("input", {type: "text", value: this.state.searchString, onChange: this.handleChange, placeholder: "enter word"}), 
        React.createElement("ul", null, 
           palindromes.map(function(palindrome){return React.createElement("li", {key: palindrome}, palindrome, " ") })
        )
      )
    );
  }
});

var palindromes = [];
var getPalindromes = $.get('/palindromes.json', function(response) {
  $.each(response.results, function(key, val) {
    palindromes.push(val);
    palindromes.sort();
  });
});

var CheckPalindrome = React.createClass({displayName: "CheckPalindrome",

  handleInput: function(event) {
   this.setState({word: event.target.value});
  },

  render : function() {
    return (
      React.createElement("div", null, 
      React.createElement("h3", null, "Check by For Loop:"), 
      React.createElement("form", {id: "check-form"}, 
        React.createElement("input", {type: "text", name: "word", placeholder: "enter word", onChange: this.handleInput, onKeyDown: this.handleKeyDown}), 
        React.createElement("button", {type: "button", onClick: this.handleClick}, "Check")
      )
      )
    );
  },

  handleKeyDown: function(e){
    if(e.keyCode == 13) {
      e.preventDefault();
      this.handleClick();
    }
  },

  handleClick: function() {
    document.getElementById("check-form").reset();
    var word = this.state.word;
    var reverseWord = "";

    // decrementing for loop
    for (var i = word.length-1; i>=0; i--) {
      reverseWord += word[i].toLowerCase();
    }
    if (word.toLowerCase() === reverseWord) {
      React.render(
        React.createElement("p", null, "\"", word, "\" ", React.createElement("strong", null, "is"), " a palindrome!"),
        document.getElementById('result')
      );
    } else {
      React.render(
        React.createElement("p", null, "\"", word, "\" is ", React.createElement("strong", null, "NOT"), " a palindrome"),
        document.getElementById('result')
      );
    }
  }
});

React.render(
  React.createElement(WhiteBoard, null),
  document.getElementById('whiteboard')
);

React.render(
  React.createElement(FilterSearch, {words: palindromes}),
  document.getElementById('filter-search')
);

React.render(
  React.createElement(CheckPalindrome, null),
  document.getElementById('checker')
);

},{}]},{},[1])