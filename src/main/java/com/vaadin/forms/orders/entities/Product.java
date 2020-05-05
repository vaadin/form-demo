package com.vaadin.forms.orders.entities;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;

public class Product extends IdEntity {


    @NotBlank @Size(min = 3, max = 50)
    private String description;
    @Positive
    private Integer price;

    public Product(Long id, String description, Integer price) {
        super(id);
        this.description = description;
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Product [" + super.toString() + ", description=" + description
                + ", price=" + price + "]";
    }

}
