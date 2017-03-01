package <%=package %>;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import org.junit.experimental.categories.Category;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
@Category(IntegrationTestCategory.class)
public @interface IntegrationTest {
}
