package <%= package %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class <%= name %> {

	public static void main(String[] args) {
		SpringApplication.run(<%= name %>.class, args);
	}
}
