package ca.jrvs.apps.twitter.service;

import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import ca.jrvs.apps.twitter.dao.CrdDao;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class TwitterService implements Service {
    private CrdDao<Tweet, String> twitterDao;

    @Autowired
    public TwitterService(CrdDao<Tweet, String> twitterDao) {
        this.twitterDao = twitterDao;
    }

    private void validateTweet(Tweet tweet) {
        final int TWITTER_LENGTH = 200;
        String tweetText = tweet.getText();
        Double latitude = tweet.getCoordinates().getCoordinates().get(0);
        Double longitude = tweet.getCoordinates().getCoordinates().get(1);
        if (tweetText.length() > TWITTER_LENGTH) {
            String processedText = tweetText.substring(0, TWITTER_LENGTH - 1);
            tweet.setText(processedText);
        }
        if (tweet.getCoordinates() != null) {
            if (longitude < -180.0 || longitude > 180.0)
                throw new IllegalArgumentException("Longitude Invalid Range");

            if (latitude < -90 || latitude > 90)
                throw new IllegalArgumentException("Latitude Invalid Range");
        }
    }

    private boolean isValidID(String id) {
        return id.matches("\\d+");
    }

    @Override
    public Tweet postTweet(Tweet tweet) throws TwitterRuntimeException {
        validateTweet(tweet);
        return twitterDao.create(tweet);

    }

    @Override
    public Tweet showTweet(String id, String[] fields) throws TwitterRuntimeException {
        if (isValidID(id))
            return twitterDao.findById(id);
        else
            throw new IllegalArgumentException("Invalid ID");
    }

    @Override
    public List<Tweet> deleteTweets(String[] ids) throws TwitterRuntimeException {
        List<Tweet> deletedTweets = new ArrayList<>();
        for (String id : ids)
            if (isValidID(id))
                deletedTweets.add(twitterDao.deleteById(id));
            else
                throw new IllegalArgumentException("Invalid ID");
        return deletedTweets;
    }
}
