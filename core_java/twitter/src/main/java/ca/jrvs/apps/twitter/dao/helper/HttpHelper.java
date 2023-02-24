package ca.jrvs.apps.twitter.dao.helper;

import java.net.URI;
import org.apache.http.HttpResponse;

import ca.jrvs.apps.twitter.util.TwitterRuntimeException;

public interface HttpHelper {

  /**
   * Execute a HTTP Post call
   * @param uri
   * @return
   * @throws TwitterRuntimeException
   */
  HttpResponse httpPost(URI uri) throws TwitterRuntimeException;

  /**
   * Execute a HTTP Get call
   * @param uri
   * @return
   * @throws TwitterRuntimeException
   */
  HttpResponse httpGet(URI uri) throws TwitterRuntimeException;
}