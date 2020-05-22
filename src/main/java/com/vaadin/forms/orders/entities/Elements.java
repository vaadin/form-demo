package com.vaadin.forms.orders.entities;

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
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

public class Elements {

    public static enum Options {
       ITEM_1,
       ITEM_2;
       public String toString() {
           return super.toString().toLowerCase().replace("_", "-");
       }
    };

    @NotNull @AssertTrue(message = "Please agree this")
    private Boolean radioButton = false;
    @NotNull @Pattern(regexp = "item-.+")
    private String radioButtonGroup = "item-2";

    @NotNull @AssertTrue
    private Boolean checkbox = true;
    @NotNull @NotEmpty
    private List<String> checkboxGroup = Arrays.asList("item-1");

    @NotNull
    private String comboBox = "item-1";
    @NotNull
    private String select = "item-1";

    @NotNull @Size(min = 2)
    private String customField = "foo";
    @NotNull @Size(min = 2)
    private String textField = "foo";
    @NotNull @Pattern(regexp = "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", message = "must be 8+ characters, with uppercase, lowercase, and numbers")
    private String passwordField = "bar";
    @NotNull @PositiveOrZero(message = "Should be positive or zero")
    private Integer integerField = 12;
    @NotNull @Positive(message = "Should be positive")
    private Double numberField = 12.33d;
    @NotNull @Email  String emailField = "foo@bar.baz";

    @NotNull @Future
    private LocalDate datePicker = LocalDate.now().plusDays(1);
    @NotNull @Future
    private LocalDateTime dateTimePicker = LocalDateTime.now().plusDays(1).plusHours(1);
    @NotNull
    private LocalTime timePicker = LocalTime.now().plusMinutes(30);

    @NotNull @Size(min = 10, max = 125, message = "Text should be from 10 to 125 chars")
    private String textArea = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
    @NotNull @Min(0) @Max(1)
    private Integer listBox = 1;

    @Size(min = 100, message = "Please write more") @Size(max = 300, message = "It is a very long text")
    private String richText =
      "[{\"insert\":\"HTML Ipsum Presents\"},{\"attributes\":{\"header\":3},\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Pellentesque habitant morbi tristique\"},{\"insert\":\" senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae. \"}]";
}
