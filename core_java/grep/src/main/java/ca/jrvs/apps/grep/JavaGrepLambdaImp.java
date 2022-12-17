package ca.jrvs.apps.grep;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.stream.Stream;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.log4j.BasicConfigurator;

public class JavaGrepLambdaImp implements JavaGrepLambda {
    final Logger logger = LoggerFactory.getLogger(JavaGrepLambdaImp.class);

    private String regex;
    private String rootPath;
    private String outFile;

    @Override
    public void process() throws IOException {
        streamFiles(getRootPath()).forEach(file -> readLines(file).forEach(line -> {
            if (containsPattern(line))
                writeToFile(line);
        }));
    }

    @Override
    public Stream<File> streamFiles(String rootDir) throws IOException {
        Path path = Path.of(rootDir);
        File file = new File(rootDir);

        if (!file.exists())
            throw new IOException("\nRoot path does not exist.\n");
        else if (!file.isDirectory())
            throw new IOException("\nRoot path is not a directory.\n");

        return Files.walk(path).filter(Files::isRegularFile).map(Path::toFile);
    }

    @Override
    public Stream<String> readLines(File inputFile) {
        return null;
    }

    @Override
    public boolean containsPattern(String line) {
        return false;
    }

    @Override
    public void writeToFile(String lines) {

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
            throw new IllegalArgumentException(
                    "\nIllegal number of parameters.\nUsage: JavaGrep regex rootPath outFile\n");

        // log4j & slf4j initial
        BasicConfigurator.configure();

        JavaGrepLambdaImp instance = new JavaGrepLambdaImp();
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
