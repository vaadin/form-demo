package com.vaadin.forms.orders.docs;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Arrays;
import java.util.List;

import javax.validation.constraints.AssertTrue;
import javax.validation.constraints.Email;
import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

public class MyEntity {
  @Size(min = 3, max = 50, message = "Type a min of 3 and a max of 50 characters")
  String myTextField = "foo";

  @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
            message = "must be 8+ characters, with uppercase, lowercase, and numbers")
  String myPasswordField = "bar";

  @Email(message = "must be a valid email address")
  String myEmailField = "foo@bar.baz";

  @PositiveOrZero(message = "Should be positive or zero")
  Integer myIntegerField = 12;
  @Positive(message = "Should be positive")
  Double myDoubleField = 12.33d;

  @AssertTrue(message = "Please agree this")
  Boolean myBooleanField = true;

  @NotEmpty(message = "Select at least one option")
  List<String> myListField = Arrays.asList("item-1", "item-3");
  
  @NotEmpty
  String mySingleSelectionField = "item-1";
  
  @Min(0) @Max(1)
  Integer mySelectField = 1;

  @Future(message = "Should be a date in the future")
  LocalDate myDateField = LocalDate.now().plusDays(1);
  LocalDateTime myDateTimeField = LocalDateTime.now();
  LocalTime myTimeField = LocalTime.now();
}