package com.vaadin.forms.orders.entities;

import javax.annotation.Nullable;
import javax.validation.constraints.Positive;

public class OrderLine extends IdEntity {

    private Product product;
    @Positive
    private Integer quantity;
    @Nullable
    private String details;

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public OrderLine(Long id, Product product, int quantity, String details) {
        super(id);
        this.product = product;
        this.quantity = quantity;
        this.details = details;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public String toString() {
        return "OrderLine [" + super.toString() + ", product=" + product
                + ", quantity=" + quantity + ", details=" + details + "]";
    }
}
