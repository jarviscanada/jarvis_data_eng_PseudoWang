package ca.jrvs.apps.grep;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.LinkedList;
import java.util.Scanner;
import java.util.regex.Pattern;

/**
 * This is a demo of Java version `grep` command
 */
public class JavaGrepDemo {

    private static void getFiles(File path, LinkedList<File> files) {
        File[] pathList = path.listFiles();
        if (pathList.length == 0)
            return;
        for (File current : pathList) {
            if (current.isDirectory()) {
                getFiles(current, files);
                continue;
            }
            files.add(current);
        }
    }

    public static void main(String[] args) throws IllegalArgumentException, IOException {

        // parameter number validation
        if (args.length != 3)
            throw new IllegalArgumentException("Illegal number of parameters\nUsage: JavaGrepDemo regex rootPath outFile");

        // use final to disallow modify after assign
        final String regex = args[0];
        final String rootPath = args[1];
        final String outFile = args[2];

        File path = new File(rootPath);
        Scanner scanner = null;
        StringBuffer buffer = new StringBuffer();

        // root path validation
        if (!path.exists())
            throw new IOException("Root path does not exist.");
        else if (!path.isDirectory())
            throw new IOException("Root path is not a directory.");

        LinkedList<File> files = new LinkedList<File>();
        getFiles(path, files);

        // traversal files
        for (File file : files) {
            scanner = new Scanner(file);
            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                try {
                    if (Pattern.matches(regex, line)) {
                        buffer.append(line + "\n");
                    }
                } catch (IllegalArgumentException e) {
                    System.err.println("Please check the regex:\n" + e.getMessage());
                    System.exit(1);
                }
            }
        }

        String result = buffer.substring(0, buffer.length() - 1);

        File file = new File(outFile);
        try {
            file.createNewFile();
            FileWriter stream = new FileWriter(file);
            stream.write(result);
            stream.flush();
            stream.close();
        } catch (IOException e) {
            System.err.println("Save output failed:\n" + e.getMessage());
            System.exit(1);
        }
        System.exit(0);
    }
}
