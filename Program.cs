using Shamazon.Models;
using Shamazon.Services;

using Amazon.S3;

using GraphQL.AspNet.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Database settings service
builder.Services.Configure<ShamazonDatabaseSettings>(
    builder.Configuration.GetSection("ShamazonDatabase"));

// Model Services
builder.Services.AddSingleton<ShoppersService>();
builder.Services.AddSingleton<SellersService>();
builder.Services.AddSingleton<ProductsService>();

// Util Services
builder.Services.AddSingleton<TokenService>();
builder.Services.AddSingleton<AmazonService>();

// Add graphql services to the DI container
builder.Services.AddGraphQL();

// AWS Services
builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
builder.Services.AddAWSService<IAmazonS3>();

var app = builder.Build();

app.UseGraphQL();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// app.MapControllers();

// app.MapFallbackToFile("index.html");

app.Run();
