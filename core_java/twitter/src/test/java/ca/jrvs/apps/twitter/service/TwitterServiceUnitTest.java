package ca.jrvs.apps.twitter.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import ca.jrvs.apps.twitter.dao.TwitterDao;
import ca.jrvs.apps.twitter.model.Coordinates;
import ca.jrvs.apps.twitter.model.Entities;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TwitterServiceUnitTest {
    @Mock
    TwitterDao dao;

    @InjectMocks
    TwitterService service;

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetTest() throws TwitterRuntimeException {
        Tweet tweet = new Tweet();
        tweet.setText("012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789");
        service.postTweet(tweet);
    }

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetInvalidLatitude() throws TwitterRuntimeException {
        Tweet tweet = new Tweet();
        tweet.setText("text");
        Coordinates coords = new Coordinates();
        List<Double> coordinates = new ArrayList<Double>();
        coordinates.add(45.0);
        coordinates.add(95.0);
        coords.setCoordinates(coordinates);
        tweet.setCoordinates(coords);
        service.postTweet(tweet);
    }

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetInvalidLongitude() throws TwitterRuntimeException {
        Tweet tweet = new Tweet();
        tweet.setText("text");
        Coordinates coords = new Coordinates();
        List<Double> coordinates = new ArrayList<Double>();
        coordinates.add(185.0);
        coordinates.add(45.0);
        coords.setCoordinates(coordinates);
        tweet.setCoordinates(coords);
        service.postTweet(tweet);
    }

    @Test
    public void showTweetTest() throws TwitterRuntimeException {
        Tweet tweet = new Tweet();
        Coordinates coordinates = new Coordinates();
        Entities entities = new Entities();
        tweet.setText("text");
        tweet.setCoordinates(coordinates);
        tweet.setEntities(entities);
        tweet.setId(Long.valueOf(123456789));
        tweet.setIdStr("123456789");
        tweet.setCreatedAt("2000-01-01");
        tweet.setRetweetCount(Long.valueOf(0));
        tweet.setFavoriteCount(Long.valueOf(0));
        tweet.setFavorited(Boolean.valueOf(false));
        tweet.setRetweeted(Boolean.valueOf(false));
        when(dao.findById(any())).thenReturn(tweet);
        Tweet result = service.showTweet("1234566789", new String[] {});

        assertNotNull(result.getId());
        assertNotNull(result.getIdStr());
        assertNotNull(result.getEntities());
        assertNotNull(result.getCoordinates());
        assertNotNull(result.getText());
        assertNotNull(result.getCreatedAt());
        assertNotNull(result.getFavoriteCount());
        assertNotNull(result.getRetweetCount());
        assertNotNull(result.getFavorited());
        assertNotNull(result.getRetweeted());
    }

    @Test(expected = TwitterRuntimeException.class)
    public void showTweetInvalidID() throws TwitterRuntimeException {
        service.showTweet("123456789A", new String[] { "text", "id", "id_str" });
    }

    @Test
    public void deleteTweetsAmount() throws TwitterRuntimeException {
        String[] ids = new String[] { "123", "456", "789" };
        when(dao.deleteById(any())).thenReturn(new Tweet());
        List<Tweet> deletedTweets = service.deleteTweets(ids);
        assertEquals(3, deletedTweets.size());
    }
}
