package ca.jrvs.apps.twitter.util;

public class TwitterRuntimeException extends Exception {
    public TwitterRuntimeException(String message) {
        super(message);
    }

    public TwitterRuntimeException(String message, Exception e) {
        super(message, e);
    }
}
