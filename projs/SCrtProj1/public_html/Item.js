/* 
 Author: Omar Lopez Vie
 CSC 17B C++
 Project: Catalog
 Written on 10/20/2017
 */

function Item(n, d, p, i) {
    this.name = n;
    this.desc = d;
    this.price = p;
    this.img = i;
}

Item.prototype.show = function () {
    document.write('<div class="block-level"></p><form action="cart.html" method="get"><img src="' + this.img + '" class="image"><h1 class"name">' + this.name +
            '</h1><p class="description">' + this.desc + '</br></br></br><input name="name" type="submit" value="'+this.name+'&'+'price='+this.price+'" class="button button1"></form></div>');
};