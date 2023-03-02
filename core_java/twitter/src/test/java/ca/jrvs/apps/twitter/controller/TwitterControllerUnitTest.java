package ca.jrvs.apps.twitter.controller;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.service.TwitterService;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TwitterControllerUnitTest {

    @Mock
    TwitterService service;

    @InjectMocks
    TwitterController controller;

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetInvalidParameter() throws TwitterRuntimeException {
        controller.postTweet(new String[] { "post", "text" });
    }

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetEmptyTest() throws TwitterRuntimeException {
        controller.postTweet(new String[] { "post", "", "32:64" });
    }

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetEmptyCoordinates() throws TwitterRuntimeException {
        controller.postTweet(new String[] { "post", "text", "" });
    }

    @Test(expected = TwitterRuntimeException.class)
    public void postTweetInvalidCoordinates() throws TwitterRuntimeException {
        controller.postTweet(new String[] { "post", "text", ":64" });
    }

    @Test
    public void showTweetTest() throws TwitterRuntimeException {
        Tweet comparison = new Tweet();
        comparison.setIdStr("123456789");
        comparison.setText("text");
        when(service.showTweet(any(), any())).thenReturn(comparison);
        Tweet tweet = controller.showTweet(new String[] { "post", "123456789" });
        assertEquals(comparison.getText(), tweet.getText());
        assertEquals(comparison.getIdStr(), tweet.getIdStr());
    }

    @Test(expected = TwitterRuntimeException.class)
    public void showTweetNoID() throws TwitterRuntimeException {
        controller.showTweet(new String[] { "post" });
    }

    @Test(expected = TwitterRuntimeException.class)
    public void showTweetEmptyID() throws TwitterRuntimeException {
        controller.showTweet(new String[] { "post", "" });
    }

    @Test(expected = TwitterRuntimeException.class)
    public void showTweetExtraParameter() throws TwitterRuntimeException {
        controller.showTweet(new String[] { "post", "123456789", "" });
    }
}
