package com.vaadin.forms.orders.entities;

import javax.validation.Constraint;
import javax.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = { CapitalizedValidator.class})
@Target({ FIELD, PARAMETER})
@Retention(RUNTIME)
public @interface Capitalized {
    String message() default "Should be Capitalized";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
