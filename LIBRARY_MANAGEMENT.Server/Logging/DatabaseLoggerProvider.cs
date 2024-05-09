using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.Extensions.Logging;
using System;
namespace LIBRARY_MANAGEMENT.Server.Logging
{
    public class DatabaseLoggerProvider : ILoggerProvider
    {
        private readonly Func<string, LogLevel, bool> _filter;
        private readonly LibraryManagementSystemContext _dbContext;

        public DatabaseLoggerProvider(Func<string, LogLevel, bool> filter, LibraryManagementSystemContext dbContext)
        {
            _filter = filter ?? ((category, logLevel) => true);
            _dbContext = dbContext;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new DatabaseLogger(categoryName, _filter, _dbContext);
        }

        public void Dispose() { }
    }
}