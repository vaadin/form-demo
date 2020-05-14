package com.vaadin.forms.orders.entities;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CapitalizedValidator
        implements ConstraintValidator<Capitalized, String> {

    @Override
    public boolean isValid(String val, ConstraintValidatorContext c) {
        return !val.isEmpty() && Character.isUpperCase(val.charAt(0));
    }
}
