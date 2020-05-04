package com.vaadin.forms.orders.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

public abstract class IdEntity {

    @JsonIgnore
    private Long id;
    private String idString;

    public IdEntity(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    /**
     * When transmitting ID to the client we need a data type that is supported
     * (long is not supported in JavaScript)
     *
     * @return String representation if {@link #id}
     */
    @JsonProperty // Does not work, need the class property above
    public String getIdString() {
        return id == null ? null : id.toString();
    }

    public void setIdString(String idString) {
        if (id == null && idString != null && !idString.isEmpty()) {
            id = Long.parseLong(idString);
        }
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
