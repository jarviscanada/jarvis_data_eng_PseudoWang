package ca.jrvs.apps.grep;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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
        Stream<String> lines = streamFiles(getRootPath()).flatMap(file -> {
            try {
                return readLines(file);
            } catch (IOException e) {
                logger.error("\nRead file content failed:\n{}", e.getMessage());
                System.exit(1);
                return null;
            }
        });
        writeToFile(lines.filter(stream -> containsPattern(stream)));
    }

    @Override
    public Stream<File> streamFiles(String rootDir) throws IOException {
        Path path = Paths.get(rootDir);
        File file = new File(rootDir);

        if (!file.exists())
            throw new IOException("\nRoot path does not exist.\n");
        else if (!file.isDirectory())
            throw new IOException("\nRoot path is not a directory.\n");

        return Files.walk(path).filter(Files::isRegularFile).map(Path::toFile);
    }

    @Override
    public Stream<String> readLines(File inputFile) throws IOException {
        return Files.lines(inputFile.toPath());
    }

    @Override
    public boolean containsPattern(String line) {
        Pattern pattern = Pattern.compile(getRegex());
        Matcher matcher = pattern.matcher(line);
        return matcher.matches();
    }

    @Override
    public void writeToFile(Stream<String> lines) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(getOutFile()));
        lines.forEach(s -> {
            try {
                writer.write(s);
                writer.newLine();
            } catch (IOException e) {
                logger.error("\nSave output failed:\n{}", e.getMessage());
                System.exit(1);
            }
        });
        writer.close();
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
