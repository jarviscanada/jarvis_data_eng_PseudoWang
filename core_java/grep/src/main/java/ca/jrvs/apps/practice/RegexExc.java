package ca.jrvs.apps.practice;

public interface RegexExc {
    
    /**
     * judge if filename extension is jpg or jpeg
     * @param filename
     * @return true if filename extension is jpg or jpeg
     */
    public boolean matchJpeg(String filename);

    /**
     * judge if ip is valid
     * @param ip
     * @return true if ip is valid
     */
    public boolean matchIp(String ip);

    /**
     * judge if line is empty
     * @param line
     * @return true if line is empty
     */
    public boolean isEmptyLine(String line);
}
