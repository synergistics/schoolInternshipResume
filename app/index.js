function getOutput(str){
  if (str === "help"){
    return "Type in one of the following commands. stats | ambition | why | academia | contact";
  }
  
  return "";
}

function sanitizeCommand(str){
  var possibleCommands = ["help", "stats", "ambition", "why", "academia", "contact"];

  if (possibleCommands.indexOf(str.toLowerCase()) < 0) {
    return "";
  }

  return str.toLowerCase();
}

var CmdBox = React.createClass({

  render: function(){

    return React.createElement("div", { 
      "className": "cmdBox",
      "id": this.props.id
    },
      // children  
      React.createElement(
        "span",
        null,
        ">"
      ),
      
      React.createElement("input", { 
        type: "text",
        "className": "cmdLine",
        "onKeyUp": this.props.handleKeyUp,
        disabled: this.props.disabled,
        autoFocus: true,
        autoComplete: "off"
      }),
      
      React.createElement("div", { 
        "className": "cmdOutput"
      },
        this.props.outputText
      )
    );
  }
});

var Terminal = React.createClass({

  getInitialState: function(){
    return {
      count: 0,
      items: [
        {
          disabled: false,
          id: "entry0",
          handleKeyUp: this.handleKeyUp,
          outputText: ""
        } 
      ], 
    } 
  },

  handleKeyUp: function(e){

    if(e.keyCode === 13){
      var command = sanitizeCommand(e.target.value); 

      if (command !== "" && command !== "help"){
        openPanel(command); 
      }

      var current = this.state.items[this.state.count];
      current.disabled = true;
      current.outputText = getOutput(command);

      this.setState({

        count: this.state.count+1,

        items: this.state.items.concat([{
          disabled: false,
          id: "entry"+this.state.items.length,
          handleKeyUp: this.handleKeyUp,
          outputText: "" 
        }])

      });
    }
  },


  render: function(){
    return React.createElement(
      "div",
      null,
      //children
        this.state.items.map(function(e, i){
          return React.createElement(CmdBox, e);
        })
    )
  }
});

ReactDOM.render(React.createElement(Terminal), document.querySelector(".terminal"));

function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function openPanel(str){
  $(".content").find(".heading").text(toTitleCase(str));
  $(".content").children().not(".heading").css("display", "none");
  $(".content").find(".heading").css("display", "block");
  $(".content").find("."+str).css("display", "block");
}

