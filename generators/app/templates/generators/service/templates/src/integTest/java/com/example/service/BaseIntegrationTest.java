package <%=package %>;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.jayway.jsonpath.JsonPath;
import com.jayway.jsonpath.ReadContext;

@RunWith(SpringRunner.class)
@IntegrationTest
@ActiveProfiles("integration")
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public abstract class BaseIntegrationTest {
    
	@LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;
	
	public TestRestTemplate getRestTemplate() {
		return this.restTemplate.withBasicAuth("integration-test", "integration-test-password");
	}
	
	public String getUrl(String relativePath) {
		String url = "http://localhost:" + this.port + relativePath;
		
		return url;
	}
	
	public <T> T get(String relativePath, Class<T> responseType) {
		String url = this.getUrl(relativePath);
		
		return this.getRestTemplate().getForObject(url, responseType);
	}
	
	public ReadContext getJsonContext(String relativePath) {
		String responseJson = this.get(relativePath, String.class);
		
		ReadContext jsonContext = JsonPath.parse(responseJson);
		
		return jsonContext;
	}
}
