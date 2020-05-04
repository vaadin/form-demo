package com.vaadin.forms.orders.entities;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Location extends IdEntity {

    @NotBlank
    @Size(max = 255)
    private String description;

    public Location(Long id, String description) {
        super(id);
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
