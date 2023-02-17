package ca.jrvs.apps.twitter.example;

import java.io.IOException;

import com.fasterxml.jackson.annotation.JsonInclude.*;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.*;

import ca.jrvs.apps.twitter.example.dto.Company;

public class JsonParser {
    public static String toJson(Object obj, boolean prettyJson, boolean nullValues) throws JsonProcessingException {
        ObjectMapper m = new ObjectMapper();
        if (!nullValues)
            m.setSerializationInclusion(Include.NON_NULL);
        if (prettyJson)
            m.enable(SerializationFeature.INDENT_OUTPUT);
        return m.writeValueAsString(obj);
    }

    public static <T> T toObject(String json, Class<T> cls) throws IOException {
        ObjectMapper m = new ObjectMapper();
        return m.readValue(json, cls);
    }

    public static final String CSTR = "{\n"
    + "   \"symbol\":\"AAPL\",\n"
    + "   \"companyName\":\"Apple Inc.\",\n"
    + "   \"exchange\":\"Nasdaq Global Select\",\n"
    + "   \"description\":\"Apple Inc is designs, manufactures and markets mobile communication and media devices and personal computers, and sells a variety of related software, services, accessories, networking solutions and third-party digital content and applications.\",\n"
    + "   \"CEO\":\"Timothy D. Cook\",\n"
    + "   \"sector\":\"Technology\",\n"
    + "   \"financials\":[\n"
    + "      {\n"
    + "         \"reportDate\":\"2018-12-31\",\n"
    + "         \"grossProfit\":32031000000,\n"
    + "         \"costOfRevenue\":52279000000,\n"
    + "         \"operatingRevenue\":84310000000,\n"
    + "         \"totalRevenue\":84310000000,\n"
    + "         \"operatingIncome\":23346000000,\n"
    + "         \"netIncome\":19965000000\n"
    + "      },\n"
    + "      {\n"
    + "         \"reportDate\":\"2018-09-30\",\n"
    + "         \"grossProfit\":24084000000,\n"
    + "         \"costOfRevenue\":38816000000,\n"
    + "         \"operatingRevenue\":62900000000,\n"
    + "         \"totalRevenue\":62900000000,\n"
    + "         \"operatingIncome\":16118000000,\n"
    + "         \"netIncome\":14125000000\n"
    + "      }\n"
    + "   ],\n"
    + "   \"dividends\":[\n"
    + "      {\n"
    + "         \"exDate\":\"2018-02-09\",\n"
    + "         \"paymentDate\":\"2018-02-15\",\n"
    + "         \"recordDate\":\"2018-02-12\",\n"
    + "         \"declaredDate\":\"2018-02-01\",\n"
    + "         \"amount\":0.63\n"
    + "      },\n"
    + "      {\n"
    + "         \"exDate\":\"2017-11-10\",\n"
    + "         \"paymentDate\":\"2017-11-16\",\n"
    + "         \"recordDate\":\"2017-11-13\",\n"
    + "         \"declaredDate\":\"2017-11-02\",\n"
    + "         \"amount\":0.63\n"
    + "      }\n"
    + "   ]\n"
    + "}";

    public static void main(String[] args) throws IOException {
        Company company = toObject(CSTR, Company.class);
        System.out.println(toJson(company, true, false));
    }
}
