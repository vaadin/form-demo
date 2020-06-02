package com.vaadin.forms.orders.docs;

import java.util.Arrays;
import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
  public class MyEndpoint {
    public MyEntity getMyEntity() {
        return new MyEntity();
    }

    public List<String> getMyOptions() {
        return Arrays.asList("item-1", "item-2", "item-3");
    }
}