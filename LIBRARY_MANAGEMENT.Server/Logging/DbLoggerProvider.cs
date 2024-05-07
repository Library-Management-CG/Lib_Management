using LIBRARY_MANAGEMENT.Server.Models;
using System;

namespace LIBRARY_MANAGEMENT.Server.Logging
{
    public class DbLoggerProvider : ILoggerProvider
    {
        private readonly Func<string, LogLevel, bool> _filter;
        private readonly LibraryManagementSystemContext _dbContext;

        public DbLoggerProvider(LibraryManagementSystemContext dbContext, Func<string, LogLevel, bool> filter)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
            _filter = filter;
        }

        public ILogger CreateLogger(string categoryName)
        {
            return new DbLogger(_dbContext, _filter);
        }

        public void Dispose()
        {
            // Dispose any resources if necessary
        }
    }


}
