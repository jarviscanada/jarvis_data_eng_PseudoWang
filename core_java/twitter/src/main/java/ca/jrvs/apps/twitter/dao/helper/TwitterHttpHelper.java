package ca.jrvs.apps.twitter.dao.helper;

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
        } catch (OAuthException | IOException | IllegalAccessException e) {
            throw new TwitterRuntimeException("Failed To Execute");
        }
    }

    @Override
    public HttpResponse httpGet(URI uri) throws TwitterRuntimeException {
        try {
            return executeHttpRequest(HttpMethod.GET, uri, null);
        } catch (OAuthException | IOException | IllegalAccessException e) {
            throw new TwitterRuntimeException("Failed To Execute");
        }
    }

    private HttpResponse executeHttpRequest(HttpMethod method, URI uri, StringEntity se)
            throws OAuthException, IOException, IllegalAccessException {
        if (method == HttpMethod.GET) {
            HttpGet request = new HttpGet(uri);
            consumer.sign(request);
            return client.execute(request);
        } else if (method == HttpMethod.POST) {
            HttpPost request = new HttpPost(uri);
            if (se != null) {
                request.setEntity(se);
            }
            consumer.sign(request);
            return client.execute(request);
        } else {
            throw new IllegalAccessException("Unknown HTTP Method: " + method.name());
        }
    }
}
