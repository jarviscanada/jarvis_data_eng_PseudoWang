package ca.jrvs.apps.twitter.dao;

import ca.jrvs.apps.twitter.dao.helper.HttpHelper;
import ca.jrvs.apps.twitter.dao.helper.TwitterRuntimeException;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.JsonUtil;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;

public class TwitterDao implements CrdDao<Tweet, String> {

    private static final String API_BASE_URI = "https://api.twitter.com";
    private static final String POST_PATH = "/1.1/statuses/update.json";
    private static final String SHOW_PATH = "/1.1/statuses/show.json";
    private static final String DELETE_PATH = "/1.1/statuses/destroy/";

    private static final String QUERY_SYM = "?";
    private static final String AMPERSAND = "&";
    private static final String EQUAL = "=";

    private static final int HTTP_OK = 200;

    private HttpHelper httpHelper;

    public TwitterDao(HttpHelper httpHelper) {
        this.httpHelper = httpHelper;
    }

    public URI getPostUri(Tweet tweet) throws URISyntaxException {
        return new URI(API_BASE_URI + POST_PATH + QUERY_SYM + "status" + EQUAL + tweet.getText() + AMPERSAND
                + "lat" + EQUAL + tweet.getCoordinates().getCoordinates().get(0) + AMPERSAND + "long"
                + EQUAL + tweet.getCoordinates().getCoordinates().get(1));
    }

    public URI getShowUri(String id) throws URISyntaxException {
        return new URI(API_BASE_URI + SHOW_PATH + QUERY_SYM + "id" + EQUAL + id);
    }

    public URI getDelUri(String id) throws URISyntaxException {
        return new URI(API_BASE_URI + DELETE_PATH + id + ".json");
    }

    private Tweet parseResponseBody(HttpResponse response, Integer expectedStatusCode) throws TwitterRuntimeException {
        Tweet tweet = null;

        int status = response.getStatusLine().getStatusCode();
        if (status != expectedStatusCode) {
            try {
                System.out.println(EntityUtils.toString(response.getEntity()));
            } catch (IOException e) {
                System.out.println("Response has no entity");
            }
            throw new TwitterRuntimeException("Unexpected HTTP status:" + status);
        }

        if (response.getEntity() == null)
            throw new TwitterRuntimeException("Empty response body");

        String jsonStr;
        try {
            jsonStr = EntityUtils.toString(response.getEntity());
        } catch (IOException e) {
            throw new TwitterRuntimeException("Failed to convert entity to String", e);
        }

        try {
            tweet = JsonUtil.toObject(jsonStr, Tweet.class);
        } catch (IOException e) {
            throw new TwitterRuntimeException("Unable to convert JSON str to Object", e);
        }
        return tweet;
    }

    @Override
    public Tweet create(Tweet entity) throws TwitterRuntimeException {
        URI uri;
        try {
            uri = getPostUri(entity);
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid tweet input", e);
        }
        HttpResponse response = httpHelper.httpPost(uri);

        return parseResponseBody(response, HTTP_OK);
    }

    @Override
    public Tweet findById(String s) throws TwitterRuntimeException {
        URI uri;
        try {
            uri = getShowUri(s);
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid tweet id", e);
        }
        HttpResponse response = httpHelper.httpGet(uri);
        return parseResponseBody(response, HTTP_OK);
    }

    @Override
    public Tweet deleteById(String s) throws TwitterRuntimeException {
        URI uri;
        try {
            uri = getDelUri(s);
        } catch (URISyntaxException e) {
            throw new IllegalArgumentException("Invalid tweet id", e);
        }
        HttpResponse response = httpHelper.httpPost(uri);
        return parseResponseBody(response, HTTP_OK);
    }
}
