package ca.jrvs.apps.twitter;

import ca.jrvs.apps.twitter.controller.Controller;
import ca.jrvs.apps.twitter.controller.TwitterController;
import ca.jrvs.apps.twitter.dao.CrdDao;
import ca.jrvs.apps.twitter.dao.TwitterDao;
import ca.jrvs.apps.twitter.dao.helper.HttpHelper;
import ca.jrvs.apps.twitter.dao.helper.TwitterHttpHelper;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.service.TwitterService;
import ca.jrvs.apps.twitter.util.JsonUtil;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TwitterCLIApp {

    private Controller controller;
    public static final String USAGE = "USAGE: TwitterCLIApp post|show|delete [arguments]";

    public TwitterCLIApp(Controller controller) {
        this.controller = controller;
    }

    public static void main(String[] args) throws Exception {

        String consumerKey = System.getenv("consumerKey");
        String consumerSecret = System.getenv("consumerSecret");
        String accessToken = System.getenv("accessToken");
        String tokenSecret = System.getenv("tokenSecret");
        System.out.println(consumerKey + " | " + consumerSecret + " | " + accessToken + " | " + tokenSecret);

        HttpHelper httpHelper = new TwitterHttpHelper(consumerKey, consumerSecret, accessToken, tokenSecret);
        CrdDao<Tweet, String> dao = new TwitterDao(httpHelper);
        TwitterService service = new TwitterService(dao);
        TwitterController controller = new TwitterController(service);
        TwitterCLIApp app = new TwitterCLIApp(controller);
        app.start(args);
    }

    public void start(String[] args) throws TwitterRuntimeException {
        if (args == null || args.length == 0) {
            throw new IllegalArgumentException(USAGE);
        }

        switch (args[0].toLowerCase()) {
            case "post":
                printTweet(controller.postTweet(args));
                break;
            case "delete":
                controller.deleteTweet(args).forEach(this::printTweet);
                break;
            case "show":
                printTweet(controller.showTweet(args));
                break;
            default:
                break;
        }
    }

    private void printTweet(Tweet tweet) {
        try {
            System.out.println(JsonUtil.toJson(tweet, true, false));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

}