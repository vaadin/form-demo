package com.vaadin.forms.orders.docs;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
  public class PersonEndpoint {
    public Person getPerson() {
        return new Person();
    }
}