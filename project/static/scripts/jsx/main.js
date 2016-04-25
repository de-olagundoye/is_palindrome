var WhiteBoard = React.createClass({
  render: function(){
    return (
      <canvas ref="ctx" id="canvas" width={325} height={100}/>
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

var FilterSearch = React.createClass({
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
      <div>
        <h3>Check by Filtered Search:</h3>
        <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="enter word"/>
        <ul>
          { palindromes.map(function(palindrome){return <li key={palindrome}>{palindrome} </li> })}
        </ul>
      </div>
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

var CheckPalindrome = React.createClass({

  handleInput: function(event) {
   this.setState({word: event.target.value});
  },

  render : function() {
    return (
      <div>
      <h3>Check by For Loop:</h3>
      <form id="check-form">
        <input type="text" name="word" placeholder="enter word" onChange={this.handleInput} onKeyDown={this.handleKeyDown} />
        <button type="button" onClick={this.handleClick}>Check</button>
      </form>
      </div>
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
        <p>"{word}" <strong>is</strong> a palindrome!</p>,
        document.getElementById('result')
      );
    } else {
      React.render(
        <p>"{word}" is <strong>NOT</strong> a palindrome</p>,
        document.getElementById('result')
      );
    }
  }
});

React.render(
  <WhiteBoard/>,
  document.getElementById('whiteboard')
);

React.render(
  <FilterSearch words={palindromes} />,
  document.getElementById('filter-search')
);

React.render(
  <CheckPalindrome />,
  document.getElementById('checker')
);