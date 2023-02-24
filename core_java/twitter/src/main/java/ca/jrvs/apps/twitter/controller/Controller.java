package ca.jrvs.apps.twitter.controller;

import ca.jrvs.apps.twitter.model.Tweet;
import ca.jrvs.apps.twitter.util.TwitterRuntimeException;

import java.util.List;

public interface Controller {

  /**
   * Parse user argument and post a tweet by calling service classes
   *
   * @param args
   * @return a posted tweet
   * @throws TwitterRuntimeException if args are invalid
   */
  Tweet postTweet(String[] args) throws TwitterRuntimeException;

  /**
   * Parse user argument and search a tweet by calling service classes
   *
   * @param args
   * @return a tweet
   * @throws TwitterRuntimeException if args are invalid
   */
  Tweet showTweet(String[] args) throws TwitterRuntimeException;

  /**
   * Parse user argument and delete tweets by calling service classes
   *
   * @param args
   * @return a list of deleted tweets
   * @throws TwitterRuntimeException if args are invalid
   */
  List<Tweet> deleteTweet(String[] args) throws TwitterRuntimeException;
}