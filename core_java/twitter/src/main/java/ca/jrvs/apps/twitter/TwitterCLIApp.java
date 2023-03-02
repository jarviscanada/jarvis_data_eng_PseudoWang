package ca.jrvs.apps.twitter;

import ca.jrvs.apps.twitter.util.JsonUtil;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import ca.jrvs.apps.twitter.controller.Controller;
import ca.jrvs.apps.twitter.controller.TwitterController;
import ca.jrvs.apps.twitter.dao.TwitterDao;
import ca.jrvs.apps.twitter.dao.helper.HttpHelper;
import ca.jrvs.apps.twitter.dao.helper.TwitterHttpHelper;
import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.service.TwitterService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Component;

@Component
public class TwitterCLIApp {

    private Controller controller;

    public TwitterCLIApp(Controller controller) {
        this.controller = controller;
    }

    public void run(String[] args) throws TwitterRuntimeException {
        if (args.length == 2 || args.length == 3) {
            switch (args[0].toLowerCase()) {
                case "post":
                    printTweet(controller.postTweet(args));
                    break;
                case "show":
                    printTweet(controller.showTweet(args));
                    break;
                case "delete":
                    controller.deleteTweet(args).forEach(t -> {
                        try {
                            printTweet(t);
                        } catch (TwitterRuntimeException e) {
                            e.printStackTrace();
                        }
                    });
                    break;
                default:
                    throw new TwitterRuntimeException("USAGE: TwitterApp post|show|delete [options]");
            }
        } else {
            throw new TwitterRuntimeException("USAGE: TwitterApp post|show|delete [options]");
        }
    }

    private void printTweet(Tweet tweet) throws TwitterRuntimeException {
        try {
            JsonUtil.toJson(tweet, true, false);
        } catch (JsonProcessingException e) {
            throw new TwitterRuntimeException("Convert Failed", e);
        }
    }

    public static void main(String[] args) throws TwitterRuntimeException {
        String consumerKey = System.getenv("consumerKey");
        String consumerSecret = System.getenv("consumerSecret");
        String accessToken = System.getenv("accessToken");
        String tokenSecret = System.getenv("tokenSecret");
        HttpHelper httpHelper = new TwitterHttpHelper(consumerKey, consumerSecret, accessToken, tokenSecret);
        TwitterDao dao = new TwitterDao(httpHelper);
        TwitterService service = new TwitterService(dao);
        Controller controller = new TwitterController(service);
        TwitterCLIApp app = new TwitterCLIApp(controller);

        app.run(args);
    }
}