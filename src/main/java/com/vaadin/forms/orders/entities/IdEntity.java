package com.vaadin.forms.orders.entities;

public abstract class IdEntity {

    private Long id;

    public IdEntity(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public int hashCode() {
        if (id == null) {
            return super.hashCode();
        } else {
            return id.intValue();
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null || id == null) {
            return false;
        }
        if (!(obj instanceof IdEntity)) {
            return false;
        }

        if (id.equals(((IdEntity) obj).id)) {
            return true;
        }
        return false;
    }
}
