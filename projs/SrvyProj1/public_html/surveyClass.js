/*
 Author: Omar Lopez Vie
 Class: CSC 17B
 Written on 10/11/17
 */

function Survey(d) {
    this.qstnsN;
    this.qstns = new Array();
    this.desc = d;
    this.results = new Array();
}

Survey.prototype.setQstnsi = function (n) {
    this.qstnsN = n;
};

Survey.prototype.getQstnsi = function () {
    return this.qstnsN;
};

Survey.prototype.getDesc = function () {
    return this.desc;
};

Survey.prototype.getForm = function (url) {
    var info = url.split("?");
    var nameValuePairs = info[1].split("&");
    var $_GET = new Object;
    for (var i = 0; i < nameValuePairs.length; i++) {
        var map = nameValuePairs[i].split("=");
        var name = map[0];
        var value = map[1];
        $_GET[name] = value;
    }
    return $_GET;
};

Survey.prototype.setResults = function () {
    var url = document.location.href;
    $_GET = this.getForm(url);
    for (var property in $_GET) {
        var str = $_GET[property];          //Place property value in string
        var dec = decodeURIComponent(str);  //Convert to ascii
        var clean = dec.replace(/\++/g, ' ');//Remove + and replace by space
        $_GET[property] = clean;            //Cleaned values
    }
    //Use JSON to turn into a string
    var text = JSON.stringify($_GET);
    this.results.push(text);
    localStorage.setItem("Testing", this.results);
};

Survey.prototype.showResults = function () {
    text = localStorage.getItem("Testing");
    var obj = JSON.parse(text);
    var counter = 0;
    document.write('<h1 class="title">Results ' + (counter + 1) + "</h1>");
    for (var property in obj) {
        document.write('<p class="results">' + property + " = " + obj[property] + "</p></br>");
    }
    counter++;
    for (var i = 0; i < this.results.length; i++) {
        console.log(this.results[i]);
    }
    document.write('<form method="get" action="index.html"></br><button type="submit" class="submit">Take Survey Again</button></form>');
};

Survey.prototype.setQstns = function () {
    //Grab the info from the form
    var url = document.location.href;
    var $_GET = this.getForm(url);
    var counter = 0;
    var answers = new Array();
    for (var property in $_GET) {
        var str = $_GET[property];          //Place property value in string
        var dec = decodeURIComponent(str);  //Convert to ascii
        var clean = dec.replace(/\++/g, ' ');//Remove + and replace by space
        $_GET[property] = clean;            //Cleaned values
        counter++;
        if (counter > 2 && clean !== "" && clean !== "Submit")
            answers.push(clean);
    }
    var a = new Question($_GET["Number"], $_GET["Question"], answers);
    this.qstns.push(a);
};

Survey.prototype.display = function () {
    document.write('<form action="getResp.html" method="get">');
    for (var i = 0; i < this.qstns.length; i++)
    {
        document.write('<div class="questions"><p class="title">' + this.qstns[i].qstn + '</p><br>');
        for (var j = 0; j < (this.qstns[i].ans.length); j++)
        {
            document.write('<input type="radio" name=' + this.qstns[i].cat + " value=" + this.qstns[i].ans[j] + "><label>" + this.qstns[i].ans[j] + "</label><br>");
        }
        document.write('</div>');
    }
    document.write('</br><input type="submit" value="Submit" class="submit">');
};

Survey.prototype.displayQ = function () {
    var url = document.location.href;
    var $_GET = this.getForm(url);
    var u = $_GET.user;
    document.write('<h1 class="title">Formulate Your Question ' + u + '</h1>');
    document.write('<div class="set"><form action="survey.html" method="get">');
        document.write('<input name="Number" value="new" type="text"/></br><label>Category</label><br></br>' +
                '<input name="Question" type="text" /></br><label>Question</label><br></br>' +
                '<input name="Answer1" type="text" /></br><label>Answer1</label><br></br>' +
                '<input name="Answer2" type="text" /></br><label>Answer2</label><br></br>' +
                '<input name="Answer3" type="text" /></br><label>Answer3</label><br></br>' +
                '<input name="Answer4" type="text" /></br><label>Answer4</label><br></br>' +
                '<input name="Answer5" type="text" /></br><label>Answer5</label><br></br><hr id="line">');
    document.write('<input name="Submit" class="input" type="submit" /></form></div></br>');
};

Survey.prototype.askU = function () {
    document.write('<div id="ask"><p class="title">Generate Your Own Survey</p><form id="email_form" action="index.html" method="get">');
    document.write('<input type="text" class="questions" name="user"><label>User Name</label><ul><li>a-z, 0-9 , underscore , hyphen</li><li>Length at least 3 characters and maximum length of 15</li></ul><input value="Submit"  type="submit" /></form></div>');
};

Survey.prototype.validate = function () {
    var reg = /^[a-z0-9_-]{3,15}$/;
    var url = document.location.href;
    var $_GET = this.getForm(url);
    if (reg.test($_GET.user) === false) {
        alert("Invalid User Name. Please Enter a Valid One.");
        window.location.replace("validation.html");

        return false;
    }
};

/* var questions=[{cat:"pizza",qstn:"Best Pizza?",ans:["Pepperoni","Extra cheese","Sausage"]},
 {cat:"video",qstn:"Best Video Game Console?",ans:["PS4","XBox One","Nintendo Switch"]},
 {cat:"college",qstn:"Best College Subject?",ans:["Mathematics","Physics","Computer Programming"]},
 {cat:"comp",qstn:"Best Programming Language ?",ans:["Cplusplus","JavaScript","Phyton"]},
 {cat:"optr",qstn:"Best Operating System?",ans:["Windows","IOS","Linux"]}];*/
    