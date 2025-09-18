using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// JWT configuration
var jwtKey = builder.Configuration["Jwt:Key"] ?? "ThisIsADevSigningKey-ChangeMe";
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "MyApi";
var keyBytes = Encoding.UTF8.GetBytes(jwtKey);

// MySQL DbContext
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
                       ?? "server=127.0.0.1;port=3306;database=cleaningappdb;user=root;password=YourPassword;allowPublicKeyRetrieval=true;SslMode=none";
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
);

builder.Services.AddScoped<JobService>(); 

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IStaffService, StaffService>();

// Authentication & JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false; // important for local dev
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtIssuer,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(keyBytes),
        ValidateLifetime = true
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("RequireAdmin", policy => policy.RequireRole("Admin"));
});

// Controllers
builder.Services.AddControllers();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "CleaningApp API", Version = "v1" });
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    };
    c.AddSecurityDefinition("bearerAuth", securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, new[] { "bearerAuth" } }
    });
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000") // 👈 exact origin
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials(); // 👈 needed if sending cookies or auth headers
    });
});


var app = builder.Build();
app.UseCors("CorsPolicy"); 
// Apply pending migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
    await SeedData.EnsureSeedData(db);
}

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Preflight OPTIONS requests handler
app.Use(async (context, next) =>
{
    if (context.Request.Method == HttpMethods.Options)
    {
        context.Response.StatusCode = StatusCodes.Status200OK;
        await context.Response.CompleteAsync();
        return;
    }
    await next();
});


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
