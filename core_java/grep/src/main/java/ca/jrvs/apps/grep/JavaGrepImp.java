package ca.jrvs.apps.grep;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.regex.Pattern;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JavaGrepImp implements JavaGrep {

    final Logger logger = LoggerFactory.getLogger(JavaGrepImp.class);

    private String regex;
    private String rootPath;
    private String outFile;

    @Override
    public void process() throws IOException {
        List<String> matchedLines = new LinkedList<>();
        for (File file : listFiles(getRootPath())) {
            for (String line : readLines(file)) {
                if (containsPattern(line)) {
                    matchedLines.add(line);
                }
            }
        }
        writeToFile(matchedLines);
    }

    @Override
    public List<File> listFiles(String rootDir) throws IOException {
        List<File> files = new LinkedList<>();
        File path = new File(rootDir);
        if (!path.exists())
            throw new IOException("\nRoot path does not exist.\n");
        else if (!path.isDirectory())
            throw new IOException("\nRoot path is not a directory.\n");
        File[] list = path.listFiles();
        if (list.length == 0)
            return files;

        // breadth first search
        Queue<File> queue = new LinkedList<>(Arrays.asList(list));
        while (!queue.isEmpty()) {
            File current = queue.poll();
            if (current.isDirectory()) {
                queue.add(current);
                continue;
            }
            files.add(current);
        }
        return files;
    }

    @Override
    public List<String> readLines(File inputFile) throws IOException {
        return Files.readAllLines(inputFile.toPath());
    }

    @Override
    public boolean containsPattern(String line) {
        try {
            if (Pattern.matches(getRegex(), line)) {
                return true;
            }
        } catch (IllegalArgumentException e) {
            logger.error("Please check the regex:\n{}", e.getMessage());
            System.exit(1);
        }
        return false;
    }

    @Override
    public void writeToFile(List<String> lines) throws IOException {
        File file = new File(getOutFile());
        try {
            boolean status = file.createNewFile();
            if (!status)
                throw new IOException("\nCreate output file failed.\n");
            FileWriter stream = new FileWriter(file);
            for (String line : lines)
                stream.write(line);
            stream.flush();
            stream.close();
        } catch (IOException e) {
            logger.error("Save output failed:\n{}", e.getMessage());
            System.exit(1);
        }
    }

    @Override
    public String getRootPath() {
        return rootPath;
    }

    @Override
    public void setRootPath(String rootPath) {
        this.rootPath = rootPath;
    }

    @Override
    public String getRegex() {
        return regex;
    }

    @Override
    public void setRegex(String regex) {
        this.regex = regex;
    }

    @Override
    public String getOutFile() {
        return outFile;
    }

    @Override
    public void setOutFile(String outFile) {
        this.outFile = outFile;
    }

    public static void main(String[] args) {
        // parameter number validation
        if (args.length != 3)
            throw new IllegalArgumentException("\nIllegal number of parameters.\nUsage: JavaGrep regex rootPath outFile\n");

        JavaGrepImp instance = new JavaGrepImp();
        instance.regex = args[0];
        instance.rootPath = args[1];
        instance.outFile = args[2];

        try {
            instance.process();
        } catch (IOException e) {
            instance.logger.error(e.getMessage());
            System.exit(1);
        }
        System.exit(0);
    }
}
