import User from "../models/user.model.js";
import Book from "../models/book.model.js";

// add Book to favourite
export const addBookToFavourite = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const userData = await User.findById(id);

    if (userData.favourites.includes(bookId)) {
      return res.status(409).json({
        success: false,
        message: "Book is already in your favorites",
      });
    }

    userData.favourites.push(bookId);
    await userData.save();

    return res.status(201).json({
      success: true,
      message: "Book has been added to your favorites successfully",
      favorites: userData.favourites,
    });
  } catch (error) {
    console.log(`Error in addBookToFavouriteController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete book from favourite
export const deleteBookFromFavouriteController = async (req, res) => {
  try {
    const { id } = req.user;
    const { bookId } = req.body;

    const userData = await User.findById(id);

    // check for is book is already there in favourite
    const isBookFavourite = userData.favourites.includes(bookId);

    if (isBookFavourite) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
    }

    return res.status(200).json({
      success: true,
      message: "Book has been removed from your favorites successfully",
    });

    // try part end
  } catch (error) {
    console.log(`Error in deleteBookFromFavouriteController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all book from favourite controller
export const getAllBookFromFavouriteController = async (req, res) => {
  try {
    const { id } = req.user;

    const userData = await User.findById(id).populate("favourites");
    const favoriteBooks = userData.favourites;

    return res.status(200).json({
      success: true,
      data: favoriteBooks,
    });

    // try part end
  } catch (error) {
    console.log(`Error in getAllBookFromFavouriteController :- ${error}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// populate() is used to get full details from another collection using an ID stored in your document.