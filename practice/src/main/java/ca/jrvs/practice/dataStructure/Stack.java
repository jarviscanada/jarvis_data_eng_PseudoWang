package ca.jrvs.practice.dataStructure;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple implementation of a generic Stack using ArrayList
 * Note that ArrayList can be substitute by a dynamically expanding array
 */
public class Stack<T> {

    private List<T> container;
    private int top; // Index

    public Stack() {
        container = new ArrayList<T>();
        top = -1;
    }

    public void push(T element) {
        container.add(element);
        top += 1;
    }

    public T pop() {
        // We don't have to remove the top element since new added element will substituting it
        T element = container.get(top);
        top -= 1;
        return element;
    }

    public boolean isEmpty() {
        return top == -1;
    }
}