class shoppingCart {
  constructor () {
    this.db = JSON.parse( localStorage.getItem('cart') ) || [];
    this.db.total = this.db.total || 0;
    this.db.shipping = this.db.shipping || 0;
    this.db.time = this.db.time || 0;
    this.elements = {
            list: document.getElementById("products"),
            items: document.querySelectorAll("#products li"),
            result: document.querySelectorAll(".cartresult"),
            reset: document.getElementById("reset"),
            cart: document.getElementById("cart"),
            totaltarget: document.querySelectorAll(".total-target"),
            total_template: document.getElementById("total-template"),
            template: document.getElementById("template"),

    }
    this.init()
  }
  init() {
        var t = this.elements.template;
        for (var e in database) {
            var i = t.cloneNode(!0);
            i.removeAttribute("id"),
            i.classList.remove("d-none"),
            i.querySelector(".card-img-top").src = database[e].image,
            i.querySelector(".card-title").prepend(e);
           
            var price = document.createElement("strong");
            price.classList.add("text-muted");
            price.innerHTML = `<br> price: ${database[e].price}$`;
            i.querySelector(".card-title").appendChild(price);
            var discount = document.createElement("strong");
             if(database[e].discount){
              discount.classList.add("text-danger");
              discount.innerHTML = `<br> discount: ${database[e].discount}$`;
              i.querySelector(".card-title").appendChild(discount);
              price.style.textDecoration = 'line-through';
              price.style.color = 'red';


             }
             
            var s = document.createElement("small");
            s.classList.add("text-muted"),
            s.innerHTML = ` shipping: ${database[e].shipping}$ <br> delivery: ${database[e].delivery}d `,
            i.querySelector(".card-footer").appendChild(s);
            var a = i.querySelector(".btn-primary");
            a.dataset.name = e,
            a.dataset.delivery = database[e].delivery,
            a.dataset.shipping = database[e].shipping,
            a.dataset.price = database[e].price,
            this.elements.list.appendChild(i);
            var r = document.querySelectorAll("#products > div")
              , n = 0;
            for (let t of r)
                setTimeout(function() {
                    t.classList.remove("faded")
                }, n),
                n += 100
        }
        document.addEventListener("click", t=>{
            if (t.target && t.target.classList.contains("btn-danger")) {
                this.findItemKey(t.target.dataset.name);
                this.updateCart(t.target.dataset.name, !0)
            } else
                t.target && t.target.classList.contains("cart-button") && (this.updateCart(t.target.dataset.name),
                this.render())
        }
        ),
        this.render(),
        this.resetEventListener()
    }
  resetEventListener() {
    this.elements.reset.addEventListener('click', (e)=>{
      this.db.items = []
      this.db.total = 0
      this.db.shipping = 0
      this.db.delivery = 0
      localStorage.setItem("cart", JSON.stringify( {shipping: 0, total: 0, items: [], delivery: 0 } ))
      this.render()
    })
  }
  findItemKey(t) {
        for (let e = 0; e < this.db.items.length; e++)
            if (this.db.items[e].name == t)
                return e
    }
     removeFromCart(t) {
        this.findItemKey(t)
    }
  updateCart(t, e=!1) {
        let i = this.findItemKey(t);
        e ? this.db.items[i].count > 1 ? this.db.items[i].count-- : this.db.items.shift(i) : void 0 !== i ? this.db.items[i].count++ : this.db.items.push({
            shipping: event.target.dataset.shipping,
            name: event.target.dataset.name,
            price: event.target.dataset.price,
            delivery: event.target.dataset.delivery,
            count: 1
        }),
        this.db.items.length > 0 ? (this.db.total = this.db.items.map(t=>t.price * t.count).reduce((t,e)=>Number(t) + Number(e)),
        this.db.shipping = this.db.items.map(t=>t.shipping),
        this.db.shipping = Math.max(...this.db.shipping),
        this.db.delivery = this.db.items.map(t=>t.delivery),
        this.db.delivery = Math.max(...this.db.delivery)) : (this.db.shipping = 0,
        this.db.total = 0,
        this.db.delivery = 0),
        localStorage.setItem("cart", JSON.stringify({
            shipping: this.db.shipping,
            total: this.db.total,
            items: this.db.items,
            delivery: this.db.delivery
        })),
        this.render()
    }
      render() {
        if (this.db.items = this.db.items || [],
        this.db.items.length > 0) {
            this.elements.cart.classList.remove("faded");
            for (let t = 0; t < this.elements.totaltarget.length; t++)
                this.elements.totaltarget[t].classList.remove("faded")
        } else {
            this.elements.cart.classList.add("faded");
            for (let t = 0; t < this.elements.totaltarget.length; t++)
                this.elements.totaltarget[t].classList.add("faded")
        }
        var t = document.createElement("div");
        this.db.items.forEach(e=>{
            var i = document.createElement("li");
            i.classList += "list-group-item d-flex justify-content-between align-items-center ",
            i.innerHTML = `<span class="badge badge-info badge-pill mr-2">${e.count} </span>  ${e.name} - ${e.price}$ <span class="ml-auto mr-3 font-weight-bold">${(e.price * e.count).toFixed(2)}$</span>`;
            var s = document.createElement("button");
            s.classList.add("btn", "btn-sm", "btn-danger"),
            s.dataset.name = e.name,
            s.innerHTML = "<i class='fa fa-close pointer-events-none'></i>",
            i.appendChild(s),
            t.appendChild(i)
        }
        );
        var e = this.elements.total_template;
        for (let t = 0; t < this.elements.totaltarget.length; t++)
            (e = e.cloneNode(!0)).removeAttribute("id"),
            e.classList.remove("d-none"),
            e.querySelector(".total").innerHTML = this.db.total ? this.db.total.toFixed(2) : 0,
            e.querySelector(".delivery").innerHTML = this.db.delivery ? this.db.delivery.toFixed(0) : 0,
            e.querySelector(".shipping").innerHTML = this.db.shipping ? this.db.shipping.toFixed(0) : 0,
            this.elements.totaltarget[t].innerHTML = e.innerHTML;
        for (let e = 0; e < this.elements.result.length; e++)
            this.elements.result[e].innerHTML = t.innerHTML
    }
}
var instaceOfCart = new shoppingCart;
