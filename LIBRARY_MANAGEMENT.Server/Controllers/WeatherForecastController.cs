using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SharePoint.Client;
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
            //var fileName = @"C:\Test.jpg";
            //using (ClientContext context = new ClientContext("http://sp/"))
            //{
            //    try
            //    {
            //        using (var fs = new FileStream(fileName, FileMode.Open))
            //        {
            //            var fi = new FileInfo(fileName);
            //            var list = context.Web.Lists.GetByTitle("Documents");
            //            context.Load(list.RootFolder);
            //            context.ExecuteQuery();
            //            var fileUrl = String.Format("{0}/{1}", list.RootFolder.ServerRelativeUrl, fi.Name);

            //            // Reset the file stream position to ensure it starts from the beginning
            //            fs.Position = 0;

            //            // Save the file to SharePoint
            //            Microsoft.SharePoint.Client.File.SaveBinary(context, fileUrl, fs, true);
            //        }
            //        Console.WriteLine("File uploaded successfully.");
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine("Error uploading file: " + ex.Message);
            //    }
            //}

             _logger.Log(LogLevel.Error,new EventId(123, "ErrorEvent"),"007",new Exception("This is an error"),(state, exception) => state?.ToString() ?? exception?.Message ?? "No message");

            //throw new Exception("hello");
            //_logger.LogWarning("Bhai aai warning");
            // _logger.LogTrace("warning");
            return _context.Books.ToList();
        }
    }
}
