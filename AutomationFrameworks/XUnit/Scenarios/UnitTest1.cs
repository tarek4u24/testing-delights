using System.Net.Http.Headers;
using System.Text.Json;
using Models.PostId;
using restful.response;
using restful.response.PostIdResponse;


namespace xunit_Tests;

public class UnitTest1
{

    private readonly ITestOutputHelper output;
    private readonly string baseUrl;
    public UnitTest1(ITestOutputHelper output)
    {
        this.output = output;
        baseUrl = TestConfiguration.GetBaseUrl();
    }

    [Fact]
    public void Test1()
    {
        //Arrange
        int x = 2;
        int y = 3;

        //Act
        int result = x + y;

        //Assert

        Assert.Equal(5, result);
    }

    [Fact]
    public void Test2()
    {
        Arrange(() => (x: 2, y: 3))
        .Act(data => data.x + data.y)
        .Assert(result => result.ShouldBe(5));


    }

    private static readonly HttpClient client = new();

    [Fact]
    public async Task Test_RestApi() =>
    await Arrange(() => baseUrl)
        .Act(async url =>
        {
            HttpRequestMessage request = TarekReq.Get.To(url);
            // await client.GetAsync(url + "?id=1")
            HttpResponseMessage response = await client.SendAsync(request);
            return response;
        })
        .Assert(async response => 
        {
            // 📄 Read and format response
            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            var prettyJson = JsonSerializer.Serialize(json, new JsonSerializerOptions { WriteIndented = true });
            output.WriteLine(prettyJson);

            // ✅ Validate status code
            response.StatusCode.ShouldBe(HttpStatusCode.OK);

            // ✅ Deserialize and assert content
            var products = JsonSerializer.Deserialize<IdResponse[]>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            products.ShouldNotBeNull();

            var product = products.First();
            // product.Id.ShouldBe(1);
            product.Name.ShouldBe("Google Pixel 6 Pro");
            product.Data.Color.ShouldBe("Cloudy White");
            product.Data.Capacity.ShouldBe("128 GB");
        });

    [Fact]
    // [Description="POST request"]
    public async Task PostRequest() =>
    await Arrange(() =>
    {
        var postData = new PostId
        {
            name = "Tarek",
            data = new Models.PostId.Data
            {
                type = "Type_Tarek",
                value = "value_Tarek"
            }
        };
        var json = JsonSerializer.Serialize(postData, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        });
        output.WriteLine($"Serialized JSON: {json}");
        return json;
    }
    )
    .Act(async json => {
        var request = new HttpRequestMessage(HttpMethod.Post, baseUrl)
        {
            Content = new StringContent(json, Encoding.UTF8, new MediaTypeHeaderValue("application/json"))
        };
        var response = await client.SendAsync(request);
        return response;
    })
    .Assert(async response =>
    {
    var content = await response.Content.ReadAsStringAsync();
    response.StatusCode.ShouldBe(HttpStatusCode.OK);
        output.WriteLine(content);
    var deserialized = JsonSerializer.Deserialize<PostIdResponse>(content, new JsonSerializerOptions
    {
        PropertyNameCaseInsensitive = true
    });
    output.WriteLine(deserialized.ToString());
    output.WriteLine($"ID: {deserialized.Id}");
    output.WriteLine($"Name: {deserialized.Name}");
    output.WriteLine($"CreatedAt: {deserialized.CreatedAt}");
    output.WriteLine($"Data: {deserialized.Data}");
});


}
