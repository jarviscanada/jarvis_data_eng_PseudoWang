package ca.jrvs.apps.twitter.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

// https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/entities#hashtags
@JsonInclude(JsonInclude.Include.NON_NULL)

public class Hashtag {
    @JsonProperty("indices")
    private List<Integer> indices;

    @JsonProperty("text")
    private String text;

    public List<Integer> getIndices() {
        return indices;
    }

    public void setIndices(List<Integer> indices) {
        this.indices = indices;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
