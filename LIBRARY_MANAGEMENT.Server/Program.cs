using LIBRARY_MANAGEMENT.Server.Logging;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<LibraryManagementSystemContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


// Configure logging
builder.Services.AddLogging(loggingBuilder =>
{
    loggingBuilder.AddProvider(new DatabaseLoggerProvider((category, logLevel) => logLevel >= LogLevel.Information, builder.Services.BuildServiceProvider().GetRequiredService<LibraryManagementSystemContext>()));
});

// Add DbContext

// Register DatabaseLogger as a service
builder.Services.AddScoped<ILogger, DatabaseLogger>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
