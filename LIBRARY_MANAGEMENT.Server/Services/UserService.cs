﻿using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IUserService
    {
        List<UserBookDTO> GetTopBookReaders();
        List<BooksDetails> GetRecentBooks();
        List<BooksDetails> GetMostPopularBooks();
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;

        public UserService(LibraryManagementSystemContext context)
        {
            _context = context;
        }

        public List<UserBookDTO> GetTopBookReaders()
        {
            try
            {
                var topUsers = _context.BookIssues
                   .OrderByDescending(issue => issue.IssueTo)
                   .GroupBy(issue => issue.IssueTo)
                   .OrderByDescending(group => group.Count())
                   .Take(7)
                   .Select(group => group.Key)
                   .ToList();

                var users = _context.Users
                    .Where(user => topUsers.Contains(user.Id))
                    .Select(user => new UserBookDTO
                    {   Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        BookCount = _context.BookIssues
                        .Where(mapping => mapping.IssueTo == user.Id)
                        .Count()
                    })
                    .ToList();

                return users;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }


        public List<BooksDetails> GetRecentBooks()
        {
            try
            {
                var recentBooks = _context.BookQrMappings
                    .Include(bqm => bqm.Book.Ratings)
               .Select(bqm => new
               {
                   bqm.Id,
                   bqm.BookId,
                   bqm.Book,
                   bqm.Status.StatusName,
                   bqm.CreatedAtUtc
               })
               .OrderByDescending(bqm => bqm.CreatedAtUtc)
               .ToList();

                    var booksDetails = recentBooks
                        .Select(rb => new BooksDetails
                        {
                            BookQRMappingId = rb.Id,
                            BookId = rb.BookId,
                            Title = rb.Book.Title,
                            AuthorName = _context.AuthorBooks
                                .Where(ab => ab.BookId == rb.BookId)
                                .Select(ab => ab.Author.AuthorName)
                                .ToList(),
                            Description = rb.Book.Description,
                            CreatedAtUtc = rb.CreatedAtUtc,
                            Points = rb.Book.Ratings.Any() ? Math.Floor(rb.Book.Ratings.Average(r => r.Points)) : 0,

                            StatusName = "Available",

                            numberOfPeopleReviewed = rb.Book.Ratings.Count
                        })
                        .ToList();

                foreach (var bookDetail in booksDetails)
                {
                    bool anyCopyAvailable = false;
                    var bookQrMappings = _context.BookQrMappings.Where(bqm => bqm.BookId == bookDetail.BookId).ToList();
                    foreach (var mapping in bookQrMappings)
                    {
                        if (_context.BookIssues.Any(issue => issue.BookQrMappingid == mapping.Id && issue.ReceiveDate != null))
                        {
                            anyCopyAvailable = true;
                            break;
                        }
                    }
                    bookDetail.StatusName = anyCopyAvailable ? "Available" : "Not Available";
                }


                var latestbook = booksDetails.
                         GroupBy(bqm => bqm.BookId)
                        .Select(group => group.OrderByDescending(bqm => bqm.CreatedAtUtc).FirstOrDefault())
                        .Take(9)
                        .ToList();

                return latestbook;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        public List<BooksDetails> GetMostPopularBooks()
        {
            try
            {
                var popularBooks = _context.Books
                     .Include(book => book.Ratings) 
                    .Include(book => book.AuthorBooks)
                        .ThenInclude(ab => ab.Author)
                    .Include(book => book.BookQrMappings)
                        .ThenInclude(bqm => bqm.Status)
                    .OrderByDescending(book => book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0)
                    .ThenByDescending(book => book.Ratings.Count)
                    .Take(9)
                    .ToList();

                var booksDetails = popularBooks.Select(book => new BooksDetails
                {
                    BookId = book.Id,
                    Title = book.Title,
                    AuthorName = _context.AuthorBooks
                                .Where(ab => ab.BookId == book.Id)
                                .Select(ab => ab.Author.AuthorName)
                                .ToList(),
                    Description = book.Description,
                    CreatedAtUtc = book.CreatedAtUtc,
                    Points = Math.Floor(book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0),

                    StatusName = "Available",
              
                   
                    numberOfPeopleReviewed = book.Ratings.Count
                })
                .ToList();

                foreach (var bookDetail in booksDetails)
                {
                    bool anyCopyAvailable = false;
                    var bookQrMappings = _context.BookQrMappings.Where(bqm => bqm.BookId == bookDetail.BookId).ToList();
                    foreach (var mapping in bookQrMappings)
                    {
                        if (_context.BookIssues.Any(issue => issue.BookQrMappingid == mapping.Id && issue.ReceiveDate != null))
                        {
                            anyCopyAvailable = true;
                            break;
                        }
                    }
                    bookDetail.StatusName = anyCopyAvailable ? "Available" : "Not Available";
                }


                return booksDetails;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }
    }
}
