package ca.jrvs.practice.dataStructure;

/**
 * A simple implementation of a generic Queue using fixed length array with dynamic head & tail
 * Note that fixed length array can be substitute by a dynamically expanding array
 */
public class Queue<E> {
    private E[] arr;
    // Default capacity is 10 (11 - 1 = 10)
    // Since we don't allow head equals tail in this implementation
    int range = 11;
    int head;
    int tail;

    @SuppressWarnings("unchecked")
    public Queue() {
        arr = (E[]) new Object[range];
    }

    // Specific capacity
    @SuppressWarnings("unchecked")
    public Queue(int capacity) {
        range = capacity;
        arr = (E[]) new Object[capacity + 1];
    }

    public int size() {
        if (head > tail)
            return range - (head - tail);
        else if (head < tail)
            return tail - head;
        else
            return 0;
    }

    public boolean isEmpty() {
        return size() == 0 ? true : false;
    }

    public E first() {
        if (!isEmpty())
            return arr[head];
        return null;
    }

    public void enqueue(E node) {
        // Check if queue is full
        if ((head < tail && (head == 0 && tail == range - 1)) || (head > tail && (head - tail == 1))) {
            System.out.println("Queue is full and cannot enqueue '" + node.toString() + "'");
            return;
        }
        // Find tail
        if (tail < range - 1) {
            arr[tail] = node;
            tail++;
        } else if (tail == range - 1) {
            arr[tail] = node;
            tail = 0;
        }
    }

    public E dequeue() {
        // Check if queue is empty
        if (isEmpty()) {
            return null;
        }
        // 判断出队位置
        if (head < range - 1) {
            head++;
            E return_element = arr[head - 1];
            arr[head - 1] = null;
            return return_element;
        } else if (head == range - 1) {
            head = 0;
            E return_element = arr[range - 1];
            arr[range - 1] = null;
            return return_element;
        }
        // If we clear element dequeued
        // Then we can allow head equals to tail in this implementation
        // Since we can check the size by checking element existence
        return null;
    }
}
