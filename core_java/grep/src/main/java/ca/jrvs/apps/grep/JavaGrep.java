package ca.jrvs.apps.grep;

import java.io.File;
import java.io.IOException;
import java.util.List;

/**
 * Define the methods for Java Grep
 */
public interface JavaGrep {

    /**
     * Top level search workflow
     * @throws IOException if input is illegal
     */
    void process() throws IOException;

    /**
     * Listing files of rootDir
     * @param rootDir root directory
     * @return list of files
     * @throws IOException if input is incorrect
     */
    List<File> listFiles(String rootDir) throws IOException;

    /**
     * Listing lines of inputFile
     * @param inputFile input file
     * @return list of lines
     * @throws IOException if input is incorrect
     */
    List<String> readLines(File inputFile) throws IOException;

    /**
     * Check if input line contains regex pattern
     * @param line input line
     * @return true if contains regex pattern
     */
    boolean containsPattern(String line);

    /**
     * Write lines into output file
     * @param lines
     * @throws IOException
     */
    void writeToFile(List<String> lines) throws IOException;

    /**
     * Getter for root path
     * @return root path to get
     */
    String getRootPath();

    /**
     * Setter for root path
     * @param rootPath root path to set
     */
    void setRootPath(String rootPath);

    /**
     * Getter for regex
     * @return regex to get
     */
    String getRegex();

    /**
     * Setter for regex
     * @param regex regex to set
     */
    void setRegex(String regex);

    /**
     * Getter for output file
     * @return output file to get
     */
    String getOutFile();

    /**
     * Setter for output file
     * @param outFile output file to set
     */
    void setOutFile(String outFile);
}
