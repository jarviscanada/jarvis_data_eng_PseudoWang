package ca.jrvs.apps.twitter.util;

import java.io.IOException;
import com.fasterxml.jackson.annotation.JsonInclude.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;

public class JsonUtil {
    private JsonUtil() {
    }

    public static String toJson(Object obj, boolean prettyJson, boolean nullValues) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        if (!nullValues)
            mapper.setSerializationInclusion(Include.NON_NULL);
        if (prettyJson)
            mapper.enable(SerializationFeature.INDENT_OUTPUT);
        return mapper.writeValueAsString(obj);
    }

    public static <T> T toObject(String json, Class<T> cls) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.readValue(json, cls);
    }
}
