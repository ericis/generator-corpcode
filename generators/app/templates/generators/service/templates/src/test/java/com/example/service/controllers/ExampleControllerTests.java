package <%= package %>.controllers;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import <%= package %>.models.GreetingModel;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ExampleControllerTests {

    @Autowired
    private ExampleController controller;
    
    @Test
    public void contexLoads() throws Exception {
        assertThat(controller).isNotNull();
    }
    
    @Test
    public void get() throws Exception {
    	GreetingModel model = controller.get();
    	
        assertThat(model.getGreeting()).isEqualTo("Hello");
    }
}
