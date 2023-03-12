package ca.jrvs.apps.twitter.service;

import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import ca.jrvs.apps.twitter.dao.TwitterDao;

import java.util.ArrayList;
import java.util.List;

@org.springframework.stereotype.Service
public class TwitterService implements Service {
    private TwitterDao twitterDao;

    public TwitterService(TwitterDao twitterDao) {
        this.twitterDao = twitterDao;
    }

    private void validateTweet(Tweet tweet) throws TwitterRuntimeException {
        final int TWITTER_LENGTH = 140;
        String tweetText;
        Double longitude;
        Double latitude;
        try {
            tweetText = tweet.getText();
            longitude = tweet.getCoordinates().getCoordinates().get(0);
            latitude = tweet.getCoordinates().getCoordinates().get(1);
        } catch (Exception e) {
            throw new TwitterRuntimeException("Invalid Tweet");
        }
        if (tweetText.length() > TWITTER_LENGTH)
            throw new TwitterRuntimeException("Invalid Tweet Length");
        if (tweet.getCoordinates() != null) {
            if (longitude < -180.0 || longitude > 180.0)
                throw new TwitterRuntimeException("Invalid Longitude");
            if (latitude < -90 || latitude > 90)
                throw new TwitterRuntimeException("Invalid Latitude");
        }
    }

    private boolean validateID(String id) {
        return id.matches("\\d+") && !id.equals("");
    }

    @Override
    public Tweet postTweet(Tweet tweet) throws TwitterRuntimeException {
        validateTweet(tweet);
        return twitterDao.create(tweet);
    }

    @Override
    public Tweet showTweet(String id, String[] fields) throws TwitterRuntimeException {
        if (validateID(id))
            return twitterDao.findById(id);
        else
            throw new TwitterRuntimeException("Invalid ID");
    }

    @Override
    public List<Tweet> deleteTweets(String[] ids) throws TwitterRuntimeException {
        List<Tweet> deletedTweets = new ArrayList<>();
        for (String id : ids)
            if (validateID(id))
                deletedTweets.add(twitterDao.deleteById(id));
            else
                throw new TwitterRuntimeException("Invalid ID");
        return deletedTweets;
    }
}
