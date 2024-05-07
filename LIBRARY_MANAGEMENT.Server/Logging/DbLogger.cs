using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.Extensions.Logging;
using System;

namespace LIBRARY_MANAGEMENT.Server.Logging
{
    public class DbLogger : ILogger
    {
        private readonly LibraryManagementSystemContext _dbContext;
        private readonly Func<string, LogLevel, bool> _filter;

        public DbLogger(LibraryManagementSystemContext dbContext, Func<string, LogLevel, bool> filter)
        {
            _dbContext = dbContext;
            _filter = filter;
        }

        public IDisposable BeginScope<TState>(TState state) => null;

        public bool IsEnabled(LogLevel logLevel) => _filter?.Invoke("", logLevel) ?? true;

        public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception exception, Func<TState, Exception, string> formatter)
        {
            if (!IsEnabled(logLevel))
                return;

            var logEntry = new CustomError
            {
                //Level = logLevel.ToString(),
                Values = formatter(state, exception),
                Created = DateTime.UtcNow
            };

            _dbContext.CustomErrors.Add(logEntry);
            _dbContext.SaveChanges();
        }
    }
}
