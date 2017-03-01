package <%= package %>.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;

import <%= package %>.BaseIntegrationTest;
import com.jayway.jsonpath.ReadContext;

public class ExampleControllerIntegrationTests extends BaseIntegrationTest {

    @Test
    public void getShouldReturnGreeting() throws Exception {
        
    	ReadContext json = this.getJsonContext("/example");
    	
    	String greeting = json.read("$.greeting");
    	
    	assertThat(greeting).isEqualTo("Hello");
    }
}
