using LIBRARY_MANAGEMENT.Server.Logging;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Configuration;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddScoped<ILogger, DbLogger>();
// Register the filter function as a singleton service
builder.Services.AddSingleton<Func<string, LogLevel, bool>>((category, logLevel) => logLevel >= LogLevel.Information);


builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<LibraryManagementSystemContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
var app = builder.Build();

app.Services.GetRequiredService<ILoggerFactory>()
    .AddProvider(new DbLoggerProvider(app.Services.GetRequiredService<LibraryManagementSystemContext>(),
                                       (category, level) => level >= LogLevel.Information));
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
