package ca.jrvs.apps.twitter.dao;

import ca.jrvs.apps.twitter.dao.helper.HttpHelper;
import ca.jrvs.apps.twitter.model.*;

public class TwitterDao implements CrdDao<Tweet, String> {

    private static final String API_BASE_URI = "https://api.twitter.com";
    private static final String POST_PATH = "/1.1/statuses/update.json";
    private static final String SHOW_PATH = "/1.1/statuses/show.json";
    private static final String DELETE_PATH = "/1.1/statuses/destroy";

    private static final String QUERY_SYM = "?";
    private static final String AMPERSAND = "&";
    private static final String EQUAL = "=";

    private static final int HTTP_OK = 200;
    private HttpHelper httpHelper;

    @Override
    public Tweet create(Tweet entity) {
        // TODO
        return null;
    }

    @Override
    public Tweet findById(String id) {
        // TODO
        return null;
    }

    @Override
    public Tweet deleteById(String id) {
        // TODO
        return null;
    }

}
