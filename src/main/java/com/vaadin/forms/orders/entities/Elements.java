package com.vaadin.forms.orders.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Elements {

    public static enum Options {
       ITEM_1("item1"),
       ITEM_2("item2");

       String value;
       Options(String value) {
           this.value = value;
       }

       @Override
       public String toString() {
           return value;
       }
    };

    private Boolean checkbox = true;
    private String checkboxGroup = "item-1";
    private String comboBox = "item-1";
    private String customField = "foo";
    private LocalDate datePicker = LocalDate.now();
    private LocalTime timePicker = LocalTime.now();
    private LocalDateTime dateTimePicker = LocalDateTime.now();
    private String select = "item-1";
    private Boolean radioButton = true;
    private String radioButtonGroup = "item-1";
    private String textField = "foo";
    private String passwordField = "bar";
    private Integer integerField = 12;
    private Double numberField = 12.33d;
    private String emailField = "foo@bar.baz";
    private String listBox = "item-1";
    private String textArea = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    private String richText = "[{\"insert\":\"HTML Ipsum Presents\"},{\"attributes\":{\"header\":1},\"insert\":\"\\n\"},{\"attributes\":{\"bold\":true},\"insert\":\"Pellentesque habitant morbi tristique\"},{\"insert\":\" senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. \"},{\"attributes\":{\"italic\":true},\"insert\":\"Aenean ultricies mi vitae est.\"},{\"insert\":\" Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, \"},{\"attributes\":{\"code\":true},\"insert\":\"commodo vitae\"},{\"insert\":\", ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. \"},{\"attributes\":{\"link\":\"#\"},\"insert\":\"Donec non enim\"},{\"insert\":\" in turpis pulvinar facilisis. Ut felis.\\n\"}]";
}
