package ca.jrvs.apps.twitter.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.util.List;

// https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/geo#coordinates
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "coordinates",
        "type"
})

public class Coordinates {
    @JsonProperty("coordinates")
    private List<Double> coordinate = null;

    @JsonProperty("type")
    private String type;

    public List<Double> getCoordinates() {
        return coordinate;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinate = coordinates;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
