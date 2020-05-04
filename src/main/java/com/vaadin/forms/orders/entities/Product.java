package com.vaadin.forms.orders.entities;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class Product extends IdEntity {


    @NotBlank @Size(min = 3, max = 50)
    private String description;
    private Integer price;
    private Integer quantity;

    public Product(Long id, String description, Integer price, Integer quantity) {
        super(id);
        this.description = description;
        this.price = price;
        this.quantity = quantity;
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

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "Product [description=" + description + ", price=" + price
                + ", quantity=" + quantity + ", id=" + getId()
                + "]";
    }

}
