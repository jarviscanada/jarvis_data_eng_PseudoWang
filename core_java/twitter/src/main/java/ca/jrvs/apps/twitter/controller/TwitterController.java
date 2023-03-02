package ca.jrvs.apps.twitter.controller;

import ca.jrvs.apps.twitter.model.Coordinates;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.service.TwitterService;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import java.util.LinkedList;
import java.util.List;

@org.springframework.stereotype.Controller
public class TwitterController implements Controller {
    private static final String COORD_SEP = ":";
    private static final String COMMA = ",";
    TwitterService service;

    public TwitterController(TwitterService service) {
        this.service = service;
    }

    @Override
    public Tweet postTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 3 || args[1].equals("") || args[2].equals(""))
            throw new TwitterRuntimeException("USAGE: post \"tweetText\" \"long:lat\"");

        String text = args[1];
        String coord = args[2];
        String[] coordArray;
        Double longitude;
        Double latitude;
        Tweet tweet = new Tweet();
        Coordinates coordinates = new Coordinates();
        List<Double> coordinate = new LinkedList<>();

        try {
            coordArray = coord.split(COORD_SEP);
            longitude = Double.parseDouble(coordArray[0]);
            latitude = Double.parseDouble(coordArray[1]);
        } catch (Exception e) {
            throw new TwitterRuntimeException("Invalid Coordinates");
        }

        coordinate.add(longitude);
        coordinate.add(latitude);
        coordinates.setCoordinates(coordinate);
        tweet.setText(text);
        tweet.setCoordinates(coordinates);

        return service.postTweet(tweet);
    }

    @Override
    public Tweet showTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 2 || args[1].equals(""))
            throw new TwitterRuntimeException("USAGE: show \"tweetID\" ");

        String tweetID = args[1];
        return service.showTweet(tweetID, null);
    }

    @Override
    public List<Tweet> deleteTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 2 || args[1].equals(""))
            throw new TwitterRuntimeException("USAGE: delete \"tweetID1,tweetID2,tweetID3\"");

        String tweetIDs = args[1];
        String[] tweetIDArray = tweetIDs.split(COMMA);
        return service.deleteTweets(tweetIDArray);
    }
}
