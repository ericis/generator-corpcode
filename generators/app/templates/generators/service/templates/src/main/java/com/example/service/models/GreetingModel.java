package <%= package %>.models;

public class GreetingModel {
	private String greeting;
	
	public GreetingModel(String greeting) {
		this.greeting = greeting;
	}
	
	public String getGreeting() {
		return this.greeting;
	}
}
