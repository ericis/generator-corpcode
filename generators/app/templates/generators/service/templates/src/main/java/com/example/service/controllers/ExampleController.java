package <%= package %>.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import <%= package %>.models.GreetingModel;

@RestController
public class ExampleController {
	
	@RequestMapping(value = "/example", method = RequestMethod.GET)
	public GreetingModel get() {
		GreetingModel model = new GreetingModel("Hello");
		
		return model;
	}
}
