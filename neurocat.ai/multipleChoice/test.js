//TODO implement better event handling
//https://stackoverflow.com/questions/5933157/how-to-remove-an-html-element-using-javascript

function addButtons(texts){
    var parentId = document.getElementById("button_container");
    for (var i = 0; i < texts.length; i++) {
        var button = document.createElement("BUTTON");
        var text = document.createTextNode(texts[i]);
        button.appendChild(text);
        button.type = "button";
        button.id = i.toString();

        parentId.appendChild(button);
    }
}

function state1(){
    console.log("State 1");
    document.getElementById("question").innerHTML = "How important is AI for your business?";
    document.getElementById("text").innerHTML = "";

    addButtons(["Not relevant at all", "Don't know", "Very Important"]);

    //check if button was pressed
    document.getElementById('0').onclick = function() {
        removeButtons();
        state2();
    };

    document.getElementById('1').onclick = function() {
        removeButtons();
        state3();
    };

    document.getElementById('2').onclick = function() {
        removeButtons();
        state3();
    };

}

function state2(){
    console.log("State 2");
    document.getElementById("question").innerHTML = "How important is AI for your business?";
    document.getElementById("text").innerHTML = "Your news service needs an urgent update.";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state1();
    };

}

function state3(){
    console.log("State 3");
    document.getElementById("question").innerHTML = "Do you have someone in your team in charge of technology roadmap? (including AI)";
    document.getElementById("text").innerHTML = "";

    addButtons(["YES", "NO"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state5();
    };

    document.getElementById('1').onclick = function() {
        removeButtons();
        state4();
    };
}

function state4(){
    console.log("State 4");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "Promote CTO to CDO and earmark him to map AI technology";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state5();
    };
}

function state5(){
    console.log("State 5");
    document.getElementById("question").innerHTML = "Is any of these tools & technologies used in-house?)";
    document.getElementById("text").innerHTML = "";

    addButtons(["Yes", "NO"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state6();
    };

    document.getElementById('1').onclick = function() {
        removeButtons();
        state7();
    };
}

function state6(){
    console.log("State 6");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "Good! You didn't know it but your team seems to be very competent and" +
                            " is already leveraging AI. Now you should change top management mindset and make it a " +
                            "priority moving forward.";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state1();
    };
}

function state7(){
    console.log("State 7");
    document.getElementById("question").innerHTML = "Is any of your contractors/partners using them";
    document.getElementById("text").innerHTML = "";

    addButtons(["Don't know", "NO", "YES"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state8();
    };

    document.getElementById('1').onclick = function() {
        removeButtons();
        state10();
    };

    document.getElementById('2').onclick = function() {
        removeButtons();
        state9();
    };
}

function state8(){
    console.log("State 8");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "Tell your CDO t orun contractor tech-appraisal asap";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state7();
    };
}

function state9(){
    console.log("State 9");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "AI is two steps away from you. Your company is leveraging it indirectly" +
                            " without you noticing. Not bad, now is time to think if any of this should be in-house" +
                            " before your competitors do";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state3();
    };
}

function state10(){
    console.log("State 10");
    document.getElementById("question").innerHTML = "Are any of your competitors using them?";
    document.getElementById("text").innerHTML = "";

    addButtons(["YES", "NO"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state11();
    };

    document.getElementById('1').onclick = function() {
        removeButtons();
        state12();
    };
}

function state11(){
    console.log("State 11");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "Now you don't have a choice. Better off putting it into your priority" +
                            " list before competitors get an edge.";
    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state1();
    };
}

function state12(){
    console.log("State 12");
    document.getElementById("question").innerHTML = "";
    document.getElementById("text").innerHTML = "Think about it. This could be the greatest opportunity to differentiate" +
                            " and outsmart your competitors";

    addButtons(["Ok"]);

    document.getElementById('0').onclick = function() {
        removeButtons();
        state1();
    };
}

function removeButtons(){
    var parentId = document.getElementById("button_container");

    var childNodes = parentId.children;
    for(var i=childNodes.length-1;i >= 0;i--){
        var childNode = childNodes[i];
        childNode.parentNode.removeChild(childNode);
    }
}

