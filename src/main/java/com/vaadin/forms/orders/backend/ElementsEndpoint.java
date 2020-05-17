package com.vaadin.forms.orders.backend;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;
import com.vaadin.forms.orders.entities.Elements;
import com.vaadin.forms.orders.entities.Elements.Options;

@Endpoint
@AnonymousAllowed
public class ElementsEndpoint {

    public Elements getElementValues() {
     return new Elements();
    }

    public List<String> getOptions() {
        return Stream.of(Options.values()).map(Enum::toString).collect(Collectors.toList());
    }
}
