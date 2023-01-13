var MyNode = /** @class */ (function () {
    function MyNode() {
    }
    return MyNode;
}());
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.size = 0;
    }
    DoublyLinkedList.prototype.push = function (val) {
        var newTail = new MyNode();
        newTail.val = val;
        if (this.size === 0)
            this.head = this.tail = newTail;
        else {
            var oldTail = this.tail;
            newTail.prev = oldTail;
            if (oldTail)
                oldTail.next = newTail;
            this.tail = newTail;
        }
        ++this.size;
    };
    DoublyLinkedList.prototype.pop = function () {
        // if statement to avoid `object might be null` error
        if (this.tail) {
            var oldTail = this.tail;
            var newTail = this.tail.prev ? this.tail.prev : null;
            oldTail.prev = null;
            if (newTail)
                newTail.next = null;
            this.tail = newTail;
            --this.size;
            if (this.size === 0)
                this.head = this.tail = null;
            return oldTail.val;
        }
        return null;
    };
    DoublyLinkedList.prototype.shift = function () {
        // if statement to avoid `object might be null` error
        if (this.head) {
            var oldHead = this.head;
            var newHead = this.head.next ? this.head.next : null;
            oldHead.next = null;
            if (newHead)
                newHead.prev = null;
            this.head = newHead;
            --this.size;
            if (this.size === 0)
                this.head = this.tail = null;
            return oldHead.val;
        }
        return null;
    };
    DoublyLinkedList.prototype.unshift = function (val) {
        var newHead = new MyNode();
        newHead.val = val;
        if (this.size === 0)
            this.tail = this.head = newHead;
        else {
            var oldHead = this.head;
            newHead.next = oldHead;
            if (oldHead)
                oldHead.prev = newHead;
            this.head = newHead;
        }
        ++this.size;
    };
    return DoublyLinkedList;
}());
