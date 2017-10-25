/* 
 Author: Omar Lopez Vie
 CSC 17B C++
 Project: Catalog
 Written on 10/20/2017
 */

function Catalog(n) {
    this.numberItems = n;
    this.arrItems = [n];
    this.cart = new Cart();
}

Catalog.prototype.setItems = function () {
    this.arrItems[0] = new Item("DFRobot DFR0282 Beetle Arduino-Compatible Microcontroller", "The new generation\" beetle\" controller derives its core notion from minimalism without compromising functionality.", 11.95, "images/item1.jpg");
    this.arrItems[1] = new Item("Adafruit Trinket - Mini Microcontroller - 3.3V Logic", "Trinket may be small, but do not be fooled by its size! It's a tiny microcontroller board, built around the Atmel ATtiny85, a little chip with a lot of power.", 8.95, "images/item2.jpg");
    this.arrItems[2] = new Item("Microcontrollers: From Assembly Language to C Using the PIC24 Family 2nd Edition", "This completely updated second edition of MICROCONTROLLERS: FROM ASSEMBLY LANGUAGE TO C USING THE PIC24 FAMILY covers assembly language, C programming, and hardware interfacing.", 54.68, "images/item3.jpg");
    this.arrItems[3] = new Item("Arduino Uno R3 Microcontroller A000066", "This is a genuine new Arduino Uno R3. The Arduino Uno is a microcontroller board based on the ATmega328.", 25.95, "images/item4.jpg");
};

Catalog.prototype.display = function () {
    document.write('<div class="cart"><h1>My Store<h1></a></div>');
    for (var i = 0; i < this.numberItems; i++) {
        var obj = this.arrItems[i];
        this.arrItems[i].show();
    }
};

Catalog.prototype.getForm = function (url) {
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

Catalog.prototype.displayCart = function (obj) {
    document.write('<table><tr><th>Name</th><th>Price</th></tr>');
    for (var property in obj) {
        var str = obj[property];          //Place property value in string
        var dec = decodeURIComponent(str);  //Convert to ascii
        var clean = dec.replace(/\++/g, ' ');
        var pos = clean.lastIndexOf("&");
        var pos2 = clean.lastIndexOf("=");
        var res1 = clean.substring(0, pos);//obj[property] = clean;
        var res = clean.substring((pos2 + 1));
        obj["name"] = res1;
        obj["price"] = res;
        document.write('<tr><td>' + obj["name"] + "</td><td>" + obj["price"] + "</td></tr>");
        this.cart.total += obj["price"] * 1;
    }
    document.write('<tr><td colspan="3" style="text-align:right !important;" >Total= ' + this.cart.total + '</td></tr></table></br><form action="end.html"><imput type="submit" class="submit" value="Proceed"/></form>');
    document.write('</br/br><form action="end.html"><button class="button button1">Proceed</button></form>');
};

Catalog.prototype.addItem = function () {
    var url = document.location.href;
    //Call the getForm function to place into an object
    var $_GET = this.getForm(url);
    var temp = JSON.stringify($_GET);
    localStorage.setItem("Cart", temp);
    //Retrieve from Inventory
    var str = localStorage.getItem("Cart");
    var obj = new Item();
    obj = JSON.parse(str);
    this.displayCart(obj);
};

Catalog.prototype.isValid = function () {
    var reg = /^[a-z0-9_-]{3,15}$/;
    var url = document.location.href;
    var $_GET = this.getForm(url);
    if (reg.test($_GET.user) === false) {
        alert("Invalid User Name. Please Enter a Valid One.");
        window.location.replace("validation.html");

        return false;
    }
};

Catalog.prototype.askU = function () {
    document.write('<div id="ask"><p class="title">Catalog Login</p><form id="form"  action="index.html" method="get">');
    document.write('<input type="text" class="questions" name="user"><label>User Name</label><ul><li>a-z, 0-9 , underscore , hyphen</li><li>Length at least 3 characters and maximum length of 15</li></ul><input class="button button1" value="Submit"  type="submit" /></form></div></br></form></div>');
};

function Cart() {
    this.num = 0;
    this.arrItemsCart = [];
    this.total = 0;
}

var catalog = new Catalog(4);

