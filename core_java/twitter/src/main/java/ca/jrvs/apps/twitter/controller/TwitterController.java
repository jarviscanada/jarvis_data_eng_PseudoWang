package ca.jrvs.apps.twitter.controller;

import ca.jrvs.apps.twitter.model.Coordinates;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.service.Service;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.LinkedList;
import java.util.List;

@org.springframework.stereotype.Controller
public class TwitterController implements Controller {
    private static final String COORD_SEP = ":";
    private static final String COMMA = ",";
    Service service;

    @Autowired
    public TwitterController(Service service) {
        this.service = service;
    }

    @Override
    public Tweet postTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 3)
            throw new TwitterRuntimeException("USAGE: post \"tweet text\" \"long:lat\"");

        String text = args[1];
        String coord = args[2];
        String[] coordArray = coord.split(COORD_SEP);
        Double longitude = Double.parseDouble(coordArray[0]);
        Double latitude = Double.parseDouble(coordArray[1]);
        Tweet tweet = new Tweet();
        Coordinates coordinates = new Coordinates();
        List<Double> coordinate = new LinkedList<>();

        coordinate.add(longitude);
        coordinate.add(latitude);
        coordinates.setCoordinates(coordinate);
        tweet.setText(text);
        tweet.setCoordinates(coordinates);

        return service.postTweet(tweet);
    }

    @Override
    public Tweet showTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 2)
            throw new TwitterRuntimeException("USAGE: show \"TweetID\" ");

        String tweetID = args[1];
        return service.showTweet(tweetID, null);
    }

    @Override
    public List<Tweet> deleteTweet(String[] args) throws TwitterRuntimeException {
        if (args.length != 2)
            throw new TwitterRuntimeException("USAGE: delete \"TweetID1,TweetID2,TweetID3\"");

        String tweetIDs = args[1];
        String[] tweetIDArray = tweetIDs.split(COMMA);
        return service.deleteTweets(tweetIDArray);
    }
}
