namespace restful.response.PostIdResponse;

public class PostIdResponse
{
  public string Id { get; set; }

  public string Name { get; set; }
  public string CreatedAt { get; set; }
  public Data Data { get; set; }
}

public class Data
{
  public string type { get; set; }
  public string value { get; set; }
  public override string ToString()
    {
        return $"Type: {type}, Value: {value}";
    }
}

