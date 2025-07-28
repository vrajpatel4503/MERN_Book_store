import Book from "../models/book.model.js";
import uploadOnCloudinary from "../cloudinary/cloudinary.js";
import User from "../models/user.model.js";

// add Book Controller
export const addBookController = async (req, res) => {
  try {
    const {
      bookTitle,
      bookAuthor,
      bookPrice,
      bookDescription,
      bookLanguage,
      bookPublisher,
      bookSeller,
    } = req.body;

    const { id } = req.user;

    const user = await User.findById(id);

    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Only admin can add books",
      });
    }

    // Validate book photo
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Book photo is required",
      });
    }

    // Upload multiple images to Cloudinary in parallel
    const uploadPromises = req.files.map((file) =>
      uploadOnCloudinary(file.path)
    );

    const results = await Promise.all(uploadPromises);

    const imageUrls = results.map((result) => result.secure_url);

    // Create a new Book
    const book = new Book({
      bookTitle,
      bookAuthor,
      bookPrice,
      bookDescription,
      bookLanguage,
      bookPublisher,
      bookSeller,
      bookPhoto: imageUrls,
    });

    // Save book to database
    await book.save();

    // Retrieve book details
    const createdBook = await Book.findById(book._id);

    if (!createdBook) {
      return res.status(500).json({
        success: false,
        message: "Book upload failed. Please try again",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book upload successfully",
      createdBook,
    });

    // try part end
  } catch (error) {
    console.log(`Error in addBookController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update book controller
export const updateBookController = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { bookId } = req.params;

    const {
      bookTitle,
      bookAuthor,
      bookPrice,
      bookDescription,
      bookLanguage,
      bookPublisher,
      bookSeller,
    } = req.body;

    // Check for user is admin
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Only admin can update book",
      });
    }

    // check for book exist or not
    const existingBook = await Book.findById(bookId);

    if (!existingBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // update the filed
    existingBook.bookTitle = bookTitle || existingBook.bookTitle;
    existingBook.bookAuthor = bookAuthor || existingBook.bookAuthor;
    existingBook.bookPrice = bookPrice || existingBook.bookPrice;
    existingBook.bookDescription =
      bookDescription || existingBook.bookDescription;
    existingBook.bookLanguage = bookLanguage || existingBook.bookLanguage;
    existingBook.bookPublisher = bookPublisher || existingBook.bookPublisher;
    existingBook.bookSeller = bookSeller || existingBook.bookSeller;

    // save the update book
    const updatedBook = await existingBook.save();

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      updatedBook,
    });

    // try part end
  } catch (error) {
    console.log(`Error in updateBookController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete book controller
export const deleteBookController = async (req, res) => {
  try {
    const { id } = req.user;            // coming from verifyJWT
    const { bookId } = req.params;

    // Check if user is admin
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Access denied. Only admin can delete book",
      });
    }

    // Delete the book
    const deletedBook = await Book.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found or already deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });

  } catch (error) {
    console.log(`Error in deleteBookController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// get all book controller
export const getAllBookController = async (req, res) => {
  try {
    const getAllBook = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      data: getAllBook,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getAllBookController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

// get latest book controller
export const getRecentlyAddBookController = async (req, res) => {
  try {
    const getLatestBook = await Book.find().sort({ createdAt: -1 }).limit(4);

    return res.status(200).json({
      success: true,
      data: getLatestBook,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getRecentlyAddBookController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get book by id controller
export const getBookByIdController = async (req, res) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    return res.status(200).json({
      success: true,
      data: book,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getBookByIdController :- ${error}`);
  }
};
