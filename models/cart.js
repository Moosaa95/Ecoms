module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {}
    this.totalQty = oldCart.totalQty || 0
    this.totalPrice = oldCart.totalPrice || 0

    //add new items to the cart
    this.add = function(item, id) {
        const storedItem = this.items[id]
            //check if item exist else create a new one
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 }
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty
        this.totalQty++;
        this.totalPrice += storedItem.item.price
    }

    //give cart items as arrays
    this.generateArray = function() {
        const arr = []
        for (let id in this.items) {
            arr.push(this.items[id])
        }
        return arr
    }
}