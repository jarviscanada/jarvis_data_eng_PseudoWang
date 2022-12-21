package ca.jrvs.apps.grep;

import java.io.File;
import java.io.IOException;
import java.util.stream.Stream;

/**
 * Define the methods for Java Grep Lambda implementation
 */
public interface JavaGrepLambda {

    /**
     * Top level search workflow
     * @throws IOException
     */
    void process() throws IOException;

    /**
     * Traversal files of rootDir
     * @param rootDir root directory
     * @return stream of files
     * @throws IOException
     */
    Stream<File> streamFiles(String rootDir) throws IOException;

    /**
     * Traversal lines of inputFile
     * @param inputFile input file
     * @return stream of lines
     * @throws IOException
     */
    Stream<String> readLines(File inputFile) throws IOException;

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
    void writeToFile(Stream<String> lines) throws IOException;

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
