package ca.jrvs.apps.twitter.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

// https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/entities
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Entities {
    @JsonProperty("hashtags")
    private List<Hashtag> hashtags;

    @JsonProperty("user_mentions")
    private List<UserMention> userMentions;

    public List<Hashtag> getHashtags() {
        return hashtags;
    }

    public void setHashtags(List<Hashtag> hashtags) {
        this.hashtags = hashtags;
    }

    public List<UserMention> getUserMentions() {
        return userMentions;
    }

    public void setUserMentions(List<UserMention> userMentions) {
        this.userMentions = userMentions;
    }
}