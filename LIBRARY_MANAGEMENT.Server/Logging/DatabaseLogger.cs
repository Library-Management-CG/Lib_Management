using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.Extensions.Logging;
using System;
namespace LIBRARY_MANAGEMENT.Server.Logging
{ 
public class DatabaseLogger : ILogger
{
    private readonly string _categoryName;
    private readonly Func<string, LogLevel, bool> _filter;
    private readonly LibraryManagementSystemContext _context;

    public DatabaseLogger(string categoryName, Func<string, LogLevel, bool> filter, LibraryManagementSystemContext context)
    {
        _categoryName = categoryName;
        _filter = filter;
        _context = context;
    }

    public IDisposable BeginScope<TState>(TState state)
    {
        return null; // We're not implementing scopes in this example
    }

    public bool IsEnabled(LogLevel logLevel)
    {
        return _filter(_categoryName, logLevel);
    }

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
    {
        if (!IsEnabled(logLevel))
        {
            return;
        }

        string message = formatter(state, exception);

        // Write log message to the database
        WriteToDatabase(logLevel, message, exception);
    }

    private void WriteToDatabase(LogLevel logLevel, string message, Exception exception)
        {
            /*using (var connection = new SqlConnection(_connectionString))
            {
                connection.Open();

                string exceptionMessage = exception?.ToString() ?? string.Empty;

                // Assuming you have a table named Log with columns: Timestamp, LogLevel, Message, Exception
                string sql = "INSERT INTO Log (Timestamp, LogLevel, Message, Exception) VALUES (@Timestamp, @LogLevel, @Message, @Exception)";

                using (var command = new SqlCommand(sql, connection))
                {
                    command.Parameters.AddWithValue("@Timestamp", DateTime.UtcNow);
                    command.Parameters.AddWithValue("@LogLevel", logLevel.ToString());
                    command.Parameters.AddWithValue("@Message", message);
                    command.Parameters.AddWithValue("@Exception", exceptionMessage);

                    command.ExecuteNonQuery();
                }
            }
            */
            _context.Logs.Add(new Log
            {
                Timestamp = DateTime.UtcNow,
                LogLevel = logLevel.ToString(),
                Message = message,
                Exception = exception.ToString()
            }) ; 
            _context.SaveChanges();
        }
            
    }
}
