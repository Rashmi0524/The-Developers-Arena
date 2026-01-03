package library;

import java.io.*;
import java.util.*;

public class FileHandler {

    public static List<Book> readBooks(String filePath) {

        List<Book> books = new ArrayList<>();

        try {
            InputStream is = FileHandler.class
                    .getClassLoader()
                    .getResourceAsStream(filePath);

            if (is == null) {
                System.out.println("File not found: " + filePath);
                return books;
            }

            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            String line;

            // Skip header line
            br.readLine();

            while ((line = br.readLine()) != null) {
                String[] data = line.split(",");

                int id = Integer.parseInt(data[0]);
                String title = data[1];
                String author = data[2];
                boolean isIssued = Boolean.parseBoolean(data[3]);

                books.add(new Book(id, title, author, isIssued));
            }

            br.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return books;
    }
}
