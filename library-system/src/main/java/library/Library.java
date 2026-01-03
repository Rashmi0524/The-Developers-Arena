package library;

import java.util.*;

public class Library {

    private List<Book> books = new ArrayList<>();
    private List<Member> members = new ArrayList<>();

    public void addBook(Book book) {
        books.add(book);
    }

    public void addMember(Member member) {
        members.add(member);
    }

    public void showBooks() {
        System.out.println("\nAvailable Books:");
        for (Book book : books) {
        	System.out.println(
        		    book.getId() + " - " + book.getTitle() + " by " + book.getAuthor()
        		);

        }
    } 
    public void issueBook(int bookId) {
        for (Book book : books) {
            if (book.getId() == bookId) {
                if (!book.isIssued()) {
                    book.issueBook();
                    System.out.println("Book issued: " + book.getTitle());

                } else {
                    System.out.println("Book is already issued.");
                }
                return;
            }
        }
        System.out.println("Invalid Book ID.");
    
    }

    public void returnBook(int bookId) {
        for (Book book : books) {
            if (book.getId() == bookId) {
                if (book.isIssued()) {
                    book.returnBook();
                    System.out.println("Book returned: " + book.getTitle());

                } else {
                    System.out.println("Book was not issued.");
                }
                return;
            }
        }
        System.out.println("Book not found.");
    }


    public void loadBooksFromFile() {
        List<Book> loadedBooks = FileHandler.readBooks("data/books.txt");
        books.addAll(loadedBooks);
    }
}

