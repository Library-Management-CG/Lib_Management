using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        private readonly LibraryManagementSystemContext _context;
        public WeatherForecastController(ILogger<WeatherForecastController> logger,LibraryManagementSystemContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("bunty")]
        public IEnumerable<Book> GetBunty()
        {
            _logger.Log(
    LogLevel.Error,                    // LogLevel
    new EventId(123, "ErrorEvent"),    // EventId
    "007",new Exception("This is an error"),(state, exception) => state?.ToString() ?? exception?.Message ?? "No message"  // Formatter
);

            //throw new Exception("hello");
            //_logger.LogWarning("Bhai aai warning");
            //_logger.LogTrace("Bhai aai warning");
            return _context.Books.ToList();
        }
    }
}
