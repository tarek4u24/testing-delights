public static class TestConfiguration
{
    private static readonly IConfigurationRoot configuration;

    static TestConfiguration()
    {
        configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory()) // Adjust if needed
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();
    }

    public static string GetBaseUrl() =>
        configuration["BaseUrl"];

}
