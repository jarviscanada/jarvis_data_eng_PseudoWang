package ca.jrvs.apps.twitter.dao.helper;

import ca.jrvs.apps.twitter.util.TwitterRuntimeException;
import java.io.IOException;
import java.net.URI;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.HttpMethod;
import oauth.signpost.OAuthConsumer;
import oauth.signpost.commonshttp.CommonsHttpOAuthConsumer;
import oauth.signpost.exception.OAuthException;

@org.springframework.stereotype.Component
public class TwitterHttpHelper implements HttpHelper {

    private OAuthConsumer consumer;
    private HttpClient client;

    public TwitterHttpHelper(String consumerKey, String consumerSecret, String accessToken, String tokenSecret) {
        consumer = new CommonsHttpOAuthConsumer(consumerKey, consumerSecret);
        consumer.setTokenWithSecret(accessToken, tokenSecret);
        client = HttpClientBuilder.create().build();
    }

    @Override
    public HttpResponse httpPost(URI uri) throws TwitterRuntimeException {
        try {
            return executeHttpRequest(HttpMethod.POST, uri, null);
        } catch (OAuthException | IOException e) {
            throw new TwitterRuntimeException("Failed To Post");
        }
    }

    @Override
    public HttpResponse httpGet(URI uri) throws TwitterRuntimeException {
        try {
            return executeHttpRequest(HttpMethod.GET, uri, null);
        } catch (OAuthException | IOException e) {
            throw new TwitterRuntimeException("Failed To Get");
        }
    }

    private HttpResponse executeHttpRequest(HttpMethod method, URI uri, StringEntity entity)
            throws OAuthException, IOException, TwitterRuntimeException {
        if (method == HttpMethod.GET) {
            HttpGet request = new HttpGet(uri);
            consumer.sign(request);
            return client.execute(request);
        } else if (method == HttpMethod.POST) {
            HttpPost request = new HttpPost(uri);
            if (entity != null)
                request.setEntity(entity);
            consumer.sign(request);
            return client.execute(request);
        } else {
            throw new TwitterRuntimeException("Unknown HTTP Method: " + method.name());
        }
    }
}
