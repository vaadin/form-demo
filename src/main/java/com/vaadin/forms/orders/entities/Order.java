package com.vaadin.forms.orders.entities;

import javax.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Order extends IdEntity {

    @NotNull(message = "{bakery.pickup.location.required}")
    private Location pickupLocation;
    @NotNull(message = "{bakery.due.date.required}")
    private LocalDate dueDate;
    @NotNull(message = "{bakery.due.time.required}")
    private LocalTime dueTime;
    private List<OrderLine> lines;
    private Customer customer;

    private String notes = "";

    public Order(Long id,
            Customer customer,
            Location pickupLocation,
            LocalDate dueDate,
            LocalTime dueTime,
            List<OrderLine> lines) {
        super(id);
        this.customer = customer;
        this.pickupLocation = pickupLocation;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.lines = lines;
    }

    public Location getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(Location pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalTime getDueTime() {
        return dueTime;
    }

    public void setDueTime(LocalTime dueTime) {
        this.dueTime = dueTime;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
    public List<OrderLine> getLines() {
        return lines;
    }

    public void setLines(List<OrderLine> lines) {
        this.lines = lines;
    }

    public void addLine(OrderLine line) {
        if (lines == null) {
            lines = new ArrayList<OrderLine>();
        }
        List<OrderLine> existing = lines.stream()
                .filter(p -> p.getId().equals(line.getId()))
                .collect(Collectors.toList());
        if (existing.size() > 0) {
            existing.get(0).setQuantity(
                    existing.get(0).getQuantity() + line.getQuantity());
        } else {
            lines.add(line);
        }
    }
}
